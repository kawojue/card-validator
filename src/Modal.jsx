const Modal = ({ close, msg }) => {
    setTimeout(() => {
        close()
    }, 1800)

    return (
        <p className="err-msg">{msg}</p>
    )
}

export default Modal