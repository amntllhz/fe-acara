import { CiGrid41, CiMoneyCheck1, CiSettings, CiShoppingTag, CiViewList, CiViewTimeline } from "react-icons/ci";

const SIDEBAR_ADMIN = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <CiGrid41 />
    },
    {
        key: "event",
        label: "Event",
        href: "/admin/event",
        icon: <CiViewList />
    },
    {
        key: "category",
        label: "Category",
        href: "/admin/category",
        icon: <CiShoppingTag />
    },
    {
        key: "banner",
        label: "Banner",
        href: "/admin/banner",
        icon: <CiViewTimeline />
    },
    {
        key: "transactions",
        label: "Transactions",
        href: "/admin/transactions",
        icon: <CiMoneyCheck1 />
    },
]

const SIDEBAR_MEMBER = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/member/dashboard",
        icon: <CiGrid41 />
    },
    {
        key: "transactions",
        label: "Transactions",
        href: "/member/transactions",
        icon: <CiMoneyCheck1 />
    },
]

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER }