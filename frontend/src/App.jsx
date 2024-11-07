import React, { useEffect, useState } from 'react';
import { axiosInstance } from './utils/axios';
import { Link, useParams } from 'react-router-dom';
const App = () => {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const params = useParams();
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

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get('/auth/users');
      console.log(res);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axiosInstance.delete(`/auth/delete/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className=' flex flex-col gap-y-10 justify-center items-center h-[100vh]'>
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
      <div className=' pt-10'>
        <div className=' grid gap-7 grid-cols-2'>
          {users.map((user) => {
            return (
              <div className=' bg-gray-300' key={user.email}>
                <button onClick={() => deleteUser(user._id)}>delete</button>
                <p>{user.email}</p>
                <p>{user.username}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
