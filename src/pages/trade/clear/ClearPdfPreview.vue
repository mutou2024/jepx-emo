<template>
  <div class="clear-pdf-preview" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="清算单据PDF预览" 
      @back="$router.push('/clear/result')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 1000px; margin: 0 auto;">
      <!-- PDF预览区域 -->
      <div style="text-align: center; padding: 20px 0;">
        <!-- 用iframe预览Base64格式PDF，兼容大部分浏览器 -->
        <iframe
          :src="pdfSrc"
          style="width: 100%; height: 800px; border: 1px solid #ebeef5; border-radius: 8px;"
          title="清算单据PDF"
        ></iframe>
      </div>

      <!-- 清算基本信息 -->
      <el-descriptions :column="3" border style="margin: 20px 0;">
        <el-descriptions-item label="清算编号" :span="3">{{ clearRow.clearId }}</el-descriptions-item>
        <el-descriptions-item label="清算日期">{{ clearRow.clearDate }}</el-descriptions-item>
        <el-descriptions-item label="清算类型">{{ clearRow.subject }}</el-descriptions-item>
        <el-descriptions-item label="清算总金额">
          <span :style="{ color: clearRow.totalAmount >= 0 ? '#67c23a' : '#f56c6c' }">
            {{ clearRow.totalAmount }} 円
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="清算状态" :span="3">
          <el-tag 
            :type="clearRow.status === '已清算' ? 'success' : (clearRow.status === '待清算' ? 'warning' : 'danger')"
          >
            {{ clearRow.status }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 操作按钮 -->
      <div style="text-align: right; margin-top: 30px;">
        <el-button @click="$router.push('/clear/result')">返回清算列表</el-button>
        <el-button type="primary" icon="ElDownload" @click="handleDownloadPdf">下载PDF</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { clearPdfData } from '../../../mock/clearMock'

// 接收清算行数据
const props = defineProps({
  clearRow: {
    type: Object,
    required: true
  }
})
const clearRow = props.clearRow

// 构建PDF预览地址（Base64转blob地址）
const pdfSrc = computed(() => {
  // 模拟获取PDF Base64数据
  const base64Data = clearPdfData.pdfBase64
  // 转换为blob URL
  const binary = atob(base64Data.replace(/\s/g, ''))
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  const blob = new Blob([bytes], { type: 'application/pdf' })
  return URL.createObjectURL(blob)
})

// 下载PDF
const handleDownloadPdf = () => {
  try {
    // 创建下载链接
    const a = document.createElement('a')
    a.href = pdfSrc.value
    a.download = `清算单据_${clearRow.clearId}_${clearRow.clearDate.replace(/-/g, '')}.pdf`
    document.body.appendChild(a)
    a.click()
    // 释放blob URL
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
    ElMessage.success('清算PDF下载成功！')
  } catch (error) {
    ElMessage.error('清算PDF下载失败！')
    console.error('PDF下载失败：', error)
  }
}
</script>