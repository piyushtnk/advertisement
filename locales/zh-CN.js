export default async (context, locale) => {
	return await ({
		welcome: "欢迎",
		chooseSpecificDate: '选择特定日期',
		visitors: '参观者',
		ok: '行',
		okay: '好的',
		cancel: '取消',
		layout: {
			clients: '客户',
			players: '玩家',
			banner: '旗帜',
			systemPanel: "系统面板",
			dashboard: '仪表板',
			statistics: '统计',
			reports: '报告',
			otherPlayers: '其他玩家',
			ipClients: 'API IP 客户'
		},
		dashboard: {
			recentInteractionUserGraph: '最近的互动用户图',
			recentVisitorThroughBanner: '横幅最新访客',
			liveStatistics: '实时统计',
			actualVisitors: '实际访客',
			registeredVisitors: '注册访客',
			registeredBanners: '注册横幅',
			systemStats: '系统统计',
			admins: '管理员',
			loggedInAdmins: '登录管理员'
		},
		ip: {
			alert: '这些是尝试访问或请求我们横幅图像的客户'
		}
	})
}