import {v4 as uuidv4} from 'uuid';
console.log('Hello World!');
// do this to avoid typing the same type again and again,
// we can create a type for it
type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};

// <> contains what output is expected from the querySelector,
// in this case it is HTMLUListElement, HTMLFormElement and HTMLInputElement

const list = document.querySelector<HTMLUListElement>('#list');
const input = document.querySelector<HTMLInputElement>('#task-input');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;

const tasks: Task[] = [];

// both ways are correct, but the second one is more type-safe and recommended

form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // ? is used to check if the input is null or undefined,
    // if it is then it will not check for the value of the input
    // and will return undefined
    if (input?.value == '' || input?.value == null) return;

    // creating a new task with a defined type Task
    const task: Task = {
        id: uuidv4(),
        title: input.value,
        completed: false,
        createdAt: new Date(),
    };

    addListItem(task);
    input.value = '';
    tasks.push(task);
});

function addListItem(task: Task) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
    });

    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}
