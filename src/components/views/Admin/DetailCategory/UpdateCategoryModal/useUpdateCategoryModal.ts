import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import uploadService from "@/services/upload.service";
import categoryServices from "@/services/category.service";
import { toast } from "sonner";
import { Category } from "../../Category/Category.constant";

const categorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    icon: yup.string().required("Icon is required"),
});

export const useUpdateCategoryModal = (
    onClose: () => void,
    onSuccess: () => void,
    category: Category | null,
    isOpen: boolean
) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number | null } | null>(null);

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

    const generateIconFilename = (name: string) => {
        const slug = name.toLowerCase().replace(/\s+/g, "-")
        return `${slug}-icon.png`
    }

    // Pre-fill form ketika category berubah
    useEffect(() => {
        if (category) {
            setValue("name", category.name);
            setValue("description", category.description);
            setValue("icon", category.icon);
            setUploadProgress(0);
            if (category.icon) {
                setIsImageLoading(true);
                setUploadedFile({
                    name: generateIconFilename(category.name),
                    size: null
                });
            }
        }
    }, [isOpen, category, setValue]);

    const handleFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
        // Hapus icon baru jika user cancel dan icon sudah diganti
        if (iconUrl && iconUrl !== category?.icon) {
            uploadService.deleteFile({ fileUrl: iconUrl }).catch((error) => {
                console.error("Failed to delete orphaned file", error);
            });
        }
        onClose();
        reset();
        setIsUploading(false);
        setIsImageLoading(false);
        setUploadProgress(0);
        setUploadedFile(null);
    };

    const onSubmit = async (formData: any) => {
        if (!category?._id) return;
        try {
            await categoryServices.updateCategory(category._id, formData);
            toast.success("Category Updated", {
                description: "The category has been successfully updated."
            });
            reset();
            setUploadedFile(null);
            onSuccess();
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    };

    return {
        isUploading,
        isImageLoading,
        setIsImageLoading,
        uploadProgress,
        uploadedFile,
        handleSubmit,
        control,
        errors,
        isSubmitting,
        iconUrl,
        handleFileDrop,
        onCancelModal,
        onSubmit,
    };
};