<template>
  <div class="block-bid-confirm" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="区块入札确认" 
      @back="$router.go(-1)"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card title="区块入札信息确认" shadow="hover" style="max-width: 800px;">
      <el-descriptions :column="1" border style="margin-bottom: 20px; margin-top: 20px;">
        <el-descriptions-item label="受渡日">{{ blockBidData.deliveryDate }}</el-descriptions-item>
        <el-descriptions-item label="区块类型">{{ blockBidData.blockTypeCd }}（{{ getBlockTypeName(blockBidData.blockTypeCd) }}）</el-descriptions-item>
        <el-descriptions-item label="区域代码">{{ blockBidData.areaCd }}（{{ getAreaName(blockBidData.areaCd) }}）</el-descriptions-item>
        <el-descriptions-item label="时间帯代码">{{ blockBidData.timeCd }}（{{ getTimeListDesc(blockBidData.timeCd) }}）</el-descriptions-item>
        <el-descriptions-item label="入札种别">{{ blockBidData.bidTypeCd }}（{{ getBidTypeName(blockBidData.bidTypeCd) }}）</el-descriptions-item>
        <el-descriptions-item label="入札价格">{{ blockBidData.price }} 円/MWh</el-descriptions-item>
        <el-descriptions-item label="入札量">{{ blockBidData.volume }} MW</el-descriptions-item>
        <el-descriptions-item label="受渡契约代码">{{ blockBidData.deliveryContractCd }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ blockBidData.note || '无' }}</el-descriptions-item>
      </el-descriptions>

      <el-form-item style="text-align: right;">
        <el-button @click="$router.go(-1)">返回修改</el-button>
        <el-button type="primary" @click="handleConfirm">确认提交</el-button>
      </el-form-item>
    </el-card>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { bidSubmitResult } from '../../../mock/bidMock'

const router = useRouter()
// 接收从录入页传递的表单数据
const blockBidData = history.state?.blockBidData || {};

// 区块类型名称映射
const getBlockTypeName = (blockTypeCd) => {
  const blockMap = {
    'STANDARD':'常规区块',
    'LINK-P':'链接父区块',
    'LINK-C':'链接子区块',
    'LOOP-A':'循环A区块',
    'LOOP-B':'循环B区块'
  }
  return blockMap[blockTypeCd] || '未知区块类型'
}

// 区域名称映射
const getAreaName = (areaCd) => {
  const areaMap = {1:'北海道',2:'东北',3:'东京',4:'中部',5:'北陆',6:'关西',7:'中国',8:'四国',9:'九州'}
  return areaMap[areaCd] || '未知区域'
}

// 时间帯列表描述
const getTimeListDesc = (timeCdStr) => {
  const timeList = timeCdStr.split(',').map(item => item.trim())
  return `共${timeList.length}个时间帯，范围：${timeList[0]} - ${timeList[timeList.length - 1]}`
}

// 入札种别名称映射
const getBidTypeName = (bidTypeCd) => {
  const bidMap = {
    'SELL-LIMIT': '卖出限价',
    'BUY-LIMIT': '买入限价'
  }
  return bidMap[bidTypeCd] || '未知类型'
}

// 确认提交，跳转至结果页
const handleConfirm = () => {
  // 模拟API提交，获取提交结果
  const result = bidSubmitResult
  // 携带结果数据跳转
  router.push({
    name: 'BlockBidResult',
    state: {
        submitResult: { ...result },
        blockBidData: { ...blockBidData }
      }
  })
}
</script>