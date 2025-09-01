/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateProfileInfoMutation } from "@/redux/features/ride/ride.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { RiLoaderLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import z from "zod";

const updateProfileSchema = z
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
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password at least 6 characters long.",
      })
      .refine((val) => !val || /^(?=.*[A-Z])/.test(val), {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .refine((val) => !val || /^(?=.*[!@#$%^&*])/.test(val), {
        message: "Password must contain at least 1 special character.",
      })
      .refine((val) => !val || /^(?=.*\d)/.test(val), {
        message: "Password must contain at least 1 number.",
      }),
  })

const DriverProfile = () => {
  const { data } = useUserInfoQuery(undefined);
  const [updateProfileInfo] = useUpdateProfileInfoMutation();
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
  const [profileEditForm, setProfileEditForm] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: data?.data?.name || "",
      phone: data?.data?.phone || "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    setIsLoginBtnLoading(true);
    try {
      const payload: any = {
        name: values.name,
        phone: values.phone,
      };
      if (values.password) payload.password = values.password;

      const res = await updateProfileInfo(payload).unwrap();
      toast.success("Profile Updated Successfully");
      setProfileEditForm(false);
      form.reset({
        name: res?.data?.name || values.name,
        phone: res?.data?.phone || values.phone,
        password: "",
      });
    } catch (err: any) {
      console.error(err);
      const msg = err?.data?.message || "Failed to update profile";
      toast.error(msg);
    } finally {
      setIsLoginBtnLoading(false);
    }
  };

  return (
    <section>
      <div className="w-24 h-24 flex items-center justify-center text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1b1b1d] bg border rounded-lg">
        <FaRegUser size={40} />
      </div>
      <p className="text-xl mt-4 mb-2">
        {data?.data?.name}{" "}
        {data?.data?.onlineStatus === "offline" ? (
          <span className="text-red-600 dark:text-red-500 text-xs bg-red-200 dark:bg-red-950 px-2 py-1 rounded-full">
            Offline
          </span>
        ) : (
          <span className="text-green-600 dark:text-green-500 text-xs bg-green-200 dark:bg-green-950 px-2 py-1 rounded-full">
            Online
          </span>
        )}{" "}
        {data?.data?.isBlocked && (
          <span className="text-red-600 dark:text-red-500 text-xs bg-red-200 dark:bg-red-950 px-2 py-1 rounded-full ml-1 inline-flex items-center gap-1">
            <span>
              <RxCross2 />
            </span>{" "}
            Blocked
          </span>
        )}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {data?.data?.email}
      </p>
      <Button onClick={() => setProfileEditForm(!profileEditForm)} className="text-white cursor-pointer mt-5">Edit Profile</Button>

      {profileEditForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-56 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label
                    className="font-semibold text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="name"
                  >
                    Name<span className="text-destructive text-base">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      className="dark:text-white"
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <Label
                    className="font-semibold text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="phone"
                  >
                    Phone<span className="text-destructive text-base">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      className="dark:text-white"
                      placeholder="01XXXXXXXXX"
                      {...field}
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
                <FormItem>
                  <Label
                    className="font-semibold text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="password"
                  >
                    New Password
                  </Label>
                  <FormControl>
                    <Input
                      className="dark:text-white"
                      placeholder="Enter new password"
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
              className={`w-full !rounded-lg text-white cursor-pointer ${isLoginBtnLoading && "pointer-events-none"
                }`}
            >
              {isLoginBtnLoading && (
                <RiLoaderLine className="animate-spin" />
              )}{" "}
              Update
            </Button>
          </form>
        </Form>
      )}
    </section>
  );
};

export default DriverProfile;