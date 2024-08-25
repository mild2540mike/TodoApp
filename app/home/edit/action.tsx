'use server'

import { addTodo, editTodo } from "@/lib/api-service-server";
import { redirect } from "next/navigation";
import { Todo, TodoResponse, token } from "@/app/types";

export default async function updateTodo(token: token, id: string, data: Todo) {

    const result: TodoResponse = await editTodo(token, id, data);

    if (result.isSuccess) {
        redirect('/home')
    }
    
    return {
        success: false,
        message: 'edit failed',
        errors: result.data
    }
}