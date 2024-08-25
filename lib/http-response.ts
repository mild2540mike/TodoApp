const apiResponseAll = async (
  res: any,
  data: any,
  statusCode = 200,
  responseHeaders = {},
  message404 = "Not founded"
) => {
  if (data === null) {
    return apiResponse404(res, statusCode, responseHeaders, message404);
  } else {
    return apiResponse(res, data, statusCode, responseHeaders);
  }
};

const apiResponse = (res: any, data: any, statusCode = 200, responseHeaders = {}) =>
  Response.json(
    {
      success: true,
      code: 200,
      message: "",
      data,
    },
    { status: statusCode }
  );


const apiResponse404 = (
  res: any,
  statusCode = 404,
  responseHeaders = {},
  message = "Not founded"
) =>
  Response.json(
    {
      success: false,
      code: 404,
      message: message,
      data: [],
    },
    { status: statusCode }
  );

const apiResponseError = (
  res: any,
  data = "",
  statusCode = 404,
  responseHeaders = {}
) => {
  return Response.json(
    {
      success: false,
      code: statusCode,
      message: "Error",
      data,
    },
    { status: statusCode }
  );
};


async function gatewayResponse(request: any, functionName: any, headers: any, data: any) {
  try {
    let result = await functionName(headers, data);
    // console.log(functionName, 'Body: ' + JSON.stringify(data), result);

    if (result?.success) {
      return apiResponseAll(request, result.data);
    }

    return apiResponseError(request, result.data, 200);
  } catch (e: any) {
    return apiResponseError(request, `Service error: ${e.message}`, 500);
  }
}

export {
  apiResponse,
  apiResponse404,
  apiResponseError,
  apiResponseAll,
  gatewayResponse,
};
