import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constant";
import { RxHamburgerMenu } from "react-icons/rx";


interface PropTypes {
    children: ReactNode;
    title?: string;
    type?: string;

}

const DashboardLayout = (props: PropTypes) => {
    const { children, title, type = 'admin' } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <PageHead title={title}/>
            <div className="relative flex gap-2 min-h-screen">
                <DashboardLayoutSidebar 
                    sidebarItems={type === 'admin' ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
                    isOpen={open}
                    onClose={() => setOpen(false)}
                />
                <div className="flex flex-col flex-1 min-w-0">
                    {/* Navbar */}
                    <header className="sticky top-0 z-10 flex items-center gap-3 h-14 px-4 border-b border-gray-200 bg-white">
                        {/* Tombol toggle hanya tampil di xs (hidden di lg) */}
                        <button
                            className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                            onClick={() => setOpen((prev) => !prev)}
                            aria-label="Toggle sidebar"
                        >
                            <RxHamburgerMenu className="w-5 h-5" />
                        </button>
                        <h1 className="font-sans text-sm font-semibold text-gray-800 tracking-wide">
                            {title}
                        </h1>
                    </header>

                    {/* Konten halaman */}
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
};

export default DashboardLayout