import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'
import globalConfig from '../config';

// message 全局配置
message.config({
  top: 50,
});
//
// axios.defaults.baseURL = globalConfig.getAPIPath();
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//
// const fetch = (url, options) => {
//   const { method = 'get', data } = options
//   switch (method.toLowerCase()) {
//     case 'get':
//       return axios.get(url, { params: data })
//     case 'delete':
//       return axios.delete(url, { data })
//     case 'head':
//       return axios.head(url, data)
//     case 'post':
//       return axios.post(url, stringify(data), { headers:{'content-type': 'application/json'} });
//     case 'put':
//       return axios.put(url, stringify(data))
//     case 'patch':
//       return axios.patch(url, data)
//     default:
//       return axios(options)
//   }
// }
//
// function checkStatus (res) {
//   if (res.status >= 200 && res.status < 300) {
//     return res
//   }
//   //如果是未登录
//
//
//   const error = new Error(res.statusText)
//   error.response = res
//   throw error
// }

// function handelData (res) {
//   const data = res.data
//   if (data && data.msg && !data.success) {
//     message.error(data.msg)
//   }
//   // else if(data && data.msg && data.success) {
//   //   message.success(data.msg)
//   // }
//   return { ...data, success: data.success || data.message === 'Success' }
// }

// function handleError (error) {
//   const data = error.response.data || error.response;
//   if (error.response.status == 401) {
//     message.error('登录超时！', 2);
//     setTimeout(()=> {
//       window.location.href = `${globalConfig.sso[process.env.NODE_ENV]}${globalConfig.login.ssoUrl}`;
//     }, 2000);
//
//   }
//   if (data.errors) {
//     message.error(`${data.message}：${data.errors}`, 5)
//   } else if (data.error) {
//     message.error(`${data.error}：${data.error_description}`, 5)
//   } else {
//     message.error('未知错误！', 5)
//   }
//
//   return { success: false }
// }
//
// export default function request (url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(handelData)
//     .catch(handleError)
// }
//
// export function get(url, options) {
//   return request(url, { ...options, method: 'get' })
// }
//
// export function post(url, options) {
//   return request(url, { ...options, method: 'post' })
// }
//
// export function put(url, options) {
//   return request(url, { ...options, method: 'put' })
// }
//
// export function deleted(url, options) {
//   return request(url, { ...options, method: 'deleted' })
// }

//设置全局axios默认值
axios.defaults.timeout = 5000;  //5000的超时验证
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instant = axios.create();
instant.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instant.interceptors.request.use;

function handleServerResponse(promise) {
  return new Promise((resolve, reject) => {
    promise.then(res => {
      if (res && res.data){
        resolve(res.data);
      } else {
        resolve(res);
      }
    }).catch(data => {
      if (data.errors) {
        message.error(`${data.message}：${data.errors}`, 5)
      } else if (data.error) {
        message.error(`${data.error}：${data.error_description}`, 5)
      } else {
        message.error('未知错误！', 5)
      }
    });
  });
}

export function post(url, params) {
  return handleServerResponse(instant.post(globalConfig.getAPIPath() + url, qs.stringify(params)))
}

export function get(url, params) {
  return handleServerResponse(instant.get(globalConfig.getAPIPath() + url, qs.stringify(params)))
}

