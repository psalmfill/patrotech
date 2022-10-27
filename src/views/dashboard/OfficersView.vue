<template>
    <div class="container pt-4">
        <h1>Officers</h1>
        <el-divider />
        <div class="row">
            <div class="col-md-4 offset-8 text-right">
                <el-button type="primary" @click="dialogFormVisible = true">New Officer</el-button>
            </div>
        </div>
        <el-table style="width: 100%" :data="filteredTableData">
            <el-table-column label="SN" type="index" />
            <el-table-column label="Date" prop="date" />
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Phone Number" prop="" />
            <el-table-column label="Gender" prop="" />
            <el-table-column label="Join Date" prop="name" />

            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="gender">View</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="New Officer">
        <el-form :model="form" label-position="top">
            <el-form-item label="First name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Last name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Gender" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select gender">
                    <el-option label="Male" value="male" />
                    <el-option label="Female" value="female" />
                </el-select>
            </el-form-item>
            <el-form-item label="Email" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Phone Number" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="Country" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="Please select country">
                            <el-option label="Male" value="male" />
                            <el-option label="Female" value="female" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="State" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="Please select state">
                            <el-option label="Male" value="male" />
                            <el-option label="Female" value="female" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="City" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="Please select city">
                            <el-option label="Male" value="male" />
                            <el-option label="Female" value="female" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Address" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button>Cancel</el-button>
                <el-button type="primary">
                    Save
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
    data() {
        return {
            dialogFormVisible: ref(false),
            search: '',
            form: {},
            users: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'John',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Morgan',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Jessy',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ]
        }
    },
    computed: {
        filteredTableData() {
            return this.users.filter(
                (data) =>
                    data.name.toLowerCase().includes(this.search.toLowerCase())
            )
        }
    },
    methods: {
        showModal() {
            this.dialogFormVisible = true
        }
    }
}
</script>