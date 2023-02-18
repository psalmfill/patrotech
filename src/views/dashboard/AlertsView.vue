<template>
    <div class="container pt-4">
        <h3>Alerts</h3>
        <el-divider />
        <br>
        <el-table style="width: 100%" :data="alerts" stripe border>
            <el-table-column label="SN" type="index" />
            <el-table-column label="User" prop="user.fullName" />
            <el-table-column label="Gender" prop="user.gender" />
            <el-table-column label="Location" prop="location" />
            <el-table-column label="Longitude" prop="longitude" />
            <el-table-column label="Latitude" prop="latitude" />
            <el-table-column label="Status" prop="status" />
            <el-table-column label="Date" prop="createdAt"
                :formatter="(v) => new Date(v.createdAt).toLocaleString()" />

            <el-table-column align="center">
                <template #header>
                    Action
                </template>
                <template #default="scope">

                    <router-link :to="`/dashboard/users/${scope.row.id}`">
                        <el-button type="primary" :icon="View">View </el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import { isArray } from '@vue/shared'
import { reactive, ref } from 'vue'
import axios from '../../plugins/axios'
import { mapState, mapGetters } from 'vuex'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    View
} from '@element-plus/icons-vue'
export default {
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                countryId: null,
                stateId: null,
                cityId: null,
                address: ''
            },
            View,
            dialogFormVisible: ref(false),
            search: '',
            alerts: [],
            countries: [],
            states: [],
            cities: [],
            saving: false,
            alert: {
                message: '',
                type: ''
            }
        }
    },
    computed: {
        filteredTableData() {

        }
    },
    methods: {
        getAlerts() {
            axios.get('admin/alerts').then(response => {
                console.log('response', response)
                this.alerts = response.data
            })
        },
        
        saveUser() {
            this.saving = true
            axios.post('admin/users', this.form).then(response => {
                console.log('saved', response.data)
                this.$store.commit('addUser', response.data)
                this.saving = false
                this.alert = {
                    message: 'New user created successfully',
                    type: 'success'
                }


            }).catch(error => {
                console.log('error response', error)
                this.saving = false
                this.alert = {
                    message: error.response.data.message,
                    type: 'error'
                }

            })
        }
    },
    created() {
        this.getAlerts()
    },
    computed: {
        ... mapState({
    }),
    ...mapGetters({
        
    })
    }
}
</script>