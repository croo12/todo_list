// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use data::Todo;
use tauri::Manager;

mod data;

type UncompletedTodos = std::sync::Arc<std::sync::RwLock<data::UncompletedTodo>>;

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct Payload {}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn regenerate_todos(window: tauri::Window) {
    window.emit("regenerate_todo", Payload {}).unwrap();
}

#[tauri::command]
fn toggle_completed(
    id: i64,
    deadline: i64,
    is_completed: bool,
    state: tauri::State<UncompletedTodos>,
) {
    let updated_todo = data::TodoUpdate {
        id,
        completed: Some(!is_completed),
        deadline: Some(deadline),
        ..Default::default()
    };

    if !is_completed {
        state.write().unwrap().update_todo(updated_todo);
    } else {
        match data::update_completed_todo(updated_todo) {
            Ok(_) => {}
            Err(e) => {
                eprintln!("{}", e);
            }
        }
    };
}

#[tauri::command]
fn insert_todo(
    title: &str,
    deadline: i64,
    description: &str,
    state: tauri::State<UncompletedTodos>,
) {
    state
        .write()
        .unwrap()
        .add_todo(title, deadline, description);
}

#[tauri::command]
fn remove_todo(id: i64, is_completed: bool, state: tauri::State<UncompletedTodos>) {
    if is_completed {
        todo!("delete completed todo");
    } else {
        state.write().unwrap().delete_todo(id);
    }
}

#[tauri::command]
fn get_todo(year: i32, month: i32, day: i32, state: tauri::State<UncompletedTodos>) -> Vec<Todo> {
    let todos = state.read().unwrap().get_todos();

    let completed = match data::read_todo(year, month, day) {
        Ok(todo) => todo,
        Err(e) => {
            println!("Error: {:#?}", e);
            Vec::new()
        }
    };

    todos.into_iter().chain(completed.into_iter()).collect()
}

fn main() {
    let system_tray = tauri::SystemTray::new();

    let quit = tauri::CustomMenuItem::new("quit", "Quit");
    let system_tray_menu = tauri::SystemTrayMenu::new().add_item(quit);

    let state = std::sync::Arc::new(std::sync::RwLock::new(data::UncompletedTodo::new()));

    tauri::Builder::default()
        .manage(state.clone())
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            let identifier = app.config().tauri.bundle.identifier.clone();

            let _spawn = std::thread::spawn(move || {
                let mut delta_time = chrono::Local::now();
                let state = state.clone();

                loop {
                    std::thread::sleep(std::time::Duration::from_secs(2));

                    let todos = state.read().unwrap().get_todos();
                    let now = chrono::Local::now();

                    todos.iter().for_each(|todo| {
                        if delta_time.timestamp_millis() <= todo.deadline
                            && todo.deadline <= now.timestamp_millis()
                        {
                            tauri::api::notification::Notification::new(identifier.clone())
                                .title(todo.title.clone())
                                .body(format!(
                                    "{} 시간이 종료되었습니다.\n{}",
                                    todo.title.clone(),
                                    todo.description.clone()
                                ))
                                .sound("Default")
                                .show()
                                .expect("알림을 보낼 수 없습니다.");
                        }
                    });

                    delta_time = now;

                    let window: tauri::Window = window.clone();
                    regenerate_todos(window);
                }
            });

            Ok(())
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            tauri::WindowEvent::Destroyed => {
                todo!("do nothing now");
            }
            _ => {}
        })
        .system_tray(system_tray.with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| match event {
            tauri::SystemTrayEvent::DoubleClick { .. } => {
                println!("double clicked");
                let main_window = app.get_window("main").unwrap();
                main_window.show().unwrap();
            }
            tauri::SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    app.exit(0);
                }
                "open" => {
                    todo!();
                }
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            get_todo,
            insert_todo,
            remove_todo,
            toggle_completed,
            regenerate_todos
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
