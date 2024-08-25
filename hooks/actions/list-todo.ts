import { token } from "@/app/types";
import { listTodo } from "@/lib/api-gateway";
import { useQuery } from "@tanstack/react-query";


export function useListTodo(token: token, rafashToken: string) {
  return useQuery({
    queryKey: ['listTodo', rafashToken],
    queryFn: async () => {
      return listTodo(token);
    }
  })
}
