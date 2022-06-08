import TasksBluePrint from '../modules/tasks-functionality.js';
import newObj from '../modules/mock-local.js';

document.body.innerHTML = `
<div class="entry-line title-list">
  <p>Today's ToDo List</p>
  <button type="button" class="list-btn">
    <i class="fa-solid fa-arrows-rotate"></i>
  </button>
</div>
<div class="entry-line">
  <form id="add-task-form">
    <input class="input-new-task" required placeholder="Add to your list.." />
    <button type="submit" class="list-btn add-task-btn">
      <i class="fa-solid fa-plus"></i>
    </button>
  </form>
</div>
<div id="tasks-div">
</div>
<div class="entry-line clear-task-line">
  <button id="remove-completed-btn" type="button">Clear all completed</button>
</div>
`;

describe('add and remove', () => {
  global.localStorage = newObj;

  test('Add task', () => {
    const todoList = new TasksBluePrint();
    const newTodo = {
      id: '1',
      description: 'task1',
      completed: false,
      index: 1,
    };

    todoList.add(newTodo);
    expect(todoList.tasksArr).toHaveLength(1);

    // storage mocked data
    const storedData = JSON.parse(localStorage.getItem('tasks'));
    expect(storedData).not.toBe(null);
    expect(localStorage).toHaveLength(1);
    expect(storedData[0].description).toBe('task1');
  });

  test('remove task', () => {
    const todoList = new TasksBluePrint();
    const newTodo1 = {
      id: '2',
      description: 'task2',
      completed: false,
      index: 2,
    };
    todoList.add(newTodo1);
    todoList.remove(newTodo1.id);
    expect(todoList.tasksArr[0].description).toBe('task1');
    expect(todoList.tasksArr).toHaveLength(1);
  });
});

describe('Edit test', () => {
  test('Editing', () => {
    const todoList = new TasksBluePrint();
    const newTodo2 = {
      id: '2',
      description: 'task33',
      completed: false,
      index: 2,
    };
    todoList.add(newTodo2);
    todoList.update(newTodo2.id, 'asd');
    expect(todoList.tasksArr[1].description).toBe('asd');
    expect(todoList.tasksArr).toHaveLength(2);
  });
});

describe('complete test', () => {
  test(' updating an item completed status', () => {
    const todoList = new TasksBluePrint();
    const newTodo3 = {
      id: '3',
      descrition: 'task5',
      completed: false,
      index: 3,
    };
    todoList.add(newTodo3);
    todoList.changeStatus(newTodo3.id, true);
    expect(todoList.tasksArr[2].completed).toBeTruthy();
    expect(todoList.tasksArr).toHaveLength(3);
  });
});

describe('Clear all completed', () => {
  test('Clear completed items', () => {
    const todoList = new TasksBluePrint();
    todoList.removeCompletedTasks();
    expect(todoList.tasksArr).toHaveLength(2);
    expect(todoList.tasksArr[1].completed).toBeFalsy();
  });
});
