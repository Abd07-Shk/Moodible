'use client'
import React,{ useState } from 'react'
import { Fugaz_One } from 'next/font/google';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import Dashboard from './Dashboard';
const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });





export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister,setIsRegister] = useState(false)
  const [authenticating , setAuthenticating] = useState(false)
  const {signup, login} = useAuth()

  async function handleSubmit(){
    if(!email || !password || password.length < 6) {
      return
    }
    
    setAuthenticating(true)

    try {
      if(isRegister) {
        console.log('Signing up a new user')
        await signup(email,password)
      } else {
        console.log('Logging in Existing User')
        await login(email,password)
        
      }
      
    } catch (error) {
      console.log(error.message)
    } finally{
      setAuthenticating(false)
    }
  
  }



  return (
    <div className='flex flex-col flex-1 justify-center
    items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl '+ fugaz.className}>
        {isRegister? 'Register': 'Log In '}
      </h3>
      <p>
        You&#39;re one step away!
      </p>
      <input 
  value={email} 
  onChange={(e) => {
    setEmail(e.target.value)
    console.log(e)
  }}
  
  className="
    w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 
    border-2 border-teal-400 border-solid rounded-full outline-none 
    transition duration-200 ease-in-out 
    hover:border-teal-700 focus:border-teal-600 
    focus:shadow-lg focus:shadow-teal-300/50 
    bg-gray-50 hover:bg-white focus:bg-white 
    text-gray-700 placeholder-gray-400
  " 
  placeholder="Email"
  
/>
      <input 
  value={password} 
  onChange={(e) => setPassword(e.target.value)}
  className="
    w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 
    border-2 border-teal-400 border-solid rounded-full outline-none 
    transition duration-200 ease-in-out 
    hover:border-teal-700 focus:border-teal-600 
    focus:shadow-lg focus:shadow-teal-300/50 
    bg-gray-50 hover:bg-white focus:bg-white 
    text-gray-700 placeholder-gray-400
  " 
  placeholder="Enter your password"
/>
     
      <div className='max-w-[400px] w-full mx-auto '> </div>
      <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : "Submit"} full />
      <p className='text-center'>
        {isRegister?'Already have an account':'Don\'t have an account?'} <button onClick={()=>{
          setIsRegister(!isRegister)
        }} className='text-teal-600 '>{isRegister ?'Sign In':'Sign Up'}</button>
      </p>
    
    </div>
    
  )
}
