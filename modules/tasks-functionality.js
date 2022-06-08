export default class TasksBluePrint {
  constructor() {
    this.tasksArr = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  add(task) {
    this.tasksArr.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasksArr));
  }

  remove(id) {
    this.tasksArr.splice(id - 1, 1);
    this.tasksArr.forEach((task, index) => {
      task.index = index + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasksArr));
  }

  update(id, description) {
    this.tasksArr.forEach((item, arrIndex) => {
      if (item.index === parseInt(id, 10)) {
        this.tasksArr[arrIndex].description = description;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasksArr));
  }

  changeStatus(id, status) {
    this.tasksArr.forEach((item, arrIndex) => {
      if (item.index === parseInt(id, 10)) {
        this.tasksArr[arrIndex].completed = status;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasksArr));
  }

  funcSize() {
    return this.tasksArr.length;
  }

  removeCompletedTasks() {
    this.tasksArr = this.tasksArr.filter((task) => !task.completed);
    this.tasksArr.forEach((task, index) => {
      task.index = index + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasksArr));
  }
}
