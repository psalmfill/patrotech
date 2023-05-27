<template>
    <div class="container pt-4">
        <h1>Teams</h1>
        <el-divider />
        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New Team</el-button>
            </div>
        </div>
        <el-divider />
        <el-table style="width: 100%" :data="teams" stripe>
            <el-table-column label="SN" type="index" />
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Description" prop="description" />
            <el-table-column label="Team Type" prop="teamType.name" />
            <el-table-column label="Date Created" prop="createdAt"
                :formatter="(v) => new Date(v.createdAt).toDateString()" />

            <el-table-column align="center">
                <template #header>
                    Action
                </template>
                <template #default="scope">

                    <router-link :to="`/dashboard/teams/${scope.row.id}`">
                        <el-button>View</el-button>
                    </router-link>
                    <el-button @click="deleteTeam(scope.row)" class="btn-danger ml-1">Delete</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div><el-dialog v-model="dialogFormVisible" title="New Team" width="30%">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input v-model="form.description" :rows="2" type="textarea" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="Type">
                <el-select v-model="form.teamTypeId" placeholder="Please select team type" style="width:100%">
                    <el-option v-for="teamType in teamTypes" :key="teamType.id" :label="teamType.name"
                        :value="teamType.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="Team Lead">
                <el-select-v2 v-model="form.leadId" value-key="id" style="width:100%" filterable remote
                    :remote-method="getTeams" clearable :options="users.map(e => {
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
                <el-button @click="saveTeam" type="primary">
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
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    data() {
        return {
            form: {
                name: '',
                description: '',
                teamId: null,
                leadId: null,
                membersIds: []
            },
            dialogFormVisible: ref(false),
            search: '',
            teams: [],
            teamTypes: [],
            users: [],
            saving: false,
            alert: {
                message: '',
                type: ''
            },
            loading: false
        }
    },
    computed: {
        filteredTableData() {

        }
    },
    methods: {
        getUsers() {
            axios.get('admin/users').then(response => {
                console.log('response', response)
                this.users = response.data['data']
                return this.users
            })
        },

        async deleteTeam(team) {


            ElMessageBox.confirm(
                `${team.name} will be permanently deleted. Continue?`,
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                })
                .then(() => {
                    axios.delete(`admin/teams/${team.id}`).then(response => {
                        this.teams = this.teams.filter(t => t.id != team.id)

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

        getTeams() {
            axios.get('admin/teams').then(response => {
                this.teams = response.data['data']
            })
        },
        getTeamTypes() {
            axios.get('admin/team-types').then(response => {
                console.log("team", response.data)
                this.teamTypes = response.data
            })
        },

        resetForm() {
            this.form = {
                name: '',
                description: '',
                teamTypeId: null,
                leadId: null,
            }
        },
        saveTeam() {
            this.saving = true
            console.log(this.form)
            axios.post('admin/teams', this.form).then(response => {
                console.log('saved', response.data)
                this.teams.push(response.data)
                this.saving = false
                this.alert = {
                    message: 'New user created successfully',
                    type: 'success'
                }


            }
            ).catch(error => {
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
        this.getTeams()
        this.getUsers()
        this.getTeamTypes()
    },
}
</script>