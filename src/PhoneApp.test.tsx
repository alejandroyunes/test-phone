import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import PhoneApp, { PhoneBookEntry } from './PhoneApp'
import { PhoneBookHeader } from './components/phonebook-header';
import { PhoneBookBody } from './components/phonebook-body';
import { AddContactModal } from './components/modal-add-contact';
import { RemoveContactModal, RemoveProps } from './components/modal-remove-contact'


describe('PhoneApp', () => {
  test('should render main component', () => {
    const { container } = render(<PhoneApp />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

test('renders component', () => {
  const { getByText, getByPlaceholderText } = render(
    <PhoneBookHeader
      setAddModal={jest.fn()}
      setSearchTerm={jest.fn()}
      searchTerm=""
    />
  );

  expect(getByText('Contacts')).toBeInTheDocument();
  expect(getByPlaceholderText('Search Contact')).toBeInTheDocument();

});

describe('PhoneBookBody', () => {
  const mockPhoneBook: PhoneBookEntry[] = [
    { id: '1', name: 'John', lastName: 'Doe', phone: '555-1234' },
    { id: '2', name: 'Jane', lastName: 'Doe', phone: '555-5678' },
  ];

  it('should render contact information', () => {
    render(
      <PhoneBookBody
        setRemoveModal={jest.fn()}
        phoneBook={mockPhoneBook}
        setContactToDelete={jest.fn()}
      />
    );

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByText(/555-1234/i)).toBeInTheDocument();
    expect(screen.getByText(/555-5678/i)).toBeInTheDocument();
  });

  it('should render no contacts message if phoneBook array is empty', () => {
    render(
      <PhoneBookBody
        setRemoveModal={jest.fn()}
        phoneBook={[]}
        setContactToDelete={jest.fn()}
      />
    );

    expect(screen.getByText(/no contacts/i)).toBeInTheDocument();
  });

  it('should call setRemoveModal and setContactToDelete when delete icon is clicked', () => {
    const mockSetRemoveModal = jest.fn();
    const mockSetContactToDelete = jest.fn();
    render(
      <PhoneBookBody
        setRemoveModal={mockSetRemoveModal}
        phoneBook={mockPhoneBook}
        setContactToDelete={mockSetContactToDelete}
      />
    );

    const deleteIcons = screen.getAllByTestId('delete-svg');
    expect(deleteIcons.length).toBe(2);

    userEvent.click(deleteIcons[0]);

    expect(mockSetRemoveModal).toHaveBeenCalledTimes(1);
    expect(mockSetRemoveModal).toHaveBeenCalledWith(true);
    expect(mockSetContactToDelete).toHaveBeenCalledTimes(1);
    expect(mockSetContactToDelete).toHaveBeenCalledWith('1');
  });
});

describe('AddContactModal', () => {
  const mockSetAddModal = jest.fn()
  const mockSetPhoneBook = jest.fn()
  const mockPhoneBook = [
    {
      id: '1',
      name: 'John',
      lastName: 'Doe',
      phone: '1234567890'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the modal correctly', () => {
    render(
      <AddContactModal
        setAddModal={mockSetAddModal}
        setPhoneBook={mockSetPhoneBook}
        phoneBook={mockPhoneBook}
      />
    )

    expect(screen.getByText('New Contact')).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    render(
      <AddContactModal
        setAddModal={mockSetAddModal}
        setPhoneBook={mockSetPhoneBook}
        phoneBook={mockPhoneBook}
      />
    )

    const closeButton = screen.getByTestId('close-modal')
    fireEvent.click(closeButton)

    expect(mockSetAddModal).toHaveBeenCalledWith(false)
  })
})


describe('RemoveContactModal', () => {
  const setRemoveModal = jest.fn()
  const contactToDelete = '123'
  const handleDeleteEntry = jest.fn()
  const props: RemoveProps = {
    setRemoveModal,
    contactToDelete,
    handleDeleteEntry
  }

  it('should call the onClose function when the close button is clicked', () => {
    const { getByTestId } = render(<RemoveContactModal {...props} />)
    const closeButton = getByTestId('close-button')
    fireEvent.click(closeButton)
    expect(setRemoveModal).toHaveBeenCalledWith(false)
  })

  it('should call the handleCancelRemoveContact function when the Yes button is clicked', () => {
    const { getByTestId } = render(<RemoveContactModal {...props} />)
    const yesButton = getByTestId('yes-button')
    fireEvent.click(yesButton)
    expect(setRemoveModal).toHaveBeenCalledWith(false)
    expect(handleDeleteEntry).toHaveBeenCalledWith(contactToDelete)
  })

  it('should call the onClose function when the No button is clicked', () => {
    const { getByTestId } = render(<RemoveContactModal {...props} />)
    const noButton = getByTestId('no-button')
    fireEvent.click(noButton)
    expect(setRemoveModal).toHaveBeenCalledWith(false)
    expect(handleDeleteEntry).not.toHaveBeenCalled()
  })
})
