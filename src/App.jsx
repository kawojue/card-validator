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
  const [cvc, setCVC] = useState('')
  const [exprDate, setExprDate] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardholderName, setCardholderName] = useState('')

  const currYear = new Date().getFullYear()
  const [state, dispatch] = useReducer(reducer, defaultStates)

  const isValid = (cvc, cardNumber, exprDate, cardholderName) => {
    if ((cvc && cardNumber
      && exprDate && cardholderName)
      && (!cvc.match(/[a-z]/i)
        && !cardNumber.match(/[a-z]/i))
      && ((cvc.length === 3 || cvc.length === 4)
        && cardNumber.length === 16 && cardholderName.length >= 5)) {
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
    let arr = ['00', '00']
    if (values.length === 7) {
      arr = values.split(' / ')
    }
    return {
      MM: arr[0],
      YY: arr[1]
    }
  }

  const formatCurrYear = (year) => {
    return parseInt(year.toString().split('').slice(2).join(''))
  }

  const handleModal = (cardNumber, cvc, cardholderName, exprDate) => {
    if (cardNumber.match(/[a-z]/i) || cvc.match(/[a-z]/i)) {
      dispatch({ type: 'STR-ERR' })
    }

    if (cvc.length > 4) {
      dispatch({ type: 'LEN-ERR' })
    }

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
  }

  const closeModal = () => {
    dispatch({ type: 'CLOSE' })
  }

  useEffect(() => {
    handleModal(cardNumber, cvc, cardholderName)
  }, [cardNumber, cvc, cardholderName, exprDate])

  const pay = () => {
    const newInfo = { cardNumber, cvc, cardholderName, exprDate }
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
            onChange={(e) => setCardNumber(e.target.value)} ref={cnRef} />
        </div>
        <article className="expr-cvv">
          <div>
            <label>MM / YY</label>
            <input type="text" maxLength={7} value={exprDate}
              onChange={(e) => handleExprDate(e.target.value)} />
          </div>
          <div>
            <label>CVC</label>
            <input type="text" value={cvc} maxLength={5}
              onChange={(e) => setCVC(e.target.value)} />
          </div>
        </article>
        <div className="mt-5">
          <label>Cardholder Name</label>
          <input type="text" value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)} ref={chnRef} />
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
