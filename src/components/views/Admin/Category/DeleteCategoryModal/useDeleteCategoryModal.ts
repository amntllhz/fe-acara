import { useState } from "react";
import categoryServices from "@/services/category.service";

export const useDeleteCategoryModal = (onSuccess: () => void) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id: string, onClose: () => void) => {
        setIsDeleting(true);
        try {
            await categoryServices.deleteCategory(id);
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
