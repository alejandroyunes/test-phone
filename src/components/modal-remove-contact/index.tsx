import { Dispatch, FC, SetStateAction } from 'react'
import './modal-remove.scss'
import { AiFillCloseCircle } from 'react-icons/ai'

export interface RemoveProps {
  setRemoveModal: Dispatch<SetStateAction<boolean>>
  contactToDelete: string;
  handleDeleteEntry: (id: string) => void
}

export const RemoveContactModal: FC<RemoveProps> = ({
  setRemoveModal,
  contactToDelete,
  handleDeleteEntry
}) => {

  const handleCancelRemoveContact = () => {
    setRemoveModal(false)
    handleDeleteEntry(contactToDelete)
  }

  const onClose = () => {
    setRemoveModal(false)
  }

  return (
    <div className='modal-remove-wrapper'>
      <div className='modal-overview'>
        <div className='modal-container'>
          <div className='close-modal' data-testid="close-button" onClick={onClose}>
            <AiFillCloseCircle />
          </div>
          <div className='cancel-modal'>
            <div>
              <h4>Are you sure you want to delete the contact?</h4>
            </div>
            <div className='cancel-buttons'>
              <button data-testid="no-button" onClick={onClose}>No</button>
              <button data-testid="yes-button" onClick={handleCancelRemoveContact}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
