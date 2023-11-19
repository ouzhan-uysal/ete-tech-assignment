import { ReactNode } from "react";

export interface ICustomTab {
  tabs: Array<{
    label: string;
    color: string;
    children: ReactNode;
  }>
}