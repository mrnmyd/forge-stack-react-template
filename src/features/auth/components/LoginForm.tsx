import { FormInput } from "@/components/form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@/lib/zod-resolver"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useLogin } from "../hooks/useLogin"
import { loginSchema, type LoginFormInputs } from "../schemas/login.schema"

export function LoginForm() {
    const navigate = useNavigate()

    const form = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailOrMobile: "",
            password: "",
        },
    })

    const { mutate, isPending } = useLogin()

    const onSubmit = (values: LoginFormInputs) => {
        mutate(values, {
            onSuccess: () => {
                toast.success("Login successful")
                navigate("/") // or dashboard route
            },
            onError: () => {
                toast.error("Invalid credentials")
            },
        })
    }

    return (
        <Form {...form}> <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
        >
            <FormInput<LoginFormInputs>
                name="emailOrMobile"
                label="Email or Mobile"
                placeholder="Enter email or mobile number"
            />
            <FormInput<LoginFormInputs>
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                {isPending ? "Signing in..." : "Sign In"}
            </Button>
        </form>
        </Form>
    )
}
