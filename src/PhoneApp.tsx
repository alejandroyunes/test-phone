import './app.scss'
import { PhoneBookHeader } from './components/phonebook-header'
import { PhoneBookBody } from './components/phonebook-body'
import { RemoveContactModal } from './components/modal-remove-contact'
import { AddContactModal } from './components/modal-add-contact'
import { FC, useState } from 'react'

export interface PhoneBookEntry {
  id: string;
  name: string;
  lastName: string;
  phone: string;
}

const PhoneApp: FC = () => {

  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isRemoveModalOpen, setRemoveModal] = useState<boolean>(false)

  const [phoneBook, setPhoneBook] = useState<PhoneBookEntry[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [contactToDelete, setContactToDelete] = useState<string>('')

  const filteredPhoneBook = phoneBook
    .filter(entry => {
      return (
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.phone.includes(searchTerm)
      )
    })
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      } else {
        if (a.lastName < b.lastName) {
          return -1
        } else if (a.lastName > b.lastName) {
          return 1
        } else {
          return 0
        }
      }
    })

  const handleDeleteEntry = (id: string) => {
    const updatedPhoneBook = phoneBook.filter(entry => entry.id !== id)
    setPhoneBook(updatedPhoneBook)
  }

  return (
    <>
      <PhoneBookHeader
        setAddModal={setAddModal}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <PhoneBookBody
        setRemoveModal={setRemoveModal}
        phoneBook={filteredPhoneBook}
        setContactToDelete={setContactToDelete}
      />

      {isAddModal && (
        <AddContactModal
          phoneBook={phoneBook}
          setAddModal={setAddModal}
          setPhoneBook={setPhoneBook}
        />
      )}
      {isRemoveModalOpen && (
        <RemoveContactModal
          setRemoveModal={setRemoveModal}
          contactToDelete={contactToDelete}
          handleDeleteEntry={handleDeleteEntry}
        />
      )}
    </>
  )
}

export default PhoneApp