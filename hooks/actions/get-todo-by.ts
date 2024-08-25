import { token } from "@/app/types";
import { getTodoById } from "@/lib/api-gateway";
import { useQuery } from "@tanstack/react-query";


export function useGetTodoById(token: token, rafashToken: string, id: string) {
  return useQuery({
    queryKey: ['useGetTodoById', token, rafashToken, id],
    queryFn: async () => {
      return getTodoById(token, id);
    }
  })
}
