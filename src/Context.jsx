import reducer from './reducer'
import {
    createContext, useReducer,
    useRef, useState, useEffect
} from 'react'

const defaultStates = {
    info: [],
    msg: false,
    msgContent: '',
}

const Context = createContext({})

export const DataProvider = ({ children }) => {
    const cnRef = useRef(null)
    const chnRef = useRef(null)
    const exprRef = useRef(null)
    const [cvc, setCVC] = useState('')
    const [exprDate, setExprDate] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardholderName, setCardholderName] = useState('')

    const currMonth = new Date().getMonth()
    const currYear = new Date().getFullYear()
    const [state, dispatch] = useReducer(reducer, defaultStates)

    const getExprDates = (values) => {
        let arr = []
        if (values.length === 7) {
            arr = values.split(' / ')
        }
        return {
            MM: parseInt(arr[0]),
            YY: parseInt(arr[1])
        }
    }

    const formatCurrDate = (date) => {
        return parseInt(date.toString().split('').slice(2).join(''))
    }

    const manageCardExpr = (expr) => {
        let obj = { valid: true, type: '' }
        if (getExprDates(expr).YY < formatCurrDate(currYear)) {
            obj = { valid: false, type: 'CARD-EXPR' }
        }

        if (getExprDates(expr).YY === formatCurrDate(currYear)) {
            if (getExprDates(expr).MM <= (currMonth + 1)) {
                obj = { valid: false, type: 'CARD-EXPR' }

            }
        }

        if (getExprDates(expr).MM > 12) {
            obj = { valid: false, type: 'EXPR-ERR' }
        }
        return obj
    }

    const isValid = (cvc, cardNumber, exprDate, cardholderName) => {
        if ((cvc && cardNumber
            && exprDate && cardholderName)
            && (!cvc.match(/[a-z]/i)
                && !cardNumber.match(/[a-z]/i))
            && (cvc.length === 3
                && cardNumber.length === 16
                && cardholderName.length >= 5
                && exprDate.length === 7) && manageCardExpr(exprDate).valid) {
            return true
        }
        return false
    }

    const handleExprDate = values => {
        let output = values
        if (values.length === 2) {
            output += ' / '
        }
        setExprDate(output)
    }

    const manageInputType = e => {
        let value = ''
        if (e.target.value.match(/^\d+$/)) {
            value += e.target.value
        }
        return value
    }

    const manageCHN = e => {
        let value = ''
        if (!e.target.value.match(/^\d+$/)) {
            value += e.target.value
        }
        return value
    }

    const handleModal = (cardNumber, cardholderName, exprDate) => {
        if (document.activeElement === cnRef.current) {
            if (cardNumber.length < 16) {
                dispatch({ type: 'CN-ERR' })
            }
        }

        if (document.activeElement === chnRef.current) {
            if (cardholderName.length < 5) {
                dispatch({ type: 'CHN-ERR' })
            }
        }

        if (document.activeElement === exprRef.current) {
            if (!manageCardExpr(exprDate).valid) {
                dispatch({ type: manageCardExpr(exprDate).type })
            }
        }
    }

    const closeModal = () => {
        dispatch({ type: 'CLOSE' })
    }

    const pay = () => {
        const newInfo = {
            cardNumber, cardholderName,
            cvc, exprDate: getExprDates(exprDate)
        }
        dispatch({ type: 'PAY', payload: newInfo })

        setCVC('')
        setExprDate('')
        setCardNumber('')
        setCardholderName('')
    }

    useEffect(() => {
        handleModal(cardNumber, cardholderName, exprDate)
    }, [cardNumber, cardholderName, exprDate])

    return (
        <Context.Provider value={{
            ...state, cvc, setCVC,
            exprDate, cnRef, chnRef,
            exprRef, cardNumber, isValid,
            cardholderName, setCardholderName,
            setCardNumber, handleExprDate, pay,
            manageCHN, manageInputType, closeModal
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context