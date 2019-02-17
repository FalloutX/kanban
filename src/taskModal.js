class TaskModal {
  constructor(store, { form, onSubmit, onCancel }) {
    this.store = store;
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;
    this.state = Object.assign({}, form);
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.clickCancel = this.clickCancel.bind(this);
    return this.init();
  }
  onChange (e) {
    const {name, value} = e.target;
    this.state = Object.assign({}, this.state, {
      [name]: value
    });
  }
  clickSave() {
    console.log(this.state);
    this.onSubmit(this.state)
  }
  clickCancel() {
    this.onCancel()
  }
  init () {
    this.container = document.createElement('div')
    this.container.classList = 'outer-modal';
    const state = store.getState();
    const { members, taskStates } = state;
    console.log(this.state);

    this.container.innerHTML = `
      <div class="inner-modal">
        <div class="form-horizontal">
        <div class="form-group">
          <div class="col-12 col-sm-12">
            <input class="form-input" type="text" name="description" placeholder="Describe the Task">
          </div>
        </div>

        <div class="form-group">          
          <div class="col-3 col-sm-12">
            <label class="form-label" for="state">Task Status</label>
          </div>
          <div class="col-9 col-sm-12">
            <select class="form-select" name="state">
              ${
                taskStates.map(state => `<option value="${state.id}">${state.name}</option>`)
                  .join('')
              }
            </select>
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for="assignee">Assignee</label>
          </div>
          <div class="col-9 col-sm-12">
            <select class="form-select" name="assignee">
            <option>Select Assignee</option>
            ${
              Object.keys(members)
                .map(member => `<option value="${member}">${members[member].name}</option>`)
                .join('')
            }
            </select>
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for="dueDate">Due Date</label>
          </div>
          <div class="col-9 col-sm-12">
            <input class="form-input" type="date" name="dueDate" placeholder="Describe the Task">
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
          </div>
          <div class="col-9 col-sm-12">
            <button class="btn btn-primary" data-fn="submit">Save</button>
            <button class="btn btn-cancel" data-fn="cancel">Cancel</button>
          </div>
        </div>
        </div>
      </div>
    `
    const fields = ['description', 'dueDate', 'assignee', 'state']
    fields.forEach(f => {
      this.container.querySelector(`[name="${f}"]`).addEventListener('change', this.onChange)
      this.container.querySelector(`[name="${f}"]`).value = this.state[f];
    });

    this.container.querySelector(`[data-fn="submit"]`).addEventListener('click', this.clickSave)
    this.container.querySelector(`[data-fn="cancel"]`).addEventListener('click', this.clickCancel)

    return this.container
  }
  update () {

  }
}