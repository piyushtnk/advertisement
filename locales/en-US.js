export default async (context, locale) => {
	return await ({
		welcome: "Welcome",
		visitors: 'All Banner Clicks',
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
			reports: 'Reports',
			otherPlayers: 'Other Players',
			ipClients: 'API IP Clients'
		},
		dashboard: {
			recentInteractionUserGraph: 'Recent interaction users graph',
			recentVisitorThroughBanner: 'Recent visitors through banner',
			liveStatistics: 'Live Statistics',
			actualVisitors: 'Unique Banner Clicks',
			registeredVisitors: 'Registered Visitors From Banners',
			registeredBanners: 'Banners Added To The System',
			systemStats: 'System Stats',
			admins: 'Admins',
			loggedInAdmins: 'Logged In Admins'
		},
		ip: {
			alert: "These are the clients who's tried to access or requested our banner image"
		}
	})
}