class Header {
  constructor(store) {
    this.store = store;
    this.container = null;

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    return this.init();
  }

  init () {
    // All the setup for a component needs to be done here. (gets called only once)
    this.container = document.createElement('header')
    const {members} = this.store.getState();
    this.container.classList = 'navbar'
    this.container.innerHTML = `
      <section class="navbar-section">
        <a href="/" class="navbar-brand mr-2">Task Board</a>
      </section>
      <section class="navbar-section">
        <div> Members: </div>
        ${
          Object.values(members).map(member => {
            const memberNameFirstLetter = member.name.charAt(0).toUpperCase();
            return `
              <div class="task-assignee-avatar header-avatar" title="${member.name}">${memberNameFirstLetter}</div>
            `
          }).join('')
         }
      </section>
    `;

    this.store.subscribe(this.update)
    return this.container;

  }
  update () {
    // What to do when store changes

  }
  remove () {

  }

}
