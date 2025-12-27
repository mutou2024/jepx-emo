<template>
  <div class="normal-bid-del-confirm" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="常规入札删除确认" 
      @back="$router.go(-1)"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card 
      :title="isBatch ? '批量删除入札确认' : '单条删除入札确认'" 
      shadow="hover" 
      style="max-width: 800px;"
    >
      <!-- 单条删除详情 -->
      <el-descriptions 
        :column="1" 
        border 
        style="margin-top: 20px;"
        v-if="!isBatch"
      >
        <el-descriptions-item label="入札编号">{{ bidRow.bidId }}</el-descriptions-item>
        <el-descriptions-item label="受渡日">{{ bidRow.deliveryDate }}</el-descriptions-item>
        <el-descriptions-item label="区域名称">{{ bidRow.areaName }}</el-descriptions-item>
        <el-descriptions-item label="入札种别">{{ bidRow.bidTypeCd }}</el-descriptions-item>
        <el-descriptions-item label="入札价格">{{ bidRow.price }} 円/MWh</el-descriptions-item>
        <el-descriptions-item label="入札量">{{ bidRow.volume }} MW</el-descriptions-item>
      </el-descriptions>

      <!-- 批量删除列表 -->
      <el-table 
        :data="bidRow" 
        border 
        stripe 
        style="width: 100%; margin-top: 20px;"
        v-if="isBatch"
      >
        <el-table-column prop="bidId" label="入札编号" min-width="180"></el-table-column>
        <el-table-column prop="deliveryDate" label="受渡日" width="120"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="100"></el-table-column>
        <el-table-column prop="bidTypeCd" label="入札种别" width="150"></el-table-column>
      </el-table>

      <!-- 警告提示 -->
      <div style="margin-top: 30px; padding: 16px; background-color: #fef0f0; border-radius: 8px; color: #f56c6c;">
        <el-icon style="vertical-align: middle;"><Warning /></el-icon>
        <span style="margin-left: 8px; font-weight: bold;">警告：该操作不可撤销，请谨慎确认！</span>
      </div>

      <!-- 操作按钮 -->
      <div style="text-align: right; margin-top: 30px;">
        <el-button @click="$router.go(-1)">取消删除</el-button>
        <el-button type="danger" icon="ElDelete" @click="handleConfirmDelete">确认删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { bidDeleteResult } from '../../../mock/bidMock'
import { Warning } from '@element-plus/icons-vue'

const router = useRouter()
// 接收待删除数据和是否批量标识
const bidRow = history.state?.bidRow || {}
const isBatch = history.state?.isBatch || false

// 确认删除
const handleConfirmDelete = () => {
  // 模拟删除结果
  const result = bidDeleteResult
  // 跳转至删除结果页
  router.push({
    name: 'NormalBidDelResult',
    state: { delResult: result, isBatch: isBatch }
  })
}
</script>