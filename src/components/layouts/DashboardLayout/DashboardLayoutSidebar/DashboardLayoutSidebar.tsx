import { JSX } from "react";
import { Button, ListBox } from "@heroui/react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import Image from "next/image";
import { LuPanelLeftClose } from "react-icons/lu";

interface SidebarItem {
    key: string,
    label: string,
    href: string,
    icon: JSX.Element
}

interface PropTypes {
    sidebarItems: SidebarItem[],
    isOpen: boolean,
    onClose?: () => void
}

const DashboardLayoutSidebar = (props: PropTypes) => {
    const { sidebarItems, isOpen, onClose } = props;
    const router = useRouter();
    return (
        <>
            {/* Backdrop — hanya muncul di xs saat sidebar terbuka */}
            <div
                className={`fixed inset-0 z-20 bg-black/40 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={[
                    // Shared base
                    "flex flex-col gap-2 w-64 h-dvh justify-between border-r border-gray-200 px-4 py-5 bg-white",
                    // Desktop: bagian dari layout biasa
                    "lg:relative lg:translate-x-0 lg:flex lg:shrink-0",
                    // Mobile: selalu fixed, slide in/out
                    "fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                ].join(" ")}
            >
                {/* Header sidebar: logo + tombol close (hanya xs) */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between lg:justify-start lg:pl-2 xs:pl-0 mb-4">
                        <Image
                            src="/images/general/logo.svg"
                            alt="logo"
                            width={75}
                            height={48}
                            className="cursor-pointer w-[75px] h-auto"
                            onClick={() => router.push('/')}
                        />
                        {/* Tombol arrow-left hanya tampil di xs saat sidebar terbuka */}
                        <button
                            className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                            onClick={onClose}
                            aria-label="Tutup sidebar"
                        >
                            <LuPanelLeftClose className="w-5 h-5 text-gray-300" />
                        </button>
                    </div>

                    <ListBox
                        aria-label="Sidebar"
                        className="w-full gap-1 max-w-xs"
                        selectionMode="single"
                        selectedKeys={[router.pathname]}
                        items={sidebarItems}
                    >
                        {sidebarItems.map((item) => (
                            <ListBox.Item
                                key={item.href}
                                id={item.href}
                                textValue={item.label}
                                className="rounded-lg py-1 data-[selected=true]:text-primary data-[selected=true]:bg-primary/5 data-[hovered=true]:bg-gray-100"
                                onClick={() => router.push(item.href)}
                            >
                                <div className="flex items-center gap-1">
                                    <span className="w-8 h-8 flex justify-center items-center">{item.icon}</span>
                                    <span className="font-sans text-xs">{item.label}</span>
                                </div>
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </div>

                <div className="flex items-center p-1">
                    <Button
                        className="btn bg-white rounded-lg shadow-none ring-1 ring-gray-200/75 w-full max-w-xs text-xs text-gray-500 font-sans mt-3"
                        onClick={() => signOut()}>
                        <CiLogout className="w-4 h-4" />
                        Log Out
                    </Button>
                </div>
            </div>
        </>
    )
};

export default DashboardLayoutSidebar