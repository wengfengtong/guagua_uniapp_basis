import v from './validate';

class Pages {
	/**动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
	push(rule) {
		if (v.isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.navigateTo({
				url: rule
			});
		} else if (rule instanceof Object) {
			let str = rule.params ? this.objToString(rule.params) : '';
			if (!rule.url.startsWith("/")) {
				rule.url = '/' + rule.url + str
			} else {
				rule.url = rule.url + str
			}
			uni.navigateTo({
				...rule,
			});
		}
	}
	// 对象参数拼接
	objToString(params) {
		let str = '?'
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

	replace(rule) {
		if (v.isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.redirectTo({
				url: rule
			});
		} else if (rule instanceof Object) {
			let str = rule.params ? this.objToString(rule.params) : '';
			if (!rule.url.startsWith("/")) {
				rule.url = '/' + rule.url + str
			} else {
				rule.url = rule.url + str
			}
			uni.redirectTo({
				...rule,
			});
		}
	}

	reLaunch(rule) {
		if (v.isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.reLaunch({
				url: rule
			});
		} else if (rule instanceof Object) {
			let str = rule.params ? this.objToString(rule.params) : '';
			if (!rule.url.startsWith("/")) {
				rule.url = '/' + rule.url + str
			} else {
				rule.url = rule.url + str
			}
			uni.reLaunch({
				...rule,
			});
		}
	}
	pushTap(rule) {
		if (v.isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.switchTab({
				url: rule
			});
		} else if (rule instanceof Object) {
			let str = rule.params ? this.objToString(rule.params) : '';
			if (!rule.url.startsWith("/")) {
				rule.url = '/' + rule.url + str
			} else {
				rule.url = rule.url + str
			}
			uni.switchTab({
				...rule,
			});
		}
	}

	back(rule) {
		if (!rule) {
			uni.navigateBack();
			return
		}
		if (v.isNumber(rule)) {
			uni.navigateBack({
				delta: rule
			});
		} else if (rule instanceof Object) {
			uni.navigateBack({
				delta: rule.delta || 1
			});
		}

	}

}
export default Pages;
