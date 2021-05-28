module.exports = {
	apps: [
		{
			name: 'advertisement',
			exec_mode: 'cluster',
			script: './node_modules/nuxt/bin/nuxt.js',
			args: 'start',
			port: '3000'
		}
	]
}
