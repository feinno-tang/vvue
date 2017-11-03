<template>
   <section>
      <!--<h2><i class="fa fa-table"></i> 菜单类别</h2>-->
      <el-form :inline="true" class="inline-form">
         <el-form-item>
            <el-input v-model="filter.name" placeholder="按名称搜索"></el-input>
         </el-form-item>
         <el-form-item><el-button type="primary" @click="onSubmit"><i class="fa fa-search"></i>搜索</el-button></el-form-item>
      </el-form>


      <!---数据列表--->
      <el-table :data="menus" v-model="menus" stripe border v-loading="listLoading">
         <el-table-column type="index" label="编号"></el-table-column>
         <el-table-column prop="id" label="类别编号"></el-table-column>
         <el-table-column prop="name" label="名称"></el-table-column>
         <el-table-column prop="icon" label="图标"></el-table-column>
         <el-table-column prop="order" label="排序"></el-table-column>
         <el-table-column label="操作">
            <template scope>
               <!--<el-button type="primary" @click="seeMenu"><i class="fa fa-info"></i>详情</el-button>-->
               <el-button type="primary" @click="showEditMenu(scope.row.id)"><i class="fa fa-pencil-square-o"></i>编辑</el-button>
               <el-button type="primary" @click="delMenu(scope.row.id)"><i class="fa fa-trash-o"></i>删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!--- 分页--->
      <el-col :span="24" class="toolbar">
         <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="[10, 20, 30, 50]"
                 :page-size="pageSize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
         </el-pagination>
      </el-col>

      <!--- 编辑弹层-->
      <!--<el-dialog  title="编辑" v-model="editMenuVisible" :close-on-click-modal="false">-->
         <!--<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">-->
            <!--<el-form-item label="编号">-->
               <!--<span>{{editForm.id}}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="类别编号" prop="id">-->
               <!--<el-input v-model="editForm.id"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="名称" prop="name">-->
               <!--<el-input v-model="editForm.name"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="图标" prop="icon">-->
               <!--<el-input v-model="editForm.icon"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="排序" prop="order">-->
               <!--<el-input v-model="editForm.order"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-button @click="saveMenu()"><i class="fa fa-save"></i>update</el-button>-->
         <!--</el-form>-->
      <!--</el-dialog>-->
   </section>
</template>

<script>
      export default{
          data(){
              return{
                  filter:{
                      name:''
                  },
                  menus:[{
                      id:0,
                      name:'',
                      icon:'',
                      order:1},
                      {
                          id:0,
                          name:'',
                          icon:'',
                          order:1},
                      {
                          id:0,
                          name:'',
                          icon:'',
                          order:1},
                      {
                          id:0,
                          name:'',
                          icon:'',
                          order:1}
                  ],
                  editForm:{
                      id:0,
                      name:'',
                      icon:'',
                      order:1
                  },
                  editFormRules:{
                     id:[{required:true,trigger:blur}],
                      name:[{required:true,trigger:blur}],
                      icon:[{required:true,trigger:blur }],
                      order:[{ required:true,trigger:blur}]
                  },
                  editMenuVisible:false,
                  currentPage:1,
                  pageSize:10,
                  total:0,
                  listLoading:false
              }
          },
          methods:{
              onSubmit(){

              },
              showEditMenu(editId){
                  this.editMenuVisible = true;
                  console.log(editId);
              },
              delMenu(row){
                  console.log(row.id);
                  this.$confirm('确定删除'+row.name+'吗?','',{type:'warning'}).then(()=>{
                      let param = {id:row.id};
                      //
                      this.$message({
                          message:'删除成功!',
                          type:'success'
                      });
                      this.getMenus();
                  }).catch(()=>{

                  });
              },
              saveMenu(){
                  console.log('saveMenu');
              },
              getMenus()
              {
                  this.listLoading = true;
                   //
               },
               handleSizeChange(val){
                  this.pageSize = val;
                  console.log(`每页 ${val} 条`);
              },
              handleCurrentChange(val) {
                  this.currentPage = val;
                  this.getMenus();
                  console.log(`当前页: ${val}`);
              }
          },
          mounted:function(){

          }
      }
</script>

<style scoped>
   section{

   }
   .inline-form{margin-top:30px;}
</style>