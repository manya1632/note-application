import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';

const Home = () => {
  const [openEditAddModal, setOpenEditAddModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const openModal = (type, data) => {
    setOpenEditAddModal({
      isShown: true,
      type: 'add',
      data: null,
    });
  };

  const closeModal = () => {
    setOpenEditAddModal({
      isShown: false,
      type: 'add',
      data: null,
    });
  };

  return (
    <>
      <NavBar />
      <div className='mx-5'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard
            title="Manya Gupta"
            date="24th Aug 2023"
            content="Meeting at 11.30 am with Mr. Jones"
            tags="#meeting"
            isPinned="true"
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => openModal()}
      >
        <MdAdd className='text-[32px] text-white bg-transparent' />
      </button>

      <Modal
        isOpen={openEditAddModal.isShown}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        contentLabel="Add or Edit Note"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          noteData={openEditAddModal.data}
          onClose={closeModal}
          type={openEditAddModal.type}
        />
      </Modal>
    </>
  );
};

export default Home;
