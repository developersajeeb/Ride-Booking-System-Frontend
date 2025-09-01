import type { ComponentType, Key } from "react";
import type { IconType } from "react-icons/lib";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
    icon?: IconType;
    iconClassName?: string;
    iconSize?: number;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export type RideStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface IRide {
  _id: Key | null | undefined;
  rider: string;
  riderName: string;
  riderEmail: string;
  riderPhone?: string;
  vehicleType: string;
  pickupLocation: string;
  destination: string;
  status: RideStatus;
  driver?: string;
  driverName?: string;
  driverEmail?: string;
  driverPhone?: string;
  fare?: number;
  requestedAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  distanceInKm?: number;
  paymentMethod?: "cash" | "digital_payment";
}