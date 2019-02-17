class List {
  constructor(store, index) {
    this.store = store;
    this.index = index;
    this.container = null;

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.onClickAddTask = this.onClickAddTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    return this.init();
  }

  onClickAddTask() {
    const state = this.store.getState();
    const { taskStates } = state;
    const currentState = taskStates[this.index]
    const emptyForm = {
      description: '',
      state: currentState.id,
      assignee: '',
      dueDate: ''
    } 
    const taskModal = new TaskModal(this.store, {
      form: emptyForm,
      onSubmit: (data) => {
        this.store.dispatch({ type: ActionTypes.ADD_TASK, payload: data });
        const modal = this.container.querySelector('.outer-modal')
        console.log(modal);        
        this.container.removeChild(modal);
      },
      onCancel: () => {
        const modal = this.container.querySelector('.outer-modal')
        console.log(modal);
        this.container.removeChild(modal);
      }
    })
    this.container.appendChild(taskModal);
  }

  renderTasks (parent) {
    // This method can be improved as right now this just throws away
    // the built up innerHTML
    parent.innerHTML = ``;
    const state = this.store.getState();
    const { taskStates } = state;
    const currentState = taskStates[this.index]
    const tasksByState = selectors.tasksByState(this.store.getState(), currentState.id)
    const taskCards = tasksByState.map(task => new TaskCard({
      task,
      onClick: () => {
        const form = task;
        const taskModal = new TaskModal(this.store, {
          form: form,
          onSubmit: (data) => {
            this.store.dispatch({ type: ActionTypes.EDIT_TASK, payload: data });
            const modal = this.container.querySelector('.outer-modal')
            this.container.removeChild(modal);
          },
          onCancel: () => {
            const modal = this.container.querySelector('.outer-modal')
            this.container.removeChild(modal);
          }
        });
        this.container.appendChild(taskModal);
      },
      onDelete: (id) => this.store.dispatch({
        type: ActionTypes.DELETE_TASK,
        payload: {
          id
        }
      })
    }))
    taskCards.forEach(taskCard => parent.appendChild(taskCard))
  }

  init () {
    // All the setup for a component needs to be done here. (gets called only once)
    this.container = document.createElement('div')
    this.container.classList = 'list'
    const state = this.store.getState();
    const { taskStates } = state;
    const currentState = taskStates[this.index]
    const tasksByState = selectors.tasksByState(this.store.getState(), currentState.id)
    const taskCards = tasksByState.map(task => new TaskCard({task, onClick: console.log}))
    this.container.innerHTML = `
      <div class="list-header">${currentState.name}</div>
      <div class="list-content"></div>
      <div class="list-footer" data-fn="add-task">
        + Add Another Task
      </div>
    `;
    const addTaskButton = this.container.querySelector('[data-fn="add-task"]')
    addTaskButton.addEventListener('click', this.onClickAddTask)
    const tasks = this.container.querySelector('.list-content')
    this.renderTasks(tasks)
    this.store.subscribe(this.update)
    return this.container;

  }
  update () {
    console.log('lets update');
    this.renderTasks(this.container.querySelector('.list-content'))
    // What to do when store changes
  }

}
