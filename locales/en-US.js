export default async (context, locale) => {
	return await ({
		welcome: "Welcome",
		visitors: '',
		chooseSpecificDate: 'Choose Specific Date',
		ok: 'Ok',
		okay: 'Okay',
		cancel: 'Cancel',
		layout: {
			players: 'Players',
			clients: 'Clients',
			banner: 'Banner',
			systemPanel: "System Panel",
			dashboard: 'Dashboard',
			statistics: 'Statistics',
			reports: 'Reports'
		},
		dashboard: {
			recentInteractionUserGraph: 'Recent interaction users graph',
			recentVisitorThroughBanner: 'Recent visitors through banner',
			liveStatistics: 'Live Statistics',
			actualVisitors: 'Actual Visitors',
			registeredVisitors: 'Registered Visitors',
			registeredBanners: 'Registered Banners',
			systemStats: 'System Stats',
			admins: 'Admins',
			loggedInAdmins: 'Logged In Admins'
		}
	})
}