"use client";
import React, { useState } from 'react';
import { IoMdApps } from 'react-icons/io';
import ResponsiveSidebarModal from './ResponsiveSidebarModal';

const ResponsiveSidebar: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button className="fixed top-4 left-4" onClick={openModal}>
        <IoMdApps className="w-8 h-8" />
      </button>

      <ResponsiveSidebarModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
};

export default ResponsiveSidebar;
