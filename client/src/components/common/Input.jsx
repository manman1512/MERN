import { useFormContext } from "react-hook-form";
import Tooltip from "./Tooltip";
const Input = (props) => {
  const { register, formState } = useFormContext();
  console.log(formState.errors[props.name])
  return (
    
    <div className="group relative my-4 border rounded-lg w-[65%] mx-auto">
      <input
        //  {...register(props.name, {required: props.requiredText})}
        {...register(props.name)}
        className={`outline-none p-2 w-full bg-transparent focus:ring-2 ${formState.errors[props.name] ? "ring-red-300" : "ring-blue-300"} ring-inset rounded-lg`}
        placeholder={props.placeholder}
        type={
          props.name === "password" || props.name === "confirmPassword"
            ? "password"
            : "text"
        }
      />
      {formState.errors[props.name] && <Tooltip message={formState.errors[props.name].message}/>}
    </div>
  );
};
export default Input;
