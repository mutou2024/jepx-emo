<template>
  <div class="trade-home" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="交易管理首页" 
      @back="$router.push('/')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-row :gutter="20" style="margin-bottom: 20px;">
      <!-- 常规入札功能组 -->
      <el-col :span="12">
        <el-card title="常规入札管理" shadow="hover" style="height: 200px;">
          <div style="margin-top: 20px;">
            <el-button 
              type="success" 
              icon="Edit" 
              @click="$router.push('/normal/bid/input')"
              style="margin-right: 10px; margin-bottom: 15px;"
            >
              常规入札录入
            </el-button>
            <el-button 
              type="info" 
              icon="Search" 
              @click="$router.push('/normal/bid/query')"
              style="margin-bottom: 15px;"
            >
              常规入札查询
            </el-button>
            <br>
            <el-button 
              type="warning" 
              icon="Delete" 
              @click="$router.push('/normal/bid/delete')"
            >
              常规入札删除
            </el-button>
          </div>
        </el-card>
      </el-col>

      <!-- 区块入札功能组 -->
      <el-col :span="12">
        <el-card title="区块入札管理" shadow="hover" style="height: 200px;">
          <div style="margin-top: 20px;">
            <el-button 
              type="success" 
              icon="Edit" 
              @click="$router.push('/block/bid/input')"
              style="margin-right: 10px; margin-bottom: 15px;"
            >
              区块入札录入
            </el-button>
            <el-button 
              type="info" 
              icon="Search" 
              @click="$router.push('/block/bid/query')"
              style="margin-bottom: 15px;"
            >
              区块入札查询
            </el-button>
            <br>
            <el-button 
              type="warning" 
              icon="Delete" 
              @click="$router.push('/block/bid/delete')"
            >
              区块入札删除
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 成交结果查询 -->
      <el-col :span="8">
        <el-card title="成交结果查询" shadow="hover" style="height: 150px;">
          <div style="margin-top: 15px;">
            <el-button 
              type="primary" 
              icon="Document" 
              @click="$router.push('/deal/all')"
              style="width: 100%; margin-bottom: 10px;"
            >
              全成交结果查询
            </el-button>
            <el-button 
              type="primary" 
              icon="DocumentCopy" 
              @click="$router.push('/deal/normal')"
              style="width: 100%;"
            >
              常规成交查询
            </el-button>
          </div>
        </el-card>
      </el-col>

      <!-- 市场结果照会 -->
      <el-col :span="8">
        <el-card title="市场结果照会" shadow="hover" style="height: 150px;">
          <div style="margin-top: 35px;">
            <el-button 
              type="danger" 
              icon="DataBoard" 
              @click="$router.push('/market/result')"
              style="width: 100%;"
            >
              查看市场整体结果
            </el-button>
          </div>
        </el-card>
      </el-col>

      <!-- 清算照会 -->
      <el-col :span="8">
        <el-card title="清算照会" shadow="hover" style="height: 150px;">
          <div style="margin-top: 35px;">
            <el-button 
              type="primary" 
              icon="Wallet" 
              @click="$router.push('/clear/result')"
              style="width: 100%;"
            >
              查看清算数据
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 功能入口跳转，无需额外业务逻辑
</script>