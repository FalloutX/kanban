class Store {
  constructor(initialData, reducer, subscribers, storeKey) {
    let storedData = null
    try {
      storedData = JSON.parse(localStorage.getItem(storeKey))
    } catch (e) {

    }
    this.state = storedData || initialData
    this.storeKey = storeKey
    this.reducer = reducer
    this.subscribers = subscribers
    this.getState = this.getState.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  getState () {
    return this.state
  }
  dispatch({ type, payload }) {
    this.state = this.reducer(this.state, { type, payload })
    localStorage.setItem(this.storeKey, JSON.stringify(this.state))
    this.subscribers.forEach(
      subscriber => subscriber(this.state)
    )
  }
  subscribe(fn) {
    this.subscribers.push(fn)
  }
}