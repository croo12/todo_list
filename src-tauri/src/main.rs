// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use data::Todo;

mod data;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn insert_todo(
    year: i32,
    month: i32,
    day: i32,
    title: &str,
    time: (i32, i32),
    description: &str,
) {
    let todo = Todo::new(String::from(title), time, String::from(description));
    if let Err(e) = data::write_todo(year, month, day, todo) {
        let message = format!("Error: {:#?}", e);
        println!("Error: {}", message);
    };
}

#[tauri::command]
fn get_todo(year: i32, month: i32, day: i32) -> Vec<Todo> {
    let result = match data::read_todo(year, month, day) {
        Ok(todo) => todo,
        Err(e) => {
            println!("Error: {:#?}", e);
            Vec::new()
        }
    };
    
    result
}

fn main() {
    let system_tray = tauri::SystemTray::new();

    tauri::Builder::default()
        .system_tray(system_tray)
        .invoke_handler(tauri::generate_handler![greet, get_todo, insert_todo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
