class Board {
  constructor(store) {
    this.store = store;
    this.container = null;

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    return this.init();
  }

  init () {
    // All the setup for a component needs to be done here. (gets called only once)
    this.container = document.createElement('div')
    this.container.classList = 'container board'
    const state = this.store.getState();
    const { taskStates } = state;
    const lists = taskStates.map((state, index) => new List(store, index))
    lists.forEach(list => {
      this.container.appendChild(list)
    })
    this.store.subscribe(this.update)
    return this.container;

  }
  update () {

    // What to do when store changes
  }

}
