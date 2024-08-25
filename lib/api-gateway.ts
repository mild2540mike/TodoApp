import { Todo, token } from "@/app/types";
import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_TODO_BASE_URL

function setAuthHeader(headers: token) {
    return Promise.resolve({
        Authorization: `Bearer ${headers.access_token}`,
    });
}

function httpGet(url: string, headers: token) {
    return setAuthHeader(headers).then(function (auth: any) {
        return axios
            .get(url, {
                headers: {
                    ...auth,
                },
            })
            .catch((e) => {
                return { success: false, data: null };
            });
    });
}

function httpPost(url: string, headers: token, data = {}) {
    return setAuthHeader(headers).then(function (auth) {
      return axios
        .request({
          method: "post",
          url: url,
          headers: {
            ...auth
          },
          data,
        })
        .catch((e) => {
          return { success: false, data: null };
        });
    });
  }

function httpDelete(url: string, headers: token) {
    return setAuthHeader(headers).then(function (auth: any) {
        return axios
            .delete(url, {
                headers: {
                    ...auth,
                },
            })
            .catch((e) => {
                return { success: false, data: null };
            });
    });
}

// create function http patch
function httpPatch(url: string, headers: token) {
    return setAuthHeader(headers).then(function (auth: any) {
        return axios
            .patch(url, {
                headers: {
                    ...auth,
                },
            })
            .catch((e) => {
                return { success: false, data: null };
            });
    });
}

function getTodoById(token: token, id: string) {
    return httpGet(`${API_ENDPOINT}/api/gateway/todo/get?id=${id}`, token).then(function (response) {
        return response.data.data;
      }
    );
  }

function listTodo(token: token) {
    return httpGet(`${API_ENDPOINT}/api/gateway/todo`, token).then(function (response) {
        return response.data;
      }
    );
  }

function deleteTodo(token: token, id: string) {
    return httpDelete(`${API_ENDPOINT}/api/gateway/todo/delete?id=${id}`, token).then(function (response) {
        return response.data;
      }
    );
  }

function addTodo(token: token, data: Todo) {
    return httpPost(`${API_ENDPOINT}/api/gateway/todo/add`, token, data).then(function (response) {
        return response.data;
      }
    );
  }

  function editTodo(token: token, id: string) {
    return httpPatch(`${API_ENDPOINT}/todo/${id}`, token).then(function (response) {
        return response.data;
      }
    );
  }




export { 
    listTodo,
    deleteTodo,
    addTodo,
    getTodoById,
    editTodo,
};