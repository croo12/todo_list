use serde;
use tauri::api::path::data_dir;
use std::{self, fs, io::{Read, Write}};

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Todo {
    id: i32,
    title: String,
    time: (i32, i32),
    description: String,
    completed: bool,
}

impl Todo {
    pub fn new(title: String, time: (i32, i32), description: String) -> Self {
        Todo {
            title,
            time,
            description,
            ..Default::default()
        }
    }
}

impl Default for Todo {
    fn default() -> Self {
        Self {
            id: 0,
            title: String::new(),
            time: (0, 0),
            description: String::new(),
            completed: false,
        }
    }
}

pub fn read_todo(year: i32, month: i32, day: i32) -> anyhow::Result<Vec<Todo>> {
    let file_name = make_file_name(year, month, day);
    let result;

    if let Ok(mut file) = fs::File::open(&file_name) {
        let mut content = String::new();
        //file is not readable
        file.read_to_string(&mut content)?;
        //file is not correctly formatted
        result = serde_json::from_str(&content)?;
    } else {
        result = Vec::new();
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

    let mut file = fs::OpenOptions::new()
        .write(true)
        .create(true)
        .open(&file_name)?;

    file.write_all(updated_content.as_bytes())?;

    Ok(())
}

fn make_file_name(year: i32, month: i32, day: i32) -> String {
    let data_dir = data_dir().expect("not found data dir");
    let dir = data_dir.join(format!("todos/{:04}-{:02}-{:02}_todo.json", year, month, day));
    dir.to_string_lossy().to_string()
}

fn create_dir_if_not_exists(path: &str) -> anyhow::Result<()> {
    let dirs = std::path::Path::new(path).parent().ok_or(anyhow::anyhow!("Invalid path"))?;
    if !dirs.exists() {
        fs::create_dir_all(dirs)?;
    }
    Ok(())
}