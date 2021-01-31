export default async (context, locale) => {
	return await ({
		welcome: "欢迎",
		layout: {
			systemPanel: "系统面板",
			dashboard: '仪表板',
			statistics: '统计',
			banner: '旗帜',
			clients: '客户',
			players: '玩家'
		}
	})
}