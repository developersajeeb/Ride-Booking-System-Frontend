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

export default function RideHistory() {
  const id = useId();

  // States for filters and pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const queryParams: Record<string, string | number> = { page, limit };
  if (search) queryParams.search = search;
  if (status) queryParams.status = status;

  const { data, isLoading, refetch } = useUserAllRidesQuery(queryParams);

  console.log(data);

  useEffect(() => {
    console.log("Query params:", { page, limit, search, status });
  }, [page, limit, search, status]);

  // Refetch when filters change
  useEffect(() => {
    refetch();
  }, [page, limit, search, status, refetch]);

  const totalPages = Math.ceil(((data?.meta?.total ?? 0) as number) / limit);

  return (
    <div className="space-y-6">
      <h3 className="text-3xl mb-8">Ride History</h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Input
          placeholder="Search pickup or destination"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-48">
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
      </div>

      {/* Table */}
      <Table className="bg-white dark:bg-[#18181B] rounded-lg">
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
              <TableCell colSpan={6} className="text-center py-8">
                Loading...
              </TableCell>
            </TableRow>
          ) : data?.data.length ? (
            data.data.map((ride: IRide) => (
              <TableRow key={ride._id}>
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
          <Select value={limit.toString()} onValueChange={(val) => setLimit(Number(val))}>
            {[5, 10, 25, 50].map((n) => (
              <SelectContent key={n} className="w-full">
                <SelectItem value={n.toString()}>
                  {n} per page
                </SelectItem>
              </SelectContent>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeftIcon />
          </Button>
          <span>
            Page {page} of {totalPages || 1}
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