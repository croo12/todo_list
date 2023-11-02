use chrono::{Datelike, TimeZone};
use std::{
    self, fs,
    io::{Read, Write},
};
use tauri::api::path::data_dir;

pub struct UncompletedTodo {
    pub todo_list: std::sync::RwLock<Vec<Todo>>,
}

impl UncompletedTodo {
    pub fn new() -> UncompletedTodo {
        let todos = read_not_completed_todos().expect("failed to read not completed todos");
        UncompletedTodo {
            todo_list: std::sync::RwLock::new(todos),
        }
    }

    pub fn get_todos(&self) -> Vec<Todo> {
        self.todo_list.read().unwrap().clone()
    }

    pub fn add_todo(&self, title: &str, deadline: i64, description: &str) {
        let todo = Todo::new(String::from(title), deadline, String::from(description));

        match write_new_todo(todo.clone()) {
            Ok(()) => {
                println!("add is successful");
                let mut todos = self.todo_list.write().unwrap();
                todos.push(todo);
            }
            Err(e) => {
                let message = format!("Error: {:#?}", e);
                println!("Error: {}", message);
            }
        };
    }

    pub fn update_todo(&self, updated_todo: TodoUpdate) {
        match update_uncompleted_todo(updated_todo.clone()) {
            Ok(()) => {
                println!("update is completed");
                let mut list = self.todo_list.write().unwrap();
                if let Some(todo) = list.iter_mut().find(|t| t.id == updated_todo.id) {
                    update_todo(todo, updated_todo);
                }
            }
            Err(e) => {
                let message = format!("Error: {:#?}", e);
                println!("Error: {}", message);
            }
        };
    }

    pub fn delete_todo(&self, id: i64) {
        match delete_uncompleted_todo(id) {
            Ok(()) => {
                println!("delete is completed");
                let mut list = self.todo_list.write().unwrap();
                if let Some(idx) = list.iter_mut().position(|t| t.id == id) {
                    list.remove(idx);
                };
            }
            Err(e) => {
                let message = format!("Error: {:#?}", e);
                println!("Error: {}", message);
            }
        };
    }
}

#[derive(serde::Serialize, serde::Deserialize, Debug, Clone)]
pub struct Todo {
    id: i64,
    title: String,
    deadline: i64,
    description: String,
    completed: bool,
    registered_at: i64,
}

impl Todo {
    pub fn new(title: String, deadline: i64, description: String) -> Self {
        Todo {
            title,
            deadline,
            description,
            ..Default::default()
        }
    }
}

impl Default for Todo {
    fn default() -> Self {
        let registered_at = chrono::Utc::now().timestamp();

        Self {
            id: registered_at,
            title: String::new(),
            deadline: 0i64,
            description: String::new(),
            completed: false,
            registered_at,
        }
    }
}

#[derive(Default, Debug, Clone)]
pub struct TodoUpdate {
    pub id: i64,
    pub title: Option<String>,
    pub deadline: Option<i64>,
    pub description: Option<String>,
    pub completed: Option<bool>,
    pub registered_at: Option<i64>,
}

pub fn read_not_completed_todos() -> anyhow::Result<Vec<Todo>> {
    let file_name = make_default_file_name();
    let result;

    if let Ok(Some(content)) = read_json_file(&file_name) {
        result = content;
    } else {
        result = Vec::new();
    }

    Ok(result)
}

pub fn read_todo(year: i32, month: i32, day: i32) -> anyhow::Result<Vec<Todo>> {
    let file_name = make_file_name(year, month, day);
    let result;

    if let Ok(Some(content)) = read_json_file(&file_name) {
        result = content;
    } else {
        result = Vec::new();
    }

    Ok(result)
}

pub fn update_uncompleted_todo(updated_todo: TodoUpdate) -> anyhow::Result<()> {
    let file_name = make_default_file_name();
    let mut todo_list: Vec<Todo>;

    if let Ok(content) = read_not_completed_todos() {
        todo_list = content;
    } else {
        todo_list = Vec::new();
    }

    let updated_content = if updated_todo.completed.is_none() || !updated_todo.completed.unwrap() {
        if let Some(t) = todo_list.iter_mut().find(|t| t.id == updated_todo.id) {
            update_todo(t, updated_todo);
        };

        serde_json::to_string(&todo_list)?
    } else {
        let idx = if let Some(idx) = todo_list.iter().position(|t| t.id == updated_todo.id) {
            idx
        } else {
            return Ok(());
        };

        let mut todo = todo_list.remove(idx);
        update_todo(&mut todo, updated_todo);

        let (year, month, day) = timestamp_to_date(todo.deadline)?;
        println!("{}/{}/{}", year, month, day);
        write_todo(year, month, day, todo)?;

        serde_json::to_string(&todo_list)?
    };

    write_file(&file_name, updated_content)?;

    Ok(())
}

pub fn update_completed_todo(updated_todo: TodoUpdate) -> anyhow::Result<()> {
    let deadline = if let Some(deadline) = updated_todo.deadline {
        deadline
    } else {
        eprintln!("deadline is not set");
        return Ok(());
    };

    let (year, month, day) = timestamp_to_date(deadline)?;
    let mut todo_list = read_todo(year, month, day)?;

    if let Some(false) = updated_todo.completed {
        if let Some(idx) = todo_list.iter().position(|t| t.id == updated_todo.id) {
            let mut todo = todo_list.remove(idx);
            update_todo(&mut todo, updated_todo);
            write_new_todo(todo)?;

            let file_name = make_file_name(year, month, day);
            let updated_content = serde_json::to_string(&todo_list)?;
            write_file(&file_name, updated_content)?;
        };
    } else {
        if let Some(todo) = todo_list.iter_mut().find(|t| t.id == updated_todo.id) {
            update_todo(todo, updated_todo);
        };

        let updated_content = serde_json::to_string(&todo_list)?;
        write_file(&make_file_name(year, month, day), updated_content)?;
    }

    Ok(())
}

fn read_json_file<T>(file_name: &str) -> anyhow::Result<Option<T>>
where
    T: serde::de::DeserializeOwned,
{
    let result: Option<T>;

    if let Ok(mut file) = fs::File::open(file_name) {
        let mut content = String::new();
        //file is not readable
        file.read_to_string(&mut content)?;
        //file is not correctly formatted
        result = serde_json::from_str(&content)?;
    } else {
        result = None;
    }

    Ok(result)
}

pub fn write_todo(year: i32, month: i32, day: i32, todo: Todo) -> anyhow::Result<()> {
    let file_name = make_file_name(year, month, day);
    create_dir_if_not_exists(&file_name)?;

    let mut result: Vec<Todo>;

    if let Ok(file) = read_todo(year, month, day) {
        result = file;
    } else {
        result = Vec::new();
    }

    result.push(todo);
    let updated_content = serde_json::to_string(&result)?;

    write_file(&file_name, updated_content)?;

    Ok(())
}

pub fn write_new_todo(todo: Todo) -> anyhow::Result<()> {
    let file_name = make_default_file_name();
    create_dir_if_not_exists(&file_name)?;

    let mut result: Vec<Todo>;

    if let Ok(file) = read_not_completed_todos() {
        result = file;
    } else {
        result = Vec::new();
    }

    result.push(todo);
    let updated_content = serde_json::to_string(&result)?;

    write_file(&file_name, updated_content)?;

    Ok(())
}

fn delete_uncompleted_todo(id: i64) -> anyhow::Result<()> {
    let file_name = make_default_file_name();
    let todo_list: Vec<Todo>;

    if let Ok(content) = read_not_completed_todos() {
        todo_list = content;
    } else {
        todo_list = Vec::new();
    }

    let content: Vec<Todo> = todo_list.into_iter().filter(|t| t.id != id).collect();
    let updated_content = serde_json::to_string(&content)?;

    write_file(&file_name, updated_content)?;

    Ok(())
}

fn timestamp_to_date(timestamp: i64) -> anyhow::Result<(i32, i32, i32)> {
    if let chrono::LocalResult::Single(date) = chrono::Utc.timestamp_millis_opt(timestamp) {
        Ok((date.year(), date.month() as i32, date.day() as i32))
    } else {
        println!("해당 타임스탬프를 사용할 수 없습니다.");
        Ok((0, 0, 0))
    }
}

fn update_todo(todo: &mut Todo, updated_todo: TodoUpdate) {
    if let Some(title) = updated_todo.title {
        todo.title = title;
    }

    if let Some(deadline) = updated_todo.deadline {
        todo.deadline = deadline;
    };

    if let Some(description) = updated_todo.description {
        todo.description = description;
    };

    if let Some(completed) = updated_todo.completed {
        todo.completed = completed;
    };

    todo.registered_at = chrono::Utc::now().timestamp();
}

fn write_file(file_name: &str, content: String) -> anyhow::Result<()> {
    let mut file = fs::OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open(file_name)?;

    file.write_all(content.as_bytes())?;

    Ok(())
}

fn make_prefix_file_name() -> std::path::PathBuf {
    let data_dir = data_dir().expect("not found data dir");
    data_dir.join("todos")
}

fn make_default_file_name() -> String {
    let prefix_file_name = make_prefix_file_name();
    prefix_file_name
        .join("todo.json")
        .to_string_lossy()
        .to_string()
}

fn make_file_name(year: i32, month: i32, day: i32) -> String {
    let base_dir = make_prefix_file_name();
    let dir = base_dir.join(format!("{:04}-{:02}-{:02}_todo.json", year, month, day));
    dir.to_string_lossy().to_string()
}

fn create_dir_if_not_exists(path: &str) -> anyhow::Result<()> {
    let dirs = std::path::Path::new(path)
        .parent()
        .ok_or(anyhow::anyhow!("Invalid path"))?;
    if !dirs.exists() {
        fs::create_dir_all(dirs)?;
    }
    Ok(())
}
