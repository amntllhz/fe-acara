import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import uploadService from "@/services/upload.service";
import categoryServices from "@/services/category.service";
import { toast } from "sonner";

const categorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    icon: yup.string().required("Icon is required"),
});

export const useAddCategoryModal = (onClose: () => void, onSuccess: () => void) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const {
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            icon: "",
        },
    });

    const iconUrl = watch("icon");

    const handleFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await uploadService.uploadFile(formData);
            const uploadedUrl = res.data?.data?.secure_url || res.data?.secure_url;
            if (uploadedUrl) {
                setIsImageLoading(true);
                setValue("icon", uploadedUrl, { shouldValidate: true });
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const onCancelModal = () => {
        onClose();
        reset();
        setIsUploading(false);
        setIsImageLoading(false);

        if (iconUrl) {
            uploadService.deleteFile({ fileUrl: iconUrl }).catch((error) => {
                console.error("Failed to delete orphaned file", error);
            });
        }
    };

    const onSubmit = async (formData: any) => {
        try {
            await categoryServices.createCategory(formData);
            toast.success("Category Added", {
                description: "The new category has been successfully created."
            });
            reset();
            onSuccess();
        } catch (error) {
            console.error("Failed to create category:", error);
        }
    };

    return {
        isUploading,
        isImageLoading,
        setIsImageLoading,
        handleSubmit,
        control,
        errors,
        isSubmitting,
        iconUrl,
        handleFileDrop,
        onCancelModal,
        onSubmit
    };
};
