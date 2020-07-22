<template>
  <div>
    <bread-Crumb></bread-Crumb>
    <div>
      <el-button size="small" type="primary" @click="add">添加</el-button>
    </div>
    <el-table :data="getStateSpecsList" border style="width: 100%" row-key="id">
      <el-table-column prop="id" label="商品规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
      <template slot-scope="item">
        <el-tag v-for = 'val in item.row.attrs' :key="val" type = 'info'>{{val}}</el-tag>
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
    <div class="block">
      <el-pagination @current-change="getPage" :page-size="pageInfo.size" :total="count"></el-pagination>
    </div>
    <el-dialog
      :title="isAdd ? '商品规格添加':'商品规格编辑'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="specsInfo" :rules="rules" ref="specsInfo">
        <el-form-item label="规格名称：" :label-width="formLabelWidth" prop="specsname">
          <el-input v-model="specsInfo.specsname"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in specsArr"
          label='规格属性'
          :key="item.value"
          :label-width="formLabelWidth"
        >
          <el-input v-model="item.value" style="width:65%"></el-input>

          <el-button v-if="index==0" @click="addSpecs" type="primary">新增规格属性</el-button>
          <el-button v-else type="primary" @click="removeSpecs(item)">删除</el-button>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="specsInfo.status" label="1">启用</el-radio>
          <el-radio v-model="specsInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('specsInfo')">新 增</el-button>
        <el-button v-else type="primary" @click="subInfo('specsInfo')">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getspecsAdd,
  getspecsInfo,
  getspecsEdit,
  getspecsDelete,
  getspecsCount
} from "@/util/axios";
import { mapActions, mapGetters } from "vuex";
import breadCrumb from "@/common/breadcrumb";
export default {
  data() {
    return {
      specsArr: [
        {
          value: ""
        }
      ],
      count: 0,
      isAdd: true,
      formLabelWidth: "100px",
      specsInfo: {
        specsname: "",
        attrs: "",
        status: "1"
      },
      pageInfo: {
        size: 2,
        page: 1
      },
      editId: 0,
      dialogIsShow: false,
      rules: {
        specsname: [
          {
            required: true,
            message: "请输入商品规格名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: "blur"
          }
        ],
        specsid: [
          {
            required: true,
            message: "请选所属角色",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateSpecsList"])
  },
  mounted() {
    this.getCount();
  },
  methods: {
    removeSpecs(item) {
      var index = this.specsArr.indexOf(item);
      if (index !== -1) {
        this.specsArr.splice(index, 1);
      }
    },
    addSpecs() {
      if (this.specsArr.length <= 6) {
        this.specsArr.push({
          value: ""
        });
      }else{
        this.$message.warning('最多6个，不能再添加')
      }
    },
    cancel() {
      this.reset();
      this.dialogIsShow = false;
    },
    reset() {
      this.specsInfo = {
        specsname: "",
        status: "1"
      };
      this.specsArr = [{
        value:''
      }]
    },
    ...mapActions(["getActionRoleList"]),
    add() {
      console.log("出现弹框");
      this.dialogIsShow = true;
      this.isAdd = true;
      this.getActionRoleList();
    },
    update(id) {
      this.getActionRoleList();
      this.dialogIsShow = true;
      this.isAdd = false;
      this.editId = id;
      getspecsInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.specsInfo = res.data.list[0];
          this.specsInfo.attrs.map((item,i)=>{
            if(i==0){
              this.specsArr[0].value = item
            }else{
              this.specsArr.push({
              value:item
            })
            }
            
          })
          this.specsInfo.status = this.specsInfo.status.toString();
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
          getspecsDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.getCount();
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
          let data = this.specsInfo
          let arr = this.specsArr.map(item =>{
            return item.value
          })
          data.attrs = arr ? arr.join(','):''
          if (this.isAdd) {
            getspecsAdd(this.specsInfo).then(res => {
              if (res.data.code == 200) {
                this.dialogIsShow = false;
                this.reset();
                this.getCount();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.specsInfo;
            data.id = this.editId;
            getspecsEdit(data).then(res => {
              if (res.data.code == 200) {
                this.dialogIsShow = false;
                this.reset();
                this.getCount();
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
    },
    getCount() {
      getspecsCount().then(res => {
        if (res.data.code == 200) {
          this.count = res.data.list[0].total;
          //如果当前不是第一页并且只有一条数据，我就让页面数量--
          if (this.pageInfo.page != 1 && this.getStateSpecsList.length == 1) {
            this.pageInfo.page--;
          }
          //调取获取商品规格接口列表的行动
          this.$store.dispatch("getActionSpecsList", this.pageInfo);
        }
      });
    },
    getPage(n) {
      //n是当前页
      this.pageInfo.page = n;
      //重新调取列表页面
      this.$store.dispatch("getActionSpecsList", this.pageInfo);
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

.block {
  float: right;
  margin: 10px 0 0 0;
}
</style>
