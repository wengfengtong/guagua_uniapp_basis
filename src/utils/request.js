import {
  baseUrl
} from '../config/index.js';

import {
  setToken,
  getToken,
  removeToken
} from './auth.js';

import { showModal, showToast } from "./util";

class HTTP {
  request({
    url,
    method = "GET",
    data,
    options
  }) {

    // 容错处理1  判断是否有url
    if (!url) {
      console.error('request need url')
      throw new Error({
        source: 'http class',
        message: 'request need url',
      })
    }

    // 大小写容错
    method = method.toLowerCase()

    if (options && options.loading) {
      //是否需要加载中
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    return new Promise((resolve, reject) => {
      //缓存中的token信息
      let Authorization;
      // auth 处理
      if (url === 'cms/user/refresh') {
        const refreshToken = getToken('refresh_token')
        if (!refreshToken) {
          return new Error('获取refresh_token异常！')
        }
        Authorization = refreshToken
      } else {
        // 有access_token
        const accessToken = getToken('access_token')
        if (!accessToken) {
          return new Error('获取access_token异常！')
        }
        Authorization = accessToken
      }

      /** 此处可配置一下拦截*/
      if (!url.startsWith('http')) {
        url = (options && options.baseUrl) ? options.baseUrl + url : baseUrl + url;
      }

      //发起请求
      uni.request({
        url: url,
        method,
        data,
        header: {
          'content-type': options && options.contentType ? options.contentType : 'application/json',
          token: Authorization
        },
        success: res => {
          //取消加载中的loading
          if (options && options.loading) {
            uni.hideLoading();
          }
          let code = res.status || res.statusCode,
            msg = res.data.msg;
          code = code.toString()
          //状态码以2/3开头,返回请求成功
          if (code.startsWith('2') || code.startsWith('3')) {
            resolve(res.data)
          } else if (code.startsWith('4')) {
            if (code == "401") {
              removeToken()
              uni.removeStorage({
                key: 'userInfo',
              })
              // 提示跳转
              showToast({
                msg: '登录已失效,请重新登录',
                delayed: 1500
              }).then(() => {
                const pages = getCurrentPages()
                let path = pages[pages.length - 1].route;
                if (path != "pages/login/index") {
                  uni.redirectTo({
                    url: "/pages/login/index"
                  })
                }
              })
            }
          } else if (code.startsWith('5')) {
            showToast({ msg, delayed: 1500 }).then(res => {
              reject(res.data)
            })
          }
        },
        //请求失败的回调
        fail: err => {
          reject(err);
        }
      });
    });
  }

}

export default HTTP;
