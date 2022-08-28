import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../state/AuthContext';
import { supabase } from '../../utils/supabaseClient';
import Auth from './Auth';
import Modal from './Modal';

const Layout = ({ children }) => {
  const router = useRouter();

  const {
    state: { isModalOpen, formType, session },
    dispatch,
  } = useContext(AuthContext);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <header className="w-full h-32 bg-gray-200 flex items-center justify-end space-x-4 px-4">
          <h1 className="mr-auto text-2xl font-light">
            E-Commerce web app with Next.js
          </h1>
          {!session && (
            <>
              <div className="">
                <button
                  className="px-4 py-2 text-lg text-white bg-black border border-black rounded hover:text-black hover:bg-white"
                  onClick={() =>
                    dispatch({
                      type: 'OPEN_AUTH_MODAL',
                      formType: 'signup',
                    })
                  }
                >
                  Sign up
                </button>
              </div>
              <div className="">
                <button
                  className="px-4 py-2 text-lg text-white bg-black border border-black rounded hover:text-black hover:bg-white"
                  onClick={() =>
                    dispatch({
                      type: 'OPEN_AUTH_MODAL',
                      formType: 'login',
                    })
                  }
                >
                  Log In
                </button>
              </div>
            </>
          )}
          {session && (
            <>
              <div className="">
                <button
                  className="px-4 py-2 text-lg text-white bg-black border border-black rounded hover:text-black hover:bg-white"
                  onClick={() => router.push('/admin')}
                >
                  Admin
                </button>
              </div>
              <div className="">
                <button
                  className="px-4 py-2 text-lg text-white bg-black border border-black rounded hover:text-black hover:bg-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
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
