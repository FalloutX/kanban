class TaskCard {
  constructor({task, onClick, onDelete}) {
    this.task = task;
    this.onClick = onClick;
    this.onDelete = onDelete;
    this.container = null;

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    return this.init();
  }
  onClickDelete () {
    this.onDelete(this.task.id)
  }

  renderTask (task) {
    const { description, dueDate, assignee } = task
    const firstLetter = assignee && assignee.charAt(0).toUpperCase();
    return `
      <div class="task-desc">
        <div class="task-desc-title">
          ${description}
        </div>
        <div class="task-del" title="Delete Task" data-fn="delete">
          X
        </div>
      </div>
      <div class="task-due">
        Due: ${dueDate}
      </div>
      ${
        assignee ?
        `
        <div class="task-assignee">
          <div class="task-assignee-name">
            ${assignee}
          </div>
          <div class="task-assignee-avatar">
            ${firstLetter}
          </div>
        </div>
        ` :
        ''
      }

    `
  }

  init () {
    // All the setup for a component needs to be done here. (gets called only once)
    this.container = document.createElement('div')
    this.container.classList = 'task'
    this.container.setAttribute('data-key', this.task.id)
    this.container.innerHTML = this.renderTask(this.task);
    this.container.addEventListener('click', this.onClick);
    this.container.querySelector('[data-fn="delete"]').addEventListener('click', this.onClickDelete);

    return this.container;

  }
  update ({ task }) {
    this.task = task || this.task
    this.container.innerHTML = this.renderTask(this.task);
  }

}
