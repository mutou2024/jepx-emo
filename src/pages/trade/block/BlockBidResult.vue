<template>
  <div class="block-bid-result" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="区块入札提交结果" 
      @back="$router.push('/block/bid/query')"
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
        <h2 style="color: #f56c6c; margin: 20px 0;">{{ submitResult.msg || '区块入札提交失败' }}</h2>
      </div>

      <!-- 结果详情 -->
      <el-descriptions :column="2" border style="margin: 20px 0;">
        <el-descriptions-item label="提交受渡日" :span="2">{{ blockBidData.deliveryDate }}</el-descriptions-item>
        <el-descriptions-item label="区块类型" :span="2">
          {{ blockBidData.blockTypeCd }}（{{ getBlockTypeName(blockBidData.blockTypeCd) }}）
        </el-descriptions-item>
        <el-descriptions-item label="提交入札件数">{{ submitResult.bidCount }} 件</el-descriptions-item>
        <el-descriptions-item label="入札编号" :span="1">
          <span v-for="(id, index) in submitResult.bidIds" :key="index">{{ id }}<br></span>
        </el-descriptions-item>
        <el-descriptions-item label="区域代码" :span="2">{{ blockBidData.areaCd }}（{{ getAreaName(blockBidData.areaCd) }}）</el-descriptions-item>
        <el-descriptions-item label="时间帯数量" :span="2">
          {{ blockBidData.timeCd.split(',').length }} 个
        </el-descriptions-item>
      </el-descriptions>

      <!-- 操作按钮 -->
      <div style="text-align: right; margin-top: 30px;">
        <el-button @click="$router.push('/block/bid/input')">继续录入</el-button>
        <el-button type="info" @click="$router.push('/block/bid/query')">查看区块入札</el-button>
        <el-button type="primary" @click="$router.push('/trade')">返回交易首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { CircleCheck, CircleClose } from '@element-plus/icons-vue'

const submitResult = history.state?.submitResult || {};
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
</script>