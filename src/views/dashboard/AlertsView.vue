<template>
    <div class="container pt-4">
        <h3>Alerts</h3>
        <el-divider />
        <br>
        <el-table style="width: 100%" :data="alerts" v-loading="loading" stripe border>
            <el-table-column label="SN" type="index" />
            <el-table-column label="User" prop="user.fullName" />
            <el-table-column label="Gender" prop="user.gender" />
            <el-table-column label="Location" prop="location" />
            <el-table-column label="Longitude" prop="longitude" />
            <el-table-column label="Latitude" prop="latitude" />
            <el-table-column label="Status" prop="status" />
            <el-table-column label="Date" prop="createdAt" :formatter="(v) => new Date(v.createdAt).toLocaleString()" />

            <el-table-column align="center">
                <template #header>
                    Action
                </template>
                <template #default="scope">
                    <el-button type="primary" size="small" :icon="View"
                        @click="alert = scope.row; alertDialogVisible = true;">View </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <alert-dialog @alertDialogClosed="alertDialogVisible = false" :initialAlert="alert"
        :dialogVisible="alertDialogVisible" />
</template>

<script>
import axios from '../../plugins/axios'
import { reactive, ref } from 'vue'
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
import AlertDialog from '../../components/AlertDialog.vue'
export default {
    components: { AlertDialog },
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
            alertDialogVisible: ref(false),
            search: '',
            alerts: [],
            alert: null,
            countries: [],
            states: [],
            cities: [],
            saving: false,
            loading: ref(false),
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
            this.loading = true;
            axios.get('admin/alerts').then(response => {
                console.log('response', response)
                this.alerts = response.data
                this.loading = false
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
        ...mapState({
        }),
        ...mapGetters({

        })
    }
}
</script>