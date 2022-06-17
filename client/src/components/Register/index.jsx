import React from "react";

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
    return (
        <div className="absolute border-red-600 border-2 
        rounded-2xl left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 p-2 font-mono">
            <form action="" className="mx-6 mb-6">
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

