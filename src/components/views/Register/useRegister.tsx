import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authServices from "@/services/auth";
import { IRegister } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("Fullname is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
        .test(
            "at-least-one-uppercase", 
            "Password must contain at least one uppercase letter", 
            (value) => /[A-Z]/.test(value ?? "")
        )
        .test(
            "at-least-one-number", 
            "Password must contain at least one number", 
            (value) => /[0-9]/.test(value ?? "")
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Passwords must match")
        .required("Confirm Password is required"),
});

const useRegister = () => {
    const router = useRouter();
    const {
        control, 
        handleSubmit, 
        formState: {errors}, 
        reset, 
        setError
    } = useForm({resolver: yupResolver(registerSchema)});

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result;
    };

    const {mutate: mutateRegister, isPending: isPendingRegister} = useMutation({
        mutationFn: registerService,        
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message;
            const field = error.response?.data?.field;

            if (field) {
                setError(field, { message });
            } else {
                setError("root", { message });
            }
        },

        onSuccess: () => {
            router.push("/auth/register/success");
            reset();
        },
    })

    const handleRegister = (data: IRegister) => mutateRegister(data)

    return {
        control,
        handleSubmit,
        errors,
        handleRegister,
        isPendingRegister
    }
}

export default useRegister