import NIM from '../yunxin/NIM_Web_NIM_weixin_v7.5.0'
import NetcallController from './netcall.js'
import app from "../../main"

// IM的控制类
export default class IMController {
    constructor(cloudAccount, cloudAccountPassword) {
        // 初始化SDk
        this.nim = uni.nim = NIM.getInstance({
            debug: true, // 是否启用debug模式
            appKey: '', //填写网易云信的应用key
            token: cloudAccountPassword || "123456",
            account: cloudAccount || "test",
            promise: true,
            transports: ['websocket'],
            syncSessionUnread: true, // 同步未读数
            onconnect: this.onConnect.bind(this),
            onwillreconnect: this.onWillReconnect.bind(this),
            ondisconnect: this.onDisconnect.bind(this),
            onerror: this.onError.bind(this),
            // 同步完成
            onsyncdone: this.onSyncDone.bind(this),
            // 用户关系
            onblacklist: this.onBlacklist.bind(this),
            onsyncmarkinblacklist: this.onMarkInBlacklist.bind(this),
            onmutelist: this.onMutelist.bind(this),
            onsyncmarkinmutelist: this.onMarkInMutelist.bind(this),
            // 好友关系
            onfriends: this.onFriends.bind(this),
            onsyncfriendaction: this.onSyncFriendAction.bind(this),
            // // 用户名片
            onmyinfo: this.onMyInfo.bind(this),
            onupdatemyinfo: this.onUpdateMyInfo.bind(this),
            onusers: this.onUsers.bind(this),
            onupdateuser: this.onUpdateUser.bind(this),
            // 群组
            onteams: this.onTeams.bind(this),
            onsynccreateteam: this.onCreateTeam.bind(this),
            onupdateteammember: this.onUpdateTeamMember.bind(this),
            onAddTeamMembers: this.onAddTeamMembers.bind(this),
            onRemoveTeamMembers: this.onRemoveTeamMembers.bind(this),
            onUpdateTeam: this.onUpdateTeam.bind(this),
            onUpdateTeamManagers: this.onUpdateTeamManagers.bind(this),
            onDismissTeam: this.onDismissTeam.bind(this),
            onTransferTeam: this.onTransferTeam.bind(this),
            onUpdateTeamMembersMute: this.onUpdateTeamMembersMute.bind(this),
            shouldCountNotifyUnread: this.shouldCountNotifyUnread.bind(this),
            // 会话
            onsessions: this.onSessions.bind(this),
            onupdatesession: this.onUpdateSession.bind(this),
            // 消息
            onroamingmsgs: this.onRoamingMsgs.bind(this),
            onofflinemsgs: this.onOfflineMsgs.bind(this),
            onmsg: this.onMsg.bind(this),
            // 系统通知
            onofflinesysmsgs: this.onOfflineSysMsgs.bind(this),
            onsysmsg: this.onSysMsg.bind(this),
            onupdatesysmsg: this.onUpdateSysMsg.bind(this),
            onsysmsgunread: this.onSysMsgUnread.bind(this),
            onupdatesysmsgunread: this.onUpdateSysMsgUnread.bind(this),
            onofflinecustomsysmsgs: this.onOfflineCustomSysMsgs.bind(this),
            oncustomsysmsg: this.onCustomSysMsg.bind(this),
            // 收到广播消息
            onbroadcastmsg: this.onBroadcastMsg.bind(this),
            onbroadcastmsgs: this.onBroadcastMsgs.bind(this),
        })
    }


    // 连接成功
    onConnect(res) {
        console.log('连接成功:', res);
        uni.netcallController = new NetcallController({
            // debug: false,
            debug: true,
            nim: uni.nim
        })
    }

    // 收到黑名单列表
    onBlacklist(blacklist) {
        console.log('收到黑名单列表:', blacklist)
    }

    // onMutelist
    onMutelist(mutelist) {
        console.log('onMutelist:', mutelist)
    }

    // 同步好友信息，不含名片 [{account, createTime, updateTime}]
    onFriends(friends) {
        console.log('同步好友信息，不含名片:', friends)
    }

    // 个人名片
    onMyInfo(user) {
        console.log("个人名片:", user)
    }

    // 包含名片的好友信息（可能某些字段不全），[{account,avatar,birth,createTime,email,gender,nick,sign,updateTime}]
    onUsers(friends) {
        console.log('包含名片的好友信息:', friends)
    }

    // 同步群列表
    onTeams(teams) {
        console.log("同步群列表:", teams)
    }

    // onSyncDone,同步完成
    onSyncDone(res) {
        console.log('同步完成:', res)
    }

    /**
   * 会话更新：收到消息、发送消息、设置当前会话、重置会话未读数 触发
   * {id:'p2p-zys2',lastMsg:{},scene,to,unread,updateTime}
   * {id:'team-1389946935',lastMsg:{attach:{accounts,team},type,users},scene,to,from,type,unread,updateTime}
   */
    onUpdateSession(session) {
        console.log('会话更新: ', session)
    }

    /**
     * 收到消息
     * {cc,flow:"in",from,fromClientType:"Web",fromDeviceId,fromNick,idClient,idServer:"9680840912",isHistoryable:true,isLocal,isMuted, isOfflinable,isPushable,isRoamingable,isSyncable,isUnreadable,needPushNick,resend,scene:"p2p",sessionId:"p2p-zys2",status:"success",target:"zys2",text:"[呕吐]",time,to:"wujie",type:"text",userUpdateTime}
     */
    onMsg(msg) {
        console.log('onMsg: 收到消息', msg)
    }

    /** 操作主体为对方
     * 收到系统通知，例如 被对方删除好友、被对方添加好友、被对方撤回消息
     * {type,to,time,deletedMsgTime,deletedMsgFromNick,deletedIdServer,deletedIdClient,status,scene,opeAccount,msg:{flow,from,fromNick,idClient,scene,sessionId,target,time,to,opeAccount},idServer,from}
     * time:为删除消息时间，deletedMsgTime为删除的消息发送时间
     */
    onSysMsg(msg) {
        console.log('收到系统通知: ', msg)

    }

    //发送自定义消息
    sendCustomMessage(option) {
        return new Promise((resolve, reject) => {
            this.nim.sendCustomSysMsg({
                scene: 'p2p',
                to: option.to,
                enablePushNick: false,
                isPushable: true,
                sendToOnlineUsersOnly: false,
                apnsText: option.apnsText || '',
                content: JSON.stringify({
                    ...option.content
                }),
                done: (error, msg) => {
                    console.log("发送通知完成!", msg);
                    if (error) {
                        reject(error)
                    }
                    resolve(msg)

                }
            });
        })
    }

    /**
     * 丢失连接
     */
    onDisconnect(error) {
        console.log('丢失连接:', error)
        if (error) {
            switch (error.code) {
                // 账号或者密码错误, 请跳转到登录页面并提示错误
                case 302:
                    console.log('onError: 账号或者密码错误')
                    break;
                // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
                case 417:
                    console.log('onError: 重复登录')
                    break;
                // 被踢, 请提示错误后跳转到登录页面
                case 'kicked':
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 漫游消息：会多次收到，每次只会收到指定人的漫游消息
      // {scene:"p2p",sessionId:"p2p-cs4",timetag:1513153729257,to:"cs4",msg:[{from:'wujie',text:'222',to:'cs4'}]}
      // {scene:"team",sessionId:"team-3944051",timetag:1513153729257,to:"3944051",msg:[{from:'wujie',text:'222',to:'cs4'}]}
     */
    onRoamingMsgs(list) {
        console.log('漫游消息:', list)

    }
    /**
     * 连接出错
     */
    onError(error) {
        console.log('连接出错:', error)
        uni.nim.disconnect()
        uni.nim.connect()
    }

    onMarkInBlacklist(obj) {
        console.log("onMarkInBlacklist:", obj)
    }

    onMarkInMutelist(obj) {
        console.log("onMarkInMutelist:", obj)
    }

    onSyncFriendAction(obj) {
        console.log("onSyncFriendAction:", obj)
    }

    onUpdateMyInfo(user) {
        console.log("onUpdateMyInfo:", user)
    }

    onUpdateUser(user) {
        console.log("onUpdateUser:", user)
    }

    /**
    *   创建群的回调, 此方法接收一个参数, 包含群信息和群主信息
    */
    onCreateTeam(team) {
        console.log("创建群的回调:", team)

    }

    /**
    *  群成员信息更新后的回调, 会传入群成员对象, 不过此时的信息是不完整的, 只会包括被更新的字段。当前登录帐号在其它端修改自己的群属性时也会收到此回调。
    */
    onUpdateTeamMember(teamMember) {
        console.log('群成员信息更新后的回调:', teamMember)

    }

    /**
    *  新成员入群的回调，自己建群成功也回调
    */
    onAddTeamMembers(msg) {
        console.log('新成员入群的回调，自己建群成功也回调:', msg)
    }

    /**
    *  有人出群的回调
    */
    onRemoveTeamMembers(msg) {
        console.log('有人出群的回调:', msg)
    }

    /**
    *  更新群的回调
    */
    onUpdateTeam(msg) {
        console.log('更新群的回调:', msg)
    }

    /**
    *  更新群管理员的回调
    */
    onUpdateTeamManagers(msg) {
        console.log('更新群管理员的回调:', msg)
    }

    /**
    *  解散群的回调
    */
    onDismissTeam(msg) {
        console.log('解散群的回调:', msg)
    }

    /**
    *  移交群的回调
    */
    onTransferTeam(msg) {
        console.log('移交群的回调:', msg)
    }

    /**
    *  更新群成员禁言状态的回调
    */
    onUpdateTeamMembersMute(msg) {
        console.log('更新群成员禁言状态的回调:', msg)
    }

    /**
    *  群消息通知是否加入未读数开关如果返回true，则计入未读数，否则不计入
    */
    shouldCountNotifyUnread(msg) {
        console.log('群消息通知是否加入未读数:', msg)
        return true
    }

    /**会话
     * [ {id:"p2p-liuxuanlin",lastMsg:{from:'wujie',text:'222',to:"liuxuanlin"}} ]
     */
    onSessions(sessions) {
        console.log('会话: ', sessions)
    }

    onOfflineMsgs(msg) {
        console.log('onOfflineMsgs:', msg)
    }

    // 系统通知
    onOfflineSysMsgs(msg) {
        console.log("系统通知:", msg)
    }

    onUpdateSysMsg(sysMsg) {
        console.log("onUpdateSysMsg:", sysMsg)
    }

    onCustomSysMsg(sysMsg) {
        console.log("onCustomSysMsg:", sysMsg)
        //多端同步 正在输入自定义消息类型需要过滤
        let content = JSON.parse(sysMsg.content);
        let id = content.id;
        if (!id) {
            if (content.customType == 'hangup') {
                console.log("收到挂断的通知")
                uni.$event.emit("hangup", sysMsg)
            } else if (content.customType == 'reject') {
                console.log("收到拒绝的通知")
                uni.$event.emit("reject", sysMsg)
            } else if (content.customType == 'busy') {
                uni.$event.emit("busy", sysMsg)
                console.log("收到忙线的通知")
            }
        }
        /** 群视频通知 */
        else if (id == 3) {
            let pages = getCurrentPages()
            let currentPage = pages[pages.length - 1]
            // 不在多人通话中，跳转到接听页面
            if (currentPage.route != 'pages/manyVideo/index') {
                console.log(content.personList)
                let personList = content.personList.map(item => {
                    console.log("item", item)
                    return {
                        cloudAccount: item.cloudAccount,
                        personName: item.personName,
                    }
                })
                // 跳转到接听页面
                app.$uniPage.push({
                    url: `/pages/manyVideo/index`,
                    params: {
                        apnsText: sysMsg.apnsText,
                        from: sysMsg.from,
                        to: sysMsg.to,
                        members: content.members,
                        type: content.type,
                        roomId: content.room,
                        personList,
                    }
                });
            } else {
                console.log("发送忙线")
                this.sendCustomMessage({
                    to: sysMsg.from,
                    apnsText: `${sysMsg.to}正在忙线中`,
                    content: {
                        room: content.room,
                        type: content.type,
                        customType: "busy"
                    },
                }).then(msg => {
                    console.log("发送通知完成!", msg);
                })
            }

        }
    }

    onSysMsgUnread(obj) {
        console.log("onSysMsgUnread:", obj)
    }

    onUpdateSysMsgUnread(obj) {
        console.log("onUpdateSysMsgUnread:", obj)
    }

    onOfflineCustomSysMsgs(sysMsg) {
        console.log("onOfflineCustomSysMsgs:", sysMsg)
    }

    // 收到广播消息
    onBroadcastMsg(msg) {
        console.log('收到广播消息: ', msg)
    }
    onBroadcastMsgs(msg) {
        console.log('onBroadcastMsgs: ', msg)
    }
    /**
     * 断开重连
     */
    onWillReconnect() {
        console.log('断开连接')
    }
}

// 初始化的时候回返回一条数据，里面还有所有的未读数，未读数初始化状态不对，后面收到新的后就正确了
// 好友被删除后，再次推送过来的消息如有此人消息会报错，原因recentChat页是获取数据时是从好友列表中拿的
