export default async (context, locale) => {
	return await {
		welcome: "欢迎",
		chooseSpecificDate: "日期",
		visitors: "横幅广告点击次数",
		ok: "确定",
		okay: "好的",
		cancel: "取消",
		layout: {
			system: '系统',
			clients: "广告点击人数",
			players: "会员管理",
			banner: "横幅广告",
			systemPanel: "系统面板",
			dashboard: "首页",
			statistics: "统计",
			reports: "报表",
			otherPlayers: "其他玩家",
			ipClients: "API IP 客户",
			information: "信息",
			deposit: "存款记录",
			withdrawals: "提款记录",
			bets: "投注记录",
			ip: "IP 地址",
			zh: 'ZH',
			domain: '领域'
		},
		dashboard: {
			recentInteractionUserGraph: "最近的互动用户图",
			recentVisitorThroughBanner: "通道横幅广告来的客户",
			liveStatistics: "实时统计",
			actualVisitors: "流量",
			registeredVisitors: "通过横幅广告的新会员",
			registeredBanners: "新横幅广告",
			systemStats: "系统统计",
			admins: "管理员",
			loggedInAdmins: "在线管理员"
		},
		ipAlert: "这些是点击我们横幅广告的客户",
		statsMessage: "请耐心等待，实时数据在计算中",
		statsMessage2: "所有财务数据每30分钟更新一次",
		statsMessage3: "更新剩余时间",
		all: "全部 （从 1月26号起）",
		today: "今天",
		yesterday: "昨天",
		thisWeek: "本周",
		lastWeek: "上周",
		thisMonth: "本月",
		lastMonth: "上月",
		localeType: "zh-cn",
		visitorAllOverWorld: "全世界的游客",
		overallTotalTopUpValue: "存款总额",
		overallTopUpCount: "存款次数",
		overallTopUpCountFromBanners: "存款次数 （通过横幅广告）",
		overallTotalTopUpValueFromBanners: "存款总额 （通过横幅广告）",
		overallClicksOnBanners: "横幅广告的点击次数",
		uniqueClicksOnBanners: "流量",
		regPlayersFromBanners: "通过横幅广告的新会员",
		topPlayersFromAllSources: "存款人数",
		uniqueBannerClicksFromPC: "流量 （PC)",
		uniqueBannerClicksFromMobile: "流量 （手机）",
		bannerViewers: "广告流量次数（API / IP）",
		fromBrowser: "浏览器区分",
		fromOS: "设备区分",
		clicks: "点击量",

		// Browser list
		Chrome: "谷歌",
		PC: 'PC',
		pc: 'PC',
		zh: 'ZH',
		clients: '客户',
		Safari: "IOS浏览器",
		GoogleSearchApp: "谷歌搜索应用",
		Webview: "网页浏览",
		Edge: "microsoft edge 浏览器",
		Firefox: "火狐浏览器",
		UNKNOWN: "未知",
		Opera: "Opera 浏览器",
		InternetExplorer: "Internet Explorer",
		Googlebot: "Googlebot",
		YandexBrowser: "yandex浏览器",

		// Device list
		Android: "安卓",
		AndroidMobile: '安卓手机',
		AndroidTablet: '安卓药片',
		iPhone: "苹果手机",
		MacOSX: "Mac OSX",
		Windows10: "Windows 10",
		WindowsXP: "Windows XP",
		Windows7: "Windows 7",
		iPad: "iPad",
		iPod: "iPod",
		Windows81: "Windows 8.1",
		Linux: "Linux",
		Windows8: "Windows 8",
		Vivaldi: "Vivaldi",
		smartphone: '手机',

		topRecentBannersPer: "最新横幅广告效果列表",
		image: "图片",
		origin: "广告网址",
		redirectionURL: "前端网址",
		createdAt: "创建时间",

		topViewedBannersPerByVisitorIp: "排名最高点击量的横幅广告列表",
		last10MinuteBannerList: "最近10分钟广告效果列表",

		registerYourBanner: "注册横幅广告",
		chooseBanner: "选择横幅",
		destinationURL: "落地网址",
		adsSource: "广告来源",
		addNewDomain: "添加新域名",
		filterType: "时间",
		columnName: "搜索方式",
		bannerLink: "横幅广告链接",
		advertisementSource: "广告来源",
		searchText: "搜寻文字",
		search: "搜索",
		clear: "删除",
		banner: "横幅广告",
		containerLink: "横幅广告图片链接",
		actions: "操作",
		edit: "编辑",
		save: "救",
		submit: "提交",
		updateBanner: "更新横幅",
		theseAreAllClients: "这些是点击广告横幅的人的信息",

		ip: "IP 地址",
		deviceName: "登录方式",
		deviceType: "登录方式",
		browser: "浏览器",
		os: "OS",
		language: "语言",
		country: "国家",
		region: "地区",
		city: "市",

		playerType: "玩家",
		userId: "会员账号",
		name: "名称",
		mobile: "手机号",
		device: "装置",
		sourceURL: "来源网址",
		totalTopUp: "存款总额",
		totalTopUpCount: "存款总数",
		totalWithdrawal: "提款总额",
		totalWithdrawalCount: "提款总数",
		totalClaimed: "总奖金",
		totalWinLoss: "总输赢",
		totalBonus: "总奖金",
		totalValidBet: "总有效投注额",
		noOfIp: "IP数量",
		registrationTime: "注册时间",
		otherSources: "其他来源",
		regThroughBanner: "通过横幅广告的玩家",
		regIpViewerButNotClick: "已注册，IP浏览广告，未从广告链接注册",

		// Datatable
		rowsPerPage: "每页行数",

		continentCode: "大陆码",
		countryCode: "国家代码",
		currency: "货币",
		currencyName: "货币名称",
		europeanUnion: "欧洲联盟",
		languages: "语言",
		latitude: "纬度",
		longitude: "经度",
		organization: "组织",
		postal: "邮政",
		regionCode: "地区代码",
		timezone: "时区",
		registeredDate: "登记时间",

		financeDetailedInformation: "财务详细信息",
		depositInformation: "存款记录",
		withdrawalInformation: "提款记录",
		profitInformation: "毛利记录",
		overallTotalWithdrawalValue: "提款总额",
		overallTotalWithdrawalCount: "提款次数",
		overallWithdrawalCountFromBanner: "提款次数 （通过横幅广告）",
		overallWithdrawalValueFromBanner: "提款总额 （通过横幅广告）",
		totalProfit: "总毛利",

		registerYourBanner: "注册横幅广告",
		areYouSure: "你确定吗？ 您要删除此项目，这将永久删除横幅和所有相关数据，所有IP查看器和所有客户端。",

		WindowsUNKNOWNVer: "Windows Unknown Ver.",
		WindowsPhoneOS: "Windows Phone OS.",

		firstVisitIp: "首次访问IP",
		depositAmount: "存款金额",
		depositAverage: "平均存款",
		depositCount: "存款数量",
		email: "电子邮件",
		firstDepositTime: "首次存款时间",
		firstVisitTime: "首次观看时间",
		firstWithdrawalTime: "首次提款时间",
		lastLoginTime: "上次登录时间",
		loginDevice: "登录设备",
		loginPlatform: "登录平台",
		originSource: "来源来源",
		registrationDate: "登记日期",
		registrationIp: "注册IP",
		withdrawAverage: "平均提款",
		numberOfVisits: "总造访",
		apiLink: "api链接",
		agentBy: "代理人",
		information: "信息",
		firstClickTime: "首次访问时间",
		bannerId: "首次查看的横幅ID",
		supportedFormat: "支持格式",

		information: {
			heading: "每页的详细信息",
			clients:
				"此页面包含单击横幅的所有客户/玩家，无论他们是否向我们注册都无所谓。",
			players: "此页面仅包含已向我们或其他来源注册的玩家-所有玩家均来自b91.com",
			reports: "此页面包含玩家的额外信息，例如总投注，总金额等详细信息。",
			ipClients:
				"该页面包含所有已将我们的横幅图片加载或查看到其设备浏览器中的客户端或播放器。"
		},

		auditTime: "审核时间",
		depositId: "存款 ID",
		depositTime: "存款时间",
		group: "层级组别",
		receivedDeposit: "公司实收",
		remarks: "存款备注",
		thirdPartyOrderNo: "第三方订单号",
		thirdPartyBankCode: "第三方银行代码",
		thirdPartyPaymentCode: "第三方付款代码",
		thirdPartyPaymentName: "第三方平台",
		vipId: "VIP ID",
		downloadCode: "下载代码",
		delete: "删除",
		edit: "编辑",
		registeredPlayersAlert:
			"所有这些玩家都可以单击横幅，也可以只是在设备浏览器中查看横幅，然后将其存入他们的帐户。",
		withdrawId: "提款 ID",
		withdrawalTime: '提款时间',
		withdrawalAmount: "提款金额",
		time: "时间",
		betAmount: "投注额",
		gameId: "投注 ID",
		gameGroupId: "游戏分类",
		gameName: "游戏",
		gameProviderId: "游戏商",
		jpBet: "积宝投注",
		jpWin: "积宝奖金",
		odds: "赔率",
		resultTime: "结算时间",
		roundId: "句号 ID",
		validBet: "有效投注额",
		winLoss: "赢/输",
		download: "下载",

		paymentType: "付款方式",
		sequence: "存款次数",
		thirdPartyPayment: "第三方平台",
		companyDeposit: "公司存款",
		debitCard: "借记卡",
		viettelPay: "Viettel Pay",
		qrCode: "网银扫码",
		firstDeposit: "首存",
		secondDeposit: "次存",
		dtPay: "DT 支付",
		views: '观看次数',
		report: '报表',
		selectDateRange: '选择日期范围',
		associatedReport: '相关报表',
		copy: '复制',
		id: 'ID',
		statistics: '统计',
		players: '玩家',
		deposit: '存款记录',
		withdrawals: '提款记录',
		bets: '投注记录',
		theme: '主题',
		logout: '登出',

		// Country list
		Vietnam: '越南',
		Laos: '老挝',
		Indonesia: '印尼',
		Hongkong: '香港',
		Canada: '加拿大',
		Turkey: '土耳其',
		Japan: '日本',
		Malaysia: '马来西亚',
		UnitedStates: '美国',
		Taiwan: '台湾',
		Bangladesh: '孟加拉国',
		Azerbaijan: '阿塞拜疆',
		Singapore: '新加坡',
		SouthKorea: '韩国',
		Thailand: '泰国',
		Australia: '澳大利亚',
		Asia: '亚洲',
		Europe: '欧洲',
		America: '美国',
		HongKong: ' 香港',
		Georgia: '格鲁吉亚',
		Philippines: '菲律宾',
		NewZealand: '新西兰',
		Myanmar: '缅甸',
		France: '法国',
		Russia: '俄罗斯',

		DT支付: 'DT支付',
		普通会员: '普通会员',
		新会员: '新会员',
		普通会员: '普通会员',
	};
};
