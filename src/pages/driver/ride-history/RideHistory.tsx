import { useState, useEffect } from "react";
import { useId } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useUserAllRidesQuery } from "@/redux/features/ride/ride.api";
import type { IRide } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function RideHistory() {
  const id = useId();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fareMin, setFareMin] = useState("");
  const [fareMax, setFareMax] = useState("");
  const [filters, setFilters] = useState({ search: "", status: "", fareMin: "", fareMax: "" });

  const queryParams: Record<string, string | number> = { page, limit };

  if (filters.search) queryParams.searchTerm = filters.search;
  if (filters.status && filters.status !== "ALL") queryParams.status = filters.status;
  if (filters.fareMin) queryParams.fareMin = filters.fareMin;
  if (filters.fareMax) queryParams.fareMax = filters.fareMax;

  const { data, isLoading, refetch } = useUserAllRidesQuery(queryParams);

  const rides: IRide[] = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };
  const totalPages = meta.totalPage || 1;

  useEffect(() => {
    refetch();
  }, [page, limit, search, status, refetch]);

  return (
    <div className="space-y-6">
      <h3 className="text-3xl mb-8">Ride History</h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Input
          placeholder="Search pickup or destination"
          className="dark:text-white max-w-52"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="max-w-48">
            <SelectValue placeholder="Select status" />
            <ChevronDownIcon className="ml-2" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="REQUESTED">Requested</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex">
          <Input
            placeholder="Min Fare"
            className="max-w-[120px] !rounded-r-none"
            value={fareMin}
            onChange={(e) => setFareMin(e.target.value)}
          />
          <Input
            placeholder="Max Fare"
            className="max-w-[120px] !rounded-l-none"
            value={fareMax}
            onChange={(e) => setFareMax(e.target.value)}
          />
        </div>

        <Button
          className="!rounded-lg text-white cursor-pointer"
          onClick={() =>
            setFilters({ search, status, fareMin, fareMax })
          }
        >
          Search
        </Button>
        <Button
          variant="secondary"
          className="!rounded-lg bg-gray-400 hover:bg-gray-400 text-white cursor-pointer"
          onClick={() => {
            setSearch("");
            setStatus("");
            setFareMin("");
            setFareMax("");
            setFilters({ search: "", status: "", fareMin: "", fareMax: "" });
            setPage(1);
          }}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <Table className="bg-white dark:bg-[#18181B] rounded-lg ">
        <TableHeader>
          <TableRow>
            <TableCell>Pickup</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Distance (km)</TableCell>
            <TableCell>Fare</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Requested At</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell className="py-8"><Skeleton className="h-[20px] w-full rounded-full" /></TableCell>
              <TableCell className="py-8"><Skeleton className="h-[20px] w-full rounded-full" /></TableCell>
              <TableCell className="py-8"><Skeleton className="h-[20px] w-full rounded-full" /></TableCell>
              <TableCell className="py-8"><Skeleton className="h-[20px] w-full rounded-full" /></TableCell>
              <TableCell className="py-8"><Skeleton className="h-[20px] w-full rounded-full" /></TableCell>
              <TableCell className="py-8"><Skeleton className="h-[20px] w-full rounded-full" /></TableCell>
            </TableRow>
          ) : rides.length ? (
            rides.map((ride: IRide) => (
              <TableRow key={ride._id || id}>
                <TableCell>{ride.pickupLocation}</TableCell>
                <TableCell>{ride.destination}</TableCell>
                <TableCell>{ride.distanceInKm}</TableCell>
                <TableCell>{ride.fare}</TableCell>
                <TableCell>{ride.status}</TableCell>
                <TableCell>
                  {new Date(ride.requestedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No rides found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <Select
            value={limit.toString()}
            onValueChange={(val) => {
              setLimit(Number(val));
              setPage(1); // reset page when limit changes
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeftIcon />
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}