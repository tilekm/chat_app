"use client"

import { useState, useContext, useEffect } from 'react';
import { API_URL } from '@/constants';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import { AuthContext, UserInfo } from '@/modules/auth_provider';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated } = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push("/")
      return
    }
  }, [authenticated])

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });

      const data = await res.json();

      if (res.ok) {
        const user: UserInfo = {
          username: data.username,
          id: data.id
        };
        localStorage.setItem('user_info', JSON.stringify(user));
        return router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen min-w-full'>
      <form className='flex flex-col md:w-1/5'>
        <div className="text-3xl font-bold text-center">
          <span className="text-blue">welcome!</span>
        </div>
        <input type="text" placeholder='email' 
        className='p-3 mt-8 rounded-md border-2 border-gray focus:outline-none focus:border-blue'
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <input type="password" placeholder='password' 
        className='p-3 mt-4 rounded-md border-2 border-gray focus:outline-none focus:border-blue' 
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <button className='p-3 mt-6 rounded-md bg-blue font-bold text-white' onClick={submitHandler}>
          login
        </button>
      </form>
    </div>
  );
};
