import validator from "validator"
import reducer from "./reducer"
import { useState, useReducer, useEffect } from 'react'


const defaultStates = {
  info: [],
  msg: false,
  msgContent: ''
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultStates)

  const [cvc, setCVC] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [exprDate, setExprDate] = useState('')

  const isValid = (cvc, cardNumber, exprDate) => {
    if ((cvc && cardNumber && exprDate) && (!cvc.match(/[a-z]/i) && !cardNumber.match(/[a-z]/i)) && (cvc.length === 3 && cardNumber.length === 16)) {
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

  const handleCardNumber = values => {
    const splitted = values.match(/.{1,4}/g) || []
    let output = ''
    splitted.forEach(split => {
      output += split
    })
    setCardNumber(output)
  }

  return (
    <main>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label>Card Number</label>
          <input type="text" value={cardNumber}
            onChange={(e) => handleCardNumber(e.target.value)} />
          {state.msg && <p className="text-xs"></p>}
        </div>
        <article className="expr-cvv">
          <div>
            <label>MM / YY</label>
            <input type="text" maxLength={7} value={exprDate}
              onChange={(e) => handleExprDate(e.target.value)} />
          </div>
          <div>
            <label>CVC</label>
            <input type="text" value={cvc}
              onChange={(e) => setCVC(e.target.value)} />
          </div>
        </article>
        <button type="submit" disabled={!isValid(cvc, cardNumber, exprDate)}
          className="btn focus:outline-none active:scale-105 hover:bg-blue-400 disabled:bg-[lightblue]">
          pay
        </button>
      </form>
    </main>
  )
}

export default App
