import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CiTrash } from "react-icons/ci";
import { useDeleteCategoryModal } from "./useDeleteCategoryModal";

interface DeleteCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    categoryId: string;
    categoryName: string;
}

const DeleteCategoryModal = ({
    isOpen,
    onClose,
    onSuccess,
    categoryId,
    categoryName,
}: DeleteCategoryModalProps) => {
    const { isDeleting, handleDelete } = useDeleteCategoryModal(onSuccess);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader className="flex items-center flex-col gap-2 mt-3">
                    <div className="flex items-center justify-center bg-red-50 rounded-full p-3 w-fit mb-2">
                        <CiTrash className="w-5 h-5 text-main" />
                    </div>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription className="text-xs text-center max-w-xs">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-gray-700">{categoryName}</span>?
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-2 mb-3">
                    <Button
                        variant="outline"
                        className="border w-24 h-8 border-gray-200 rounded-lg text-xs hover:bg-gray-50"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-main w-24 h-8 text-white rounded-lg text-xs"
                        onClick={() => handleDelete(categoryId, onClose)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCategoryModal;
