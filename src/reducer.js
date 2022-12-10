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

    // if (action.type === "NAME-ERR") {
    //     return {
    //         ...state,
    //         msg: true,
    //         msgContent: 'Name cannot contain numbers'
    //     }
    // }

    if (action.type === "CN-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'less than 16 numbers'
        }
    }

    if (action.type === "CHN-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'Invalid name'
        }
    }

    if (action.type === "EXPR-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'Card Expired'
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