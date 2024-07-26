import { log } from "node:console";
import { Expense } from "../models/Expense/dto/expense.dto";
import { Group } from "../models/Group/dto/group.dto";
import { User } from "../models/User/dto/user.dto";
import * as fs from 'node:fs';
import * as path from 'path';

export interface IDatabase {
    create<T>(data: T): void;
    read<T>(): T[];
    update<T>(id: string, newData: T): void;
    delete<T>(id: string): void;
}

export class FileDatabase implements IDatabase {
    protected filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    protected parseFileContent<T>(fileContent: string): T[] {
        try {
            return JSON.parse(fileContent) as T[];
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
        }
    }

    create<T>(data: T): void {
        console.log(data)
        const fileContent = fs.existsSync(this.filename) ? fs.readFileSync(this.filename, 'utf-8') : '[]';
        console.log(fileContent)
        const jsonData = this.parseFileContent<T>(fileContent);
        jsonData.push(data);
        fs.writeFileSync(this.filename, JSON.stringify(jsonData, null, 2));
    }

    read<T>(): T[] {
        if (fs.existsSync(this.filename)) {
            const fileContent = fs.readFileSync(this.filename, 'utf-8');
            return this.parseFileContent<T>(fileContent);
        }
        return [];
    }

    update<T>(id: string, newData: T): void {
        if (fs.existsSync(this.filename)) {
            const fileContent = fs.readFileSync(this.filename, 'utf-8');
            const jsonData = this.parseFileContent<{ id: string }>(fileContent);
            console.log(jsonData)
            const index = jsonData.findIndex(item => item.id === id);

            console.log(index)
            if (index !== -1) {

                jsonData[index] = { ...jsonData[index], ...newData };
                console.log(jsonData)
                fs.writeFileSync(this.filename, JSON.stringify(jsonData, null, 2));
            } else {
                console.error(`Item with id ${id} not found.`);
            }
        } else {
            console.error(`File ${this.filename} not found.`);
        }
    }

    delete<T>(id: string): void {
        if (fs.existsSync(this.filename)) {
            const fileContent = fs.readFileSync(this.filename, 'utf-8');
            let jsonData = this.parseFileContent<{ id: string }>(fileContent);
            jsonData = jsonData.filter(item => item.id !== id);
            fs.writeFileSync(this.filename, JSON.stringify(jsonData, null, 2));
        } else {
            console.error(`File ${this.filename} not found.`);
        }
    }

    
}

export class UserDataBase extends FileDatabase {
    private expenseFile: string;
    private groupFile: string;

    constructor(userFile: string, expenseFile: string, groupFile: string) {
        super(userFile);
        this.expenseFile = expenseFile;
        this.groupFile = groupFile;
    }

    loadUsersWithExpensesAndGroups(): User[] {
        const users: User[] = this.read<User>();
        const expenses: Expense[] = (new FileDatabase(this.expenseFile)).read<Expense>();
        const groups: Group[] = (new FileDatabase(this.groupFile)).read<Group>();
        
        users.forEach(user => {
            user.expenses = expenses.filter(expense => expense.user_id === user.user_id);
            user.groups = groups.filter(group => group.people.some(person => person.user_id === user.user_id));
        });

        return users;
    }

    updateUser<T>(id: string, newData: T): void {
        if (fs.existsSync(this.filename)) {
            const fileContent = fs.readFileSync(this.filename, 'utf-8');
            const jsonData:User[] = this.parseFileContent(fileContent);
            console.log(jsonData)
            const index = jsonData.findIndex(item => item.user_id === id);

            console.log(index)
            if (index !== -1) {

                jsonData[index] = { ...jsonData[index], ...newData };
                console.log(jsonData)
                fs.writeFileSync(this.filename, JSON.stringify(jsonData, null, 2));
            } else {
                console.error(`Item with id ${id} not found.`);
            }
        } else {
            console.error(`File ${this.filename} not found.`);
        }
    }

}

export class GroupDataBase extends FileDatabase {
    private expenseFile: string;
    private userFile: string;

    constructor(groupFile: string, expenseFile: string, userFile: string) {
        super(groupFile);
        this.expenseFile = expenseFile;
        this.userFile = userFile;
    }

    loadGroupsWithExpensesAndUsers(): Group[] {
        const groups: Group[] = this.read<Group>();
        const expenses: Expense[] = (new FileDatabase(this.expenseFile)).read<Expense>();
        const users: User[] = (new FileDatabase(this.userFile)).read<User>();

        groups.forEach(group => {
            group.expenses = expenses.filter(expense => expense.group_id === group.group_id);
            group.people = users.filter(user => user.groups.some(g => g.group_id === group.group_id));
            group.people.forEach(user => {
                user.expenses = expenses.filter(expense => expense.user_id === user.user_id);
            });
        });

        return groups;
    }
}
