import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const LogoutModal = () => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    return (
        <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
            <DialogTrigger asChild>
                <Button className="btn bg-white rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs text-gray-500 font-normal font-sans mt-3 hover:bg-red-50 hover:text-main hover:ring-main/20 transition-colors duration-200">
                    <CiLogout className="w-4 h-4" />
                    Log Out
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex items-center flex-col gap-2 mt-3">
                    <div className="flex items-center justify-center bg-main/5 rounded-full py-1.5 pr-1.5 pl-2.5 w-fit mb-2">
                        <HiOutlineLogout className="w-5 h-5 text-main" />
                    </div>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription className="text-xs text-center max-w-xs">
                        Are you sure you want to log out of your account? You will need to sign in again to access the dashboard
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-2 mb-3">
                    <Button
                        variant="outline"
                        className="border w-24 h-8 border-gray-200 rounded-lg text-xs hover:bg-gray-50"
                        onClick={() => setIsLogoutModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-main w-24 h-8 text-white rounded-lg text-xs"
                        onClick={() => signOut()}
                    >
                        Log out
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutModal;
