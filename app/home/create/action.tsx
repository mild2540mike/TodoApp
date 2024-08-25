'use server'

import { addTodo } from "@/lib/api-service-server";
import { redirect } from "next/navigation";
import { Todo, token } from "@/app/types";

export default async function addTodoction(token: token, value: Todo) {
    const data = {
        title: value.title,
        description: value.description
    }

    const result = await addTodo(token, data);

    if (result.isSuccess) {
        redirect('/home')
    }
    
    return {
        success: false,
        message: 'create failed',
        errors: result.data
    }
}