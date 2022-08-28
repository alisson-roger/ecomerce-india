import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../state/AuthContext';
import Auth from './Auth';
import Modal from './Modal';

const Layout = ({ children }) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(true);

  const {
    state: { isModalOpen, formType },
    dispatch,
  } = useContext(AuthContext);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <header className="w-full h-32 bg-gray-200 flex items-center justify-end space-x-4 px-4">
          <h1 className="mr-auto text-2xl font-light">
            E-Commerce web app with Next.js
          </h1>
          <div className="">
            <button
              className="px-4 py-2 text-lg bg-black hover:text-black hover:bg-white border-black border text-white rounded"
              onClick={() =>
                dispatch({ type: 'OPEN_AUTH_MODAL', formType: 'signup' })
              }
            >
              Sign up
            </button>
          </div>
          <div className="">
            <button
              className="px-4 py-2 text-lg bg-black hover:text-black hover:bg-white border-black border text-white rounded"
              onClick={() =>
                dispatch({ type: 'OPEN_AUTH_MODAL', formType: 'login' })
              }
            >
              Log In
            </button>
          </div>
          <div className="">
            <button
              className="px-4 py-2 text-lg bg-black hover:text-black hover:bg-white border-black border text-white rounded"
              onClick={() => router.push('/admin')}
            >
              Admin
            </button>
          </div>
        </header>
        <Modal
          isOpen={isModalOpen}
          closeModal={() => dispatch({ type: 'CLOSE_AUTH_MODAL' })}
          title="Sign up"
        >
          <Auth />
        </Modal>
        {children}
      </div>
    </>
  );
};

export default Layout;
