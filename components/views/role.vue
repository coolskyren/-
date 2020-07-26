<template>
    <div>
        <bread-Crumb></bread-Crumb>
        <div>
            <el-button size="small" type="primary" @click="add">添加</el-button>
        </div>
        <el-table
            :data="getStateRoleList"
            border
            style="width: 100%"
            row-key="id"
            :tree-props="{children: 'children'}"
        >
            <el-table-column prop="id" label="角色编号"></el-table-column>
            <el-table-column prop="rolename" label="角色名称"></el-table-column>
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
            :title="isAdd ? '角色添加':'角色编辑'"
            :visible.sync="dialogIsShow"
            center
            :before-close="cancel"
            
        >
            <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
                <el-form-item label="角色名称：" :label-width="formLabelWidth" prop="rolename">
                    <el-input v-model="menuInfo.rolename"></el-input>
                </el-form-item>
                <el-form-item label="角色权限：" :label-width="formLabelWidth" prop="rolename">
                    <el-tree
                        :data="getStateMenuList"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        :props="defaultProps"
                        :default-checked-keys="defaultKey"
                        :check-strictly = "true"
                    ></el-tree>
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
    getroleAdd,
    getroleInfo,
    getroleEdit,
    getroleDelete
} from '@/util/axios'
import { mapActions, mapGetters } from 'vuex'
import breadCrumb from '@/common/breadcrumb'
export default {
    data() {
        return {
            defaultKey: [], 
            isAdd: true, 
            formLabelWidth: '100px', 
            menuInfo: {
                rolename: '', 
                menus: '', 
                status: '1'
            },
            editId: 0,
            dialogIsShow: false, 
            rules: {
                rolename: [
                    {
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    computed: {
        ...mapGetters(['getStateRoleList', 'getStateMenuList'])
    },
    mounted() {
        this.getActionRoleList()
        this.getActionMenuList()
    },
    methods: {
        cancel() {
            this.reset()
            this.dialogIsShow = false
        },
        reset() {
            this.menuInfo = {
                rolename: '', 
                menus: '', 
                status: '1'
            }
            this.$refs.tree.setCheckedKeys([])
        },
        ...mapActions(['getActionRoleList', 'getActionMenuList']),
        add() {
            console.log('出现弹框')
            this.dialogIsShow = true
            this.isAdd = true
        },
        update(id) {
            this.dialogIsShow = true
            this.isAdd = false
            this.editId = id
            getroleInfo({ id }).then(res => {
                if (res.data.code == 200) {
                    console.log(res)
                    this.menuInfo = res.data.list
                    this.defaultKey = this.menuInfo.menus
                        ? this.menuInfo.menus.split(',')
                        : []
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
                    getroleDelete({ id }).then(res => {
                        if (res.data.code == 200) {
                            this.getActionRoleList()
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
                    this.menuInfo.menus = this.$refs.tree
                        .getCheckedKeys()
                        .join(',')
                    if (this.isAdd) {
                        getroleAdd(this.menuInfo).then(res => {
                            if (res.data.code == 200) {
                                this.dialogIsShow = false
                                this.reset()
                                this.getActionRoleList()
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
                        getroleEdit(data).then(res => {
                            if (res.data.code == 200) {
                                this.dialogIsShow = false
                                this.reset()
                                this.getActionRoleList()
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
