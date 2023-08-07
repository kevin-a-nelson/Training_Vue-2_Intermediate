

Vue.component('todo-item', {
    props: ['todo'],
    template: `
    <li>
        <p>
            {{ todo.text }}
        </p>
        <div className="editButtons">
            <button className="editButton" style="margin-right: 5px" @click="$emit('edit')">Edit</button>
            <button @click="$emit('remove')">Delete</button>
        </div>
      </li >
    `,
    methods: {
    }
});

new Vue({
    el: '#app',
    data() {
        return {
            newTodo: '',
            newTodos: [{ id: 0, text: "Hello World" }],
            todoToEditId: -1,
            newId: 0,
            filterText: ''
        };
    },
    watch: {
        newTodo(newVal) {
            if (newVal.toLowerCase() === "clear") {
                this.newTodos = [];
                this.newTodo = ""
            }
        }
    },
    computed: {
        totalTodos() {
            return this.newTodos.length;
        },
        filteredTodos() {
            if (!this.filterText) {
                return this.newTodos;
            }
            const filter = this.filterText.toLowerCase();
            return this.newTodos.filter(todo => todo.text.toLowerCase().includes(filter));
        },
        filteredTotal() {
            return this.filteredTodos.length;
        }
    },
    methods: {
        addTodo() {

            this.newId += 1
            if (this.newTodo.trim() !== '') {
                this.newTodos.push({ id: this.newId, text: this.newTodo.trim() });
                this.newTodo = '';
            }
        },
        editTodo(todoId) {
            this.todoToEditId = todoId
        },
        saveTodo(event) {
            const newTodoText = event.target[0].value

            if (newTodoText == "") {
                this.todoToEditId = -1
                return
            }

            for (let i = 0; i < this.newTodos.length; i++) {
                if (this.newTodos[i].id != this.todoToEditId) {
                    continue
                }
                this.newTodos[i].text = newTodoText
                this.todoToEditId = -1
                return
            }
        },
        cancelEdit() {
            this.todoToEditId = -1
        },
        removeTodo(idToDelete) {
            for (let i = 0; i < this.newTodos.length; i++) {
                if (this.newTodos[i].id != idToDelete) {
                    continue
                }
                this.newTodos.splice(i, 1);
                return
            }
        },
        deleteNewTodo(index) {
            this.newTodos.splice(index, 1);
        },
        toggleEditMode(index) {
            const todo = this.newTodos[index];
            todo.editing = !todo.editing;
        }
    },
});
