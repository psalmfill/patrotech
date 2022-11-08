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
                        <h5>{{ user.firstName }} {{ user.lastName }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Gender</h6>
                        <h5>{{ user.gender }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Email</h6>
                        <h5>{{ user.email }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Phone Number</h6>
                        <h5>{{ user.phoneNumber }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Country</h6>
                        <h5>{{ user.country?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>State</h6>
                        <h5>{{ user.state?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>City</h6>
                        <h5>{{ user.city?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6>Address</h6>
                        <h5>{{ user.city?.address }}</h5>
                    </div>
                </div>
            </div>
        </el-card>

    </div>

</template>
<script>
import axios from "../../plugins/axios"
export default {
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            const id = this.$route.params.id
            axios.get(`admin/users/${id}`).then(response => {
                console.log('response', response.data)
                this.user = response.data
            })
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