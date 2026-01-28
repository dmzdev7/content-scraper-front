import { getServerSession } from "next-auth";
import { authOptions } from "./nextAuth";

export const getSession = () => getServerSession(authOptions);