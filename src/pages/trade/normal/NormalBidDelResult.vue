<template>
  <div class="normal-bid-del-result" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      :content="isBatch ? '批量入札删除结果' : '单条入札删除结果'"
      @back="$router.push('/normal/bid/query')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 800px;">
      <!-- 成功提示 -->
      <div v-if="delResult.code === 200" style="text-align: center; margin: 30px 0;">
        <el-icon size="60" color="#67c23a"><CircleCheck /></el-icon>
        <h2 style="color: #67c23a; margin: 20px 0;">{{ delResult.msg }}</h2>
      </div>

      <!-- 失败提示（预留） -->
      <div v-else style="text-align: center; margin: 30px 0;">
        <el-icon size="60" color="#f56c6c"><CircleClose /></el-icon>
        <h2 style="color: #f56c6c; margin: 20px 0;">{{ delResult.msg || '入札删除失败' }}</h2>
      </div>

      <!-- 结果详情 -->
      <el-descriptions :column="2" border style="margin: 20px 0;">
        <el-descriptions-item label="删除类型">
          {{ isBatch ? '批量删除' : '单条删除' }}
        </el-descriptions-item>
        <el-descriptions-item label="删除件数">
          {{ delResult.delCount }} 件
        </el-descriptions-item>
        <el-descriptions-item label="操作状态" :span="2">
          <el-tag :type="delResult.code === 200 ? 'success' : 'danger'">
            {{ delResult.code === 200 ? '删除成功' : '删除失败' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 操作按钮 -->
      <div style="text-align: right; margin-top: 30px;">
        <el-button @click="$router.push('/normal/bid/delete')">继续删除</el-button>
        <el-button type="info" @click="$router.push('/normal/bid/query')">查看入札列表</el-button>
        <el-button type="primary" @click="$router.push('/trade')">返回交易首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { CircleCheck, CircleClose } from '@element-plus/icons-vue'

const router = useRouter()
// 接收删除结果和是否批量标识
const delResult = history.state?.delResult || {};
const isBatch = history.state?.isBatch || false;
</script>