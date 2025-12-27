<template>
  <div class="normal-bid-query" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="常规入札查询" 
      @back="$router.push('/trade')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 1200px; margin-bottom: 20px;">
      <el-form :model="queryForm" inline @submit.prevent="handleQuery">
        <el-form-item label="受渡日">
          <el-date-picker
            v-model="queryForm.deliveryDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择受渡日"
          />
        </el-form-item>
        <el-form-item label="区域代码">
          <el-select v-model="queryForm.areaCd" placeholder="请选择区域代码">
            <el-option label="1-北海道" value="1"></el-option>
            <el-option label="2-东北" value="2"></el-option>
            <el-option label="3-东京" value="3"></el-option>
            <el-option label="4-中部" value="4"></el-option>
            <el-option label="5-北陆" value="5"></el-option>
            <el-option label="6-关西" value="6"></el-option>
            <el-option label="7-中国" value="7"></el-option>
            <el-option label="8-四国" value="8"></el-option>
            <el-option label="9-九州" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入札种别">
          <el-select v-model="queryForm.bidTypeCd" placeholder="请选择入札种别">
            <el-option label="SELL-LIMIT-卖出限价" value="SELL-LIMIT"></el-option>
            <el-option label="BUY-LIMIT-买入限价" value="BUY-LIMIT"></el-option>
            <el-option label="SELL-FIT-FIT卖出" value="SELL-FIT"></el-option>
            <el-option label="SELL-APPROVAL-承认电源卖出" value="SELL-APPROVAL"></el-option>
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
        :data="bidList.list" 
        border 
        stripe 
        style="width: 100%;"
      >
        <el-table-column prop="bidId" label="入札编号" min-width="180"></el-table-column>
        <el-table-column prop="deliveryDate" label="受渡日" width="120"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="100"></el-table-column>
        <el-table-column prop="timeCd" label="时间帯" width="80"></el-table-column>
        <el-table-column prop="bidTypeCd" label="入札种别" width="150"></el-table-column>
        <el-table-column prop="price" label="入札价格（円/MWh）" width="150"></el-table-column>
        <el-table-column prop="volume" label="入札量（MW）" width="120"></el-table-column>
        <el-table-column prop="deliveryContractCd" label="契约代码" width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button 
              type="text" 
              icon="View" 
              @click="handleDetail(scope.row)"
            >
              详情
            </el-button>
            <el-button 
              type="text" 
              icon="Delete" 
              color="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页（预留，Mock数据无需真实分页） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="bidList.list.length"
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
import { normalBidQueryList } from '../../../mock/bidMock'

const router = useRouter()
// 查询表单
const queryForm = reactive({
  deliveryDate: '',
  areaCd: '',
  bidTypeCd: ''
})

// 入札列表数据
const bidList = ref(normalBidQueryList)

// 查询操作
const handleQuery = () => {
  // 模拟查询过滤，实际项目中对接后端
  ElMessage.success('查询成功！')
  console.log('查询条件：', queryForm)
}

// 重置查询
const resetQuery = () => {
  queryForm.deliveryDate = ''
  queryForm.areaCd = ''
  queryForm.bidTypeCd = ''
}

// 导出操作
const handleExport = () => {
  ElMessage.success('入札数据导出成功！')
}

// 行点击跳转详情
// const handleRowClick = (row) => {
//   router.push({
//     name: 'NormalBidDetail',
//     state: { bidRow: row }
//   })
// }

// 详情按钮
const handleDetail = (row) => {
  router.push({
    name: 'NormalBidDetail',
    state: { bidRow: row }
  })
}

// 删除按钮
const handleDelete = (row) => {
  router.push({
    name: 'NormalBidDelConfirm',
    state: { bidRow: row, isBatch: false }
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