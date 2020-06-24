module.exports = [
    {
        path: '/',
        title: '首页',
        showFlag: true,
        hasJudge: false
    },
    {
        path: '/audit',
        title: '审批管理',
        showFlag: false,
        hasJudge: true
    },
    {
        title: '系统管理',
        showFlag: false,
        hasJudge: true,
        childern: [
            {
                path: '/personnel',
                title: '人员管理',
                showFlag: false,
                hasJudge: true
            },
            {
                path: '/permissions',
                title: '权限管理',
                showFlag: false,
                hasJudge: true
            }
        ]
    },
    {
        title: '公共资源',
        showFlag: false,
        hasJudge: true,
        childern: [
            {
                path: '/publicAddressBook',
                title: '公共通讯录',
                showFlag: true,
                hasJudge: false
            },
            {
                path: '/dataCenter',
                title: '资料中心',
                showFlag: true,
                hasJudge: false
            },
            {
                path: '/messageBoard',
                title: '留言板',
                showFlag: true,
                hasJudge: false
            }
        ]
    },
    {
        title: '企业办公',
        showFlag: false,
        hasJudge: true,
        childern: [
            {
                path: '/fileRelease',
                title: '文件发布',
                showFlag: false,
                hasJudge: true
            },
            {
                path: '/informationIssue',
                title: '信息发布',
                showFlag: false,
                hasJudge: true
            },
            {
                path: '/officeSupplies',
                title: '办公用品管理',
                showFlag: false,
                hasJudge: true
            },
            {
                path: '/humanResources',
                title: '人力资源管理',
                showFlag: false,
                hasJudge: true
            },
            {
                path: '/conferenceRoom',
                title: '会议室管理',
                showFlag: false,
                hasJudge: true
            },
            {
                path: '/vehicleManagement',
                title: '车辆管理',
                showFlag: false,
                hasJudge: true
            }
        ]
    },
    {
        title: '个人办公',
        showFlag: false,
        hasJudge: true,
        childern: [
            {
                path: '/attendance',
                title: '考勤',
                showFlag: true,
                hasJudge: false
            },
            {
                path: '/fileExchange',
                title: '文件交换',
                showFlag: true,
                hasJudge: false
            },
            {
                path: '/schedule',
                title: '日程安排',
                showFlag: true,
                hasJudge: false
            },
            {
                path: '/personalAddressBook',
                title: '个人通讯录',
                showFlag: true,
                hasJudge: false
            },
            {
                path: '/passwordManagement',
                title: '密码管理',
                showFlag: true,
                hasJudge: false
            }
        ]
    }
]
;
