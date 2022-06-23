import React from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../axiosClient';
import { Input } from '../Register'

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(username, password)
        try{
            const response = await axiosClient.post("/auth/login",{
                username,
                email,
                password
            })
            console.log(response)
        }
        catch(error){
            console.log(error);
        }
    };
  return (
    <div className="absolute border-red-600 border-2 
        rounded-2xl left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 p-2 font-mono">
            <div className="text-5xl">xinchaomanancut</div>
            <form onSubmit={handleSubmit}  action="" className="mx-6 mb-6">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <div className="h-px bg-slate-400 w-96 my-0 -mx-6"></div>
                <div className="mt-6">
                    <Input placeholder="Username:" id="username" />
                    <Input placeholder="Email:" id="email" />
                    <Input placeholder="Password:" id="password" />
                    <button type="submit" className="border-black border rounded-lg ">Login</button>
                    <p>Don't have an account?
                        <Link to="/register">
                            <button className="border-black border rounded-lg">Register</button>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
  )
}
