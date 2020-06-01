import v from './validate'

// 获取AccessToken
export function getAccessToken() {
  try {
    return uni.getStorageSync("access_token") || null;
  } catch (e) {
    console.error("getAccessToken 异常！")
  }
}

/**
 * 设置AccessToken
 * @param {*} value 
 */
export function setAccessToken(value) {
  if (!value) {
    throw Error("value值不能为空！")
  }
  uni.setStorage({
    key: 'access_token',
    data: value,
    success: (res) => {
      console.log('set access_token success!', res);
    },
    fail: (err) => {
      console.error('set access_token fail', err);
    }
  });
}

// 移除AccessToken
export function removeAccessToken() {
  uni.removeStorage({
    key: 'access_token',
    success: (res) => {
      console.log('remove access_token success', res);
    },
    fail: (err) => {
      console.error('remove access_token fail', err);
    }
  });
}

// 获取RefreshToken
export function getRefreshToken() {
  try {
    return uni.getStorageSync("refresh_token") || null;
  } catch (e) {
    console.error("getRefreshToken 异常！")
  }
}

/**
 * 设置RefreshToken
 * @param {*} value 
 */
export function setRefreshToken(value) {
  if (!value) {
    throw Error("value值不能为空！")
  }
  uni.setStorage({
    key: 'refresh_token',
    data: value,
    success: (res) => {
      console.log('set refresh_token success!', res);
    },
    fail: (err) => {
      console.error('set refresh_token fail', err);
    }
  });
}

// 移除RefreshToken
export function removeRefreshToken() {
  uni.removeStorage({
    key: 'refresh_token',
    success: (res) => {
      console.log('remove refresh_token success', res);
    },
    fail: (err) => {
      console.error('remove refresh_token fail', err);
    }
  });
}


// 获取用户信息
export function getUserInfo() {
  try {
    return uni.getStorageSync("user_info") || null;
  } catch (e) {
    console.error("getAccessToken 异常！")
  }
}

/**
 * 
 * @param {Object} data  设置的属性值
 */
export function setUserInfo(data) {
  if (!data) {
    throw Error('data 不能为空！')
  }
  if (v.isEmptyObject(data)) {
    throw Error('data 不能为空对象！')
  }
  uni.setStorage({
    key: 'user_info',
    data,
    success: (res) => {
      console.log('set user_info success!', res);
    },
    fail: (err) => {
      console.error('set user_infofail', err);
    }
  });

}

// 移除用户信息
export function removeUserInfo() {
  uni.removeStorage({
    key: 'user_info',
    success: (res) => {
      console.log('remove user_info success', res);
    },
    fail: (err) => {
      console.error('remove user_info fail', err);
    }
  });
 
}
