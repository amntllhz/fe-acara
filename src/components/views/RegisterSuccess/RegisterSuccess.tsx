import { Button } from "@heroui/react";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
    const router = useRouter();
    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <img src="/images/general/logo.svg" alt="logo" className="w-20"/>
                    <img src="/images/illustrations/email-send.svg" alt="" className="w-60" />
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <p className="font-sans font-bold">Account created successfully</p>
                        <p className="font-sans text-[11px] text-gray-500">Check your email to activate your account</p>
                    </div>
                    <Button onClick={() => router.push('/')} className="btn bg-primary rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans mt-3">
                        Back to home
                    </Button>
                </div>
                
            </div>
        </>
    )
}

export default RegisterSuccess