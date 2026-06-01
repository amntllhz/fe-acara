import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const DetailCategoryPage = () => {
    return (
        <DashboardLayout
            title="Detail Category"
            description="Showing the details of a specific category"
            type="admin">
            <DetailCategory />
        </DashboardLayout>
    );
};

export default DetailCategoryPage;