<template>
    <div>
        <bread-Crumb></bread-Crumb>
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <el-table :data="getStateMenuList" border style="width: 100%" row-key="id"  :tree-props="{children: 'children'}">
            <el-table-column prop="id" label="菜单编号"></el-table-column>
            <el-table-column prop="title" label="菜单名称"></el-table-column>
            <el-table-column prop="pid" label="上级菜单"></el-table-column>
            <el-table-column prop="icon" label="菜单图标"></el-table-column>
            <el-table-column prop="url" label="菜单地址"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status==1" type="success">启动</el-tag>
                    <el-tag v-if="item.row.status==2" type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="item">
                    <el-button size="small" type="primary" @click="update(item.row.id)">编辑</el-button>
                    <el-button size="small" type="danger" @click="del(item.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :title="isAdd ? '菜单添加':'菜单编辑'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
        >
            <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
                <el-form-item label="菜单名称：" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="menuInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单：" :label-width="formLabelWidth" placeholder='请选择菜单' prop="pid">
                    <el-select v-model="menuInfo.pid" placeholder="请选择">
                        <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
                        <el-option v-for='item in getStateMenuList' :key='item.id' :label="item.title" :value="item.id">{{item.title}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型：" :label-width="formLabelWidth">
                    <el-radio :disabled="menuInfo.pid!=0"  v-model="menuInfo.type" label="1">目录</el-radio>
                    <el-radio :disabled="menuInfo.pid==0" v-model="menuInfo.type" label="2">菜单</el-radio>
                </el-form-item>
                <el-form-item v-if='menuInfo.type==1' label="菜单图标：" :label-width="formLabelWidth">
                    <el-input :disabled="menuInfo.pid!=0" v-model="menuInfo.icon"></el-input>
                </el-form-item>
                <el-form-item v-if='menuInfo.type==2'  label="菜单地址：" :label-width="formLabelWidth">
                    <el-input :disabled="menuInfo.pid==0" v-model="menuInfo.url"></el-input>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-radio v-model="menuInfo.status" label="1">启用</el-radio>
                    <el-radio v-model="menuInfo.status" label="2">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="isAdd" type="primary" @click="subInfo('menuInfo')">新 增</el-button>
                <el-button v-else type="primary" @click="subInfo('menuInfo')">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getMenuAdd,
    getMenuInfo,
    getMenuEdit,
    getMenuDelete
} from '@/util/axios'
import {mapActions,mapGetters} from 'vuex'
import breadCrumb from '@/common/breadcrumb'
export default {
    data() {
        return {
            isAdd: true, 
            formLabelWidth: '100px', 
            menuInfo: {
                pid: 0, 
                title: '',
                icon: '', 
                url: '', 
                type: '1', 
                status: '1'
            },
            editId: 0,
            dialogIsShow: false,
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入菜单名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符',
                        trigger: 'blur'
                    }
                ],
                pid: [
                    {
                        required: true,
                        message: '请选择菜单',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['getStateMenuList'])
    },
    mounted() {
        this.getActionMenuList()
    },
    methods: {
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        reset() {
            this.menuInfo = {
                pid: 0, 
                title: '', 
                icon: '',
                url: '', 
                type: '1',
                status: '1' 
            }
        },
        ...mapActions(['getActionMenuList']),
        add() {
            console.log('出现弹框')
            this.dialogIsShow = true
            this.isAdd = true
        },
        update(id) {
            this.dialogIsShow = true
            this.isAdd = false
            this.editId = id
            getMenuInfo({ id }).then(res => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.menuInfo = res.data.list
                    this.menuInfo.type = this.menuInfo.type.toString()
                    this.menuInfo.status = this.menuInfo.status.toString()
                }
            })
        },
        del(id) {
            this.$confirm('你确定要删除这条数据吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    getMenuDelete({ id }).then(res => {
                        if (res.data.code == 200) {
                            this.getActionMenuList()
                            this.$message.success(res.data.msg)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        subInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isAdd) {
                        getMenuAdd(this.menuInfo).then(res => {
                            if (res.data.code == 200) {
                                this.dialogIsShow = false
                                this.reset()
                                this.getActionMenuList()
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        let data = this.menuInfo
                        data.id = this.editId
                        getMenuEdit(data).then(res => {
                            if (res.data.code == 200) {
                                this.dialogIsShow = false
                                this.reset()
                                this.getActionMenuList()
                                this.$message.success(res.data.msg)
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    components: {
        breadCrumb
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
