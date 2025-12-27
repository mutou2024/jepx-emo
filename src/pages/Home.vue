<template>
  <div class="home-container" style="padding: 50px; text-align: center; background-color: #f5f7fa; min-height: 100vh;">
    <div style="max-width: 800px; margin: 0 auto; padding: 40px; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
      <h1 style="color: #2c3e50; margin-bottom: 20px; font-size: 28px;">日本电力交易系统（JEPX Demo）</h1>
      <p style="color: #666; margin-bottom: 30px; font-size: 16px;">基于Vue 3 + Element Plus构建，包含常规入札、区块入札、成交查询、清算照会等核心功能</p>
      <el-button 
        type="primary" 
        size="large"
        icon="ElTrendCharts"
        @click="$router.push('/trade')"
        style="padding: 12px 30px; font-size: 16px;"
      >
        进入核心交易模块
      </el-button>
    </div>
  </div>
</template>

<script setup>
// 无需额外业务逻辑，仅提供跳转入口
</script>