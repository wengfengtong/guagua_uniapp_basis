import { isString, isNumber } from './validate';
import { objToString } from './util'


class Pages {
	/**动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
	push(rule) {
		if (isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.navigateTo({
				url: rule
			});
			return
		}
		if (rule instanceof Object) {
			let str = rule.params ? objToString(rule.params) : '';
			if (!rule.url.startsWith("/")) {
				rule.url = '/' + rule.url + str
			} else {
				rule.url = rule.url + str
			}
			uni.navigateTo({
				...rule,
			});
			return
		}
	}
	replace(rule) {
		if (isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.redirectTo({
				url: rule
			});
			return
		}
		if (rule instanceof Object) {
			let str = rule.params ? objToString(rule.params) : '';
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
		if (isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.reLaunch({
				url: rule
			});
			return;
		}
		if (rule instanceof Object) {
			let str = rule.params ? objToString(rule.params) : '';
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
	switchTab(rule) {
		if (isString(rule)) {
			if (!rule.startsWith("/")) {
				rule = '/' + rule
			}
			uni.switchTab({
				url: rule
			});
			return
		}
		if (rule instanceof Object) {
			let str = rule.params ? objToString(rule.params) : '';
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
		if (isNumber(rule)) {
			uni.navigateBack({
				delta: rule
			});
			return
		}
		if (rule instanceof Object) {
			uni.navigateBack({
				delta: rule.delta || 1
			});
		}

	}

}
export default Pages;
