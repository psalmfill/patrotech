<template>
    <el-dialog v-model="dialogVisible" @closed="$emit('countryDetailClosed')" :title="`${country?.name}'s States`"
        width="60%" center>
        <template #default>
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New State</el-button>
            </div>
            <el-divider />
            <el-table v-loading="loading" style="width:100%" :data="states">
                <el-table-column label="SN" type="index" />
                <el-table-column label="Name" prop="name" />
                <el-table-column label="Code" prop="code" />
                <el-table-column align="center">
                    <template #default="scope">
                        <el-button class="btn-primary"
                            @click="state = scope.row ; stateDialogVisible = true;">view</el-button>
                        <el-button @click="deleteState(scope.row)" class="btn-danger ml-1">Delete</el-button>

                    </template>
                </el-table-column>
            </el-table>


            <el-dialog v-model="dialogFormVisible" title="New State" width="30%">
                <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
                    @close="() => { alert = { message: '', type: '' }; }" />
                <el-form v-loading="saving" :model="form" label-position="top">
                    <el-form-item label="State Name" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" placeholder="Name" />
                    </el-form-item>
                    <el-form-item label="State Code" :label-width="formLabelWidth">
                        <el-input v-model="form.code" :rows="2" placeholder="State Code" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button @click="saveState" type="primary">
                            Save
                        </el-button>
                    </span>
                </template>
            </el-dialog>

            <state-detail @stateDialogVisible="stateDialogVisible = false" :state="state"
                :dialogVisible="stateDialogVisible" />
        </template>
    </el-dialog>
</template>
<script>
import { ref } from 'vue'
import axios from '@/plugins/axios'
import StateDetail from './StateDetail.vue'

export default {
    props: ['country', 'dialogVisible'],
    components: {
        StateDetail
    },
    data() {
        return {
            form: {
                name: '',
                code: '',
                phoneCode: '',
                countryId: null
            },
            states: [],
            state: null,
            loading: ref(false),
            dialogFormVisible: ref(false),
            stateDialogVisible: ref(false),
            saving: false,
            alert: {
                message: '',
                type: ''
            }
        }
    },
    methods: {
        getStates() {
            this.loading = true;

            axios.get(`locations/countries/${this.country.id}/states`)
                .then(response => {
                    this.loading = false
                    this.states = response.data
                }).catch(error => {
                    this.loading = false
                })
        },

        async deleteState(state) {


            ElMessageBox.confirm(
                `${state.name} will be deleted permanently. Continue?`,
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                })
                .then(() => {
                    axios.delete(`locations/countries/${state.id}`).then(response => {
                        this.states = this.states.filter(t => t.id != state.id)

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
        saveState() {

            this.saving = true
            this.form.countryId = this.country.id
            axios.post(`locations/countries/${this.country.id}/states`, this.form).then(response => {
                this.states.push(response.data)
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
        this.getStates()
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>