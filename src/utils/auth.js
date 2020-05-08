const TokenKey = ['token'];
export function getToken() {
  return uni.getStorageSync(TokenKey[0]);
}

export function setToken(token) {
  uni.setStorage({
    key: TokenKey[0],
    data: token,
    success: () => {
      console.log('set token success!');
    }
  });
}

export function removeToken() {
  uni.removeStorage({
    key: TokenKey[0],
    success: (res) => {
      console.log('remove token success');
    }
  });
}

export function getUserInfo() {
  return uni.getStorageSync("userInfo");
}

export function setUserInfo(data) {
  uni.setStorage({
    key: "userInfo",
    data,
    success: () => {
      console.log('set token success!');
    }
  });
}

export function removeUserInfo() {
  uni.removeStorage({
    key: "userInfo",
    success: (res) => {
      console.log('remove userInfo success');
    }
  });
}
