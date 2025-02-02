# main.py
import eel
import json
import os

eel.init('web')

TASKS_FILE = 'tasks.json'

if os.path.exists(TASKS_FILE):
    with open(TASKS_FILE, 'r') as f:
        tasks = json.load(f)
else:
    tasks = []

@eel.expose
def get_tasks():
    return tasks

@eel.expose
def add_task(task):
    tasks.append(task)
    save_tasks()
    return tasks

@eel.expose
def remove_task(index):
    try:
        tasks.pop(int(index))
        save_tasks()
    except Exception as e:
        print(e)
    return tasks

def save_tasks():
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f)

def start_app():
    eel.start('index.html', mode='chrome-app', size=(1400, 900))

if __name__ == '__main__':
    #full screen
    start_app()
