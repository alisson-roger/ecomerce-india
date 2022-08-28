import React, { useState } from 'react';

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(initialValues);
  };

  return {
    form,
    handleChange,
    resetForm,
  };
};

export default useForm;
