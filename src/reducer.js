const reducer = (state, action) => {
    if (action.type === "CN-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'Card Number must be 16 Digits'
        }
    }

    if (action.type === "CHN-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'Name too short'
        }
    }

    if (action.type === "CARD-EXPR") {
        return {
            ...state,
            msg: true,
            msgContent: 'Card Expired'
        }
    }

    if (action.type === "EXPR-ERR") {
        return {
            ...state,
            msg: true,
            msgContent: 'Expiry Date is Invalid'
        }
    }

    if (action.type === "PAY") {
        return {
            ...state,
            info: action.payload,
            msg: true,
            msgContent: 'Checking more Validation...'
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