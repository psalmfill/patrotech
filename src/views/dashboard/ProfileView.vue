<template>
    <div class="container mt-4">
        <h3>Profile</h3>
        <el-card class="border-0 shadow-none">
            <div class="row">
                <div class="col-md-3 text-center">
                    <img src="../../assets/images/user.jpg" class=" rounded-circle" width="200" />
                    <el-button class="mt-2">Change</el-button>
                </div>
                <div class="col-md-8">
                    <el-button class="mt-2 float-right btn-primary">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        &nbsp;
                        Edit
                    </el-button>
                    <br>

                    <div class="mt-5">
                        <h6 class="text-secondary">Name</h6>
                        <h5>{{ user?.fullName }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Gender</h6>
                        <h5>{{ user?.gender }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Email</h6>
                        <h5>{{ user?.email }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Phone Number</h6>
                        <h5>{{ user?.phoneNumber }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">Country</h6>
                        <h5>{{ user?.country?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">State</h6>
                        <h5>{{ user?.state?.name }}</h5>
                    </div>
                    <el-divider />
                    <div class="">
                        <h6 class="text-secondary">City</h6>
                        <h5>{{ user?.city?.name }}</h5>
                    </div>
                    <el-divider />
                </div>
            </div>
        </el-card>

    </div>

</template>
<script>
import axios from '../../plugins/axios'

export default {
    data() {
        return {
            user: undefined,
        }
    },
    methods: {
        getProfile() {
            axios.get('account').then(response => {
                console.log('response', response.status)
                this.user = response.data
            }).catch(error => {
                console.log('error', error)
                if (error.response.status == 401) {
                    // localStorage.removeItem('access_token')
                    // this.$router.push('/')

                }
            })
        },
    },
    created() {
        this.getProfile();
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