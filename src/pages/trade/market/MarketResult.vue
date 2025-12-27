<template>
  <div class="market-result" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="市场结果查询" 
      @back="$router.push('/trade')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <!-- 查询条件区域 -->
    <el-card shadow="hover" style="max-width: 1200px; margin-bottom: 20px;">
      <el-form :model="queryForm" inline @submit.prevent="handleQuery">
        <el-form-item label="受渡日">
          <el-date-picker
            v-model="queryForm.deliveryDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择受渡日"
            :default-value="new Date()"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="ElSearch" @click="handleQuery">查询市场结果</el-button>
          <el-button icon="ElRefresh" @click="resetQuery">重置</el-button>
          <el-button type="success" icon="ElDownload" @click="handleExport">导出数据</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 市场概览数据 -->
    <el-card shadow="hover" style="max-width: 1200px; margin-bottom: 20px;">
      <template #header>
        <div style="font-weight: bold; font-size: 16px;">市场概览</div>
      </template>
      <el-descriptions :column="4" border style="margin-top: 10px;">
        <el-descriptions-item label="查询受渡日" :span="4">
          {{ marketData.deliveryDate || '未选择日期' }}
        </el-descriptions-item>
        <el-descriptions-item label="系统均价（円/MWh）">
          <span style="color: #409EFF; font-weight: bold;">{{ marketData.systemPrice }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="市场总成交量（MW）">
          <span style="color: #409EFF; font-weight: bold;">{{ marketData.totalVolume }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="最高区域价格（円/MWh）">
          <span style="color: #f56c6c; font-weight: bold;">{{ maxAreaPrice }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="最低区域价格（円/MWh）">
          <span style="color: #67c23a; font-weight: bold;">{{ minAreaPrice }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 区域市场数据表格 -->
    <el-card shadow="hover" style="max-width: 1200px; margin-bottom: 20px;">
      <template #header>
        <div style="font-weight: bold; font-size: 16px;">区域市场明细</div>
      </template>
      <el-table 
        :data="marketData.areaList" 
        border 
        stripe 
        style="width: 100%; margin-top: 10px;"
        highlight-current-row
      >
        <el-table-column prop="areaCd" label="区域代码" width="100"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="120"></el-table-column>
        <el-table-column prop="areaPrice" label="区域价格（円/MWh）" width="180">
          <template #default="scope">
            <span :style="{ color: scope.row.areaPrice > marketData.systemPrice ? '#f56c6c' : '#67c23a' }">
              {{ scope.row.areaPrice }}
              <span v-if="scope.row.areaPrice > marketData.systemPrice">(高于均价)</span>
              <span v-else>(低于/等于均价)</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="areaVolume" label="区域成交量（MW）" width="180"></el-table-column>
      </el-table>
    </el-card>

    <!-- 时段市场数据表格 -->
    <el-card shadow="hover" style="max-width: 1200px;">
      <template #header>
        <div style="font-weight: bold; font-size: 16px; display: flex; justify-content: space-between; align-items: center;">
          <span>48时段市场价格明细</span>
          <el-button type="text" icon="ElZoomIn" @click="showTimeChart = !showTimeChart">
            {{ showTimeChart ? '隐藏趋势图' : '查看趋势图' }}
          </el-button>
        </div>
      </template>

      <!-- 时段价格趋势图（折叠展示） -->
      <div v-if="showTimeChart" style="height: 300px; margin: 10px 0; border: 1px solid #ebeef5; border-radius: 8px; padding: 10px;">
        <div style="font-size: 14px; margin-bottom: 10px; text-align: center;">48时段价格趋势</div>
        <!-- 简易趋势图：用div模拟，实际可替换为ECharts -->
        <div style="display: flex; align-items: flex-end; height: 240px; padding: 0 20px; gap: 4px; border-bottom: 1px solid #ebeef5; position: relative;">
          <!-- 系统均价参考线 -->
          <div 
            style="position: absolute; left: 0; right: 0; border-top: 1px dashed #909399; z-index: 1;"
            :style="{ bottom: (marketData.systemPrice / maxTimePrice) * 240 + 'px' }"
          >
            <span style="position: absolute; right: 10px; top: -15px; font-size: 12px; color: #909399;">
              系统均价：{{ marketData.systemPrice }}
            </span>
          </div>
          <!-- 时段柱状图 -->
          <div 
            v-for="item in marketData.timeList" 
            :key="item.timeCd"
            style="flex: 1; background-color: #409EFF; border-radius: 4px 4px 0 0; transition: all 0.3s;"
            :style="{ 
              height: (item.timePrice / maxTimePrice) * 240 + 'px',
              backgroundColor: item.timePrice > marketData.systemPrice ? '#f56c6c' : '#409EFF'
            }"
          >
            <div style="position: relative; top: -20px; text-align: center; font-size: 10px; color: #666;">
              {{ item.timeCd }}<br>{{ item.timePrice }}
            </div>
          </div>
        </div>
      </div>

      <!-- 时段明细表格 -->
      <el-table 
        :data="marketData.timeList" 
        border 
        stripe 
        style="width: 100%; margin-top: 10px;"
        max-height="400px"
      >
        <el-table-column prop="timeCd" label="时段编号" width="100"></el-table-column>
        <el-table-column prop="timePrice" label="时段价格（円/MWh）" width="180">
          <template #default="scope">
            <span :style="{ color: scope.row.timePrice > marketData.systemPrice ? '#f56c6c' : '#409EFF' }">
              {{ scope.row.timePrice }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="timeVolume" label="时段成交量（MW）" width="180"></el-table-column>
      </el-table>

      <!-- 分页（预留，因48时段数据固定，分页仅作展示） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 48]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="marketData.timeList.length"
        style="margin-top: 20px; text-align: right;"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { marketResultData } from '../../../mock/dealMock'

// 查询表单
const queryForm = reactive({
  deliveryDate: ''
})

// 市场数据
const marketData = ref(marketResultData)
// 是否显示时段趋势图
const showTimeChart = ref(false)

console.log(marketData.value.areaList)



// 计算最高区域价格
const maxAreaPrice = computed(() => {
  if (!marketData.value.areaList || marketData.value.areaList.length === 0) return 0
  return Math.max(...marketData.value.areaList.map(item => item.areaPrice))
})

// 计算最低区域价格
const minAreaPrice = computed(() => {
  if (!marketData.value.areaList || marketData.value.areaList.length === 0) return 0
  return Math.min(...marketData.value.areaList.map(item => item.areaPrice))
})

// 计算最高时段价格（用于趋势图高度计算）
const maxTimePrice = computed(() => {
  if (!marketData.value.timeList || marketData.value.timeList.length === 0) return 1
  return Math.max(...marketData.value.timeList.map(item => item.timePrice))
})

// 查询市场结果
const handleQuery = () => {
  if (!queryForm.deliveryDate) {
    ElMessage.warning('请选择受渡日！')
    return
  }
  // 模拟查询，实际项目中对接后端获取对应日期数据
  ElMessage.success(`查询${queryForm.deliveryDate}市场结果成功！`)
  console.log('市场查询条件：', queryForm)
}

// 重置查询
const resetQuery = () => {
  queryForm.deliveryDate = ''
  // 重置为默认数据
  marketData.value = marketResultData
  ElMessage.info('查询条件已重置！')
}

// 导出数据
const handleExport = () => {
  ElMessage.success('市场结果数据导出成功！')
}

// 分页相关（预留）
const handleSizeChange = (val) => {
  console.log('每页显示条数：', val)
}

const handleCurrentChange = (val) => {
  console.log('当前页码：', val)
}
</script>