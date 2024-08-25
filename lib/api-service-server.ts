import { login, Todo, token } from "@/app/types";
import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_TODO_API_ENDPOINT

function setAuthHeader(headers: any) {
  const bearerTokenRegex = /^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/;
  if (bearerTokenRegex.test(headers)) {
    return Promise.resolve({
      Authorization: headers,
    });
  }
  if (headers.access_token.startsWith('Bearer ')) {
    return Promise.resolve({
      Authorization: `${headers.access_token}`,
    });
  }
  return Promise.resolve({
    Authorization: `Bearer ${headers.access_token}`,
  });
}

function httpGet(url: string, headers: token) {
    return setAuthHeader(headers).then(function (auth) {
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

  function httpPatch(url: string, headers: token, data = {}) {
    return setAuthHeader(headers).then(function (auth) {
      return axios
        .request({
          method: "patch",
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
  
  function authLogin(data: login) {
    return axios
    .request({
      method: "post",
      url: `${API_ENDPOINT}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    })
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((e) => {
      return { success: false, data: null };
    });
  }

  function authRegister(data: login) {
    return axios
    .request({
      method: "post",
      url: `${API_ENDPOINT}/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    })
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((e) => {
      return { success: false, data: null };
    });
  }

  function getTodoById(token: token, id: string) {
    return httpGet(`${API_ENDPOINT}/todo/${id}`, token).then(function (response) {
        return response.data;
      }
    );
  }

  function listTodo(token: token) {
    return httpGet(`${API_ENDPOINT}/todo/all`, token).then(function (response) {
        return response.data;
      }
    );
  }

  function deleteTodo(token: token, id: string) {
    return httpDelete(`${API_ENDPOINT}/todo/${id}`, token).then(function (response) {
        return response.data;
      }
    );
  }

  function addTodo(token: token, data: Todo) {
    return httpPost(`${API_ENDPOINT}/todo`, token, data).then(function (response) {
        return response.data;
      }
    );
  }

  function editTodo(token: token, id: string, data: Todo) {
    return httpPatch(`${API_ENDPOINT}/todo/${id}`, token, data).then(function (response) {
        return response.data;
      }
    );
  }



  export { 
    httpGet, 
    httpPost, 
    authLogin,
    authRegister,
    listTodo,
    deleteTodo,
    addTodo,
    getTodoById,
    editTodo,
}