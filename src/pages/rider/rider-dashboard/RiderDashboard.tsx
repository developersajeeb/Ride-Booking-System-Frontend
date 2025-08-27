import RideRequestForm from "@/components/shared/RideRequestForm";
import { PiCar } from "react-icons/pi";
import { RiSteeringFill } from "react-icons/ri";
import { TbMoneybag, TbMotorbike } from "react-icons/tb";

const RiderDashboard = () => {
  return (
    <>
      <h3 className="text-3xl mb-8">Hello 👋</h3>
      <RideRequestForm />
      <section className="mt-5 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-xl">
            <span className="inline-flex justify-center items-center rounded-full bg-gray-100 dark:bg-[#18181B] w-14 h-14 text-gray-600 dark:text-gray-400"><RiSteeringFill size={30} /></span>
            <h5 className="mt-5 text-base mb-1 text-gray-400 dark:text-gray-400">Total Ride</h5>
            <p className="text-3xl font-bold">20</p>
        </div>
        <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-xl">
            <span className="inline-flex justify-center items-center rounded-full bg-gray-100 dark:bg-[#18181B] w-14 h-14 text-gray-600 dark:text-gray-400"><PiCar size={30} /></span>
            <h5 className="mt-5 text-base mb-1 text-gray-400 dark:text-gray-400">Total Car Ride</h5>
            <p className="text-3xl font-bold">20</p>
        </div>
        <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-xl">
            <span className="inline-flex justify-center items-center rounded-full bg-gray-100 dark:bg-[#18181B] w-14 h-14 text-gray-600 dark:text-gray-400"><TbMotorbike size={30} /></span>
            <h5 className="mt-5 text-base mb-1 text-gray-400 dark:text-gray-400">Total Bike Ride</h5>
            <p className="text-3xl font-bold">20</p>
        </div>
        <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-xl">
            <span className="inline-flex justify-center items-center rounded-full bg-gray-100 dark:bg-[#18181B] w-14 h-14 text-gray-600 dark:text-gray-400"><TbMoneybag size={30} /></span>
            <h5 className="mt-5 text-base mb-1 text-gray-400 dark:text-gray-400">Total Cost</h5>
            <p className="text-3xl font-bold">20 TK</p>
        </div>
      </section>
    </>
  );
};

export default RiderDashboard;