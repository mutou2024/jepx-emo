<template>
  <div class="block-deal-query" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="区块成交查询" 
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
        <el-form-item label="区块类型">
          <el-select v-model="queryForm.blockTypeCd" placeholder="请选择区块类型">
            <el-option label="STANDARD-常规区块" value="STANDARD"></el-option>
            <el-option label="LINK-P-链接父区块" value="LINK-P"></el-option>
            <el-option label="LINK-C-链接子区块" value="LINK-C"></el-option>
            <el-option label="LOOP-A-循环A区块" value="LOOP-A"></el-option>
            <el-option label="LOOP-B-循环B区块" value="LOOP-B"></el-option>
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
        <el-form-item label="成交结果">
          <el-select v-model="queryForm.dealResultCd" placeholder="请选择成交结果">
            <el-option label="ACCEPT-成交通过" value="ACCEPT"></el-option>
            <el-option label="REJECT-成交驳回" value="REJECT"></el-option>
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
        :data="blockDealList.list" 
        border 
        stripe 
        style="width: 100%;"
      >
        <el-table-column prop="bidId" label="入札编号" min-width="180"></el-table-column>
        <el-table-column prop="deliveryDate" label="受渡日" width="120"></el-table-column>
        <el-table-column prop="blockName" label="区块名称" width="120"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="100"></el-table-column>
        <el-table-column prop="timeCd" label="时间帯" min-width="150">
          <template #default="scope">
            <el-tooltip content="点击查看完整时间帯" placement="top">
              <span>{{ scope.row.timeCd.length > 20 ? scope.row.timeCd.substring(0,20) + '...' : scope.row.timeCd }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="bidPrice" label="申报价格（円/MWh）" width="160"></el-table-column>
        <el-table-column prop="bidVolume" label="申报数量（MW）" width="160"></el-table-column>
        <el-table-column prop="dealPrice" label="成交价格（円/MWh）" width="160"></el-table-column>
        <el-table-column prop="dealVolume" label="成交数量（MW）" width="160"></el-table-column>
        <el-table-column prop="dealResultName" label="成交结果" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.dealResultCd === 'ACCEPT' ? 'success' : 'danger'">
              {{ scope.row.dealResultName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryContractCd" label="契约代码" width="120"></el-table-column>
      </el-table>

      <!-- 分页（预留） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="blockDealList.list.length"
        style="margin-top: 20px; text-align: right;"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { defaultBlockDealList } from '../../../mock/dealMock'

// 查询表单
const queryForm = reactive({
  deliveryDate: '',
  blockTypeCd: '',
  areaCd: '',
  dealResultCd: ''
})

// 区块成交列表数据
const blockDealList = ref(defaultBlockDealList)

// 查询操作
const handleQuery = () => {
  // 模拟查询过滤
  ElMessage.success('区块成交数据查询成功！')
  console.log('查询条件：', queryForm)
}

// 重置查询
const resetQuery = () => {
  queryForm.deliveryDate = ''
  queryForm.blockTypeCd = ''
  queryForm.areaCd = ''
  queryForm.dealResultCd = ''
}

// 导出操作
const handleExport = () => {
  ElMessage.success('区块成交数据导出成功！')
}

// 分页相关（预留）
const handleSizeChange = (val) => {
  console.log('每页显示条数：', val)
}

const handleCurrentChange = (val) => {
  console.log('当前页码：', val)
}
</script>