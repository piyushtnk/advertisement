<template>
    <div>
        <v-row class="mt-6">
            <v-col cols="12">
                <v-card class="mx-auto">
                    <v-app-bar dark>
                        <v-toolbar-title>Live Statistics</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-col cols="auto" class="ml-auto">
                                <v-select
                                    v-model="defaultFilterDate"
                                    :items="filterDate"
                                    item-value="state"
                                    item-text="abbr"
                                    label="Filter Type"
                                    full-width
                                />
                            </v-col>
                        </v-row>
                    </v-app-bar>

                    <v-container>
                        <v-row>
                            <v-col cols="12" lg="4" md="6" sm="12">
                                <v-card class="mx-auto" outlined>
                                    <v-card-title class="display-3">{{
                                        stats.visitors
                                    }}</v-card-title>
                                    <v-card-text> Visitors (PV) </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12" lg="4" md="6" sm="12">
                                <v-card class="mx-auto" outlined>
                                    <v-card-title class="display-3">{{
                                        stats.uniqueVisitors
                                    }}</v-card-title>
                                    <v-card-text>
                                        Actual Visitors (UV)
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12" lg="4" md="6" sm="12">
                                <v-card class="mx-auto" outlined>
                                    <v-card-title class="display-3">{{
                                        stats.registeredVisitors
                                    }}</v-card-title>
                                    <v-card-text>
                                        Registered Visitors (RV)
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>

        <!-- 2nd box -->
        <v-row class="mt-6">
            <v-col cols="12">
                <v-card class="mx-auto">
                    <v-app-bar dark>
                        <v-toolbar-title>System Stats</v-toolbar-title>
                    </v-app-bar>

                    <v-container>
                        <v-row>
                            <v-col cols="12" lg="4" md="6" sm="12">
                                <v-card class="mx-auto" outlined>
                                    <v-card-title class="display-3">{{
                                        dashboard.banners
                                    }}</v-card-title>
                                    <v-card-text> Banners </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12" lg="4" md="6" sm="12">
                                <v-card class="mx-auto" outlined>
                                    <v-card-title class="display-3">{{
                                        dashboard.admins
                                    }}</v-card-title>
                                    <v-card-text> Admins </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="12" lg="4" md="6" sm="12">
                                <v-card class="mx-auto" outlined>
                                    <v-card-title class="display-3">{{
                                        dashboard.liveAdmins
                                    }}</v-card-title>
                                    <v-card-text> LoggedIn Admins </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "CountersComponent",
        data: () => ({
            defaultFilterDate: 1,
            filterDate: [
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
                /* {
                                                                                    state: 5,
                                                                                    abbr: "This Month",
                                                                                },
                                                                                {
                                                                                    state: 6,
                                                                                    abbr: "Last Month",
                                                                                },
                                                                                {
                                                                                    state: 7,
                                                                                    abbr: "All Time",
                                                                                }, */
            ],
        }),
        computed: {
            ...mapGetters({
                dashboard: "getDashboard",
                stats: "getStats",
            }),
        },
        watch: {
            defaultFilterDate(value) {
                this.$emit("childFilterForCounter", value);
            },
        },
    };
</script>
