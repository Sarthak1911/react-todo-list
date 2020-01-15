import axios from "axios";
const url = "https://task-app-2ceb2.firebaseio.com/tasks";

export async function getAllTasks(query) {
  const items = [];

  //Need to filter data using the get request
  const { data: tasks } = await axios.get(url + ".json");

  for (let task in tasks) {
    items.push({ ...tasks[task], id: task });
  }

  //Use createdBy to filter the tasks
  return query
    ? items.filter(
        todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()) ||
          parseInt(todo.priority) === parseInt(query)
      )
    : items;
}

export async function getTask(id) {
  const { data: todo } = await axios.get(`${url}/${id}.json`);

  return todo;
}

export async function deleteTask(id) {
  await axios.delete(`${url}/${id}.json`);
}

export async function updateTask(id, task) {
  //Update the task
  await axios.put(`${url}/${id}.json`, task);
  throw new Error("");
}

export async function createTask(task) {
  //Generate current date
  const createdOn = new Date();

  //Update task with id and date
  task = { ...task, createdOn };

  await axios.post(`${url}.json`, task);
}
