<template>
  <div class="normal-bid-confirm" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="常规入札确认" 
      @back="$router.go(-1)"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card title="入札信息确认" shadow="hover" style="max-width: 800px;">
      <el-descriptions :column="1" border style="margin-bottom: 20px; margin-top: 20px;">
        <el-descriptions-item label="受渡日">{{ bidData?.deliveryDate }}</el-descriptions-item>
        <el-descriptions-item label="区域代码">{{ bidData?.areaCd }}（{{ getAreaName(bidData?.areaCd) }}）</el-descriptions-item>
        <el-descriptions-item label="时间帯代码">{{ bidData?.timeCd }}（{{ getTimeDesc(bidData?.timeCd) }}）</el-descriptions-item>
        <el-descriptions-item label="入札种别">{{ bidData?.bidTypeCd }}（{{ getBidTypeName(bidData?.bidTypeCd) }}）</el-descriptions-item>
        <el-descriptions-item label="入札价格">{{ bidData?.price }} 円/MWh</el-descriptions-item>
        <el-descriptions-item label="入札量">{{ bidData?.volume }} MW</el-descriptions-item>
        <el-descriptions-item label="受渡契约代码">{{ bidData?.deliveryContractCd }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ bidData?.note || '无' }}</el-descriptions-item>
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

const bidData = history.state?.bidData || {};

// 区域名称映射
const getAreaName = (areaCd) => {
  const areaMap = {1:'北海道',2:'东北',3:'东京',4:'中部',5:'北陆',6:'关西',7:'中国',8:'四国',9:'九州'}
  return areaMap[areaCd] || '未知区域'
}

// 时间帯描述
const getTimeDesc = (timeCd) => {
  if (!timeCd) return ''
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

// 确认提交，跳转至结果页
const handleConfirm = () => {
  const result = bidSubmitResult
  router.push({
    name: 'NormalBidResult',
    state: {
      submitResult: result,
      bidData: bidData
    }
  })
}
</script>