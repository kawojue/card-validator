const reducer = (state, action) => {
    switch (action.type) {
        case "CN-ERR": {
            return {
                ...state,
                msg: true,
                msgContent: 'Card Number must be 16 Digits'
            }
        }
        case "CHN-ERR": {
            return {
                ...state,
                msg: true,
                msgContent: 'Name too short'
            }
        }
        case "CARD-EXPR": {
            return {
                ...state,
                msg: true,
                msgContent: 'Card Expired',
            }
        }
        case "EXPR-ERR": {
            return {
                ...state,
                msg: true,
                msgContent: 'Expiry Date is Invalid',
            }
        }
        case "PAY": {
            return {
                ...state,
                info: action.payload,
                msg: true,
                msgContent: 'Checking more Validation...'
            }
        }
        case "CLOSE": {
            return {
                ...state,
                msg: false,
                msgContent: ''
            }
        }
        default: {
            return state
        }
    }
}

export default reducer