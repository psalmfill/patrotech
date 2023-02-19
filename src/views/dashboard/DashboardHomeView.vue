<template>
    <div class="container-fluid  p-3">
        <div class="map position-relative">
            <GMapMap :center="center" :zoom="7" map-type-id="terrain" class="h-100 w-100">
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
                    <el-card class="box-card" :header="al.type.toUpperCase()"    @click="alert = al; alertDialogVisible = true;">
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
            alerts :[],
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