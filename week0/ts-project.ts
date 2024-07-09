type Status = 'done' | 'not done';

interface ToDo {
    title: string;
    id: number;
    status: Status;
}

class ToDoList {
    private todos: ToDo[] = [];
    private nextId: number = 1;

    public getAllToDos(): ToDo[] {
        return this.todos;
    }

    public printAllToDos(): void {
        this.todos.forEach(todo => console.log(todo));
    }

    public add(title: string): void {
        const newTodo: ToDo = {
            id: this.nextId++,
            title: title,
            status: 'not done',
        };
        this.todos.push(newTodo);
    }

    public filterByStatus(status: Status): ToDo[] {
        return this.todos.filter((todo) => todo.status === status);
    }

    public filterByTitle(title: string): ToDo[] {
        return this.todos.filter((todo) => todo.title.includes(title));
    }

    public filterById(id: number): ToDo[] {
        return this.todos.filter((todo) => todo.id === id);
    }

    public removeTodo(id: number): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    public changeStatus(id: number, newStatus: Status): void {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.status = newStatus;
        }
    }

    public searchByTitle(title: string): ToDo[] {
        return this.todos.filter((todo) => todo.title.includes(title));
    }
}

const test: ToDoList = new ToDoList();
test.add('hello');
test.printAllToDos();