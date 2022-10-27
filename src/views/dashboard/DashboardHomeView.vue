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
                <el-col :span="6" v-for="p in 4" :key="p" class="p-2">
                    <el-card class="box-card">
                        <h4>Incident</h4>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script>
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
        }
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