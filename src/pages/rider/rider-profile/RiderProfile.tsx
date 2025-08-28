import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { FaRegUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const RiderProfile = () => {
  const { data } = useUserInfoQuery(undefined);
  console.log(data?.data);

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
    </section>
  );
};

export default RiderProfile;