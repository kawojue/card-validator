import Modal from './Modal'
import Context from './Context'
import { useContext } from 'react'

function App() {
  const {
    state, cvc, setCVC,
    exprDate, cnRef, chnRef,
    exprRef, cardNumber, isValid,
    cardholderName, setCardholderName,
    setCardNumber, handleExprDate, pay,
    manageCHN, manageInputType, closeModal
  } = useContext(Context)

  return (
    <main>
      <form onSubmit={e => e.preventDefault()}>
        <div className="w-full h-5 mb-3">
          {state.msg && <Modal close={closeModal} msg={state.msgContent} />}
        </div>
        <div>
          <label>Card Number</label>
          <input type="text" value={cardNumber}
            onChange={(e) => setCardNumber(manageInputType(e))}
            ref={cnRef} maxLength={16} />
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
          <input type="text" value={cardholderName} ref={chnRef}
            onChange={(e) => setCardholderName(manageCHN(e))} />
        </div>
        <button type="submit" onClick={() => pay()} className="btn"
          disabled={!isValid(cvc, cardNumber, exprDate, cardholderName)}>
          pay
        </button>
      </form>
    </main>
  )
}

export default App
