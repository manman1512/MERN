import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import {useForm} from "react-hook-form"

export function Input({id, name, placeholder}){
    return(
        <div>
            <input 
                className="outline-none border rounded-lg "
                name={name} 
                id={id} 
                placeholder={placeholder}
                type={(id === "password" || id === "confirmPassword") ? "password" : "text"}/>
        </div>
    )
}

export default function Register(){
    const refSmall = useRef();
    const {handleSubmit, formState: {errors}} = useForm();

    const handleChange = (e) => {
        const value = e.target.value;
        if(value === document.getElementById("password").value){
            refSmall.current.innertext = "";
        } else{
            refSmall.current.innertext = "Mat khau nhap lai khong dung!"
        }
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confpassword = e.target.confirmPassword.value;
        console.log(username, email, password, confpassword) 
        try {
            const response = await axiosClient.post("/auth/register", {
                username,
                email,
                password,
                confpassword
            })
            console.log(response);

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="absolute border-red-600 border-2 
        rounded-2xl left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 p-2 font-mono">
            <form onSubmit={handleSubmit(onSubmit)} action="" className="mx-6 mb-6">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <div className="h-px bg-slate-400 w-96 my-0 -mx-6"></div>
                <div className="mt-6">
                    <Input placeholder="Username:" id="username" />
                    <Input placeholder="Email:" id="email" />
                    <Input placeholder="Password:" id="password" />
                    <Input placeholder="Confirm Password:" id="confirmPassword" />
                    <Input placeholder="Email:" id="email" />
                    <button type="submit" className="border-black border rounded-lg ">Register</button>
                    <p>Already have an account?
                        {/* <link to="/login">Login
                            <button>Register</button>
                        </link> */}
                    </p>
                </div>
            </form>
        </div>
    );
};

