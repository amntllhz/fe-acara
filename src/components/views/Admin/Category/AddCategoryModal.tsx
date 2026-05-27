import { useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import uploadService from "@/services/upload.service";
import categoryServices from "@/services/category.service";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input, TextArea } from "@heroui/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LuImageUp } from "react-icons/lu";
import { Spinner } from "@/components/ui/spinner";
import { RiExchange2Line } from "react-icons/ri";

const categorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    icon: yup.string().required("Icon is required"),
});

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddCategoryModal = ({ isOpen, onClose, onSuccess }: AddCategoryModalProps) => {
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
            reset();
            onSuccess();
        } catch (error) {
            console.error("Failed to create category:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) onCancelModal();
        }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription className="text-xs">
                        Fill in the details below to create a new category.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-xs mb-1.5 block">Name</Label>
                        <Controller name="name" control={control} render={({ field, fieldState }) => (
                            <>
                                <Input {...field} aria-label="name" type="text" autoComplete="off" placeholder="Category Name" className={`input rounded-md placeholder-gray-300 shadow-none ring-1 w-full text-xs font-sans ${fieldState.error ? "ring-main" : "ring-gray-200/75"}`} />
                                {fieldState.error && <p className="text-[9px] text-main font-sans mt-1">{fieldState.error.message}</p>}
                            </>
                        )} />
                    </div>

                    <div>
                        <Label htmlFor="description" className="text-xs mb-1.5 block">Description</Label>
                        <Controller name="description" control={control} render={({ field, fieldState }) => (
                            <>
                                <TextArea {...field} aria-label="description" placeholder="Category Description" className={`input rounded-md placeholder-gray-300 shadow-none ring-1 w-full text-xs font-sans ${fieldState.error ? "ring-main" : "ring-gray-200/75"}`} />
                                {fieldState.error && <p className="text-[9px] text-main font-sans mt-1">{fieldState.error.message}</p>}
                            </>
                        )} />
                    </div>

                    <div>
                        <Label className="text-xs mb-1.5">Icon</Label>
                        <div className={`mt-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-50 transition ${errors.icon ? "border-main" : "border-gray-200/75"}`}>
                            {(isUploading || isImageLoading) && (
                                <div className="flex flex-col items-center gap-2">
                                    <Spinner />
                                    <p className="text-xs text-gray-400">
                                        {isUploading ? "Uploading..." : "Rendering preview..."}
                                    </p>
                                </div>
                            )}

                            {iconUrl && (
                                <div className={`flex flex-col items-center gap-3 ${isImageLoading ? 'opacity-0 absolute' : 'flex'}`}>
                                    <Image
                                        src={iconUrl}
                                        alt="Preview"
                                        width={64}
                                        height={64}
                                        className="rounded object-cover"
                                        onLoad={() => setIsImageLoading(false)}
                                    />
                                    <div className="flex items-center gap-1">
                                        <RiExchange2Line className="h-3 w-3 text-main" />
                                        <p className="text-xs text-main">Click to replace</p>
                                    </div>
                                </div>
                            )}

                            {(!isUploading && !isImageLoading && !iconUrl) && (
                                <div className="flex flex-col items-center gap-2">
                                    <LuImageUp className="h-10 w-10 text-gray-300" />
                                    <p className="text-xs text-gray-300">Click or drag file to upload</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileDrop}
                                disabled={isUploading || isImageLoading || isSubmitting}
                            />
                        </div>
                        {errors.icon && <p className="text-[9px] text-main font-sans mt-1">{errors.icon.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onCancelModal} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-main" disabled={isSubmitting || isUploading}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryModal;
