<template>
    <el-dialog v-model="dialogVisible" title="Edit Role" width="40%" @closed="$emit('editRoleClosed')">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" :value="role?.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input v-model="form.description" :value="role?.description" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button @click="saveRole" type="primary">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { ref } from 'vue'
import axios from '@/plugins/axios'

export default {
    props: ['initialRole', 'dialogVisible'],
    data() {
        return {
            role: this.initialRole,
            form: {
                name: '',
                description: '',
                permissions: [],
            },
            saving: false,
            alert: {
                message: '',
                type: ''
            }
        }
    },
    methods: {
        getRoles() {
            axios.get('admin/roles').then(response => {
                this.roles = response.data
            })
        },

        saveRole() {
            console.log('Saving role', this.form)
            this.saving = true
            axios.put(`admin/roles/${this.role?.id}`, this.form).then(response => {
                this.saving = false
                this.alert = {
                    message: 'Role updated successfully',
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
    beforeUpdate() {
        this.role = this.initialRole
        this.form = {
            ...this.role
        }
    },

}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>