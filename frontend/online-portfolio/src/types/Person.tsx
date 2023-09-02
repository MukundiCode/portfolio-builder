import { Portfolio } from "./Portfolio";

export interface Person {
    id: number;
    username: string;
    email: string;
    portfolio: Portfolio;
  }