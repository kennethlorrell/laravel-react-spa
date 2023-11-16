import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorList from '@/Components/Common/ErrorList.jsx';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors([]);

      await axios.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });

      navigate('/posts');
    } catch (err) {
      console.error(err);

      setErrors(Object.entries(err.response.data.errors));
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <div>
      <ErrorList errors={errors} />
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='name' className='block font-medium text-sm text-gray-700'>
            Name
          </label>
          <input
            value={name}
            onChange={handleNameChange}
            required
            type='text'
            id='name'
            name='name'
            className='block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        </div>

        <div className='mt-4'>
          <label
            htmlFor='email'
            className='block font-medium text-sm text-gray-700'
          >
            Email
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            required
            type='email'
            id='email'
            name='email'
            className='block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        </div>

        <div className='mt-4'>
          <label
            htmlFor='password'
            className='block font-medium text-sm text-gray-700'
          >
            Password
          </label>
          <input
            value={password}
            onChange={handlePasswordChange}
            required
            type='password'
            id='password'
            name='password'
            className='block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='password_confirmation' className='block font-medium text-sm text-gray-700'>
            Confirm Password
          </label>
          <input
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            required
            type='password'
            id='password_confirmation'
            name='password_confirmation'
            className='block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        </div>

        <div className='flex items-center justify-end mt-4'>
          <button
            type='submit'
            className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3'
          >
            Register
          </button>
        </div>

        <div className='mt-4'>
          Already registered?
          <Link
            to='/login'
            className='text-blue-600 ml-1'
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
