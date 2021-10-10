const KEY = 'TODO_SOME_THING'

export function getStore() {
    let todo = JSON.parse(localStorage.getItem(KEY)) || []
    return todo
}

export function saveStore(value) {
    if (!value) {
        localStorage.removeItem(KEY)
        return
    }
    let todo = JSON.stringify(value)
    localStorage.setItem(KEY, todo)
}