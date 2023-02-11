<template>
    <div class="container pt-4">
        <h3>Team Types</h3>
        <el-divider />
        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New Team Types</el-button>
            </div>
        </div>
        <el-divider />
        <el-table style="width: 100%" :data="teamTypes">
            <el-table-column label="SN" type="index" />
            <el-table-column label="Team Name" prop="name" />
            <el-table-column label="Description" prop="description" />
            <el-table-column label="Created Date" prop="createdAt"
                :formatter="(v) => new Date(v.createdAt).toDateString()" />
            <el-table-column align="center">
                <template #header>
                    <el-input v-model="search" placeholder="Type to search" />
                </template>
                <template #default="scope">

                    <router-link :to="`/dashboard/users/${scope.row.id}`">
                        <el-button class="btn-primary">Edit</el-button>
                    </router-link>
                    <el-button @click="deleteTeamType(scope.row)" class="btn-danger ml-1">Delete</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="New Team Type" width="30%">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input v-model="form.description" :rows="2" type="textarea" placeholder="Please input" />
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
            },
            dialogFormVisible: ref(false),
            search: '',
            teamTypes: [],
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
        getTeamTypes() {
            axios.get('admin/team-types').then(response => {
                console.log('response', response)
                this.teamTypes = response.data
            })
        },

        async deleteTeamType(teamType) {


            ElMessageBox.confirm(
                `${teamType.name} will be deleted permanently. Continue?`,
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                })
                .then(() => {
                    axios.delete(`admin/team-types/${teamType.id}`).then(response => {
                        this.teamTypes = this.teamTypes.filter(t => t.id != teamType.id)

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
                name: 'hhh',
                description: '',

            }
        },
        saveUser() {
            this.saving = true
            axios.post('admin/team-types', this.form).then(response => {
                console.log('saved', response.data)
                this.teamTypes.push(response.data)
                this.saving = false
                this.alert = {
                    message: 'New team created successfully',
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
        this.getTeamTypes()
    },
}
</script>