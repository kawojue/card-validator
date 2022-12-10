import Modal from "./Modal"
import reducer from "./reducer"
import { useRef, useState, useReducer, useEffect } from 'react'


const defaultStates = {
  info: [],
  msg: false,
  msgContent: ''
}

function App() {
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

  const isValid = (cvc, cardNumber, exprDate, cardholderName) => {
    if ((cvc && cardNumber
      && exprDate && cardholderName)
      && (!cvc.match(/[a-z]/i)
        && !cardNumber.match(/[a-z]/i))
      && (cvc.length === 3
        && cardNumber.length === 16
        && cardholderName.length >= 5)) {
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

  const getExprDates = (values) => {
    let arr = []
    if (values.length === 7) {
      arr = values.split(' / ')
    }
    return {
      MM: arr[0],
      YY: arr[1]
    }
  }

  const formatCurrDate = (date) => {
    return parseInt(date.toString().split('').slice(2).join(''))
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
    if (cardholderName.match(/\d/)) {
      dispatch({ type: 'NAME-ERR' })
    }

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
      if (parseInt(getExprDates(exprDate).YY) < formatCurrDate(currYear)) {
        dispatch({ type: 'CARD-EXPR' })
      }

      if (parseInt(getExprDates(exprDate).YY) === formatCurrDate(currYear)) {
        if (parseInt(getExprDates(exprDate).MM) <= (currMonth + 1)) {
          dispatch({ type: 'CARD-EXPR' })
        }
      }

      if (parseInt(getExprDates(exprDate).MM) > 12) {
        dispatch({ type: 'EXPR-ERR' })
      }
    }
  }

  const closeModal = () => {
    dispatch({ type: 'CLOSE' })
  }

  useEffect(() => {
    handleModal(cardNumber, cardholderName, exprDate)
  }, [cardNumber, cardholderName, exprDate])

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

  return (
    <main>
      <form onSubmit={e => e.preventDefault()}>
        <div className="w-full h-5 mb-3">
          {state.msg && <Modal close={closeModal} msg={state.msgContent} />}
        </div>
        <div>
          <label>Card Number</label>
          <input type="text" value={cardNumber} maxLength={16}
            onChange={(e) => setCardNumber(manageInputType(e))} ref={cnRef} />
        </div>
        <article className="expr-cvv">
          <div>
            <label>MM / YY</label>
            <input type="text" maxLength={7} value={exprDate}
              onChange={(e) => handleExprDate(e.target.value)} ref={exprRef} />
          </div>
          <div>
            <label>CVC</label>
            <input type="text" value={cvc} maxLength={3}
              onChange={(e) => setCVC(manageInputType(e))} />
          </div>
        </article>
        <div className="mt-5">
          <label>Cardholder Name</label>
          <input type="text" value={cardholderName}
            onChange={(e) => setCardholderName(manageCHN(e))} ref={chnRef} />
        </div>
        <button type="submit" disabled={!isValid(cvc, cardNumber, exprDate, cardholderName)}
          onClick={() => pay()}
          className="btn focus:outline-none active:scale-[1.25] hover:bg-blue-400 disabled:bg-[lightblue]">
          pay
        </button>
      </form>
    </main>
  )
}

export default App
