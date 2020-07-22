<template>
  <div>
    <bread-Crumb></bread-Crumb>
    <div>
      <el-button size="small" type="primary" @click="add">添加</el-button>
    </div>
    <el-table
      :data="getStateCateList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <img class="imgInfo" :src="'http://localhost:3000/'+item.row.img" alt />
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
    <el-dialog
      :title="isAdd ? '添加商品分类':'编辑商品分类'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="cateInfo" :rules="rules" ref="cateInfo">
        <el-form-item label="上级分类：" :label-width="formLabelWidth" placeholder="请选择分类" prop="pid">
          <el-select v-model="cateInfo.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in getStateCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >{{item.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：" :label-width="formLabelWidth" prop="catename">
          <el-input v-model="cateInfo.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <!-- 
                        上传图片
                        auto-upload	是否在选取文件后立即进行上传
                        action	必选参数，上传的地址
          -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="changeInfo"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="cateInfo.status" label="1">启用</el-radio>
          <el-radio v-model="cateInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('cateInfo')">新 增</el-button>
        <el-button v-else type="primary" @click="subInfo('cateInfo')">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getcateAdd,
  getcateInfo,
  getcateEdit,
  getcateDelete
} from "@/util/axios";
import { mapActions, mapGetters } from "vuex";
import breadCrumb from "@/common/breadcrumb";
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "",
      isAdd: true,
      formLabelWidth: "100px",
      cateInfo: {
        pid: 0,
        catename: "",
        img: "",
        status: "1"
      },

      editId: 0,
      dialogIsShow: false,
      rules: {
        catename: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur"
          }
        ],
        pid: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateCateList"])
  },
  mounted() {
    this.getActionCateList();
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleRemove(file, fileList) {
    },
    //放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeInfo(file) {
      this.imgUrl = file.raw;
    },
    cancel() {
      this.reset();
      this.dialogIsShow = false;
    },
    reset() {
      this.cateInfo = {
        pid: 0,
        catename: "",
        img: "",
        status: "1"
      };
    },
    ...mapActions(["getActionCateList"]),
    add() {
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    update(id) {
      this.dialogIsShow = true;
      this.isAdd = false;
      this.editId = id;
      getcateInfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.cateInfo = res.data.list;
          //对获取的图片进行格式转化
          this.fileList = this.cateInfo.img
            ? [{ url: `http://localhost:3000${this.cateInfo.img}` }]
            : [];
          this.cateInfo.status = this.cateInfo.status.toString();
        }
      });
    },
    del(id) {
      this.$confirm("你确定要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getcateDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.getActionCateList();
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
    },
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.cateInfo;
          //如果有上传文件 那我们不能直接传值 需要利用FormData转化
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //单独对图片地址进行操作
          file.append("img", this.imgUrl);
          //根据isAdd状态去判断执行接口
          if (this.isAdd) {
            //调取添加接口
            getcateAdd(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionCateList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            file.append("id", this.editId);
            //调取更新接口
            getcateEdit(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionCateList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    breadCrumb
  }
};
</script>

<style  lang="stylus" scoped>
.el-button {
  margin-bottom: 10px;
}

.el-input {
  width: 85%;
}

.imgInfo {
    width: 150px;
}
</style>
