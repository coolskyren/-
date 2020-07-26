<template>
    <div>
        <bread-Crumb></bread-Crumb>
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <banner-list @edit = 'edit'></banner-list>
        <banner-add ref='vAdd' :addInfo = 'addInfo' @cancel = 'cancel'></banner-add>
    </div>
</template>

<script>

import bannerList from './list'
import bannerAdd from './add'
import breadCrumb from '@/common/breadcrumb'
export default {
    data() {
        return {
            addInfo:{
               isAdd: true, 
               dialogIsShow: false, 
            },
            
        }
    },
    
    
    methods: {
        cancel(e){
            this.addInfo.dialogIsShow = e
        },
        add() {
            this.addInfo = {
                isAdd:true,
                dialogIsShow: true,
            }
        },
        edit(e){
            this.addInfo.isAdd = e.isAdd,
            this.addInfo.dialogIsShow = e.dialogIsShow,
            this.$refs.vAdd.update(e.id)
        }
        
    },
    components: {
        breadCrumb,
        bannerList,
        bannerAdd
    }
}
</script>

<style  lang="stylus" scoped>
.el-button {
    margin-bottom: 10px;
}

.el-input {
    width: 85%;
}
</style>
