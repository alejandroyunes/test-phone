import { FC, Dispatch, SetStateAction } from 'react'
import './phonebook-body.scss'
import { AiOutlineDelete } from 'react-icons/ai'
import { PhoneBookEntry } from '../../PhoneApp';

interface BodyProps {
  setRemoveModal: Dispatch<SetStateAction<boolean>>;
  phoneBook: PhoneBookEntry[];
  setContactToDelete: Dispatch<SetStateAction<string>>
}

export const PhoneBookBody: FC<BodyProps> = ({
  setRemoveModal,
  phoneBook,
  setContactToDelete
}) => {

  const handleDeleteContact = (e: string) => {
    setRemoveModal(true)
    setContactToDelete(e)
  }

  return (
    <div className='body-wrapper'>
      {phoneBook.length !== 0 ? (
        phoneBook.map((e, i) => (
          <div className='body-content' key={i}>
            <div className='info'>
              <h3>
                {e.name} {e.lastName}
              </h3>
              <h2>{e.phone}</h2>
            </div>
            <div
              data-testid="delete-svg"
              className='delete-svg'
              onClick={() => handleDeleteContact(e.id)}
            >
              <AiOutlineDelete />
            </div>
          </div>
        ))
      ) : (
        <div className='body-no-content'>
          <h3>no contacts</h3>
        </div>
      )}
    </div>
  )
}
