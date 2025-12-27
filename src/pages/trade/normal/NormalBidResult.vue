<template>
  <div class="normal-bid-result" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="常规入札提交结果" 
      @back="$router.push('/normal/bid/query')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 800px;">
      <!-- 成功提示 -->
      <div v-if="submitResult.code === 200" style="text-align: center; margin: 30px 0;">
        <el-icon size="60" color="#67c23a"><CircleCheck /></el-icon>
        <h2 style="color: #67c23a; margin: 20px 0;">{{ submitResult.msg }}</h2>
      </div>

      <!-- 失败提示（预留） -->
      <div v-else style="text-align: center; margin: 30px 0;">
        <el-icon size="60" color="#f56c6c"><CircleClose /></el-icon>
        <h2 style="color: #f56c6c; margin: 20px 0;">{{ submitResult.msg || '入札提交失败' }}</h2>
      </div>

      <!-- 结果详情 -->
      <el-descriptions :column="2" border style="margin: 20px 0;">
        <el-descriptions-item label="提交受渡日" :span="2">{{ bidData.deliveryDate }}</el-descriptions-item>
        <el-descriptions-item label="提交入札件数">{{ submitResult.bidCount }} 件</el-descriptions-item>
        <el-descriptions-item label="入札编号" :span="1">
          <span v-for="(id, index) in submitResult.bidIds" :key="index">{{ id }}<br></span>
        </el-descriptions-item>
        <el-descriptions-item label="区域代码" :span="2">{{ bidData.areaCd }}（{{ getAreaName(bidData.areaCd) }}）</el-descriptions-item>
        <el-descriptions-item label="入札种别" :span="2">{{ bidData.bidTypeCd }}（{{ getBidTypeName(bidData.bidTypeCd) }}）</el-descriptions-item>
      </el-descriptions>

      <!-- 操作按钮 -->
      <div style="text-align: right; margin-top: 30px;">
        <el-button @click="$router.push('/normal/bid/input')">继续录入</el-button>
        <el-button type="info" @click="$router.push('/normal/bid/query')">查看入札</el-button>
        <el-button type="primary" @click="$router.push('/trade')">返回交易首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'

const submitResult = history.state?.submitResult || {};
const bidData = history.state?.bidData || {};

// 区域名称映射
const getAreaName = (areaCd) => {
  const areaMap = {1:'北海道',2:'东北',3:'东京',4:'中部',5:'北陆',6:'关西',7:'中国',8:'四国',9:'九州'}
  return areaMap[areaCd] || '未知区域'
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
</script>