import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import useForm from '../../hooks/useForm';
import { AuthContext } from '../../state/AuthContext';
import { supabase } from '../../utils/supabaseClient';

const Auth = () => {
  const {
    state: { formType },
    dispatch,
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const { form, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formType === 'signup') {
      const { error: signUpError } = await supabase.auth.signUp(
        {
          email: form.email,
          password: form.password,
        },
        {
          data: {
            name: form.name,
          },
        }
      );

      if (signUpError) toast.error(signUpError.message);

      await supabase.from('user').insert([
        {
          name: form.name,
        },
      ]);
    } else {
      const { error } = await supabase.auth.signIn({
        email: form.email,
        password: form.password,
      });

      if (error) toast.error(error.message);
    }

    toast.success(
      `${
        formType === 'signup'
          ? 'You have successfull signed up!'
          : 'You have successfully signed in!'
      }`
    );
    resetForm();
    setLoading(false);
    dispatch({ type: 'CLOSE_AUTH_MODAL' });
  };

  return (
    <div className="my-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-1 justify-center "
      >
        {formType === 'signup' && (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name "
              className="outline-black border border-gray rounded placeholder:text-gray-400 p-2"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required={formType === 'signup'}
              disabled={loading}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="outline-black border border-gray rounded placeholder:text-gray-400 p-2"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="outline-black border border-gray rounded placeholder:text-gray-400 p-2"
          placeholder="Password"
          minLength={6}
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className={`py-0.5 h-full text-lg w-full bg-black hover:text-black hover:bg-white border-black border text-white rounded font-bold
           ${loading ? 'cursor-not-allowed animate-pulse' : 'cursor-pointer'}
          `}
          disabled={loading}
        >
          {loading
            ? 'Loading...'
            : formType === 'signup'
            ? 'Sign up'
            : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
