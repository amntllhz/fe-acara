import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Category from "@/components/views/Admin/Category/Category";

const AdminCategoryPage = () => {
    return (
        <DashboardLayout
            title="Category"
            description="Menampilkan semua data dari kategori"
            type="admin">
            <Category />
        </DashboardLayout>
    );
};

export default AdminCategoryPage;