<template>
  <div>
      <el-row class="tac">
            <el-col :span="24">
                <el-menu
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                    unique-opened
                >
                    <el-menu-item index="/home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu v-for='item in navMenu' :key='item.id' :index="item.id.toString()">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-for="menu in item.children"  :key='menu.id' :index="menu.url">{{menu.title}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import {getMenuList} from '@/util/axios'
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
        return {
            defaultActive:'/home'
        }
    },
    computed: {
        // ...mapGetters(['getStateMenuList'])
        navMenu(){
            let data = {}
            data = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')):{}
            return data.menus
        }
    },
    mounted() {
        this.defaultActive = this.$route.path
        // this.getActionMenuList()
    },
    methods: {
        // ...mapActions(['getActionMenuList'])
    },
}
</script>

<style lang="stylus" scoped>
.el-menu {
    min-height: 600px;
}
</style>
