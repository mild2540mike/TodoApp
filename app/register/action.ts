'use server'

import { authRegister } from "@/lib/api-service-server"; // Adjust the import as needed
import { redirect } from "next/navigation";
import { login } from "../types";

export default async function registerAction(data: login) {
  const login = {
    username: data.username,
    password: data.password
  };


  const result = await authRegister(login);

  if (result.success) redirect('/')

  return {
    success: false,
    message: 'Registration failed',
    errors: result.data
  };
}
