import React, { useRef } from "react";
// import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../common/Input";
import * as yup from "yup";
let schema = yup.object().shape({
  username: yup
    .string()
    .required("Username must be not empty!")
    .min(6, "username must be larger than 6 char"),
  password: yup
    .string()
    .required("password must be not empty!")
    .min(8, "password at least 8 letter"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password must match"),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    , "Email does not match!"
      ),
});

export default function Register() {
  const resolver = yupResolver(schema);
  const methods = useForm({ resolver: resolver });
  const submitRef = useRef(null);
  const onSubmit = async (data) => {
    const { username, email, password } = data;
    console.log(username);
    try {
        const response = await axiosClient.post("/auth/register", {
            username,
            email,
            password,
        })
        console.log(response);

    } catch (error) {
        console.log(error)
    }
  };
  React.useEffect(() => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  }, []);
  return (
    <FormProvider {...methods}>
      <div
        className="absolute border-red-600 border-2 
        rounded-2xl left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 p-2 font-mono
        "
      >
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          action=""
          className="mx-6 mb-6"
        >
          <h1 className="text-3xl font-bold text-center">Register</h1>
          <div className="h-px bg-slate-400 w-96 my-0 -mx-6"></div>
          <div className="mt-6 flex flex-col items-center">
            <Input placeholder="Username:" name="username" />
            {methods.formState.errors.username && (
              <p>{methods.formState.errors.username.messagae}</p>
            )}
            <Input placeholder="Password:" name="password" />
            <Input placeholder="Confirm Password:" name="confirmPassword" />
            <Input placeholder="Email:" name="email" />
            <input
              ref={submitRef}
              type="submit"
              className="border-black border rounded-lg p-2 "
              value="Dang Ky"
            />
            <p>
              Already have an account?
              {/* <link to="/login">Login
                            <button>Register</button>
                        </link> */}
            </p>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
