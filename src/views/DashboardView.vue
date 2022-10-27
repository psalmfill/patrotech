
<template>
    <el-row class="position-absolute h-100 p-0 w-100">
        <el-col :span="4" class="side-bar">
            <el-affix position="top">
                <h2 class="m-3 text-center text-white">Patrotech</h2>
                <el-divider />
                <el-menu default-active="2" router="true" text-color="#fff" class="el-menu-vertical-demo"
                    background-color="#FF622E" @open="handleOpen" @close="handleClose" active-text-color="#000">
                    <el-menu-item index="/dashboard">
                        <el-icon :size="20" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-dashboard" size="xs" />
                        </el-icon>
                        <span>Dashboard</span>
                    </el-menu-item>
                    <el-menu-item index="/dashboard/users">
                        <el-icon :size="20" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-users" size="xs" />
                        </el-icon>
                        <span>Users</span>
                    </el-menu-item>
                    <el-menu-item index="/dashboard/admins">
                        <el-icon :size="20" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-users" size="xs" />
                        </el-icon>
                        <span>Admins</span>
                    </el-menu-item>
                    <el-menu-item index="/dashboard/officers">
                        <el-icon :size="20" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-users" size="xs" />
                        </el-icon>
                        <span>Officers</span>
                    </el-menu-item>
                    <el-menu-item index="/dashboard/tasks">
                        <el-icon :size="20" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-tasks" size="xs" />
                        </el-icon>
                        <span>Tasks</span>
                    </el-menu-item>
                    <el-menu-item index="/dashboard/profile">
                        <el-icon :size="20" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-user" size="xs" />
                        </el-icon>
                        <span>Profile</span>
                    </el-menu-item>
                    <el-menu-item index="/">
                        <el-icon :size="20" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" size="xs" />
                        </el-icon>
                        <span>Logout</span>
                    </el-menu-item>
                </el-menu>
            </el-affix>
        </el-col>
        <el-col :span="20" class="content">
            <el-affix position="top">
                <el-menu mode="horizontal" :ellipsis="false" @select="handleSelect">
                    <div class="flex-grow" />
                    <el-menu-item index="1">
                        <el-icon :size="50" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-bell" size="xs" />
                        </el-icon>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon :size="50" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-user" size="xs" />
                        </el-icon>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon :size="50" :color="'red'">
                            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" size="xs" />

                        </el-icon>
                    </el-menu-item>
                </el-menu>
            </el-affix>
            <RouterView />
            <el-affix position="bottom">
                <footer class="p-1">
                    <el-divider />
                    <div class="text-center">
                        &copy;copyright 2022
                    </div>
                </footer>
            </el-affix>
        </el-col>
    </el-row>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    data() {
        return {}
    }
}
</script>
<style>
.side-bar {
    background-color: #FF622E
}

.flex-grow {
    flex-grow: 1
}

footer {
    width: 100%;
    background: #ffffff
}
</style>