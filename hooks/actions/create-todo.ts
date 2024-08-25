import { Todo, token } from "@/app/types";
import { addTodo } from "@/lib/api-gateway";
import { useQuery } from "@tanstack/react-query";


export function useAddTodo(token: token, data: Todo) {
  return useQuery({
    queryKey: ['addTodo', data.title, data.description],
    queryFn: async () => {
      return addTodo(token, data);
    }
  })
}
