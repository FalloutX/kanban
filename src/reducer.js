
const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
}

const initState = {
  tasks: [],
  members: {
    inderjit: {
      name: 'Inderjit',
    },
    james: {
      name: 'James',
    },
    arithmatican: {
      name: 'Remier',
    }
  },
  taskStates: [
    {
      name: 'Planned',
      id: 'PLANNED'
    },
    {
      name: 'Started',
      id: 'STARTED'
    },
    {
      name: 'Done',
      id: 'DONE'
    }
  ]
}

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.concat([{
          description: payload.description,
          assignee: payload.assignee,
          dueDate: payload.dueDate,
          state: payload.state,
          id: makeId(payload.description)
        }])
      });
    case ActionTypes.DELETE_TASK:
      const tasks = state.tasks;
      const { id } = payload;
      const newTasks = tasks.filter(task => task.id !== id);
      return Object.assign({}, state, {
        tasks: newTasks
      });
    case 'RESET':
      return 0;
    default:
      return state;
  }
}

const selectors = {
  tasksByState: (state, stateId) => {
    const { tasks } = state;
    return tasks.filter(task => task.state === stateId)
  }
}

function makeId (string) {
  return string.replace(/\s/g, '-').toLowerCase() + Date.now().toString();
}

