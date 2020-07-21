
import { isObj } from "./validate";
import auth from "./auth";
import { conmonUrl } from "../config/index"

/**
 * uniapp的方法转promise
 * @param {string} method  uniapp的原生方法名 
 * @param {object} option  其他配置
 */
export const toPromise = (method, option) => {
	return new Promise((resolve, reject) => {
		uni[method]({
			...option,
			success: (res) => { resolve(res) },
			fail: (err) => { reject(err) }
		})
	})
}

/**
 * 判断是否为指定场景
 * @param {string | array} scene 
 * @example [1043,1073]  || '1073'
 */
export const jugeScene = (scene) => {
	let options = uni.getLaunchOptionsSync()
	var pages = getCurrentPages(); //获取加载的页面
	if (scene instanceof Array) {
		return scene.indexOf(options.scene) > -1 && pages.length == 1 ? true : false
	} else {
		return scene == options.scene && pages.length == 1 ? true : false
	}

}

// 自动更新版本方法
export const updataVarsion = () => {
	const updateManager = uni.getUpdateManager();
	updateManager.onCheckForUpdate((res) => {
		// 请求完新版本信息的回调
		console.log(res.hasUpdate);
	})
	updateManager.onUpdateReady((res) => {
		showModal({
			title: '更新提示',
			msg: '新版本已经准备好，是否重启应用？'
		}).then(res => {
			if (res) {
				// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
				updateManager.applyUpdate()
			}
		})
	})
	updateManager.onUpdateFailed(() => {
		// 新的版本下载失败
		uni.hideLoading();
		showModal({
			title: '升级失败',
			msg: '新版本下载失败，请检查网络！'
		})
	});
}


// ios时间格式化 （兼容处理）
export const timeCycle = (time) => {
	return time.replace(/\-/g, '/');
}


/**
 * 当前是不是H5运行环境
 */
export const isH5 = function () {
	return typeof window !== "undefined" && typeof document !== "undefined";
};

//判断是否登录
export const isLogin = () => {
	const refresh_token = auth.getRefreshToken();
	const access_token = auth.getAccessToken()
	return refresh_token && access_token
}

// 下载文件
export const downloadFile = (id, name) => {
	let suffix = getFileSuffix(name)
	let url = `${conmonUrl}/${id}${suffix}`
	return toPromise("downloadFile", { url })
}


// 获取文件后缀民
export const getFileSuffix = (filename) => {
	var index1 = filename.lastIndexOf(".");
	var index2 = filename.length;
	var type = filename.substring(index1, index2);
	return type;
}

// 上传文件
export const uploadFile = ({
	url,
	filePath,
	filename = "file"
}) => {
	if (!url) {
		url = `${conmonUrl}/upload/file`
	}
	let uploadTask;

	let promise = new Promise((resolve, reject) => {
		uploadTask = uni.uploadFile({
			url,
			filePath,
			name: filename,
			header: { token: uni.getStorageSync("token") },
			success: res => {
				if (res.statusCode !== 200) {
					showToast({
						msg: "更改头像失败!",
						delayed: 1500
					}).then(() => reject(res))
				}
				resolve(res)
			},
			fail: err => {
				console.log(err);
				reject(res)
			}
		});
	})

	return {
		promise,
		uploadTask
	}

}

//获取分享方案
export const getSharePlan = (backHome = false) => {
	let shareData = {};
	if (backHome) {
		shareData.path = '/pages/index/index'
	}
	// 请求接口
	uni.$api.commonApi.getSharePlan().then(res => {
		shareData = {
			title: res.title,
			imageUrl: res.imgUrl
		}
	})
	return function () {
		return shareData
	}
}

/**
   * 判断用户是否授权 (强制授权)
   * scope.userInfo wx.getUserInfo  用户信息
      scope.userLocation    wx.getLocation, wx.chooseLocation   地理位置
      scope.address wx.chooseAddress    通讯地址
      scope.invoiceTitle    wx.chooseInvoiceTitle   发票抬头
      scope.werun   wx.getWeRunData 微信运动步数
      scope.record  wx.startRecord  录音功能
      scope.writePhotosAlbum    wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum    保存到相册
      scope.camera      摄像头
   */
export const checkAuthorize = (scope) => {
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success: (res) => {
				if (!res.authSetting[scope]) {
					uni.showModal({
						title: '用户未授权',
						content: '拒绝授权将不能体验小程序完整功能，点击确定开启授权',
						success: (res) => {
							if (res.confirm) {
								wx.openSetting({
									success: (authRes) => {
										if (authRes.authSetting[scope]) {
											resolve()
										} else {
											reject()
										}
									},
									fail: (err) => {
										console.log("openSetting fail", err)
										reject()
									}
								})
							} else if (res.cancel) {
								reject()
							}
						}
					})
				} else {
					resolve()
				}
			},
			fail: (err) => {
				console.log("checkAuthorize fail", err)
				reject()
			}
		})
	})
}

//登录
export const login = async (e) => {
	try {
		await checkAuthorize('scope.userInfo');
		let info = e.detail;
		if (!e.detail.userInfo) return;
		return new Promise(async (resolve, reject) => {
			// 获取微信code
			let code = await toPromise("login", { provider: 'weixin' });
			let params = {
				code,
				rawData: info.rawData,
				signature: info.signature,
				encryptedData: info.encryptedData,
				iv: info.iv
			}
			resolve(params)
		})
	} catch (err) {
		console.log("获取用户信息失败!")
	}
}



//获取当前路径
export const getRouteUrl = () => {
	var pages = getCurrentPages(); //获取加载的页面
	var currentPage = pages[pages.length - 1]; //获取当前页面的对象
	return currentPage.route; //当前页面url
}

/**
 * 获取当前运行平台
 * @param {Boolean} applets 默认false  true时所有小程序平台统一返回 APPLETS
 */
export const appPlatform = function (applets = false) {
	let platform = ''

	// #ifdef APP-PLUS-NVUE
	platform = 'APPNVUE'
	// #endif

	// #ifdef APP-PLUS
	platform = 'APP';
	// #endif

	// #ifdef H5
	platform = 'H5'
	// #endif

	// #ifdef MP-ALIPAY
	platform = 'ALIPAY'
	// #endif

	// #ifdef MP-BAIDU
	platform = 'BAIDU'
	// #endif

	// #ifdef MP-QQ
	platform = 'QQ'
	// #endif

	// #ifdef MP-WEIXIN
	platform = 'WEIXIN'
	// #endif

	// #ifdef MP-TOUTIAO
	platform = 'TOUTIAO'
	// #endif

	if (applets) {
		// #ifdef MP
		platform = 'APPLETS'
		// #endif
	}

	return platform;
}

//判断手机系统类型
export const clientSystem = () => {
	let system = ""
	let systemInfo = uni.getSystemInfoSync()
	if (systemInfo.platform == "ios") {
		system = "ios"
	} else if (systemInfo.platform == "android") {
		system = "android"
	} else {
		system = "other"
	}
	return system
}

/**
 * 把一个字符串对象转json再转字符串
 * @param {Object} strObj 字符串对象
 */
export const strObjToJsonToStr = function (strObj) {
	return JSON.stringify(JSON.parse(strObj))
}

/**
 * 延迟函数 返回一个promise来进行延迟
 * @param {Number} time 需要延迟的时间戳
 */
export const timeout = function (time = 0) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	})
}

//函数节流
export const throttle = function (fn, interval) {
	var enterTime = 0; //触发的时间
	var gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
	return function () {
		var context = this;
		var backTime = new Date(); //第一次函数return即触发的时间
		if (backTime - enterTime > gapTime) {
			fn.call(context, arguments);
			enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
		}
	};
}

// 根据时间戳格式化时间
export const formatTime = (temp, str = '-') => {
	const date = new Date(Number(temp))
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	return [year, month, day].map(formatNumber).join(str) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 判断小于十
export const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

//模态框
export const showModal = ({
	msg, title = "提示", confirmText = "确定"
}) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: msg,
			confirmText,
			success: function (res) {
				let {
					confirm,
					cancel
				} = res;
				if (confirm) {
					resolve(true)
				}
				if (cancel) {
					resolve(false)
				};
			},
		})
	})
}

//自定义提示
export const showToast = ({
	msg,
	mask = false,
	icon = "none",
	duration = 1500,
	delayed = 0
}) => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: msg,
			icon,
			duration,
			mask,
			success() {
				if (delayed) {
					setTimeout(() => {
						resolve()
					}, delayed)
				} else {
					resolve()
				}

			}
		})
	})
}

// 深度克隆
export const deepClone = (obj) => {
	let newObj = Array.isArray(obj) ? [] : {}

	if (obj && typeof obj === "object") {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
			}
		}
	}
	return newObj
}

// 平铺对象
export const unsetObj = (obj) => {
	if (!isObj(obj)) return;
	let newObj = {};
	for (let key in obj) {
		let value = obj[key];
		if (isObj(value)) {
			let valueObj = unsetObj(value);
			newObj = Object.assign(newObj, valueObj);
		} else {
			newObj[key] = value;
		}
	}
	console.log(newObj);
	return newObj;
}

/**
 * 对象参数拼接成字符串
 * @param {*} params 
 * @param {*} str 默认为？
 */

export const objToString = (params, str = '?') => {
	for (let i in params) {
		let value = params[i];
		if (params[i] instanceof Object) {
			value = JSON.stringify(params[i])
		}
		let keyValue = `${i}=${value}&`
		str += keyValue
	}
	str = str.substring(0, str.length - 1);
	return str
}

// 随机数范围
export const random = (min, max) => {
	if (arguments.length === 2) {
		return Math.floor(min + Math.random() * ((max + 1) - min))
	} else {
		return null;
	}
}
// 将阿拉伯数字翻译成中文的大写数字
export const numberToChinese = (num) => {
	var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
	var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
	var a = ("" + num).replace(/(^0*)/g, "").split("."),
		k = 0,
		re = "";
	for (var i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
			case 0:
				re = BB[7] + re;
				break;
			case 4:
				if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
					.test(a[0]))
					re = BB[4] + re;
				break;
			case 8:
				re = BB[5] + re;
				BB[7] = BB[5];
				k = 0;
				break;
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
			re = AA[0] + re;
		if (a[0].charAt(i) != 0)
			re = AA[a[0].charAt(i)] + BB[k % 4] + re;
		k++;
	}

	if (a.length > 1) // 加上小数部分(如果有小数部分)
	{
		re += BB[6];
		for (var i = 0; i < a[1].length; i++)
			re += AA[a[1].charAt(i)];
	}
	if (re == '一十')
		re = "十";
	if (re.match(/^一/) && re.length == 3)
		re = re.replace("一", "");
	return re;
}

