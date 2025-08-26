import { useForm, type ControllerRenderProps } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { RiLoaderLine } from "react-icons/ri";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type DistanceInputProps = {
  field: ControllerRenderProps<
    z.infer<typeof registerSchema>, 
    "distanceInKm"
  >;
};

const DistanceInput = ({ field }: DistanceInputProps) => {
  const [value, setValue] = useState(field.value || "");

  const increment = () => {
    const newValue = parseFloat(value || "0") + 0.1;
    if (newValue <= 250) {
      setValue(newValue.toFixed(1));
      field.onChange(newValue.toFixed(1));
    }
  };

  const decrement = () => {
    const newValue = parseFloat(value || "0") - 0.1;
    if (newValue >= 0.2) {
      setValue(newValue.toFixed(1));
      field.onChange(newValue.toFixed(1));
    }
  };

  return (
    <div className="flex w-full items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-9 h-9 p-0 flex items-center justify-center cursor-pointer"
        onClick={decrement}
      >
        −
      </Button>
      <Input
        className="text-center flex-1 w-full dark:text-white"
        placeholder="10.5"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*\.?\d*$/.test(val)) {
            setValue(val);
            field.onChange(val);
          }
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-9 h-9 p-0 flex items-center justify-center cursor-pointer"
        onClick={increment}
      >
        +
      </Button>
    </div>
  );
};

const registerSchema = z.object({
  pickupLocation: z
    .string()
    .nonempty({ message: "Pickup Location is required." })
    .min(2, { message: "At least 2 characters long." })
    .max(250, { message: "Name cannot exceed 50 characters." }),

  destination: z
    .string()
    .nonempty({ message: "Destination is required." })
    .min(2, { message: "At least 2 characters long." })
    .max(250, { message: "Name cannot exceed 50 characters." }),

  distanceInKm: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0.2 && num <= 250;
    },
    { message: "Distance must be a number between 0.2 and 250 km." }
  ),

  paymentMethod: z.enum(["cash", "digital_payment"], {
    message: "Payment Method is required.",
  }),
});

const RideRequestForm = () => {
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      pickupLocation: "",
      destination: "",
      distanceInKm: "",
      paymentMethod: "cash",
    },
  });

  const distance = form.watch("distanceInKm");
  const farePerKm = 20;
  const totalFare =
    distance && !isNaN(Number(distance))
      ? parseFloat((Number(distance) * farePerKm).toFixed(2))
      : 0;

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    console.log(data, "reg data");
    setIsLoginBtnLoading(true);

    // const userInfo = {
    //   name: data.name,
    //   email: data.email,
    //   phone: data.phone,
    //   password: data.password,
    // };

    // try {
    //   const result = await register(userInfo).unwrap();
    //   console.log(result);
    //   toast.success("Account created successfully!");
    //   navigate("/verify");
    // } catch (error: object | any) {
    //   toast.error(
    //     error?.data?.message || "Something went wrong. Please try again."
    //   );
    //   console.error(error);
    // } finally {
    //   setIsLoginBtnLoading(false);
    // }
  };

  return (
    <Form {...form}>
      <form
        className="px-5 py-8 bg-gray-100 dark:bg-[#18181B] border border-gray-200 dark:border-gray-800 rounded-xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h4 className="text-center font-semibold text-2xl text-gray-800 dark:text-white mb-8">
          Start your Ride
        </h4>
        <div>
          <div className="flex flex-col lg:flex-row w-full gap-5">
            <FormField
              control={form.control}
              rules={{ required: "Pickup Location is required" }}
              name="pickupLocation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label
                    className="font-medium text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="pickupLocation"
                  >
                    Pickup Location<span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      className="dark:text-white w-full"
                      placeholder="Nikunja 2. R-20, Dhaka"
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
              rules={{ required: "Destination is required" }}
              name="destination"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label
                    className="font-medium text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="destination"
                  >
                    Destination<span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      className="dark:text-white w-full"
                      placeholder="Uttra, Sector 17, Dhaka"
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
              rules={{ required: "Klomitar is required" }}
              name="distanceInKm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label
                    className="font-medium text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="distanceInKm"
                  >
                    Distance (km)<span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <DistanceInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              rules={{ required: "Payment method is required" }}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label
                    className="font-medium text-gray-600 dark:text-gray-400 text-sm"
                    htmlFor="paymentMethod"
                  >
                    Payment Method<span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="cash" id="r1" />
                        <Label htmlFor="r1">Cash</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="digital_payment" id="r2" />
                        <Label htmlFor="r2">Digital Payment</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-center mt-5 text-2xl font-semibold">
            Total {totalFare} tk
          </p>
          <div className="text-center mt-4">
            <Button
              disabled={isLoginBtnLoading}
              type="submit"
              className={`h-11 !rounded-lg mt-3 text-white cursor-pointer ${
                isLoginBtnLoading && "pointer-events-none"
              }`}
            >
              {isLoginBtnLoading && (
                <RiLoaderLine className="w-4 h-4 animate-spin" />
              )}{" "}
              Request
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RideRequestForm;