<template>
  <div class="normal-bid-detail" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="常规入札详情" 
      @back="$router.go(-1)"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card title="入札基本信息" shadow="hover" style="max-width: 800px; margin-bottom: 20px;">
      <el-descriptions :column="2" border style="margin-top: 20px;">
        <el-descriptions-item label="入札编号" :span="2">{{ bidRow.bidId }}</el-descriptions-item>
        <el-descriptions-item label="受渡日">{{ bidRow.deliveryDate }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ bidRow.createTime }}</el-descriptions-item>
        <el-descriptions-item label="区域代码">{{ bidRow.areaCd }}</el-descriptions-item>
        <el-descriptions-item label="区域名称">{{ bidRow.areaName }}</el-descriptions-item>
        <el-descriptions-item label="时间帯代码">{{ bidRow.timeCd }}</el-descriptions-item>
        <el-descriptions-item label="时间帯描述">{{ getTimeDesc(bidRow.timeCd) }}</el-descriptions-item>
        <el-descriptions-item label="入札种别">{{ bidRow.bidTypeCd }}</el-descriptions-item>
        <el-descriptions-item label="入札种别名称">{{ getBidTypeName(bidRow.bidTypeCd) }}</el-descriptions-item>
        <el-descriptions-item label="入札价格">{{ bidRow.price }} 円/MWh</el-descriptions-item>
        <el-descriptions-item label="入札量">{{ bidRow.volume }} MW</el-descriptions-item>
        <el-descriptions-item label="受渡契约代码">{{ bidRow.deliveryContractCd }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ bidRow.note || '无' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="hover" style="max-width: 800px;">
      <div style="text-align: right;">
        <el-button @click="$router.go(-1)">返回列表</el-button>
        <el-button type="warning" @click="handleEdit">修改入札</el-button>
        <el-button type="danger" @click="handleDelete">删除入札</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 接收列表行数据
const bidRow = history.state?.bidRow || {};

// 时间帯描述
const getTimeDesc = (timeCd) => {
  const hour = Math.floor((timeCd - 1) / 2)
  const minute = (timeCd - 1) % 2 === 0 ? '00' : '30'
  const endHour = minute === '30' ? hour + 1 : hour
  const endMinute = minute === '30' ? '00' : '30'
  return `${hour.toString().padStart(2, '0')}:${minute} - ${endHour.toString().padStart(2, '0')}:${endMinute}`
}

// 入札种别名称映射
const getBidTypeName = (bidTypeCd) => {
  const bidMap = {
    'SELL-LIMIT': '卖出限价',
    'BUY-LIMIT': '买入限价',
    'SELL-FIT': 'FIT卖出',
    'SELL-APPROVAL': '承认电源卖出'
  }
  return bidMap[bidTypeCd] || '未知类型'
}

const router = useRouter()
// 修改入札
const handleEdit = () => {
  router.push({
    name: 'NormalBidInput'
  })
  ElMessage.info('跳转至入札录入页修改数据')
}

// 删除入札
const handleDelete = () => {
  router.push({
    name: 'NormalBidDelConfirm',
    state: { bidRow: bidRow, isBatch: false }
  })
}
</script>