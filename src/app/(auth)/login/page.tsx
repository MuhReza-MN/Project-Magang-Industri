import { Metadata } from "next";
import AuthForm from "./authForm";

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Login Page for RQRE.ID Dashboard",
};

export default function LoginPage() {
  return <AuthForm />
}
