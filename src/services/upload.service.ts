import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constanta";
import { IFileURL } from "@/types/file";

const uploadService = {
    uploadFile: (payload: FormData, onUploadProgress?: (progress: number) => void) => instance.post(`${endpoint.MEDIA}/upload-single`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            if (onUploadProgress && progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                onUploadProgress(progress)
            }
        }
    }),
    deleteFile: (payload: IFileURL) => instance.delete(`${endpoint.MEDIA}/remove`, { data: payload })
}

export default uploadService