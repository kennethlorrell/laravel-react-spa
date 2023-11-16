import './bootstrap';
import { createRoot } from 'react-dom/client';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PostsIndex from '@/Pages/Posts/PostsIndex.jsx';
import PostsCreate from '@/Pages/Posts/PostsCreate.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import Login from '@/Pages/Auth/Login.jsx';
import Register from '@/Pages/Auth/Register.jsx';
import Ability from '@/Components/Ability/Ability.jsx';
import { AbilityContext } from '@/Components/Ability/Can.jsx';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <ErrorBoundary fallback={<p>An error has occurred</p>}>
    <AbilityContext.Provider value={Ability}>
      <BrowserRouter>
        <Routes>

          <Route path='/posts' element={<AuthenticatedLayout />}>
            <Route index element={<PostsIndex />} />
            <Route path='/posts/create' element={<PostsCreate />} />
            <Route path='/posts/edit/:postId' element={<PostsCreate />} />
          </Route>

          <Route path='/login' element={<GuestLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<GuestLayout />}>
            <Route index element={<Register />} />
          </Route>

          <Route path='*' element={<Navigate to='/posts' replace />} />

        </Routes>
      </BrowserRouter>
    </AbilityContext.Provider>
  </ErrorBoundary>
);
