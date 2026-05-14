import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constant";
import { RxHamburgerMenu } from "react-icons/rx";


interface PropTypes {
    children: ReactNode;
    title?: string;
    description?: string;
    type?: string;

}

const DashboardLayout = (props: PropTypes) => {
    const { children, title, description, type = 'admin' } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <PageHead title={title} />
            <div className="relative flex gap-2 min-h-screen">
                <DashboardLayoutSidebar
                    sidebarItems={type === 'admin' ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
                    isOpen={open}
                    onClose={() => setOpen(false)}
                />
                <div className="flex flex-col flex-1 min-w-0">
                    {/* Navbar */}
                    <header className="sticky top-0 z-10 flex items-center gap-3 h-14 px-4 lg:border-b-0 xs:border-b xs:border-gray-200 bg-white">
                        {/* Tombol toggle hanya tampil di xs (hidden di lg) */}
                        <button
                            className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                            onClick={() => setOpen((prev) => !prev)}
                            aria-label="Toggle sidebar"
                        >
                            <RxHamburgerMenu className="w-5 h-5" />
                        </button>
                    </header>

                    {/* Konten halaman */}
                    <main className="flex flex-col gap-4 p-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="font-sans text-lg font-semibold text-main tracking-wide">
                                {title}
                            </h1>
                            <p className="font-sans text-xs text-gray-600">
                                {description}
                            </p>
                        </div>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
};

export default DashboardLayout