<template>
    <div class="container pt-4">
        <h3>Countries</h3>
        <el-divider />
        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New Country</el-button>
            </div>
        </div>
        <el-divider />
        <el-table v-loading="loading" style="width: 100%" :data="countries">
            <el-table-column label="SN" type="index" />
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Code" prop="code" />
            <el-table-column label="Phone Code" prop="phoneCode" />
            <el-table-column align="center">
                <template #header>
                    <el-input v-model="search" placeholder="Type to search" />
                </template>
                <template #default="scope">
                        <el-button class="btn-primary" @click=" countryDialogVisible=true; country = scope.row ">view</el-button>
                    <el-button @click="deleteCountry(scope.row)" class="btn-danger ml-1">Delete</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="New Country" width="30%">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="Name" />
            </el-form-item>
            <el-form-item label="Code" :label-width="formLabelWidth">
                <el-input v-model="form.code" :rows="2"  placeholder="Code" />
            </el-form-item>
            <el-form-item label="Code" :label-width="formLabelWidth">
                <el-input v-model="form.phoneCode" :rows="2"  placeholder="Phone Code" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button @click="saveUser" type="primary">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
    <country-detail @countryDetailClosed="countryDialogVisible = false" :dialog-visible="countryDialogVisible" :country="country"></country-detail>
</template>

<script>
import { isArray } from '@vue/shared'
import { reactive, ref } from 'vue'
import axios from '@/plugins/axios'
import CountryDetail from '../../components/CountryDetail.vue'

import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    data() {
        return {
            form: {
                name: '',
                code: '',
                phoneCode: '',
            },
            dialogFormVisible: ref(false),
            countryDialogVisible: ref(false),
            search: '',
            countries: [],
            country:null,
            saving: false,
            loading:false,
            alert: {
                message: '',
                type: ''
            }
        }
    },
    components: {
        CountryDetail
    },
    computed: {
        filteredTableData() {

        }
    },
    methods: {
        getCountries() {
            this.loading = true;
            axios.get('locations/countries').then(response => {
                this.countries = response.data
                this.loading = false;
            }).catch(response => {
                this.loading = false;
            })
        },

        async deleteCountry(country) {


            ElMessageBox.confirm(
                `${country.name} will be deleted permanently. Continue?`,
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                })
                .then(() => {
                    axios.delete(`locations/countries/${country.id}`).then(response => {
                        this.countries = this.countries.filter(t => t.id != country.id)

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
        saveUser() {
            this.saving = true
            axios.post('locations/countries', this.form).then(response => {
                this.countries.push(response.data)
                this.saving = false
                this.alert = {
                    message: 'New Country created successfully',
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
        this.getCountries()
    },
}
</script>