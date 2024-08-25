
import { deleteTodo } from "@/lib/api-service-server";
import { apiResponseError, gatewayResponse } from "@/lib/http-response";

export async function DELETE(request: any, context: any) {
  try {
    const headers = request.headers.get('Authorization')
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    return await gatewayResponse(request, deleteTodo, headers, id);

  } catch (e: any) {
    return apiResponseError(request, `Service error: ${e.message}`, 500);
  }
}
