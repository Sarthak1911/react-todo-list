export let todos = [
  {
    id: "1",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 1
  },
  {
    id: "2",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 1
  },
  {
    id: "3",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 1
  },
  {
    id: "4",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 1
  },
  {
    id: "5",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 1
  },
  {
    id: "6",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 1
  },
  {
    id: "7",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 2
  },
  {
    id: "8",
    createdBy: "Jon Doe",
    createdOn: "2019-01-09",
    isDone: false,
    title: "XYZ",
    priority: 3
  }
];

export function getAllTasks() {
  //Use createdBy to filter the tasks
  return todos;
}

export function getTask(id) {
  //Use createdBy to filter the tasks
  return todos.find(todo => todo.id === id);
}

export function deleteTask(id) {
  //Use createdBy to filter the tasks
  todos = todos.filter(todo => todo.id !== id);
  return getAllTasks();
}

export function updateTask(task) {
  //Find the index of the task
  const index = todos.findIndex(todo => todo.id === task.id);
  //Update the task
  if (index >= 0) todos[index] = task;
}

export function createTask(task) {
  //Generate id
  const id = Math.ceil(Math.random() * 10) + "_id";

  //Check if already present
  const isPresent = getTask(id);

  if (isPresent) {
    console.log("Already present");
    return;
  }

  //Generate current date
  const createdOn = new Date();

  //Update task with id and date
  task = { ...task, id, createdOn };

  //Add to list
  todos.push(task);
}
