function App() {

  return (
    <main>
      <form>
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" />
        </div>
        <article className="expr-cvv">
          <div className="form-group">
            <label>MM / YY</label>
            <input type="text" maxLength={7} />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input type="text" />
          </div>
        </article>
        <button type="submit" disabled={false}
          className="btn focus:outline-none active:scale-105 hover:bg-blue-400 disabled:bg-[lightblue]">
          pay
        </button>
      </form>
    </main>
  )
}

export default App
