/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaRegUserCircle } from "react-icons/fa";
import { IoArrowDownCircle } from "react-icons/io5";
import { MdOutlinePhone, MdOutlineShareLocation } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAllRidesQuery } from "@/redux/features/ride/ride.api";
import type { IRide } from "@/types";
import type { RideStatus } from "@/types";

const rideStatusSchema = z
    .object({
        status: z.enum([
            "ACCEPTED",
            "PICKED_UP",
            "IN_TRANSIT",
            "COMPLETED",
            "CANCELLED",
        ])
    });

const IncomingRequests = () => {
    const { data, isLoading } = useAllRidesQuery(undefined);
    // const [updateRideStatus] = useUpdateRideStatusMutation();
    // const [cancelRide] = useCancelRideMutation();
    const greenStatuses: RideStatus[] = ["ACCEPTED", "PICKED_UP", "IN_PROGRESS", "COMPLETED"];
    console.log(data?.data);

    const form = useForm<z.infer<typeof rideStatusSchema>>({
        resolver: zodResolver(rideStatusSchema),
        defaultValues: {
            status: undefined,
        },
    });

    const onSubmit = (data: z.infer<typeof rideStatusSchema>) => {
        console.log("Updated Ride Status:", data.status);
    };

    return (
        <div>
            {isLoading && <p className="text-center py-16">Loading...</p>}
            {data?.data?.data?.map((ride: IRide) => (
                <div key={ride?._id} className='bg-white mb-5 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col md:flex-row gap-6 justify-between'>
                    <ul className="w-full">
                        <li className="flex items-center space-x-2">
                            <span><IoArrowDownCircle size={28} className="text-green-400" /></span>
                            <p className="text-base"><span className="font-semibold text-gray-400 dark:text-gray-600">From:</span> {ride?.pickupLocation}</p>
                        </li>
                        <div className="h-6 w-1 border-l-2 border-dashed border-gray-300 my-2 ml-3"></div>
                        <li className="flex items-center space-x-2">
                            <span><MdOutlineShareLocation size={28} className="text-gray-600" /></span>
                            <p className="text-base"><span className="font-semibold text-gray-400 dark:text-gray-600">To:</span> {ride?.destination}</p>
                        </li>
                    </ul>

                    <div className="w-full">
                        <div className="flex items-center space-x-2">
                            <span><FaRegUserCircle size={28} className="text-gray-600 dark:text-gray-400" /></span>
                            <p>{ride?.riderName}</p>
                        </div>
                        <p className="text-sm flex items-center gap-2 mt-4"><span><MdOutlinePhone size={20} /></span> {ride?.riderPhone}</p>
                        <p className="text-sm mt-1">Total Km: {ride?.distanceInKm}</p>
                        <p className="text-sm mt-1">Fare: {ride?.fare}</p>
                    </div>

                    <div className="w-full">
                        <Form {...form}>
                            <p className="mb-2">
                                <span>Ride Status:{" "}</span>
                                <span className={`${greenStatuses.includes(ride?.status as any)
                                    ? "text-green-600"
                                    : "text-red-600"} text-sm`}>{ride?.status}</span>
                            </p>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select ride status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="ACCEPTED">Accepted</SelectItem>
                                                            <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                                                            <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                                                            <SelectItem value="COMPLETED">Completed</SelectItem>
                                                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="mt-3 w-full text-white">
                                    Update Status
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IncomingRequests;