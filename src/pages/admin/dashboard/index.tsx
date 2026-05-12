import Dashboard from "@/components/views/Admin/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";

const AdminDashboardPage = () => {
    return (
        <DashboardLayout
            title="Dashboard"
            description="Menampilkan data Dashboard"
            type="admin">
            <Dashboard />
        </DashboardLayout>
    );
};

export default AdminDashboardPage;