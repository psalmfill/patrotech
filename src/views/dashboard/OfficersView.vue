<template>
    <div class="container pt-4">
        <h3>Officers</h3>
        <el-divider />
        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New Officer</el-button>
            </div>
        </div>
        <br>
        <el-table style="width: 100%" :data="users" stripe border>
            <el-table-column label="SN" type="index" />
            <el-table-column label="First Name" prop="firstName" />
            <el-table-column label="Last Name" prop="lastName" />
            <el-table-column label="Phone Number" prop="phoneNumber" />
            <el-table-column label="Gender" prop="gender" />
            <el-table-column label="State" prop="state.name" />
            <el-table-column label="City" prop="city.name" />
            <el-table-column label="Join Date" prop="createdAt"
                :formatter="(value) => new Date(value.createdAt).toDateString()" />

            <el-table-column align="right">
                <template #header>
                    <!-- <el-input v-model="search" placeholder="Type to search" /> -->
                    Action
                </template>
                <template #default="scope">
                    <el-button type="primary" size="small" :icon="View"
                        @click="userDialogVisible = true; user = scope.row">View </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Add Officer" width="40%">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="First name" :label-width="formLabelWidth">
                <el-input v-model="form.firstName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Last name" :label-width="formLabelWidth">
                <el-input v-model="form.lastName" autocomplete="off" />
            </el-form-item>
            <el-row :gutter="10">

                <el-col :span="12">

                    <el-form-item label="Gender" :label-width="formLabelWidth">
                        <el-select v-model="form.gender" placeholder="Please select gender">
                            <el-option label="Male" value="male" />
                            <el-option label="Female" value="female" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Team" :label-width="formLabelWidth">
                        <el-select @change="getStates" v-model="form.countryId" placeholder="Please select Team">
                            <el-option v-for="country in countries" :key="country.id" :label="country.name"
                                :value="country.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Email" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Phone Number" :label-width="formLabelWidth">
                <el-input v-model="form.phoneNumber" autocomplete="off" />
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="Country" :label-width="formLabelWidth">
                        <el-select @change="getStates" v-model="form.countryId" placeholder="Please select country">
                            <el-option v-for="country in countries" :key="country.id" :label="country.name"
                                :value="country.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="State" :label-width="formLabelWidth">
                        <el-select @change="getCities" v-model="form.stateId" placeholder="Please select state">
                            <el-option v-for="state in states" :key="state.id" :label="state.name" :value="state.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="City" :label-width="formLabelWidth">
                        <el-select v-model="form.cityId" placeholder="Please select city">
                            <el-option v-for="city in cities" :key="city.id" :label="city.name" :value="city.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Address" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off" />
                <el-form-item label="Role" :label-width="formLabelWidth">
                    <el-select v-model="form.roleId" placeholder="Please select city">
                        <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
                    </el-select>
                </el-form-item>
            </el-form-item>
            <el-form-item label="Password" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off" />
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
    <user-detail @userDetailClosed="userDialogVisible = false" :initialUser="user" :dialogVisible="userDialogVisible" />
</template>

<script>
import { isArray } from '@vue/shared'
import { reactive, ref } from 'vue'
import axios from '../../plugins/axios'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    View
} from '@element-plus/icons-vue'
import UserDetail from '../../components/UserDetail.vue'


export default {
    data() {
        return {
            formLabelWidth: '100%',
            form: {
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                countryId: '',
                stateId: '',
                cityId: '',
                roleId: '',
                address: '',
                password: ''
            },
            View,
            dialogFormVisible: ref(false),
            user: null,
            userDialogVisible: ref(false),
            search: '',
            users: [],
            roles: [],
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
        getUsers() {
            axios.get('admin/officers').then(response => {
                console.log('response', response)
                this.users = response.data['data']
            })
        },
        getCountries() {
            axios.get('locations/countries').then(response => {
                this.countries = response.data
            })
        },
        getRoles() {
            axios.get('admin/roles').then(response => {
                this.roles = response.data
            })
        },
        getStates(countryId) {
            console.log('getState', countryId)
            axios.get(`locations/countries/${countryId}/states`).then(response => {
                this.states = response.data
            })
        },
        getCities(stateId) {
            axios.get(`locations/states/${stateId}/cities`).then(response => {
                this.cities = response.data
            })
        },

        resetForm() {
            this.form = {
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                countryId: '',
                stateId: '',
                cityId: '',
                address: ''

            }
        },
        saveUser() {
            this.saving = true
            axios.post('admin/users', this.form).then(response => {
                console.log('saved', response.data)
                this.users.push(response.data)
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
        this.getUsers()
        this.getCountries()
        this.getRoles()
    },
}
</script>