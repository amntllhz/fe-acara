import Dashboard from "@/components/views/Member/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";

const DashboardMemberPage = () => {
    return (
        <DashboardLayout title="Acara - Member Dashboard" type="member">
            <Dashboard />
        </DashboardLayout>
    );
};

export default DashboardMemberPage;