import { v4 as uuidV4 } from "uuid"

// console.log(uuidV4())

// A task Type
type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks() // Array of tasks
tasks.forEach(addListItem) // render tasks to screen

form?.addEventListener("submit", e => {
  e.preventDefault() // Prevent default to avoid accidently refresh the page

  // Ensure input has a value with optional chaining
  if (input?.value == "" || input?.value == null) return

  // Create a todo task (Task object)
  const todo_task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }

  // Add tasks to array
  tasks.push(todo_task)
  saveTasks()
  
  addListItem(todo_task)
  // clear our the label
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    // console.log(tasks)
    saveTasks()
  })
  // specfic the type of checkbox
  checkbox.type = "checkbox"
  // checkbox checked by default
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}