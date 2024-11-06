import React, { useState } from 'react';
import { axiosInstance } from './utils/axios';
import axios from 'axios';

const App = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/signup', form);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  return (
    <div className=' flex justify-center items-center h-[100vh]'>
      <form
        onSubmit={handleSubmit}
        className=' max-w-md flex flex-col gap-y-4 p-2 bg-gray-600'
      >
        <input
          type='text'
          placeholder='username'
          onChange={handleChange}
          id='username'
        />
        <input
          type='email'
          placeholder='email'
          onChange={handleChange}
          id='email'
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default App;
