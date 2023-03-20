<template>
    <div class="container-fluid  p-3">
        <div class="map position-relative">
            <GMapMap :center="center" :zoom="7" map-type-id="terrain" class="h-100 w-100" :options="options">
                <GMapCluster>
                    <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                        :draggable="true" @click="center = m.position" />
                </GMapCluster>
            </GMapMap>
        </div>

    </div>
    <div class="container">
        <div class="emergencies mt-4">
            <h2>Latest Emergencies</h2>
            <el-row :gutter="0">
                <el-col :span="6" v-for="al in alerts" :key="al.id" class="p-2">
                    <el-card class="box-card" :header="al.type.toUpperCase()"
                        @click="alert = al; alertDialogVisible = true;">
                        <div class="d-flex justify-content-between">
                            <h5>Client</h5>
                            <div>{{ al.user.fullName }}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>

    <alert-dialog @alertDialogClosed="alertDialogVisible = false" :initialAlert="alert"
        :dialogVisible="alertDialogVisible" />
</template>
<script>
import axios from '../../plugins/axios'

export default {
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
                {
                    position: {
                        lat: 4.198429,
                        lng: 6.69529,
                    },
                },
                {
                    position: {
                        lat: 4.165218,
                        lng: 7.067116,
                    },
                },
                {
                    position: {
                        lat: 4.09256,
                        lng: 6.84074,
                    },
                },
            ],
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
            alerts: [],
            alert: null,
            alertDialogVisible: false,
        }
    },
    methods: {
        getAlerts() {
            axios.get('admin/alerts').then(response => {
                console.log('response', response)
                this.alerts = response.data
            })
        },
    },
    created() {
        this.getAlerts()
    }
}
</script>
<style scoped>
.map {
    width: 100%;
    height: 500px;
    background: #f1f1f1;
    /* position: relative; */

}
</style>