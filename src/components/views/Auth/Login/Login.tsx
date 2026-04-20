import { Button, Card, Input, Spinner } from "@heroui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";

const Login = () => {    
    const { control, handleSubmit, handleLogin, isPendingLogin, errors } = useLogin();
    const [showPassword, setShowPassword] = useState(false);    

    return (
        <>
            <div className="flex lg:flex-row xs:flex-col lg:gap-0 xs:gap-4">
                <div className="flex flex-col justify-center items-center gap-6">
                    <img src="/images/general/logo.svg" alt="logo" className="w-20"/>
                    <img src="/images/illustrations/login.svg" alt="illustration" className="w-1/2" />                    
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Card className="p-6 rounded-xl shadow-none ring-1 ring-gray-200/75">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h3 className="font-sans text-md font-semibold">Log In</h3>
                                <p className="font-sans text-gray-500 text-[11px]">Don't have an account? <a href="/auth/register" className="text-[11px] text-primary">Register</a></p>
                            </div>
                            <form className="flex flex-col lg:w-80 xs:w-75 gap-3" onSubmit={handleSubmit(handleLogin)}>
                                <Controller name="identifier" control={control} render={({field, fieldState}) => (
                                    <div className="flex flex-col gap-1">
                                        <Input {...field} aria-label="identifier" type="text" autoComplete="off" placeholder="Username or Email" className={`input rounded-lg shadow-none ring-1 w-full max-w-xs text-xs font-sans ${fieldState.error ? "ring-primary" : "ring-gray-200/75" }`} />
                                        {fieldState.error && (
                                            <p className="text-primary text-[9px] font-sans">{fieldState.error.message}</p>
                                        )}
                                    </div>
                                )}/>                                          
                                    
                                <Controller name="password" control={control} render={({field, fieldState}) => (
                                    <div className="flex flex-col gap-1.5">
                                        <div className="relative w-full max-w-xs">
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className={`input rounded-lg shadow-none ring-1 w-full max-w-xs text-xs font-sans pr-8 ${fieldState.error ? "ring-primary" : "ring-gray-200/75" }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showPassword ? <AiOutlineEye size={14} /> : <AiOutlineEyeInvisible size={14} />}
                                            </button>
                                        </div>
                                        {fieldState.error && (
                                            <p className="text-primary text-[9px] font-sans">{fieldState.error.message}</p>
                                        )}
                                    </div>
                                    
                                )}/>
                                   
                                
                                {errors.root && (
                                    <p className="text-danger text-[11px] text-center font-sans">{errors.root.message}</p>
                                )}                                                                                                                                        

                                {/* Button Submit */}
                                <Button  type="submit" className="btn bg-primary rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans mt-3">
                                    {isPendingLogin ?
                                        <Spinner color="current"/> : "Login"
                                    }
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
};
export default Login;