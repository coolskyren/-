<template>
    <div>
        <bread-Crumb></bread-Crumb>
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <seck-list @edit = 'edit'></seck-list>
        <seck-add ref='vAdd' :addInfo = 'addInfo' @cancel = 'cancel'></seck-add>
    </div>
</template>

<script>

import seckList from './list'
import seckAdd from './add'
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
        seckList,
        seckAdd
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
