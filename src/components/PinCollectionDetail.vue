<template>
    <el-dialog v-model="dialogVisible" @closed="$emit('pinCollectionDetailClosed')"
        :title="`Collection : ${collection?.reference}`" width="60%" center>
        <template #default>
            <el-divider />
            <el-table v-loading="loading" style="width:100%" :data="collection?.pins" border>
                <el-table-column label="SN" type="index" />
                <el-table-column label="Code" prop="code" />
                <el-table-column label="Duration" prop="duration" />
                <el-table-column label="Used" prop="used" />
                <el-table-column label="Used By" prop="user.fullName" />
                <el-table-column label="Phone Number" prop="user.phoneNumber" />
                <el-table-column align="center">
                    <template #default="scope">
                        <el-button class="btn-primary"
                            @click="state = scope.row ; stateDialogVisible = true;">view</el-button>

                    </template>
                </el-table-column>
            </el-table>

        </template>
    </el-dialog>
</template>
<script>

export default {
    props: ['collection', 'dialogVisible'],
    created() {
        console.log(this.collection);
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>