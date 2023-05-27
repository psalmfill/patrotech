<template>
    <el-dialog class="alert-dialog bg-dark text-white " v-loading="loading" v-model="dialogVisible"
        @closed="$emit('alertDialogClosed')" width="100%" height="100%" top="0" center
        :title="`${alert?.type} alert from ${alert?.user.fullName} @ ${alert?.location}`.toUpperCase()">
        <div class="row no-gutters">
            <div class="col-md-10">
                <div class="map position-relative">
                    <GMapMap :center="{
                        lat: +initialAlert.latitude,
                        lng: +initialAlert.longitude,
                    }" :zoom="50" map-type-id="terrain" class="h-100 w-100" :options="options">
                        <GMapCluster :zoomOnClick="true">
                            <GMapMarker :position="{
                                lat: +initialAlert.latitude,
                                lng: +initialAlert.longitude,
                            }" :clickable="true" @click="center = {
    lat: +initialAlert.latitude,
    lng: +initialAlert.longitude,
}" />
                        </GMapCluster>
                    </GMapMap>
                </div>

            </div>
            <div class="col-md-2 p-2">
                <h5 class="text-center ">Alert Detail</h5>
                <table class="table table-striped text-white ">
                    <tr>
                        <td class="">Client</td>
                        <td>{{ alert?.user.fullName }}</td>
                    </tr>

                    <tr>
                        <td>Gender</td>
                        <td>{{ alert?.user.gender }}</td>
                    </tr>

                    <tr>
                        <td>Phone Number</td>
                        <td>{{ alert?.user.phoneNumber }}</td>
                    </tr>
                    <tr>
                        <td>Longitude</td>
                        <td>{{ alert?.longitude }}</td>
                    </tr>
                    <tr>
                        <td>Latitude</td>
                        <td>{{ alert?.latitude }}</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>{{ alert?.location }}</td>
                    </tr>

                    <tr>
                        <td>Status</td>
                        <td>{{ alert?.status }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import { ref } from 'vue'
import axios from '@/plugins/axios'
import StateDetail from './StateDetail.vue'

export default {
    props: ['initialAlert', 'dialogVisible'],
    components: {
        StateDetail
    },
    data() {
        return {

            center: { lat: 4.929987, lng: 7.87216 },
            markers: [
                {
                    position: {
                        lat: 4.093048,
                        lng: 6.84212,
                    },
                },

            ],
            alert: null,
            options: {
                styles: [
                    {
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#1d2c4d"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#8ec3b9"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#1a3646"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#4b6878"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#64779e"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#4b6878"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#334e87"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.natural",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#023e58"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#283d6a"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#6f9ba5"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#1d2c4d"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#023e58"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#3C7680"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#304a7d"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#98a5be"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#1d2c4d"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2c6675"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#255763"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#b0d5ce"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#023e58"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#98a5be"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#1d2c4d"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#283d6a"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#3a4762"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#0e1626"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#4e6d70"
                            }
                        ]
                    }
                ]
            },
            loading: ref(false),
            dialogFormVisible: ref(false),
            stateDialogVisible: ref(false),
        }
    },
    methods: {
        getAlert() {
            this.alert = this.initialAlert
            axios.get(`admin/alerts/${this.alert.id}`).then(response => {
                console.log('response', response.data)
                this.alert = response.data
            })
        },

    },
    beforeUpdate() {
        this.getAlert()
    },

}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.alert-dialog {
    height: 80% !important;
    width: 80%;
}

.map {
    width: 100%;
    height: 600px;
    background: #f1f1f1;
    /* position: relative; */

}
</style>