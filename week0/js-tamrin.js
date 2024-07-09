class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {

    constructor() {
        this.head = null;
    }

    insert(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    insertLast(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    at(n) {
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === n) {
                return current;
            }
            count++;
            current = current.next;
        }
        return null; // If n is out of bounds
    }

    join(separator = ',') {
        let result = '';
        let current = this.head;
        while (current) {
            result += current.value;
            if (current.next) {
                result += separator;
            }
            current = current.next;
        }
        return result;
    }

    map(fn) {
        const newList = new LinkedList();
        let current = this.head;
        while (current) {
            newList.insertLast(fn(current.value));
            current = current.next;
        }
        return newList;
    }

    filter(fn) {
        const newList = new LinkedList();
        let current = this.head;
        while (current) {
            if (fn(current.value)) {
                newList.insertLast(current.value);
            }
            current = current.next;
        }
        return newList;
    }

    find(fn) {
        let current = this.head;
        while (current) {
            if (fn(current.value)) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}

