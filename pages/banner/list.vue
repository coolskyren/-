<template>
  <el-table
    :data="getStateBannerList"
    border
    style="width: 100%"
    row-key="id"
    :tree-props="{children: 'children'}"
  >
    <el-table-column prop="id" label="编号"></el-table-column>
    <el-table-column prop="title" label="轮播图标题"></el-table-column>
    <el-table-column prop="img" label="图片">
                <template slot-scope="item">
                    <img :src = '$imgUrl + item.row.img'>
                    
                </template>
            </el-table-column>
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
</template>

<script>
import { getbannerDelete } from "@/util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  
  computed: {
    ...mapGetters(["getStateBannerList"])
  },
  mounted() {
    this.getActionBannerList();
  },
  methods: {
  ...mapActions(["getActionBannerList"]),
  update(id){
    this.$emit('edit',{
      isAdd:false,
      dialogIsShow:true,
      id
    })
  },
  del(id) {
    this.$confirm("你确定要删除这条数据吗", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        getbannerDelete({ id }).then(res => {
          if (res.data.code == 200) {
            this.getActionBannerList();
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
  }
};
</script>

<style lang="" scoped>
</style>
