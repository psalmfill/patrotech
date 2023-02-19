<template>
  <div class="common-layout h-100 position-absolute w-100">
    <el-container class="h-100">
      <el-aside width="250px" class="bg-primary h-100">
        <el-affix position="top">
          <el-scrollbar>
            <h2 class="m-3 text-center text-white">Patrotech</h2>
            <el-divider />
            <el-menu
              default-active="2"
              router="true"
              text-color="#fff"
              class="el-menu-vertical-demo"
              background-color="transparent"
              active-text-color="#ffd04b"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="/dashboard">
                <el-icon :size="20" :color="'red'">
                  <font-awesome-icon icon="fa-solid fa-dashboard" size="xs" />
                </el-icon>
                <span>Dashboard</span>
              </el-menu-item>

              <el-menu-item index="/dashboard/alerts">
                <el-icon :size="20" :color="'red'">
                  <font-awesome-icon icon="fa-solid fa-bell" size="xs" />
                </el-icon>
                <span>Alerts</span>
              </el-menu-item>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon :size="20" :color="'red'">
                    <font-awesome-icon icon="fa-solid fa-users" size="xs" />
                  </el-icon>
                  <span>Users</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/dashboard/users">
                    <span>Clients</span>
                  </el-menu-item>
                  <el-menu-item index="/dashboard/admins">
                    <span>Admins</span>
                  </el-menu-item>
                  <el-menu-item index="/dashboard/officers">
                    <span>Officers</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="/dashboard/team-types">
                <el-icon :size="20" :color="'red'">
                  <font-awesome-icon icon="fa fa-tasks" size="xs" />
                </el-icon>
                <span>Team Types</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/teams">
                <el-icon :size="20" :color="'red'">
                  <font-awesome-icon icon="fa-solid fa-users" size="xs" />
                </el-icon>
                <span>Teams</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/tasks">
                <el-icon :size="20" :color="'red'">
                  <font-awesome-icon icon="fa-solid fa-tasks" size="xs" />
                </el-icon>
                <span>Tasks</span>
              </el-menu-item>

              <el-sub-menu index="2">
                <template #title>
                  <el-icon><setting /></el-icon>
                  <span>System Configuration</span>
                </template>
                <el-menu-item-group title="Locations">
                  <el-menu-item index="/dashboard/locations">Locations</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Roles and Permissions">
                  <el-menu-item index="1-3">Roles</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="/dashboard/profile">
                <el-icon :size="20" :color="'red'">
                  <font-awesome-icon icon="fa-solid fa-user" size="xs" />
                </el-icon>
                <span>Profile</span>
              </el-menu-item>
              <el-menu-item index="/">
                <el-icon :size="20" :color="'red'">
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-right-from-bracket"
                    size="xs"
                  />
                </el-icon>
                <span>Logout</span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-affix>
      </el-aside>
      <el-container>
        <el-header>
          <el-affix position="top">
            <el-menu mode="horizontal" :ellipsis="false" @select="handleSelect">
              <div class="flex-grow" />
              <el-menu-item index="1">
                <el-icon :size="24" :color="'red'" class="p-4">
                  <font-awesome-icon icon="fa-solid fa-bell" size="xs" />
                </el-icon>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon :size="24" :color="'red'" class="p-4">
                  <font-awesome-icon icon="fa-solid fa-user" size="xs" />
                </el-icon>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon :size="24" :color="'red'" class="p-4">
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-right-from-bracket"
                    size="xs"
                  />
                </el-icon>
              </el-menu-item>
            </el-menu>
          </el-affix>
        </el-header>
        <el-main class="position-releative">
          <el-scrollbar >
            <RouterView />
          </el-scrollbar>
        </el-main>
        <!-- <el-footer>
          <footer class="p-1">
            <el-divider />
            <div class="text-center">&copy;copyright 2022</div>
          </footer>
        </el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {};
  },
  mounted(){
    
    const token = localStorage.getItem('access_token')
    if (!token) {
      window.location = '/'
    }
  }
};
</script>
<style>
.side-bar {
  background-color: #3185fc;
}

.flex-grow {
  flex-grow: 1;
}

footer {
  width: 100%;
  background: #ffffff;
}
</style>
