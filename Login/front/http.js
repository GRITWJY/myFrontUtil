// axios 的封装函数

import axios from "axios";
import { Message } from "element-ui";
import { uuid, md5 } from "util";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

// create an axios instance
const service = axios.create({
  baseURL: common.BASE_URL,
  timeout: 10000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // timestamp时间戳
    let timestamp = new Date().getTime();
    // 随机字符串
    let nonce = uuid(8);

    const md5 = crypto.createHash("md5");
    config.headers["nonce"] = nonce;
    config.headers["timestamp"] = timestamp;
    config.headers["sign"] = md5("fdafasfasfdasfasfafasf" + timestamp + nonce);

    let token = storage.getItem("Authorization");
    // 登录时不需要token，其他情况一律都需要token
    if (config.url !== "/auth/login") {
      config.headers["authorization"] =
        JSON.stringify(token) === "{}" ? "" : token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data.code === "10001" || response.data.code === "10002") {
      router.push({
        name: "Login",
      });
      Message.error(response.data.msg);
      return;
    }

    if (response.headers.authorization) {
      storage.setItem("Authorization", response.headers.authorization);
    }

    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
