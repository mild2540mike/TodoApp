import { token } from "@/app/types";
import { deleteTodo, listTodo } from "@/lib/api-gateway";
import { useQuery } from "@tanstack/react-query";


export function useDeleteTodo(token: token, id: string) {
  return useQuery({
    queryKey: ['deleteTodo', id],
    queryFn: async () => {
      return deleteTodo(token, id);
    },
    enabled: !!id
  })
}
