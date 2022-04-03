/*
 *
 * axios
 *
 * */

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.baseURL = "/api";

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

/* 记录当前请求是否完成 */
window.currentResq = {
  done: true,
  config: {},
};

axios.interceptors.request.use(
  (config) => {
    clearTimeout(resqTimer);
    window.currentResq = {
      done: false,
      config,
    };
    // 接口请求时长超过3s，则视为完成，不管请求结果成功或失败
    resqTimer = setTimeout(() => {
      window.currentResq = {
        done: true,
        config: {},
      };
    }, 3000);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    const { config } = window.currentResq;
    const { url, method, data } = response.config;
    if (
      config.url === url &&
      config.method === method &&
      config.data === data
    ) {
      clearTimeout(resqTimer);
      window.currentResq.done = true;
    }

    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    return Promise.reject(err);
  }
);

/*
 * 指令
 * */

let forbidClick = null;
export default {
  bind(e) {
    const el = e;
    let timer = null;
    forbidClick = () => {
      el.disabled = true;
      el.classList.add("is-disabled");
      timer = setInterval(() => {
        if (window.currentResq.done) {
          clearInterval(timer);
          el.disabled = false;
          el.classList.remove("is-disabled");
        }
      }, 500);
    };
    el.addEventListener("click", forbidClick);
  },
  unbind() {
    document.removeEventListener("click", forbidClick);
  },
};
