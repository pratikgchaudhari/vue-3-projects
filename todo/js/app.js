const TodoApp = {
    data() {
        return {
            todoCount: 0,
            todo: {
                id: 0,
                title: '',
                description: '',
                done: false
            },
            todos: {}
        }
    },
    mounted() {
        const vm = this;
        vm.initialize();
    },
    methods: {
        initialize() {
            const vm = this;
            vm.addTooltips(vm.findTooltippedElementsFromDOM());
        },
        addTooltips(tooltippedElements) {
            const vm = this;
            M.Tooltip.init(tooltippedElements, {});
        },
        findTooltippedElementsFromDOM() {
            const vm = this;
            return document.querySelectorAll('.tooltipped');
        },
        addTodo() {
            const vm = this;

            if (!vm.todo.title || vm.todo.title.trim() === '') {
                M.toast({ html: 'Need a title for this Todo!', classes: 'rounded' });
                return;
            }

            if (!vm.todo.description || vm.todo.description.trim() === '') {
                M.toast({ html: 'A small description would be nice!', classes: 'rounded' });
                return;
            }

            vm.todo.id = ++vm.todoCount;
            vm.todos[vm.todo.id] = vm.todo;

            vm.todo = { title: '', description: '' };
            vm.addTooltipsToDynamicElements();
        },
        markAsDone(id) {
            const vm = this;
            vm.todos[id].done = true;
            vm.addTooltipsToDynamicElements();
        },
        addTooltipsToDynamicElements() {
            const vm = this;

            setTimeout(function () {
                vm.addTooltips(vm.findTooltippedElementsFromDOM());
            }, 500);
        }
    }
}

Vue.createApp(TodoApp).mount('#todoapp');