import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoMdApps, IoIosLogOut, IoIosCheckboxOutline, IoIosSquareOutline } from 'react-icons/io';
import { FaChartLine } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { logout, isAuthenticatedUser } from '../api/api';

interface ResponsiveSidebarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ResponsiveSidebarModal: React.FC<ResponsiveSidebarModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await isAuthenticatedUser();
        setUser(true);
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();
  }, []);

  if (!user) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="sidebar min-h-screen flex flex-col justify-between border-gray-500 bg-[#f7d9c4] text-gray-700 m-5 p-5 rounded-lg border-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="logo p-4">
          <h3 className="text-3xl font-bold whitespace-nowrap">
            <a href="/" className="hover:text-blue-500 text-gray-700">
              MY TASKS
            </a>
          </h3>
        </div>

        <div className="links flex flex-col justify-center">
          <a
            href="/login"
            className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2"
          >
            <IoMdApps className="w-6 h-6 text-gray-700" />
            Login
          </a>
          <a
            href="/register"
            className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2 whitespace-nowrap"
          >
            <IoIosCheckboxOutline className="w-6 h-6 text-gray-700 " />
            Register
          </a>
        </div>
      </Modal>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Responsive Sidebar Modal">
      <div className="flex flex-col justify-center items-center">
        {user ? (
          <>
            <a href="/allTasks" onClick={onRequestClose} className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2">
              <IoMdApps className="w-6 h-6" />
              All tasks
            </a>
            <a href="/completedTasks" onClick={onRequestClose} className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2">
              <IoIosCheckboxOutline className="w-6 h-6 text-gray-700" />
              Completed tasks
            </a>
            <a href="/incompletedTasks" onClick={onRequestClose} className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2">
              <IoIosSquareOutline className="w-6 h-6 text-gray-700" />
              Incompleted tasks
            </a>
            <a href="/dashboard" onClick={onRequestClose} className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2">
              <FaChartLine className="w-6 h-6 text-gray-700" />
              Dashboard
            </a>
            <button onClick={handleLogout} className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2">
              LogOut <IoIosLogOut className="w-6 h-6 text-gray-500" />
            </button>
          </>
        ) : (
          <>
            <a href="/login" onClick={onRequestClose} className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2">
              <IoMdApps className="w-6 h-6" />
              Login
            </a>
            <a href="/signup" onClick={onRequestClose} className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2">
              <IoMdApps className="w-6 h-6" />
              Signup
            </a>
          </>
        )}
      </div>
    </Modal>
  );
}

export default ResponsiveSidebarModal;
