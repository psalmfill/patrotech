<template>
    <div class="container pt-4">
        <h3>Pin Collections</h3>
        <el-divider />

        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">Generate Pin</el-button>
            </div>
        </div>
        <br>
        <el-table style="width: 100%" :data="collections" v-loading="loading" stripe border>
            <el-table-column label="SN" type="index" />
            <el-table-column label="Reference" prop="reference" />
            <el-table-column label="Created By" prop="createdBy.fullName" />
            <el-table-column label="Total Pins" prop="totalPins" />
            <el-table-column label="Date" prop="createdAt" :formatter="(v) => new Date(v.createdAt).toLocaleString()" />

            <el-table-column align="center">
                <template #header>
                    Action
                </template>
                <template #default="scope">
                    <el-button type="primary" size="small" :icon="View"
                        @click="collection = scope.row; collectionDialogVisible = true;">View </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Generate Pin" width="40%">
        <el-alert v-if="alert.message" :title="alert.message" :type="alert.type" effect="dark"
            @close="() => { alert = { message: '', type: '' }; }" />
        <el-form v-loading="saving" :model="form" label-position="top">
            <el-form-item label="Quantity" :label-width="formLabelWidth">
                <el-input v-model="form.quantity" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Duration" :label-width="formLabelWidth">
                <el-input v-model="form.duration" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button @click="generatePin" type="primary">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
    <pin-collection-detail @pinCollectionDetailClosed="collectionDialogVisible = false" :collection="collection"
        :dialogVisible="collectionDialogVisible" />
</template>

<script>
import axios from '../../plugins/axios'
import { reactive, ref } from 'vue'
import { mapState, mapGetters } from 'vuex'
import {
    View
} from '@element-plus/icons-vue'
import PinCollectionDetail from '../../components/PinCollectionDetail.vue'
export default {
    components: { PinCollectionDetail },
    data() {
        return {
            form: {
                quantity: 1,
                duration: 30
            },
            View,
            dialogFormVisible: ref(false),
            collectionDialogVisible: ref(false),
            search: '',
            collections: [],
            collection: null,
            countries: [],
            states: [],
            cities: [],
            saving: false,
            loading: ref(false),
            alert: {
                message: '',
                type: ''
            }
        }
    },
    computed: {
    },
    methods: {
        getPins() {
            this.loading = true;
            axios.get('admin/pin-collections').then(response => {
                this.collections = response.data['data']
                this.loading = false

                console.log('response', this.collections, response)
            })
        },

        generatePin() {
            this.saving = true
            axios.post('admin/generate-pin', this.form).then(response => {
                this.collections.push(response.data)
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
        this.getPins()
    },
}
</script>