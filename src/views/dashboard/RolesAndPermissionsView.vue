<template>
    <div class="container pt-4">
        <h3>Roles</h3>
        <el-divider />
        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New Role</el-button>
            </div>
        </div>
        <br>
        <el-table style="width: 100%" :data="roles" stripe border>
            <el-table-column label="SN" type="index" />
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Description" prop="description" />
            <!-- <el-table-column label="Created At" prop="createdAt"
                :formatter="(value) => new Date(value.createdAt).toDateString()" /> -->

            <el-table-column align="right">
                <template #header>
                    <!-- <el-input v-model="search" placeholder="Type to search" /> -->
                    Action
                </template>
                <template #default="scope">
                    <el-button type="primary" size="small" :icon="View"
                        @click="roleDialogVisible = true; role = scope.row">View </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Add Role" width="40%">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button @click="saveRole" type="primary">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
    <edit-role @editRoleClosed="roleDialogVisible = false; getRoles()" :initialRole="role"
        :dialogVisible="roleDialogVisible" />
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
import EditRole from '../../components/EditRole.vue'

export default {
    components: {
        EditRole
    },
    data() {
        return {
            formLabelWidth: '100%',
            form: {
                name: '',
                description: '',
                permissions: [],


            },
            View,
            dialogFormVisible: ref(false),
            role: null,
            roleDialogVisible: ref(false),
            search: '',
            roles: [],
            permissions: [],
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
        getRoles() {
            axios.get('admin/roles').then(response => {
                this.roles = response.data
            })
        },


        resetForm() {
            this.form = {
                name: '',
                description: '',
                permissions: [],

            }
        },
        saveRole() {
            this.saving = true
            axios.post('admin/roles', this.form).then(response => {
                console.log('saved', response.data)
                this.roles.push(response.data)
                this.saving = false
                this.alert = {
                    message: 'New role created successfully',
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
        this.getRoles()
    },
}
</script>