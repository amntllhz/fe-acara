import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constanta";
import { IFileURL } from "@/types/file";

const uploadService = {
    uploadFile: (payload: FormData) => instance.post(`${endpoint.MEDIA}/upload-single`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    deleteFile: (payload: IFileURL) => instance.delete(`${endpoint.MEDIA}/remove`, { data: payload })
}

export default uploadService