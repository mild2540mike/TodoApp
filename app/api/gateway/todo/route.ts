
import { listTodo } from "@/lib/api-service-server";
import { apiResponseError, gatewayResponse } from "@/lib/http-response";

export async function GET(request: any, context: any) {
  try {
    const headers = request.headers.get('Authorization');
    
    return await gatewayResponse(request, listTodo, headers, {});

  } catch (e: any) {
    return apiResponseError(request, `Service error: ${e.message}`, 500);
  }
}
