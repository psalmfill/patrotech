<template>
    <div class="container mt-4">
        <h1>Profile</h1>
        <el-card class="border shadow-none">
            <div class="row">
                <div class="col-md-3 text-center">
                    <img src="../../assets/images/user.jpg" class=" rounded-circle" width="200" />
                    <el-button class="mt-2">Change</el-button>
                </div>
                <div class="col-md-8">
                    <el-button class="mt-2 float-right btn-info">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        &nbsp;
                        Edit
                    </el-button>

                    <div class="">
                        <h6>Name</h6>
                        <h5>Samfield Hawb Bassey</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Gender</h6>
                        <h5>Male</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Email</h6>
                        <h5>samfield@gmail.com</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Phone Number</h6>
                        <h5>+2348188631121</h5>
                    </div>
                    <el-divider />

                    <div class="">
                        <h6>Email</h6>
                        <h5>samfield@gmail.com</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Country</h6>
                        <h5>Nigeria</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>State</h6>
                        <h5>Akwa Ibom</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>City</h6>
                        <h5>Uyo</h5>
                    </div>
                    <el-divider />
                </div>
            </div>
        </el-card>

    </div>

</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.map {
    width: 100%;
    height: 500px;
    background: #f1f1f1;

}
</style>