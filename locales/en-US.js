export default async (context, locale) => {
	return await {
		welcome: "Welcome",
		visitors: "All Banner Clicks (PV)",
		chooseSpecificDate: "Choose Specific Date",
		ok: "Ok",
		okay: "Okay",
		cancel: "Cancel",
		layout: {
			system: 'System',
			players: "Member",
			clients: "Ads Click",
			banner: "Banner",
			systemPanel: "System Panel",
			dashboard: "Dashboard",
			statistics: "Statistics",
			reports: "Reports",
			otherPlayers: "Other Players",
			ipClients: "API IP Clients",
			information: "Information",
			deposit: "Deposit",
			withdrawals: "Withdrawals",
			bets: "Bets",
			ip: "IP",
			zh: 'ZH',
			domain: 'Domain'
		},
		dashboard: {
			recentInteractionUserGraph: "Recent interaction users graph",
			recentVisitorThroughBanner: "Recent visitors through banner",
			liveStatistics: "Live Statistics",
			actualVisitors: "Unique Banner Clicks (UV)",
			registeredVisitors: "Registered Visitors From Banners",
			registeredBanners: "Banners Added To The System",
			systemStats: "System Stats",
			admins: "Admins",
			loggedInAdmins: "Logged In Admins"
		},
		ipAlert:
			"These are the clients who's tried to access or requested our banner images",
		statsMessage:
			"Be Patient, It'll take some time, Live data are being computed and will be displayed soon",
		statsMessage2: "All finance data will update on every 30 minutes.",
		statsMessage3: "Next update remaining time - ",
		all: "All (From - 26/01/2021)",
		today: "Today",
		yesterday: "Yesterday",
		thisWeek: "This week",
		lastWeek: "Last week",
		thisMonth: "This month",
		lastMonth: "Last month",
		localeType: "en-us",
		visitorAllOverWorld: "Visitors all over the world",
		overallTotalTopUpValue: "Overall Total Top-up Value (All Sources)",
		overallTopUpCount: "Overall Top-up Count (All Sources)",
		overallTopUpCountFromBanners: "Overall Top-up Count From Banner",
		overallTotalTopUpValueFromBanners:
			"Overall Total Top-up Value From Banners",
		overallClicksOnBanners: "Overall Clicks On Banners (PV)",
		uniqueClicksOnBanners: "Unique Clicks On Banners (UV)",
		regPlayersFromBanners: "Registered Players From Banners",
		topPlayersFromAllSources: "Top-up Players From All Sources",
		uniqueBannerClicksFromPC: "Unique Banner Clicks From PC (UV)",
		uniqueBannerClicksFromMobile: "Unique Banner Clicks From Mobile (UV)",
		bannerViewers: "Banner Viewers (API/IP)",
		fromBrowser: "From Browser",
		fromOS: "From OS",
		clicks: "Clicks",

		// Browser list
		Chrome: "Chrome",
		PC: 'PC',
		pc: 'PC',
		zh: 'ZH',
		clients: 'Clients',
		Safari: "Safari",
		GoogleSearchApp: "Google Search App",
		Webview: "Webview",
		Edge: "Edge",
		Firefox: "Firefox",
		UNKNOWN: "UNKNOWN",
		Opera: "Opera",
		InternetExplorer: "Internet Explorer",
		Googlebot: "Googlebot",
		YandexBrowser: "Yandex Browser",

		// Device list
		Android: "Android",
		AndroidMobile: 'Android Mobile',
		AndroidTablet: 'Android Tablet',
		iPhone: "iPhone",
		MacOSX: "MAC OSX",
		Windows10: "Windows 10",
		WindowsXP: "Windows XP",
		Windows7: "Windows 7",
		iPad: "iPad",
		iPod: "iPod",
		Windows81: "Windows 8.1",
		Linux: "Linux",
		Windows8: "Windows 8",
		Vivaldi: "Vivaldi",
		smartphone: 'Smart Phone',

		topRecentBannersPer: "Top Recent Banners Performance - Selected Date wise.",
		image: "Image",
		origin: "Origin",
		redirectionURL: "Redirection URL",
		createdAt: "Created At",

		topViewedBannersPerByVisitorIp:
			"Top Viewed Banners Performance By Visitors IPs.",
		last10MinuteBannerList: "Last 10 Minutes Banners Performance List.",

		registerYourBanner: "Register Your Banner",
		chooseBanner: "Choose Banner",
		destinationURL: "Destination URL",
		adsSource: "Advertisement Source",
		addNewDomain: "Add New Domain?",
		filterType: "Filter type",
		columnName: "Column name",
		bannerLink: "Banner link",
		advertisementSource: "Advertisement Source",
		searchText: "Search Text",
		search: "Search",
		clear: "Clear",
		banner: "Banner",
		containerLink: "Container Link",
		actions: "Actions",
		edit: "Edit",
		save: "Save",
		submit: "Submit",
		updateBanner: "Update Banner",
		theseAreAllClients:
			"This is the list of people who click on the advertisement banners",

		ip: "IP",
		deviceName: "Device name",
		deviceType: "Device type",
		browser: "Browser",
		os: "OS",
		language: "Language",
		country: "Country",
		region: "Region",
		city: "City",

		playerType: "Player Type",
		userId: "User ID",
		name: "Name",
		mobile: "Mobile",
		device: "Device",
		sourceURL: "Source URL",
		totalTopUp: "Total Top-up",
		totalTopUpCount: "Total Top-up Count",
		totalWithdrawal: "Total Withdrawal",
		totalWithdrawalCount: "Total Withdrawal Count",
		totalClaimed: "Total Bonus",
		totalWinLoss: "Total Win/Loss",
		totalValidBet: "Total Valid Bet",
		totalBonus: "Total Bonus",
		noOfIp: "No. of IP",
		registrationTime: "Registration Time",
		otherSources: "Other sources",
		regThroughBanner: "Registered Through Banner",
		regIpViewerButNotClick: "Registered IP viewers but not clicked on banner",

		// Datatable
		rowsPerPage: "Rows Per Page",

		continentCode: "Continent code",
		countryCode: "Country Code",
		currency: "Currency",
		currencyName: "Currency Name",
		europeanUnion: "European Union",
		languages: "Languages",
		latitude: "Latitude",
		longitude: "Longitude",
		organization: "Organization",
		postal: "Postal",
		regionCode: "Region Code",
		timezone: "Timezone",
		registeredDate: "Registration Date",

		financeDetailedInformation: "Finance Detailed Information",
		depositInformation: "Deposit Information",
		withdrawalInformation: "Withdrawal Information",
		profitInformation: "Profit Information",
		overallTotalWithdrawalValue: "Overall Total Withdrawal Value (All Sources)",
		overallTotalWithdrawalCount: "Overall Total Withdrawal Count (All Sources)",
		overallWithdrawalCountFromBanner: "Overall Withdrawal Count From Banners",
		overallWithdrawalValueFromBanner: "Overall Withdrawal Value From Banners",
		totalProfit: "Estimated Profit",

		registerYourBanner: "Register Your Banner",
		areYouSure: "Are you sure? you want to delete this item, This will permanently delete the banner and all related data all IP Viewers, and All clients.",
		WindowsUNKNOWNVer: "Windows Unknown Ver.",
		WindowsPhoneOS: "Windows Phone OS.",

		firstVisitIp: "First Visit Ip",
		depositAmount: "Deposit Amount",
		depositAverage: "Deposit Average",
		depositCount: "Deposit Count",
		email: "E-Mail",
		firstDepositTime: "First Deposit Time",
		firstVisitTime: "First View Time",
		firstWithdrawalTime: "First Withdrawal Time",
		lastLoginTime: "Last Login Time",
		loginDevice: "Login Device",
		loginPlatform: "Login Platform",
		originSource: "Origin Source",
		registrationDate: "Registration Date",
		registrationIp: "Registration Ip",
		withdrawAverage: "Withdrawal Average",
		numberOfVisits: "Total Visits",
		apiLink: "Api Link",
		agentBy: "Agent By",
		firstClickTime: "First Visit Time",
		bannerId: "First Viewed Banner Id",
		supportedFormat: "Supported format",

		information: {
			heading: "Detailed information about every page",
			clients:
				"This page contain all the clients/players who clicked on banner it doesn't matter either they are registered with us or not.",
			players:
				"This page contain only players who did registered with us or other sources - all players are from b91.com",
			reports:
				"This page contain extra information of players in details like total bet, total amount etc.",
			ipClients:
				"This page contain all clients or players, who has loaded or viewed our banner image into their device browser."
		},

		auditTime: "Audit Time",
		depositId: "Deposit Id",
		depositTime: "Deposit Time",
		group: "Member Level",
		receivedDeposit: "Received Deposit",
		remarks: "Remarks",
		thirdPartyOrderNo: "Third Party Order No.",
		thirdPartyBankCode: "Third Party Bank Code",
		thirdPartyPaymentCode: "Third Party Payment Code",
		thirdPartyPaymentName: "Third Party Payment Name",
		vipId: "VIP Id",
		downloadCode: "Download Code",
		delete: "Delete",
		edit: "Edit",
		registeredPlayersAlert:
			"These all players are either clicked on a banner or just viewed the banner into device browser, and made a deposit into their account.",
		withdrawId: "Withdrawal Id",
		withdrawalTime: 'Withdrawal Time',
		withdrawalAmount: "Withdrawal Amount",
		time: "Time",
		betAmount: "Bet Amount",
		gameId: "Bet Id",
		gameGroupId: "Game Group Id",
		gameName: "Game Name",
		gameProviderId: "Game Provider Id",
		jpBet: "JP Bet",
		jpWin: "JP Win",
		odds: "Odds",
		resultTime: "Result Time",
		roundId: "Round Id",
		validBet: "Valid Bet",
		winLoss: "Win/Loss",
		download: "Download",

		paymentType: "Payment Type",
		sequence: "Sequence",
		thirdPartyPayment: "Third Party Payment",
		companyDeposit: "Company Deposit",
		debitCard: "Debit Card",
		viettelPay: "Viettel Pay",
		qrCode: "QR Code",
		firstDeposit: "1st Deposit",
		secondDeposit: "2nd Deposit",
		dtPay: "DT支付",
		views: 'Views',
		report: 'Report',
		selectDateRange: 'Select date range',
		associatedReport: 'Associated Report',
		copy: 'Copy',
		id: 'ID',
		statistics: 'Statistics',
		players: 'Players',
		deposit: 'Deposit',
		withdrawals: 'Withdrawals',
		bets: 'Bets',
		theme: 'Theme',
		logout: 'Logout',

		// Country list
		Vietnam: 'Vietnam',
		Laos: 'Laos',
		Indonesia: 'Indonesia',
		Hongkong: 'Hongkong',
		Canada: 'Canada',
		Turkey: 'Turkey',
		Japan: 'Japan',
		Malaysia: 'Malaysia',
		UnitedStates: 'United',
		Taiwan: 'Taiwan',
		Bangladesh: 'Bangladesh',
		Azerbaijan: 'Azerbaijan',
		Singapore: 'Singapore',
		SouthKorea: 'South',
		Thailand: 'Thailand',
		Australia: 'Australia',
		Asia: 'Asia',
		Europe: 'Europe',
		America: 'America',
		HongKong: ' Hong Kong',
		Georgia: 'Georgia',
		Philippines: 'Philippines',
		NewZealand: 'New Zealand',
		Myanmar: 'Myanmar',
		France: 'France',
		Russia: 'Russia',


		DT支付: 'DTPAY',
		普通会员: 'Ordinary Member',
		新会员: 'New',
		普通会员: ' Ordinary',
	};
};
