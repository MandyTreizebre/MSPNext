import { useEffect } from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import "../styles/modals.css"

const Modal = ({ open, onClose, message }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [open, onClose])

    if (!open) return null

  return (
    <div className={`modal-container ${open ? 'modal-open' : ''}`}> <FontAwesomeIcon icon={faCircleCheck} />{message}</div>
  )
}
export default Modal