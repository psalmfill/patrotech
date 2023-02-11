<template>
    <div class="container mt-4">
        <h1>Profile</h1>
        <el-card class="border-0 shadow-none">
            <div class="row">
                <div class="col-md-3 text-center">
                    <img src="../../assets/images/user.jpg" class=" rounded-circle" width="200" />
                    <el-button class="mt-2">Change</el-button>
                </div>
                <div class="col-md-8">
                    <el-button class="mt-2 float-right btn-primary" @click="dialogFormVisible = true">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        &nbsp;
                        Edit
                    </el-button>

                    <div class="">
                        <h6 class="text-secondary">Name</h6>
                        <h5>{{ user.firstName }} {{ user.lastName }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Gender</h6>
                        <h5>{{ user.gender }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Email</h6>
                        <h5>{{ user.email }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Phone Number</h6>
                        <h5>{{ user.phoneNumber }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Country</h6>
                        <h5>{{ user.country?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>State</h6>
                        <h5>{{ user.state?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">City</h6>
                        <h5>{{ user.city?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Address</h6>
                        <h5>{{ user?.address }}</h5>
                    </div>
                </div>
            </div>
        </el-card>
        <el-dialog v-model="dialogFormVisible" title="Edit User">
            <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
                @close="() => { alert = { message: '', type: '' }; }" />
            <el-form v-loading="saving" :model="form" label-position="top">
                <el-form-item label="First name" :label-width="formLabelWidth">
                    <el-input v-model="form.firstName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Last name" :label-width="formLabelWidth">
                    <el-input v-model="form.lastName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Gender" :label-width="formLabelWidth">
                    <el-select v-model="form.gender" placeholder="Please select gender">
                        <el-option label="Male" value="male" />
                        <el-option label="Female" value="female" />
                    </el-select>
                </el-form-item>
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
                                <el-option v-for="state in states" :key="state.id" :label="state.name"
                                    :value="state.id" />
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
                    <el-input v-model="form.address" autocomplete="off" :value="user.address" />
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

    </div>

</template>
<script>
import axios from "../../plugins/axios"
import { reactive, ref } from 'vue'
export default {
    data() {
        return {
            user: {},
            form: {
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                countryId: '',
                stateId: '',
                cityId: '',
                address: ''
            },
            dialogFormVisible: ref(false),
            search: '',
            users: [],
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
    async created() {
        await this.getUser();
        await this.getCountries()
    },
    methods: {
        getUser() {
            const id = this.$route.params.id
            axios.get(`admin/users/${id}`).then(response => {
                console.log('response', response.data)
                this.user = response.data
                this.form.gender = this.user.gender
                this.form.countryId = this.user?.country.id
                this.form.stateId = this.user?.state.id
                this.form.cityId = this.user?.city.id
                this.form.firstName = this.user?.firstName
                this.form.lastName = this.user?.lastName
                this.form.address = this.user?.address
                this.form.phoneNumber = this.user?.phoneNumber
                this.form.email = this.user?.email
                this.getStates(this.user?.country.id)
                this.getCities(this.user?.state.id)
            })
        },
        getCountries() {
            axios.get('locations/countries').then(response => {
                this.countries = response.data
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
        saveUser() {
            console.log('saveUser', this.form)
            this.saving = true
            axios.patch(`admin/users/${this.user.id}`, this.form).then(response => {
                console.log('saved', response.data)
                this.user = response.data
                this.saving = false
                this.alert = {
                    message: 'User updated successfully',
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

    }
}
</script>
<style scoped>
.map {
    width: 100%;
    height: 500px;
    background: #f1f1f1;

}
</style>