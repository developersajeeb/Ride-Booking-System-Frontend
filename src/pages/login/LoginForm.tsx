import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { config } from "@/config";
import { useState } from "react";
import { RiLoaderLine } from "react-icons/ri";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const form = useForm();
  const [login] = useLoginMutation();
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoginBtnLoading(true);
    try {
      const res = await login(data).unwrap();
      console.log(res);
      if (res?.data?.user?.role === "DRIVER" && !res?.data?.user?.isApproved) {
        setShowApprovalDialog(true);
        setIsLoginBtnLoading(false);
        form.reset();
        return;
      }
      toast.success("Login Successfully");
      form.reset();
      navigate("/");
      setIsLoginBtnLoading(false);
    } catch (err) {
      console.error(err);
      const error = err as { data: { message: string } };

      if (error.data.message === "Password does not match") {
        toast.error("Invalid credentials");
      }

      if (error.data.message === "User does not exist") {
        toast.error("User does not exist");
      }

      if (error.data.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/");
      }
    } finally {
      setIsLoginBtnLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-[380px] border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-800 dark:bg-[#18181B]",
        className
      )}
      {...props}
    >
      <Form {...form}>
        <form className="px-5 py-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center text-center mb-3">
              <h1 className="text-3xl font-bold dark:text-white">
                Welcome back
              </h1>
              <p className="text-muted-foreground font-medium text-balance dark:text-gray-200">
                Login to your account
              </p>
            </div>

            <FormField
              control={form.control}
              rules={{ required: "Email is required" }}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <Label
                    className="font-semibold text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="email"
                  >
                    Email
                  </Label>
                  <FormControl>
                    <Input
                      className="dark:text-white"
                      placeholder="sajeeb@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              rules={{ required: "Password is required" }}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Label
                      className="font-semibold text-gray-600 dark:text-gray-400 text-sm"
                      htmlFor="password"
                    >
                      Password
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="ml-auto text-xs underline-offset-2 hover:underline dark:text-gray-300"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      className="dark:text-white"
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoginBtnLoading}
              type="submit"
              className={`h-11 !rounded-lg mt-3 text-white ${
                isLoginBtnLoading && "pointer-events-none"
              }`}
            >
              {isLoginBtnLoading && (
                <RiLoaderLine className="w-4 h-4 animate-spin" />
              )}{" "}
              Login
            </Button>
            <div className="text-center">
              <span className="font-semibold bg-primary-50 text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="mb-3">
              <Button
                onClick={() =>
                  window.open(`${config.baseUrl}/auth/google`, "_self")
                }
                variant="outline"
                type="button"
                className="w-full cursor-pointer dark:text-white"
              >
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
              <Link
                to="/registration"
                className="underline underline-offset-4 hover:text-primary-500 duration-300"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </Form>

      <AlertDialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account Pending Approval</AlertDialogTitle>
            <AlertDialogDescription>
              Your driver account is not approved yet. Please wait until an admin approves your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowApprovalDialog(false)}>
              Close
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowApprovalDialog(false)}>
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}