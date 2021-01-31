export default async (context, locale) => {
	return await ({
		welcome: "Welcome",
		layout: {
			systemPanel: "System Panel",
			dashboard: 'Dashboard',
			statistics: 'Statistics',
			banner: 'Banner',
			clients: 'Clients',
			players: 'Players'
		},
		recentInteractionUserGraph: 'Recent interaction users graph',
		recentVisitorThroughBanner: 'Recent visitors through banner'
	})
}