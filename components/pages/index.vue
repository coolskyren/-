<template>
    <div>
        <el-container>
            <el-header >练习项目之大型后台管理项目
                <div class="info">
                    <div class="username">
                        {{getName}}
                    </div>
                    <el-button v-if="isTrue" type = 'danger' size = 'small' @click="logIn">登录</el-button>
                    <el-button type = 'danger' size = 'small' @click="logOut">退出</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <v-nav></v-nav>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import vNav from '@/common/nav'
export default {
    data() {
        return {
            isTrue:true
        }
    },
    components:{
        vNav
    },
    computed: {
        getName(){
            let data = ''
            data = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')):''
            return data.username
        }
    },
    mounted() {
        sessionStorage.getItem('userInfo') != null? this.isTrue = false:this.isTrue = true
    },
    methods: {
        logOut(){
            sessionStorage.removeItem('userInfo')
            this.$router.push('/login')
        },
        logIn(){
            this.$router.push('/login')
            
        }
    },
    
}
</script>

<style  lang="stylus" scoped>
@import '../../stylus/index.styl';
.el-header 
    background-color $bgColorSecond
    color #333
    font-size 30px
    text-align center
.info   
    float right
    margin-right 20px
.username   
    color #ffffff
    float left
    margin-right 15px
</style>
