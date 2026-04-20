import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
    identifier: yup.string().required("Please enter your email or username"),    
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")        
});

const useLogin = () => {
    const router = useRouter();
    const {
        control, 
        handleSubmit, 
        formState: {errors}, 
        reset, 
        setError
    } = useForm({resolver: yupResolver(loginSchema), 
        defaultValues: {
            identifier: "",
            password: ""
        }
    });

    const callbackUrl: string = (router.query.callbackUrl as string) || "/";

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload, 
            redirect: false, 
            callbackUrl,
        });

        if (result?.error && result.status === 401) {
            throw new Error("Your email or password is incorrect.");
        }
    };

    const {mutate: mutateLogin, isPending: isPendingLogin} = useMutation({
        mutationFn: loginService,        
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
            router.push(callbackUrl);
            reset();
        },
    })

    const handleLogin = (data: ILogin) => mutateLogin(data)

    return {
        control,
        handleSubmit,
        errors,
        handleLogin,
        isPendingLogin
    }
}

export default useLogin