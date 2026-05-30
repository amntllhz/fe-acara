import { useState } from "react";
import categoryServices from "@/services/category.service";
import { toast } from "sonner";

export const useDeleteCategoryModal = (onSuccess: () => void) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id: string, onClose: () => void) => {
        setIsDeleting(true);
        try {
            await categoryServices.deleteCategory(id);
            toast.success("Category Deleted", {
                description: "The category has been successfully removed"
            });
            onClose();
            onSuccess();
        } catch (error) {
            console.error("Failed to delete category:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        handleDelete,
    };
};
