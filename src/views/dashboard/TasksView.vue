<template>
    <div class="container pt-4">
        <h3>Tasks</h3>
        <el-divider />
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
</template>

<script>
export default {
    data() {
        return {
            search: '',
            users: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
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
    }
}
</script>