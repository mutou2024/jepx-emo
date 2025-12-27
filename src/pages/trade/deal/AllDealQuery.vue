<template>
  <div class="all-deal-query" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="全成交查询" 
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
        <el-form-item label="入札类型">
          <el-select v-model="queryForm.bidType" placeholder="请选择入札类型">
            <el-option label="常规入札" value="常规入札"></el-option>
            <el-option label="区块入札" value="区块入札"></el-option>
          </el-select>
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
        <el-form-item label="成交状态">
          <el-select v-model="queryForm.dealStatus" placeholder="请选择成交状态">
            <el-option label="已成交" value="已成交"></el-option>
            <el-option label="未成交" value="未成交"></el-option>
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
        :data="allDealList.list" 
        border 
        stripe 
        style="width: 100%;"
      >
        <el-table-column prop="bidId" label="入札编号" min-width="180"></el-table-column>
        <el-table-column prop="bidType" label="入札类型" width="100">
          <template #default="scope">
            <el-tag type="primary">{{ scope.row.bidType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryDate" label="受渡日" width="120"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="100"></el-table-column>
        <el-table-column prop="timeCd" label="时间帯" width="80"></el-table-column>
        <el-table-column prop="bidPrice" label="申报价格（円/MWh）" width="160"></el-table-column>
        <el-table-column prop="bidVolume" label="申报数量（MW）" width="160"></el-table-column>
        <el-table-column prop="dealPrice" label="成交价格（円/MWh）" width="160"></el-table-column>
        <el-table-column prop="dealVolume" label="成交数量（MW）" width="160"></el-table-column>
        <el-table-column prop="dealStatus" label="成交状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.dealStatus === '已成交' ? 'success' : 'info'">
              {{ scope.row.dealStatus }}
            </el-tag>
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
        :total="allDealList.list.length"
        style="margin-top: 20px; text-align: right;"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { defaultAllDealList } from '../../../mock/dealMock'

// 查询表单
const queryForm = reactive({
  deliveryDate: '',
  bidType: '',
  areaCd: '',
  dealStatus: ''
})

// 全成交列表数据
const allDealList = ref(defaultAllDealList)

// 查询操作
const handleQuery = () => {
  // 模拟查询过滤
  ElMessage.success('全成交数据查询成功！')
  console.log('查询条件：', queryForm)
}

// 重置查询
const resetQuery = () => {
  queryForm.deliveryDate = ''
  queryForm.bidType = ''
  queryForm.areaCd = ''
  queryForm.dealStatus = ''
}

// 导出操作
const handleExport = () => {
  ElMessage.success('全成交数据导出成功！')
}

// 分页相关（预留）
const handleSizeChange = (val) => {
  console.log('每页显示条数：', val)
}

const handleCurrentChange = (val) => {
  console.log('当前页码：', val)
}
</script>