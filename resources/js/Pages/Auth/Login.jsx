import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorList from '@/Components/Common/ErrorList.jsx';
import { Ability, AbilityBuilder } from '@casl/ability';
import { AbilityContext } from '@/Components/Ability/Can.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const ability = useContext(AbilityContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors([]);

      await axios.post('/login', {
        email,
        password
      });

      const { data } = await axios.get('/api/user/permissions');
      updateAbility(data);

      navigate('/posts');
    } catch (err) {
      console.error(err);
      setErrors(Object.entries(err.response.data.errors));
    }
  };

  const updateAbility = (permissions) => {
    const { can, rules } = new AbilityBuilder(Ability);

    can(permissions);
    ability.update(rules);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <ErrorList errors={errors} />
      <form onSubmit={handleFormSubmit}>
        <div>
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

        <div className='flex items-center justify-end mt-4'>
          <button
            type='submit'
            className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3'
          >
            Log in
          </button>
        </div>

        <div className='mt-4'>
          Don&apos;t have an account?
          <Link
            to='/register'
            className='text-blue-600 ml-1'
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
