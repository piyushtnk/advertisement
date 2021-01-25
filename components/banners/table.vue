<template>
    <div>
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="banners"
                :search="search"
                item-key="uniqueId"
            >
                <template v-slot:[`item.uniqueId`]="{ item }">
                    <div class="py-5">
                        <v-img
                            :src="findImage(item)"
                            height="100"
                            width="200"
                            class="grey lighten-2"
                        />
                    </div>
                </template>

                <template v-slot:[`item.imageType`]="{ item }">
                    {{ getUrl(item) }}
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "TableComponent",
        data() {
            return {
                search: "",
                headers: [
                    { text: "Banner", value: "uniqueId" },
                    { text: "Banner Link", value: "imageType" },
                    { text: "Redirect URL", value: "redirectUrl" },
                    { text: "Created At", value: "createdAt" },
                ],
            };
        },
        computed: {
            ...mapGetters({
                banners: "getBanners",
            }),
        },
        methods: {
            findImage(item) {
                let path = null;
                try {
                    path = require(`~/public/images/banner/${item.uniqueId}.${item.imageType}`);
                } catch (e) {
                    path = require("~/public/images/banner/default.jpg");
                }
                return path;
            },
            getUrl(item) {
                return window.location.origin + "/" + item.uniqueId;
            },
        },
    };
</script>
