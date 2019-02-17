class Counter {
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
    this.container.innerHTML = `
      <button data-attr="add">+</button>
      <button data-attr="sub">-</button>
      <button data-attr="reset">Reset this Thing to 0</button>
      <h5 data-attr="value">${this.store.getState()}</h5>
    `;
    const addButton = this.container.querySelector("button[data-attr='add']")
    addButton.addEventListener('click', () => {
      this.store.dispatch({
        type: 'ADD',
      })
    })
    const subButton = this.container.querySelector("button[data-attr='sub']")
    subButton.addEventListener('click', () => {
      this.store.dispatch({
        type: 'SUB',
      })
    })
    const resetButton = this.container.querySelector("button[data-attr='reset']")
    resetButton.addEventListener('click', () => {
      this.store.dispatch({
        type: 'RESET',
      })
    })
    this.store.subscribe(this.update)
    return this.container;

  }
  update () {

    // What to do when store changes
    const value = this.container.querySelector("[data-attr='value']")
    value.innerHTML = this.store.getState();
  }

}
