import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// Language
import am4geodata_lang_zh from "@amcharts/amcharts4-geodata/lang/cn_ZH";
import am4geodata_lang_en from "@amcharts/amcharts4-geodata/lang/EN";

// Language text
import am4lang_en from "@amcharts/amcharts4/lang/en_US";
import am4lang_zh from "@amcharts/amcharts4/lang/zh_Hans";


import Vue from "vue";

Vue.prototype.$am4core = () => {
	return {
		am4core,
		am4charts,
		am4maps,
		am4geodata_worldLow,
		am4themes_animated,
		am4geodata_lang_zh,
		am4geodata_lang_en,
		am4lang_zh,
		am4lang_en
	}
}