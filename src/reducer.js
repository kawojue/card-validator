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

    if (action.type === "NAME-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'Name cannot contain numbers'
        }
    }

    if (action.type === "PAY") {
        return {
            ...state,
            info: action.payload,
            msg: true,
            msgContent: 'Checking..'
        }
    }

    if (action.type === "CLOSE") {
        return {
            ...state,
            msg: false,
            msgContent: ''
        }
    }
}

export default reducer