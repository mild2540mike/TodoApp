
import { addTodo } from "@/lib/api-service-server";
import { apiResponseError, gatewayResponse } from "@/lib/http-response";

export async function POST(request: any, context: any) {
  try {
    const headers = request.headers.get('Authorization');
    const val = await request.json();
    const data = { title: val.title, description: val.description }
    return await gatewayResponse(request, addTodo, headers, data);

  } catch (e: any) {
    return apiResponseError(request, `Service error: ${e.message}`, 500);
  }
}
