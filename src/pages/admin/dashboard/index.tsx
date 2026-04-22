import Dashboard from "@/components/views/Admin/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";

const DashboardAdminPage = () => {
    return (
        <DashboardLayout title="Acara - Admin Dashboard" type="admin">
            <Dashboard />
        </DashboardLayout>
    );
};

export default DashboardAdminPage;