import { getServerSession } from "next-auth";
import { authOptions } from "../../infrastructure/lib/auth/nextAuth";

export const getSession = () => getServerSession(authOptions);
