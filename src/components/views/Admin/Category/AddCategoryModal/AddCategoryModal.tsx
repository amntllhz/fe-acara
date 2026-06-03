import Image from "next/image";
import { Controller } from "react-hook-form";
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
import { RiEdit2Line, RiExchange2Line } from "react-icons/ri";
import { useAddCategoryModal } from "./useAddCategoryModal";
import { BsFileEarmarkImage } from "react-icons/bs";

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const AddCategoryModal = ({ isOpen, onClose, onSuccess }: AddCategoryModalProps) => {
    const {
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
        onSubmit
    } = useAddCategoryModal(onClose, onSuccess);

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
                                <TextArea {...field} aria-label="description" placeholder="Category Description" className={`input rounded-md placeholder-gray-300 shadow-none ring-1 h-16 w-full text-xs font-sans ${fieldState.error ? "ring-main" : "ring-gray-200/75"}`} />
                                {fieldState.error && <p className="text-[9px] text-main font-sans mt-1">{fieldState.error.message}</p>}
                            </>
                        )} />
                    </div>

                    <div>
                        <Label className="text-xs mb-1.5">Icon</Label>

                        {/* Dropzone — hanya tampil saat belum ada file */}
                        {!isUploading && !uploadedFile && !iconUrl && (
                            <div className={`relative mt-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition ${errors.icon ? "border-main" : "border-gray-200/75"}`}>
                                <div className="flex flex-col items-center gap-2">
                                    <LuImageUp className="h-10 w-10 text-main" />
                                    <div className="flex flex-col gap-1 justify-center items-center">
                                        <p className="text-[11px] text-foreground">Click or drop file to upload</p>
                                        <p className="text-[9px] text-gray-300">PNG or JPG max 10MB</p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileDrop}
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}

                        {/* Progress UI — tampil saat uploading */}
                        {(isUploading || (uploadedFile && !iconUrl)) && uploadedFile && (
                            <div className="mt-1 flex flex-col border border-gray-200/75 rounded-lg p-3 gap-3">
                                <div className="flex gap-3">
                                    <div className="shrink-0 w-9 h-9 rounded-md bg-main/5 flex items-center justify-center">
                                        <BsFileEarmarkImage className="w-4 h-4 text-main" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <p className="text-[11px] font-medium text-foreground truncate">{uploadedFile.name}</p>
                                        <p className="text-[10px] text-muted-foreground shrink-0">
                                            {formatFileSize(uploadedFile.size)} · {uploadProgress}%
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-main rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Preview — tampil setelah upload selesai */}
                        {iconUrl && !isUploading && (
                            <div className="relative mt-1 border border-gray-200/75 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
                                <div className="shrink-0 w-9 h-9 rounded-md p-0.5 overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {isImageLoading && <div className="w-full h-full rounded-md bg-gray-100 animate-pulse" />}
                                    <Image
                                        src={iconUrl}
                                        alt="Preview"
                                        width={36}
                                        height={36}
                                        className={`object-cover rounded-sm w-9 h-9 p-0.5 ring ring-gray-100 transition-opacity duration-300 ${isImageLoading ? "opacity-0 absolute" : "opacity-100"}`}
                                        onLoad={() => setIsImageLoading(false)}
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                    <p className="text-[11px] font-medium text-foreground truncate">{uploadedFile?.name}</p>
                                    <p className="text-[10px] text-muted-foreground">{uploadedFile && formatFileSize(uploadedFile.size)}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0 bg-main/5 p-2 rounded-sm">
                                    <RiEdit2Line className="h-4 w-4 text-main" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileDrop}
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}

                        {errors.icon && <p className="text-[9px] text-main font-sans mt-1">{errors.icon.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onCancelModal} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-main px-5" disabled={isSubmitting || isUploading}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryModal;