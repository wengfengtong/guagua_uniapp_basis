import HTTP from '@/utils/request';
import config from '@/config/index';

export default class UserAPI extends HTTP {
    // 登陆接口
    login(data) {
        return this.request({
            url: `gemp-user/api/gemp/duty/info/user/login`,
            method: 'POST',
            data,
            options: {
                loading: true
            }
        });
    }

}

