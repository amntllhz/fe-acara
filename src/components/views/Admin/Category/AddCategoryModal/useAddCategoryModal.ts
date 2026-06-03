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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);

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

    const validateImageDimensions = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new window.Image()
            img.src = URL.createObjectURL(file)
            img.onload = () => {
                URL.revokeObjectURL(img.src)
                resolve(img.width <= 2000 && img.height <= 2000)
            }
            img.onerror = () => resolve(false)
        })
    }

    const handleFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        e.target.value = "";

        // Validasi format
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file format", {
                description: "The file format must be PNG, JPEG, or JPG"
            })
            return;
        }

        // Validasi ukuran (10 MB)
        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            toast.error("Invalid file size", {
                description: "The file size must be less than 10 MB"
            })
            return;
        }

        const isValidDimension = await validateImageDimensions(file)
        if (!isValidDimension) {
            toast.error("Invalid dimensions", {
                description: "Image must be at least 2000x2000 pixels"
            })
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setUploadedFile({ name: file.name, size: file.size });

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await uploadService.uploadFile(formData, (progress) => {
                setUploadProgress(progress);
            });

            const uploadedUrl = res.data?.data?.secure_url || res.data?.secure_url;
            if (uploadedUrl) {
                setIsImageLoading(true);
                setValue("icon", uploadedUrl, { shouldValidate: true });
            }
        } catch (error) {
            console.error("Upload failed:", error);

            toast.error("Upload failed", {
                description: "Something went wrong. Please try again."
            })

            setUploadedFile(null);
        } finally {
            setIsUploading(false);
        }
    };

    const onCancelModal = () => {
        onClose();
        reset();
        setIsUploading(false);
        setIsImageLoading(false);
        setUploadProgress(0);
        setUploadedFile(null);

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
            setUploadedFile(null);
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
        uploadProgress,
        uploadedFile,
        control,
        errors,
        isSubmitting,
        iconUrl,
        handleFileDrop,
        onCancelModal,
        onSubmit
    };
};
