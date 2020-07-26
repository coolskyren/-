<template>
  <div>
    <el-dialog
      width="60%"
      :title="addInfo.isAdd ? '限时秒杀添加':'限时秒杀编辑'"
      :visible.sync="addInfo.dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="seckInfo" :rules="rules" ref="seckInfo">
        <el-form-item label="活动名称：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="seckInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限：" :label-width="formLabelWidth" prop="title">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="getTime"
          ></el-date-picker>
        </el-form-item>

        <el-form-item
          label="一级分类："
          :label-width="formLabelWidth"
          placeholder="请选择一级分类"
          prop="first_cateid"
        >
          <el-select @change="cateChange" v-model="seckInfo.first_cateid" placeholder="请选择">
            <el-option
              v-for="item in cateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >{{item.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类："
          :label-width="formLabelWidth"
          placeholder="请选择二级分类"
          prop="second_cateid"
        >
          <el-select @change = 'getGoods' v-model="seckInfo.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >{{item.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品："
          :label-width="formLabelWidth"
          placeholder="请选择商品"
          prop="second_cateid"
        >
          <el-select v-model="seckInfo.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >{{item.goodsname}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-radio v-model="seckInfo.status" label="1">启用</el-radio>
          <el-radio v-model="seckInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" type="primary" @click="subInfo('seckInfo')">新 增</el-button>
        <el-button v-else type="primary" @click="subInfo('seckInfo')">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getseckAdd,
  getseckInfo,
  getcateList,
  getgoodsList,
  getseckList,
  getseckEdit,
  
} from "@/util/axios";
//调取辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      formLabelWidth: "100px",
      seckInfo: {
        title: "",
        begintime: '',
        endtime: '',
        first_cateid: "", 
        second_cateid: "", 
        goodsid: "",
        status: "1",
      },
      dateValue:[],
      cateArr: [],
      secondArr: [],
      goodsArr: [],
      rules: {
        title: [
          {
            required: true,
            message: "请输入限时秒杀名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    //计算属性
    ...mapGetters(["getStateMenuList"]),
  },
  mounted() {
    this.getCatesList()
  },
  methods: {
    getCatesList(pid = 0) {
            getcateList({ pid }).then((res) => {
                if (res.data.code == 200) {
                    if(pid==0){
                         this.cateArr = res.data.list
                    }else{
                        this.secondArr = res.data.list
                    }
                   
                }
            })
        },
        cateChange(e){
            this.secondArr = []
            this.getCatesList(e)
        },
        getGoods(){
            getgoodsList({
                fid:this.seckInfo.first_cateid,
                sid:this.seckInfo.second_cateid
            })
            .then(res=>{
                if(res.data.code==200){
                    this.goodsArr = res.data.list
                }
            })
        },
        getTime(e) {
            this.seckInfo.begintime = e[0]
            this.seckInfo.endtime = e[1]
        },
    ...mapActions(["getActionSeckList"]),
    cancel() {
      this.reset();
      this.$emit("cancel", false);
    },
    reset() {
      this.seckInfo = {
        pid: "",
        title: '',
        icon: '',
        url: "", 
        type: "", 
        status:'1'
      };
    },
    update(id) {
      this.editId = id;
      getseckInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res,'123');
          this.seckInfo = res.data.list
          this.seckInfo.status = this.seckInfo.status.toString()
        }
      });
    },
    //确定添加或者更新事件
    subInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addInfo.isAdd) {
            //调取添加接口
            getseckAdd(this.seckInfo).then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.cancel();
                this.getActionSeckList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.seckInfo
            data.id = this.editId
            getseckEdit(data).then((res) => {
              if (res.data.code == 200) {
                //关闭弹框 清空输入框
                this.cancel();
                //添加成功重新查询列表
                this.getActionSeckList();
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
  },
};
</script>

<style  lang="" scoped>
</style>
