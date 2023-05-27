<template>
    <div class="container pt-4">
        <h3>{{ team.name }} Officers</h3>
        <el-divider />
        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">Add Officers</el-button>
            </div>
        </div>
        <br>
        <el-table style="width: 100%" :data="team.members" stripe border>
            <el-table-column label="SN" type="index" />
            <el-table-column label="First Name" prop="firstName" />
            <el-table-column label="Last Name" prop="lastName" />
            <el-table-column label="Phone Number" prop="phoneNumber" />
            <el-table-column label="Gender" prop="gender" />
            <el-table-column label="State" prop="state.name" />
            <el-table-column label="City" prop="city.name" />
            <el-table-column label="Join Date" prop="createdAt"
                :formatter="(value) => new Date(value.createdAt).toDateString()" />

            <el-table-column align="center">
                <template #header>
                    <el-input v-model="search" placeholder="Type to search" />
                </template>
                <template #default="scope">

                    <router-link :to="`/dashboard/users/${scope.row.id}`">
                        <el-button>View</el-button>
                    </router-link>
                    <el-button @click="removeTeamMember(scope.row)" class="btn-danger ml-1">Remove</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Add Officers" width="40%">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="Team Members">
                <el-select-v2 v-model="form.membersIds" value-key="id" label-key="id" style="width:100%" multiple filterable
                    remote :remote-method="getUsers" clearable :options="users.map(e => {
                        return {
                            ...e, label: `${e.firstName} ${e.lastName}`
                        }
                    })" :loading="loading" placeholder="Please enter a user name">
                    <template #default="{ item }">
                        <span style="margin-right: 8px; color:black" class="text-secondary">{{ item.firstName }} {{
                            item.lastName
                        }}</span>
                    </template>
                </el-select-v2>

            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button @click="addMembers" type="primary">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { isArray } from '@vue/shared'
import { reactive, ref } from 'vue'
import axios from '../../plugins/axios'

export default {
    data() {
        return {
            form: {
                membersIds: [],
            },
            dialogFormVisible: ref(false),
            search: '',
            users: [],
            team: {},
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
        async removeTeamMember(member) {

            const id = this.$route.params.id

            ElMessageBox.confirm(
                `${member.firstName} ${member.lastName} will be permanently removed from the team. Continue?`,
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                })
                .then(() => {
                    axios.delete(`admin/teams/${id}/remove-member/${member.id}`).then(response => {
                        this.team = response.data

                        ElMessage({
                            type: 'success',
                            message: 'Delete completed',
                        })
                    }).catch((e) => {

                        ElMessage({
                            type: 'error',
                            message: 'Delete failed' + e,
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
        getUsers() {
            axios.get('admin/users').then(response => {
                console.log('response', response)
                this.users = response.data.data
            })
        },
        getTeam() {
            const id = this.$route.params.id
            axios.get(`admin/teams/${id}`).then(response => {
                console.log('team', response.data)
                this.team = response.data
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
        addMembers() {
            const id = this.$route.params.id
            this.saving = true
            axios.post(`admin/teams/${id}/add-members`, this.form).then(response => {
                console.log('saved', response.data)
                this.team = response.data
                this.saving = false
                this.alert = {
                    message: 'New officers added successfully',
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
        this.getTeam()
        this.getCountries()
    },
}
</script>