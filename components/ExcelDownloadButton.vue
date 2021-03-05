<template>
	<div>
		<v-btn
			:loading="loading"
			:disabled="loading"
			color="green"
			class="white--text"
			block
			@click="downloadNow"
		>
			{{ $t("download") }}
			<v-icon right dark> mdi-download </v-icon>
		</v-btn>
	</div>
</template>

<script>
	export default {
		name: "ExcelDownloadButton",
		props: ["excelData", "fileName", "loading"],
		data() {
			return {};
		},
		computed: {},
		watch: {},
		methods: {
			downloadNow() {
				let columnNames = "";
				const csvString = [
					...this.excelData.map((item) => {
						let tempColumnNames = [];
						let columnValues = [];
						for (const [key, value] of Object.entries(item)) {
							columnValues.push(value);
							tempColumnNames.push(key);
						}
						columnNames = tempColumnNames;
						return columnValues;
					}),
				];

				columnNames = columnNames.join() + "\n";
				csvString.forEach(function (row) {
					columnNames += row.join(",");
					columnNames += "\n";
				});

				var hiddenElement = document.createElement("a");
				hiddenElement.href =
					"data:text/csv;charset=utf-8," + encodeURI(columnNames);
				hiddenElement.target = "_blank";
				hiddenElement.download = this.fileName + ".csv";
				hiddenElement.click();
			},
		},
	};
</script>
