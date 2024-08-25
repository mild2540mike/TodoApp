
import { getTodoById } from "@/lib/api-service-server";
import { apiResponseError, gatewayResponse } from "@/lib/http-response";

export async function GET(request: any, context: any) {
  try {
    const headers = request.headers.get('Authorization')
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    return await gatewayResponse(request, getTodoById, headers, id);

  } catch (e: any) {
    return apiResponseError(request, `Service error: ${e.message}`, 500);
  }
}
