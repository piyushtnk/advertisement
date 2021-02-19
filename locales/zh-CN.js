export default async (context, locale) => {
	return await {
		welcome: "欢迎",
		chooseSpecificDate: "具体日期数据",
		visitors: "所有横幅点击",
		ok: "行",
		okay: "好的",
		cancel: "取消",
		layout: {
			clients: "客户",
			players: "玩家",
			banner: "旗帜",
			systemPanel: "系统面板",
			dashboard: "仪表板",
			statistics: "统计",
			reports: "报告",
			otherPlayers: "其他玩家",
			ipClients: "API IP 客户"
		},
		dashboard: {
			recentInteractionUserGraph: "最近的互动用户图",
			recentVisitorThroughBanner: "横幅最新访客",
			liveStatistics: "实时统计",
			actualVisitors: "实际访客",
			registeredVisitors: "横幅注册访客",
			registeredBanners: "横幅添加到系统",
			systemStats: "系统统计",
			admins: "管理员",
			loggedInAdmins: "登录管理员"
		},
		ipAlert: "这些是尝试访问或请求我们横幅图像的客户",
		statsMessage: "耐心等待一下，实时数据正在计算中",
		statsMessage2: "所有财务数据每30分钟更新一次",
		statsMessage3: "更新剩余时间",
		all: "全部",
		today: "今天",
		yesterday: "昨天",
		thisWeek: "本周",
		lastWeek: "上周",
		thisMonth: "本月",
		lastMonth: "上月",
		localeType: "zh-CN",
		visitorAllOverWorld: "全球浏览量",
		overallTotalTopUpValue: "存款总额",
		overallTopUpCount: '存款次数',
		overallTopUpCountFromBanners: '（从横幅）存款次数',
		overallTotalTopUpValueFromBanners: '（从横幅）存款总额',
		overallClicksOnBanners: '总浏览量(PV)',
		uniqueClicksOnBanners: '总访客数(UV)',
		regPlayersFromBanners: '注册玩家',
		topPlayersFromAllSources: '首存会员',
		uniqueBannerClicksFromPC: 'PC访客数(UV)',
		uniqueBannerClicksFromMobile: 'H5访客数(UV)',
		bannerViewers: '广告流量次数（API / IP）',
		fromBrowser: '浏览器区分',
		fromOS: '设备区分',
		clicks: '点击量',

		// Browser list
		Chrome: '谷歌',
		Safari: 'IOS浏览器',
		GoogleSearchApp: '谷歌搜索应用',
		Webview: '网页浏览',
		Edge: 'microsoft edge 浏览器',
		Firefox: '火狐浏览器',
		UNKNOWN: '未知',
		Opera: 'Opera 浏览器',
		InternetExplorer: 'Internet Explorer',
		Googlebot: 'Googlebot',
		YandexBrowser: 'yandex浏览器',

		// Device list
		Android: '安卓系统',
		iPhone: '苹果手机',
		MacOSX: 'Mac OSX',
		Windows10: 'Windows 10',
		WindowsXP: 'Windows XP',
		Windows7: 'Windows 7',
		iPad: 'iPad',
		iPod: 'iPod',
		Windows81: 'Windows 8.1',
		Linux: 'Linux',
		Windows8: 'Windows 8',
		Vivaldi: "Vivaldi",


		topRecentBannersPer: '最近的最佳广告表现',
		image: '图片',
		origin: '广告网址',
		redirectionURL: '前端网址',
		createdAt: '创建时间',

		topViewedBannersPerByVisitorIp: '访客IP排名最高广告表现',
		last10MinuteBannerList: '最近10分钟广告效果列表',

		registerYourBanner: '注册广告链接',
		chooseBanner: '选择图片',
		destinationURL: '绑定前端域名',
		adsSource: '广告网址',
		addNewDomain: '添加前端域名？',
		filterType: '时间',
		columnName: '栏名',
		bannerLink: '注册链接',
		destinationURL: '绑定前端域名',
		advertisementSource: '广告网址',
		searchText: '搜寻文字',
		search: '搜索',
		clear: '删除',
		banner: '图片',
		containerLink: '图片链接',
		actions: 'Actions',
		edit: '编辑',
		save: '救',
		submit: '提交',
		updateBanner: '更新横幅',
		theseAreAllClients: '通过数据后台链接注册的会员',

		ip: 'IP地址',
		deviceName: '设备名称',
		deviceType: '设备',
		browser: '浏览器',
		os: 'OS',
		language: '语言',
		country: '国家',
		region: '省份',
		city: '市',

		playerType: 'Player Type',
		userId: '会员账号',
		name: '名字',
		mobile: '手机号',
		device: '登录设备',
		sourceURL: '注册来源',
		totalTopUp: '总充值',
		totalTopUpCount: '总充值次数',
		totalWithdrawal: '总提款',
		totalWithdrawalCount: '总提款次数',
		totalClaimed: '优惠彩金',
		totalWinLoss: '总输赢',
		totalBonus: '总奖金',
		totalValidBet: '有效投注总额',
		noOfIp: 'IP数量',
		registrationTime: 'Registration Time',
		otherSources: '其他来源',
		regThroughBanner: '通过广告注册',
		regIpViewerButNotClick: '已注册，IP浏览广告，未从广告链接注册',

		// Datatable
		rowsPerPage: '每页行数',

		continentCode: '大陆码',
		countryCode: '国家代码',
		currency: '货币',
		currencyName: '货币名称',
		europeanUnion: '欧洲联盟',
		languages: '语言能力',
		latitude: '纬度',
		longitude: '经度',
		organization: '组织',
		postal: '邮政',
		regionCode: '地区代码',
		timezone: '时区',
		registeredDate: '登记时间',

		financeDetailedInformation: "财务详细信息",
		depositInformation: '存款信息',
		withdrawalInformation: "提款信息",
		profitInformation: "利润信息",
		overallTotalWithdrawalValue: '提款总额',
		overallTotalWithdrawalCount: '提款次数',
		overallWithdrawalCountFromBanner: '（从横幅）提款次数',
		overallWithdrawalValueFromBanner: '（从横幅）提款总额',
		totalProfit: '盈利',

		registerYourBanner: '注册广告链接',
		areYouSure: '你确定要删除这个项目吗?',

		WindowsUNKNOWNVer: 'Windows Unknown Ver.',
		WindowsPhoneOS: 'Windows Phone OS.'
	};
};
