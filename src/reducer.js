const reducer = (state, action) => {
    if (action.type === "STR-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'None must contain Letters'
        }
    }
    if (action.type === "LEN-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'CVV too Long'
        }
    }
    if (action.type === "CLOSE") {
        return {
            ...state,
            msg: false
        }
    }
}

export default reducer