export default {
	data: () => ({
		defaultFilterDate: 1,
		filterDate: [
			{
				state: 7,
				abbr: "All Time",
			},
			{
				state: 1,
				abbr: "Today",
			},
			{
				state: 2,
				abbr: "Yesterday",
			},
			{
				state: 3,
				abbr: "This Week",
			},
			{
				state: 4,
				abbr: "Last Week",
			},
			{
				state: 5,
				abbr: "This Month",
			},
			{
				state: 6,
				abbr: "Last Month",
			},
		],
	})
}