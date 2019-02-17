class TaskModal {
  constructor(store, { form, onSubmit, onCancel }) {
    this.store = store;
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;
    this.fields = ['description', 'dueDate', 'assignee', 'state']
    this.state = Object.assign({}, form);
    this.isEditing = form.description ? {}: this.fields.reduce((acc, current) => {acc[current] = true ; return acc;}, {});
    
    
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.clickCancel = this.clickCancel.bind(this);
    this.onDblClickField = this.onDblClickField.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.cleanEventListeners = this.cleanEventListeners.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);
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
  onDblClickField (event) {
    console.log('here');
    const target = event.target;
    const fieldName = target.getAttribute('data-attr')
    this.cleanEventListeners();
    this.isEditing[fieldName] = true;
    this.update();
  }
  buildForm () {
    const state = store.getState();
    const { members, taskStates } = state;
    const isEditingAnyFields = Object.values(this.isEditing).filter(o => o).length > 0;
    const currentAssignee = this.state.assignee
    const assigneeName = currentAssignee && members[currentAssignee].name
    const currentState = taskStates.find(task => task.id === this.state.state);
    const currentStateName = currentState && currentState.name;

    return `
    <div class="inner-modal">
      <div class="form-horizontal">
        <div class="form-group">
          <div class="col-12 col-sm-12">
            ${
              this.isEditing['description'] ?
              `<input class="form-input" type="text" name="description" placeholder="Describe the Task">`:
              `<h3 data-attr="description">${this.state.description}</h3>`
            }
          </div>
        </div>

        <div class="form-group">          
          <div class="col-3 col-sm-12">
            <label class="form-label" for="state">Task Status</label>
          </div>
          <div class="col-9 col-sm-12">
            ${
              this.isEditing['state'] ?
              `<select class="form-select" name="state">
                ${
                  taskStates.map(state => `<option value="${state.id}">${state.name}</option>`)
                    .join('')
                }
              </select>`:
              `<div data-attr="state" class="form-info">${currentStateName}</div>`
            }
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for="assignee">Assignee</label>
          </div>
          <div class="col-9 col-sm-12">
            ${
              this.isEditing['assignee'] ?
              `<select class="form-select" name="assignee">
                <option>Select Assignee</option>
                ${
                  Object.keys(members)
                    .map(member => `<option value="${member}">${members[member].name}</option>`)
                    .join('')
                }
              </select>` :
              `<div data-attr="assignee" class="form-info">${assigneeName}</div>`
            }
          </div>
        </div>

        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for="dueDate">Due Date</label>
          </div>
          <div class="col-9 col-sm-12">
            ${
              this.isEditing['dueDate'] ?
              `<input class="form-input" type="date" name="dueDate">`:
              `<div data-attr="dueDate" class="form-info">${this.state.dueDate}</div>`
            }
          </div>
        </div>
        ${
          isEditingAnyFields ?
          `<div class="form-group">
            <div class="col-3 col-sm-12">
            </div>
            <div class="col-9 col-sm-12">
              <button class="btn btn-primary" data-fn="submit">Save</button>
              <button class="btn btn-cancel" data-fn="cancel">Cancel</button>
            </div>
          </div>`:
          ``
        }

      </div>
    </div>`
  }
  addEventListeners () {
    this.fields.forEach(f => {
      if (this.isEditing[f]) {
        this.container.querySelector(`[name="${f}"]`).addEventListener('change', this.onChange)
        this.container.querySelector(`[name="${f}"]`).value = this.state[f];
      } else {
        const toBeEditedable = this.container.querySelector(`[data-attr="${f}"]`);
        console.log('athre', toBeEditedable)
        toBeEditedable && toBeEditedable.addEventListener('dblclick', this.onDblClickField)
      }
    });
    const submitButton = this.container.querySelector(`[data-fn="submit"]`)
    submitButton && submitButton.addEventListener('click', this.clickSave)
    
    const cancelButton = this.container.querySelector(`[data-fn="cancel"]`)
    cancelButton && cancelButton.addEventListener('click', this.clickCancel)
  }
  cleanEventListeners () {
    this.fields.forEach(f => {
      if (this.isEditing[f]) {
        this.container.querySelector(`[name="${f}"]`).removeEventListener('change', this.onChange)
      } else {
        const toBeEditedable = this.container.querySelector(`[data-attr="${f}"]`);
        toBeEditedable && toBeEditedable.removeEventListener('dblclick', this.onDblClickField)
      }
    });
    const submitButton = this.container.querySelector(`[data-fn="submit"]`)
    submitButton && submitButton.removeEventListener('click', this.clickSave)
    
    const cancelButton = this.container.querySelector(`[data-fn="cancel"]`)
    cancelButton && cancelButton.removeEventListener('click', this.clickCancel)
  }
  init () {
    this.container = document.createElement('div')
    this.container.classList = 'outer-modal';

    this.container.innerHTML = this.buildForm();
    this.addEventListeners();
    return this.container
  }
  update () {
    this.container.innerHTML = ``
    this.container.innerHTML = this.buildForm();
    this.addEventListeners();
  }
}