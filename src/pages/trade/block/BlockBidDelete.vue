<template>
  <div class="block-bid-delete" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="区块入札删除" 
      @back="$router.push('/trade')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 1200px; margin-bottom: 20px;">
      <el-form :model="deleteForm" inline @submit.prevent="handleQuery">
        <el-form-item label="受渡日">
          <el-date-picker
            v-model="deleteForm.deliveryDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择受渡日"
          />
        </el-form-item>
        <el-form-item label="区块类型">
          <el-select v-model="deleteForm.blockTypeCd" placeholder="请选择区块类型">
            <el-option label="STANDARD-常规区块" value="STANDARD"></el-option>
            <el-option label="LINK-P-链接父区块" value="LINK-P"></el-option>
            <el-option label="LINK-C-链接子区块" value="LINK-C"></el-option>
            <el-option label="LOOP-A-循环A区块" value="LOOP-A"></el-option>
            <el-option label="LOOP-B-循环B区块" value="LOOP-B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入札编号">
          <el-input v-model="deleteForm.bidId" placeholder="请输入入札编号（支持模糊查询）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="ElSearch" @click="handleQuery">查询可删除数据</el-button>
          <el-button icon="ElRefresh" @click="resetQuery">重置</el-button>
          <el-button 
            type="danger" 
            icon="ElDelete" 
            @click="handleBatchDelete"
            :disabled="!selectedRows.length"
          >
            批量删除选中项
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="hover" style="max-width: 1200px;">
      <el-table 
        :data="blockBidList.list" 
        border 
        stripe 
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="bidId" label="入札编号" min-width="180"></el-table-column>
        <el-table-column prop="deliveryDate" label="受渡日" width="120"></el-table-column>
        <el-table-column prop="blockName" label="区块名称" width="120"></el-table-column>
        <el-table-column prop="areaName" label="区域名称" width="100"></el-table-column>
        <el-table-column prop="timeCd" label="时间帯" min-width="150">
          <template #default="scope">
            <el-tooltip content="点击查看完整时间帯" placement="top">
              <span>{{ scope.row.timeCd.length > 20 ? scope.row.timeCd.substring(0,20) + '...' : scope.row.timeCd }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="bidTypeCd" label="入札种别" width="150"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button 
              type="text" 
              icon="ElDelete" 
              color="#f56c6c"
              @click="handleSingleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页（预留） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="blockBidList.list.length"
        style="margin-top: 20px; text-align: right;"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { blockBidQueryList } from '../../../mock/bidMock'
import { blockBidDelResult } from '../../../mock/bidMock'

const router = useRouter()
// 删除查询表单
const deleteForm = reactive({
  deliveryDate: '',
  blockTypeCd: '',
  bidId: ''
})

// 区块入札列表数据
const blockBidList = ref(blockBidQueryList)
// 选中的行数据
const selectedRows = ref([])

// 选择行变化
const handleSelectionChange = (val) => {
  selectedRows.value = val
}

// 查询可删除数据
const handleQuery = () => {
  // 模拟查询过滤
  ElMessage.success('可删除区块入札数据查询成功！')
  console.log('删除查询条件：', deleteForm)
}

// 重置查询
const resetQuery = () => {
  deleteForm.deliveryDate = ''
  deleteForm.blockTypeCd = ''
  deleteForm.bidId = ''
  selectedRows.value = []
}

// 单条删除
const handleSingleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除入札编号【${row.bidId}】的区块入札数据吗？删除后不可恢复！`,
    '删除确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 模拟删除接口调用
    const result = {
      ...blockBidDelResult,
      delCount: 1,
      msg: `入札编号【${row.bidId}】删除成功`,
      bidIds: [row.bidId]
    }
    // 跳转至删除结果页
    router.push({
      name: 'BlockBidDelResult',
      props: { delResult: result, isBatch: false }
    })
  }).catch(() => {
    ElMessage.info('已取消删除操作')
  })
}

// 批量删除
const handleBatchDelete = () => {
  if (!selectedRows.value.length) {
    ElMessage.warning('请选择要删除的区块入札数据！')
    return
  }

  ElMessageBox.confirm(
    `确定要删除选中的【${selectedRows.value.length}条】区块入札数据吗？删除后不可恢复！`,
    '批量删除确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 模拟批量删除接口调用
    const bidIds = selectedRows.value.map(item => item.bidId)
    const result = {
      ...blockBidDelResult,
      delCount: selectedRows.value.length,
      msg: `批量删除${selectedRows.value.length}条区块入札数据成功`,
      bidIds: bidIds
    }
    // 跳转至删除结果页
    router.push({
      name: 'BlockBidDelResult',
      state: {
        delResult: { ...result },
        isBatch: true
      }
    })
  }).catch(() => {
    ElMessage.info('已取消批量删除操作')
  })
}

// 分页相关（预留）
const handleSizeChange = (val) => {
  console.log('每页显示条数：', val)
}

const handleCurrentChange = (val) => {
  console.log('当前页码：', val)
}
</script>