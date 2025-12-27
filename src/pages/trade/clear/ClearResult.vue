<template>
  <div class="clear-result" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="清算结果查询" 
      @back="$router.push('/trade')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 1200px; margin-bottom: 20px;">
      <el-form :model="queryForm" inline @submit.prevent="handleQuery">
        <el-form-item label="清算日期">
          <el-date-picker
            v-model="queryForm.clearDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择清算日期"
          />
        </el-form-item>
        <el-form-item label="清算类型">
          <el-select v-model="queryForm.subject" placeholder="请选择清算类型">
            <el-option label="常规入札买卖清算" value="常规入札买卖清算"></el-option>
            <el-option label="区块入札买卖清算" value="区块入札买卖清算"></el-option>
            <el-option label="手续费清算" value="手续费清算"></el-option>
            <el-option label="消费税清算" value="消费税清算"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="清算状态">
          <el-select v-model="queryForm.status" placeholder="请选择清算状态">
            <el-option label="已清算" value="已清算"></el-option>
            <el-option label="待清算" value="待清算"></el-option>
            <el-option label="异常" value="异常"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="ElSearch" @click="handleQuery">查询</el-button>
          <el-button icon="ElRefresh" @click="resetQuery">重置</el-button>
          <el-button type="success" icon="ElDownload" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="hover" style="max-width: 1200px;">
      <el-table 
        :data="clearList.list" 
        border 
        stripe 
        style="width: 100%;"
        @row-click="handleRowClick"
      >
        <el-table-column prop="clearId" label="清算编号" min-width="180"></el-table-column>
        <el-table-column prop="clearDate" label="清算日期" width="120"></el-table-column>
        <el-table-column prop="subject" label="清算类型" width="180"></el-table-column>
        <el-table-column prop="totalAmount" label="清算总金额" width="150">
          <template #default="scope">
            <span :style="{ color: scope.row.totalAmount >= 0 ? '#67c23a' : '#f56c6c' }">
              {{ scope.row.totalAmount }} 円
              <span v-if="scope.row.totalAmount >= 0">(收入)</span>
              <span v-else>(支出)</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="清算状态" width="120">
          <template #default="scope">
            <el-tag 
              :type="scope.row.status === '已清算' ? 'success' : (scope.row.status === '待清算' ? 'warning' : 'danger')"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button 
              type="text" 
              icon="ElView" 
              @click="handleDetail(scope.row)"
            >
              详情
            </el-button>
            <el-button 
              type="text" 
              icon="ElDocument" 
              color="#409EFF"
              @click="handleViewPdf(scope.row)"
            >
              查看PDF
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页（预留） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="clearList.list.length"
        style="margin-top: 20px; text-align: right;"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { clearResultList } from '../../../mock/clearMock'

const router = useRouter()
// 查询表单
const queryForm = reactive({
  clearDate: '',
  subject: '',
  status: ''
})

// 清算列表数据
const clearList = ref(clearResultList)

// 查询操作
const handleQuery = () => {
  // 模拟查询过滤
  ElMessage.success('清算数据查询成功！')
  console.log('查询条件：', queryForm)
}

// 重置查询
const resetQuery = () => {
  queryForm.clearDate = ''
  queryForm.subject = ''
  queryForm.status = ''
}

// 导出操作
const handleExport = () => {
  ElMessage.success('清算数据导出成功！')
}

// 行点击跳转详情
const handleRowClick = (row) => {
  handleDetail(row)
}

// 详情按钮
const handleDetail = (row) => {
  ElMessage.info(`查看清算【${row.clearId}】详情`)
}

// 查看PDF
const handleViewPdf = (row) => {
  router.push({
    name: 'ClearPdfPreview',
    params: { clearRow: row }
  })
}

// 分页相关（预留）
const handleSizeChange = (val) => {
  console.log('每页显示条数：', val)
}

const handleCurrentChange = (val) => {
  console.log('当前页码：', val)
}
</script>