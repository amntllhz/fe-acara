import { Card, Input } from "@heroui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <div className="flex">
                <div className="flex flex-col justify-center items-center gap-6">
                    <img src="/images/general/logo.svg" alt="logo" className="w-20"/>
                    <img src="/images/illustrations/login.svg" alt="illustration" className="w-1/2" />                    
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Card className="p-6 rounded-xl shadow-none ring-1 ring-gray-200/75">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h3 className="font-sans text-md font-semibold">Create Account</h3>
                                <p className="font-sans text-gray-500 text-[11px]">Have an account? <a href="/login" className="text-[11px] text-danger">Login</a></p>
                            </div>
                            <form className="flex flex-col w-80 gap-3">
                                <Input aria-label="Name" type="text" placeholder="Fullname" className="input rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans" />
                                <Input aria-label="Email" type="text" placeholder="Username" className="input rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans" />
                                <Input aria-label="Email" type="email" placeholder="Email" className="input rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans" />                                

                                {/* Password */}
                                <div className="relative w-full max-w-xs">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="input rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans pr-8"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <AiOutlineEye size={14} /> : <AiOutlineEyeInvisible size={14} />}
                                    </button>
                                </div>

                                {/* Password Confirmation */}
                                <div className="relative w-full max-w-xs">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Password Confirmation"
                                        className="input rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans pr-8"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showConfirmPassword ? <AiOutlineEye size={14} /> : <AiOutlineEyeInvisible size={14} />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
};
export default Register;