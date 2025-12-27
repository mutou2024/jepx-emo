<template>
  <div class="normal-bid-delete" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="常规入札删除" 
      @back="$router.push('/trade')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 800px;">
      <el-form :model="deleteForm" inline style="margin-top: 20px;">
        <el-form-item label="受渡日">
          <el-date-picker
            v-model="deleteForm.deliveryDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择受渡日"
            style="width: 200px;"
          />
        </el-form-item>
        <el-form-item label="删除范围">
          <el-select v-model="deleteForm.rangeType" placeholder="请选择删除范围" style="width: 200px;">
            <el-option label="单条入札（按编号）" value="single"></el-option>
            <el-option label="当日所有常规入札" value="batch"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="deleteForm.rangeType === 'single'" label="入札编号">
          <el-input v-model="deleteForm.bidId" placeholder="请输入入札编号" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="ElSearch" @click="handleQueryBid">查询待删除数据</el-button>
          <el-button icon="ElRefresh" @click="resetDelete">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 待删除数据列表 -->
      <el-table 
        :data="waitDeleteList" 
        border 
        stripe 
        style="width: 100%; margin-top: 20px;"
        v-if="waitDeleteList.length > 0"
      >
        <el-table-column prop="bidId" label="入札编号" min-width="180"></el-table-column>
        <el-table-column prop="deliveryDate" label="受渡日" width="120"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="100"></el-table-column>
        <el-table-column prop="bidTypeCd" label="入札种别" width="150"></el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-button 
              type="text" 
              icon="ElDelete" 
              color="danger"
              @click="handleSingleConfirm(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 批量删除按钮 -->
      <div v-if="waitDeleteList.length > 0" style="text-align: right; margin-top: 20px;">
        <el-button type="danger" icon="ElDelete" @click="handleBatchConfirm">批量删除选中数据</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { normalBidQueryList } from '../../../mock/bidMock'

const router = useRouter()
// 删除表单
const deleteForm = reactive({
  deliveryDate: '',
  rangeType: '',
  bidId: ''
})

// 待删除列表
const waitDeleteList = ref([])

// 查询待删除数据
const handleQueryBid = () => {
  if (!deleteForm.deliveryDate || !deleteForm.rangeType) {
    ElMessage.warning('请填写受渡日和删除范围！')
    return
  }
  // 模拟查询待删除数据
  const list = normalBidQueryList.list.filter(item => {
    let flag = item.deliveryDate === deleteForm.deliveryDate
    if (deleteForm.rangeType === 'single' && deleteForm.bidId) {
      flag = flag && item.bidId.includes(deleteForm.bidId)
    }
    return flag
  })
  waitDeleteList.value = list
  ElMessage.success(`查询到 ${list.length} 条待删除数据！`)
}

// 重置删除表单
const resetDelete = () => {
  deleteForm.deliveryDate = ''
  deleteForm.rangeType = ''
  deleteForm.bidId = ''
  waitDeleteList.value = []
}

// 单条删除确认
const handleSingleConfirm = (row) => {
  router.push({
    name: 'NormalBidDelConfirm',
    params: { bidRow: row, isBatch: false }
  })
}

// 批量删除确认
const handleBatchConfirm = () => {
  router.push({
    name: 'NormalBidDelConfirm',
    params: { bidRow: waitDeleteList.value, isBatch: true }
  })
}
</script>