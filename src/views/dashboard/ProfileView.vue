<template>
    <div class="container mt-4">
        <h3>Profile</h3>
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
                    <br>

                    <div class="mt-5">
                        <h6 class="text-secondary">Name</h6>
                        <h5>{{ user?.fullName }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Gender</h6>
                        <h5>{{ user?.gender }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Email</h6>
                        <h5>{{ user?.email }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Phone Number</h6>
                        <h5>{{ user?.phoneNumber }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Country</h6>
                        <h5>{{ user?.country?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">State</h6>
                        <h5>{{ user?.state?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">City</h6>
                        <h5>{{ user?.city?.name }}</h5>
                    </div>
                    <el-divider />
                </div>
            </div>
        </el-card>

    </div>
    <el-dialog v-model="dialogFormVisible" title="Edit User" width="40%">
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
                <el-input v-model="form.phoneNumber" autocomplete="off" disabled />
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
                <el-input v-model="form.address" autocomplete="off" :value="user.address" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button @click="updateProfile" type="primary">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import axios from '../../plugins/axios'

export default {
    data() {
        return {
            user: {},
            dialogFormVisible: false,

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
            countries: [],
            states: [],
            cities: [],
            alert: {
                message: '',
                type: ''
            }
        }
    },
    methods: {
        getProfile() {
            axios.get('account').then(response => {
                this.user = response.data
                this.form = {
                    ...this.user
                }
                this.getStates(this.user?.countryId)
                this.getCities(this.user?.stateId)
            }).catch(error => {
                if (error.response.status == 401) {
                    // localStorage.removeItem('access_token')
                    // this.$router.push('/')

                }
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
        updateProfile() {
            this.saving = true
            delete this.form.fullName;
            axios.put('account', this.form).then(response => {
                this.user = response.data
                this.saving = false
                this.alert = {
                    message: 'Profile updated successfully',
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
    async mounted() {
        this.getProfile();
        this.getCountries();
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