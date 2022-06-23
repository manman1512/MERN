import React, { useRef } from "react";
// import { Link } from "react-router-dom";
// import axiosClient from "../../axiosClient";
import {FormProvider, useForm, useFormContext} from "react-hook-form"

export const Input = (props)=>{
    const {register} = useFormContext();

    return(
        <div>

             <input 
            //  {...register(props.name, {required: props.requiredText})}
            {...register(props.name)}
             className="outline-none border rounded-lg "
             placeholder={props.placeholder}  
             type={(props.name === "password" || props.name === "confirmPassword") ? "password" : "text"}/> 
             </div>
        
    )
}


export default function Register(){
    const methods = useForm();

    const onSubmit = async (data) =>{
        console.log(data);
        // e.preventDefault();
        // const username = e.target.username.value;
        // const email = e.target.email.value;
        // const password = e.target.password.value;
        // const confpassword = e.target.confirmPassword.value;
        // console.log(username, email, password, confpassword) 
        // try {
        //     const response = await axiosClient.post("/auth/register", {
        //         username,
        //         email,
        //         password,
        //         confpassword
        //     })
        //     console.log(response);

        // } catch (error) {
        //     console.log(error)
        // }
    }
    return (
        <FormProvider
        {...methods} >
        <div className="absolute border-red-600 border-2 
        rounded-2xl left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 p-2 font-mono">
            <form onSubmit={methods.handleSubmit(onSubmit)} action="" className="mx-6 mb-6">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <div className="h-px bg-slate-400 w-96 my-0 -mx-6"></div>
                <div className="mt-6">
                    <Input placeholder="Username:" name="username"/>
                    <Input placeholder="Password:" name="password" />
                    <Input placeholder="Confirm Password:" name="confirmPassword" />
                    <Input placeholder="Email:" name="email" />
                    <input type="submit" className="border-black border rounded-lg" value="Dang Ky"/>
                    <p>Already have an account?
                        {/* <link to="/login">Login
                            <button>Register</button>
                        </link> */}
                    </p>
                </div>
            </form>
        </div>
    </FormProvider>
    );
};

