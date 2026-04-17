import { Button } from "@heroui/react";
import { useRouter } from "next/router";

interface PropTypes {
    status: 'success' | 'failed'
}

const Activation = (props: PropTypes) => {
    const router = useRouter();
    const { status } = props;
    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <img src="/images/general/logo.svg" alt="logo" className="w-20"/>
                    <img src={status === 'success' ? '/images/illustrations/success.svg' : '/images/illustrations/pending.svg'} alt="" className="w-52" />
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <p className="font-sans font-bold">{status === 'success' ? 'Account activated successfully' : 'Account activation failed'}</p>
                        <p className="font-sans text-[11px] text-gray-500">{status === 'success' ? 'Thank you for activating your account' : 'Activation code is invalid'}</p>
                    </div>
                    <Button onClick={() => router.push('/')} className="btn bg-primary rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs font-sans mt-3">
                        Back to home
                    </Button>
                </div>
                
            </div>
        </>
    )
}

export default Activation