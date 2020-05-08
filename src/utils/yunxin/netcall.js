import NetcallWeixin from './NIM_Web_Netcall_weixin_v7.5.0'
import NIM from './NIM_Web_NIM_weixin_v7.5.0'


let app = getApp()
export default class NetcallController {
    constructor(props) {
        NIM.use(NetcallWeixin)
        NetcallWeixin.destroy()
        this.netcall = uni.netcall = NetcallWeixin.getInstance(props)

        this.state = {
            onTheCall: false, // 正在通话中
            isBeCalling: false,// 是否被叫中
            beCalledInfo: null, // 被叫时的信息
        }
        let cloud = uni.getStorageSync("cloud") || {};
        this.loginUser = {
            account: cloud.cloudAccount
        }
        this.caller = {
        }

        this.callTimer = null //超时定时器

        this.bindNetcallEvent()
    }

    bindNetcallEvent() {

        this.netcall.on('syncDone', (data) => {
            console.log('同步完成', data)
            uni.$event.emit('syncDone', data)
        })

        this.netcall.on('clientLeave', (data) => {
            console.log('有人离开了', data)
            uni.$event.emit('clientLeave', data)
        })

        this.netcall.on('joinChannel', (data) => {
            // {uid,account,cid}
            console.log('joinChannel', data)
            uni.$event.emit('joinChannel', data)
        })

        this.netcall.on('clientJoin', (data) => {
            console.log('clientJoin', data)
            this.state.onTheCall = true // 标记正在通话
            uni.$event.emit('clientJoin', data)
        })

        this.netcall.on('callRejected', (data) => {
            console.log('对方拒绝了', data)
            this.delayHangup({
                tips: "对方已拒绝"
            })
        })

        this.netcall.on('callAccepted', (data) => {
            console.log('对方接听了', data)
            clearTimeout(this.callTimer)
            uni.$event.emit("callAccepted", data)
        })

        this.netcall.on('beCalling', (data) => {
            console.log('beCalling', data)
            if (!this.state.isBeCalling) {
                this.state.isBeCalling = true // 标记正在被叫
                this.state.beCalledInfo = data
                uni.$event.emit('beCalling', data)
            } else {
                /** 拒绝 */
            }
        })

        this.netcall.on('callerAckSync', (data) => {
            // {timetag,type,fromClientType:number,cid,accepted}
            console.log('callerAckSync: 其他端已经处理了', data)
            /** 弹框通知已经在其他端处理 */
            uni.$event.emit('callerAckSync', data)
        })

        this.netcall.on('hangup', (data) => {
            console.log('hangup', data)
            // if (data.account !== this.caller.account) {
            //     console.warn('非本通通话，抛弃')
            //     return
            // }

            uni.$event.emit('hangup', data);
            this.resetWhenHangup()
        })

        this.netcall.on('control', (data) => {
            // {cid,account,command}
            console.log('收到指令:', data)
            // uni.$event.emit('control', data)
        })

        this.netcall.on('clientUpdate', (data) => {
            console.log('有人更新了', data)
        })

        this.netcall.on('error', (error) => {
            console.error('出错了', error)
        })

        this.netcall.on('open', (data) => {
            console.log('socket建立成功', data)
        })

        this.netcall.on('willreconnect', (data) => {
            // 直播通道准备重连
            uni.$event.emit('willreconnect', data)
        })

        this.netcall.on('sendCommandOverTime', (data) => {
            console.log('发送命令超时', data)
        })

        this.netcall.on('liveRoomClose', (data) => {
            console.log('互动直播房间解散了', data)
        })

        this.netcall.on('sessionDuration', (data) => {
            console.log('===结束通话(ms)：', data)
        })
    }

    // 创建定时器
    createTimer(time, fn) {
        if (this.callTimer) {
            clearTimeout(this.callTimer)
        }
        this.callTimer = setTimeout(() => {
            // 请在对方处理后，清除呼叫定时器，否则将执行挂断逻辑
            fn && fn()
        }, time);
    }

    // 视频呼叫
    call(options) {
        return this.netcall.call({
            type: options.type || 2, // 通话类型：1音频，2视频
            callee: options.caller, // 被叫账号
            forceKeepCalling: true, // 持续呼叫
            pushConfig: {
                custom: `${this.loginUser.account}正在呼叫你`
            }
        }).then(() => {
            // 成功发起呼叫
            this.caller = {
                account: options.caller
            }
            console.log('呼叫成功！')
            this.createTimer(1000 * 45, () => {
                if (!this.netcall.callAccepted) {
                    this.delayHangup({
                        tips: "呼叫超时"
                    })
                }
            })
        }).catch(err => {
            console.log('呼叫失败', err)
            this.delayHangup({
                tips: "对方不在线"
            })
        })
    }

    // 设置提示
    setTips(data) {
        uni.$event.emit("setTips", data)
    }

    // 接听点对点通话
    accept() {
        this.state.isBeCalling = false // 标记正在被叫
        // infoOfBeCalled为前面被叫时传递过来的信息
        let beCalledInfo = this.state.beCalledInfo;
        return this.netcall.response({
            accepted: true, // 是否接听，true为接听；false为拒绝
            caller: beCalledInfo.caller, // 本通通话主叫方账号
            type: beCalledInfo.type, // 本通通话类型
            cid: beCalledInfo.cid // 本通通话房间ID
        })
    }
    // 拒绝点对点通话
    reject() {
        let beCalledInfo = this.state.beCalledInfo;
        // beCalledInfo为前面被叫时传递过来的信息
        return this.netcall.response({
            accepted: false,
            caller: beCalledInfo.caller,
            type: beCalledInfo.type,
            cid: beCalledInfo.cid
        })
            .then((data) => {
                console.log('拒绝成功')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // 挂断
    hangup() {
        this.netcall.hangup()
            .then((data) => {
                console.log('挂断成功', data)
                // 清除对应的UI逻辑。。。
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // 接听群聊视频邀请
    answerJoin(options) {
        return this.netcall.joinChannel({
            mode: 0,// 模式，0音视频，1纯音频，2纯视频，3静默
            channelName: options.roomId,
            role: 0 // 角色，0-主播 1-观众
        })
    }

    // 离开房间
    leaveChannel() {
        return this.netcall.leaveChannel().then(res => {
            this.resetWhenHangup();
        });
    }

    // 延时挂断操作
    delayHangup({
        tips,
        before,
        success,
        time = 1000
    }) {
        let tipsFun = () => {
            // 清理工作
            this.resetWhenHangup();
            if (tips) {
                this.setTips(tips)
            }
        }
        let hangupEmit = () => {
            this.hangup()
            this.app.prototype.$Bus.$emit('hangup')
        }
        before ? before() : tipsFun();
        setTimeout(() => {
            /**延迟逻辑 */
            success ? success() : hangupEmit()
        }, time)
    }

    //重置状态
    resetWhenHangup() {
        clearInterval(this.callTimer);
        this.callTimer = null;
        this.state = {
            onTheCall: false, // 正在通话中
            isBeCalling: false,// 是否被叫中
            beCalledInfo: null, // 被叫时的信息
        }
        this.caller = {}
    }
}
