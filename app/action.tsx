'use server'

import { authLogin } from "@/lib/api-service-server";
import { redirect } from "next/navigation";
import { login } from "./types";
import { cookies } from "next/headers";
import { setCookieValue } from "@/lib/cookie-utils";

export default async function loginAction(value: login) {
    const data = {
        username: value.username,
        password: value.password
    }

    const result = await authLogin(data);

    if (result.success) {
        cookies().set(setCookieValue(`LOGIN`, { username: result.data.username, access_token: result.data.access_token }))
        redirect('/home')
    }
    
    return {
        success: false,
        message: 'Login failed',
        errors: result.data
    }
}