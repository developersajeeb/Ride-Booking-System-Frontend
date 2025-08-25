import type { ComponentType } from "react";
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