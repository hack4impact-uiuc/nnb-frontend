function set(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function get(key) {
  return JSON.parse(localStorage.getItem(key))
}

export default {
  set,
  get
}
