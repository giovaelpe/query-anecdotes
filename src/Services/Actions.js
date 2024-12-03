export function setNotification(text) {
    return {
        type: "SET",
        payload: text
    }
}

export function clearNotification() {
    return {
        type: "CLEAR",
    }
}