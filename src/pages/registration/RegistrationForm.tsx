/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { config } from "@/config"
import { useState } from "react"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const registerSchema = z
    .object({
        name: z
            .string()
            .nonempty({ message: "Name is required." })
            .min(2, { message: "At least 2 characters long." })
            .max(50, { message: "Name cannot exceed 50 characters." }),
        phone: z
            .string()
            .nonempty({ message: "Phone number is required." })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
                message: "Phone number Invalid.",
            }),
        email: z
            .string()
            .nonempty({ message: "Email is required." })
            .email({ message: "Invalid email address format." })
            .min(5, { message: "Email must be at least 5 characters long." })
            .max(100, { message: "Email cannot exceed 100 characters." }),
        password: z
            .string()
            .nonempty({ message: "Password is required." })
            .min(6, { message: "Password at least 6 characters long." })
            .regex(/^(?=.*[A-Z])/, {
                message: "Password must contain at least 1 uppercase letter.",
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: "Password must contain at least 1 special character.",
            })
            .regex(/^(?=.*\d)/, {
                message: "Password must contain at least 1 number.",
            }),
        confirmPassword: z
            .string()
            .nonempty({ message: "Confirm Password is required." })
            .min(6, { error: "Confirm Password is too short" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"],
    });

export function RegistrationForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();
    const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        console.log(data, 'reg data');
        setIsLoginBtnLoading(true);

        const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
        };

        try {
            const result = await register(userInfo).unwrap();
            console.log(result);
            toast.success("Account created successfully!");
            navigate("/verify");
        } catch (error: object | any) {
            toast.error(error?.data?.message || "Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setIsLoginBtnLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-[520px] border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-800 dark:bg-[#18181B]", className)} {...props}>
            <Form {...form}>
                <form className="px-5 py-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center text-center mb-3">
                            <h1 className="text-3xl font-bold dark:text-white">Hello</h1>
                            <p className="text-muted-foreground font-medium text-balance dark:text-gray-200">
                                Create your account
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 dark:text-gray-400 text-sm" htmlFor="name">Name<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <Input className="dark:text-white" placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 dark:text-gray-400 text-sm" htmlFor="phone">Phone<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <Input className="dark:text-white" placeholder="01XXXXXXXXX" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your phone number for verification, contact, etc.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="font-semibold text-gray-600 dark:text-gray-400 text-sm" htmlFor="email">Email<span className="text-destructive text-base">*</span></Label>
                                    <FormControl>
                                        <Input className="dark:text-white" placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid sm:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 dark:text-gray-400 text-sm" htmlFor="password">Password<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <Input type="password" className="dark:text-white" placeholder="Your password" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your password for authentication.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 dark:text-gray-400 text-sm" htmlFor="confirmPassword">Confirm Password<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <Input type="password" className="dark:text-white" placeholder="Re-type password" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your re enter password for authentication.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className={`h-11 !rounded-lg mt-3 text-white ${isLoginBtnLoading && 'pointer-events-none'}`}>
                            Sign Up
                        </Button>

                        <div className="text-center">
                            <span className="font-semibold bg-primary-50 text-muted-foreground relative z-10 px-2">
                                Or continue with
                            </span>
                        </div>
                        <div className="mb-3">
                            <Button onClick={() => window.open(`${config.baseUrl}/auth/google`, "_self")} variant="outline" type="button" className="w-full cursor-pointer dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="sr-only">Login with Google</span>
                            </Button>
                        </div>
                        <div className="text-center text-base dark:text-white">
                            Don&apos;t have an account?{" "}
                            <Link to="/registration" className="underline underline-offset-4 hover:text-primary-500 duration-300">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}