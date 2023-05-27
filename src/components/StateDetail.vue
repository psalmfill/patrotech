<template>
    <el-dialog @closed="$emit('stateDialogVisible')" v-model="dialogVisible" :title="`${state?.name}'s cities`" width="60%"
        center>

        <template #default>
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New City</el-button>
            </div>
            <el-divider />
            <el-table v-loading="loading" :data="cities">
                <el-table-column label="SN" type="index" />
                <el-table-column label="Name" prop="name" />
                <el-table-column label="Code" prop="code" />
                <el-table-column align="center">
                    <template #default="scope">
                        <!-- <el-button class="btn-primary" @click=" stateDialogVisible=true; state = scope.row ">view</el-button> -->

                        <el-button @click="deleteState(scope.row)" class="btn-danger ml-1">Delete</el-button>

                    </template>
                </el-table-column>
            </el-table>


            <el-dialog v-model="dialogFormVisible" title="New City" width="30%" height="80%">
                <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
                    @close="() => { alert = { message: '', type: '' }; }" />
                <el-form v-loading="saving" :model="form" label-position="top">
                    <el-form-item label="City Name" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" placeholder="Name" />
                    </el-form-item>
                    <el-form-item label="City Code" :label-width="formLabelWidth">
                        <el-input v-model="form.code" :rows="2" placeholder="City Code" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button @click="saveCity" type="primary">
                            Save
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </template>
    </el-dialog>
</template>
<script>
import { ref } from 'vue'
import axios from '@/plugins/axios'

export default {
    props: ['state', 'dialogVisible'],
    data() {
        return {
            form: {
                name: '',
                code: '',
                stateId: null
            },
            cities: [],
            loading: ref(false),
            dialogFormVisible: ref(false),
            saving: false,
            alert: {
                message: '',
                type: ''
            }
        }
    },
    methods: {
        getCities() {
            this.loading = true;

            axios.get(`locations/states/${this.state.id}/cities`)
                .then(response => {
                    this.loading = false
                    this.cities = response.data
                }).catch(error => {
                    this.loading = false
                })
        },

        async deleteState(city) {


            ElMessageBox.confirm(
                `${city.name} will be deleted permanently. Continue?`,
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                })
                .then(() => {
                    axios.delete(`locations/states/${this.state.id}/cities/${city.id}`).then(response => {
                        this.cities = this.cities.filter(t => t.id != city.id)

                        ElMessage({
                            type: 'success',
                            message: 'Delete completed',
                        })
                    }).catch(() => {

                        ElMessage({
                            type: 'danger',
                            message: 'Delete failed',
                        })
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        },

        resetForm() {
            this.form = {
                name: '',
                code: '',
                phoneCode: '',

            }
        },
        saveCity() {

            this.saving = true
            this.form.stateId = this.state.id
            axios.post(`locations/states/${this.state.id}/cities`, this.form).then(response => {
                this.cities.push(response.data)
                this.saving = false
                this.alert = {
                    message: 'New State created successfully',
                    type: 'success'
                }
                this.resetForm()

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
    beforeUpdate() {
        this.getCities()
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>