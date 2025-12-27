<template>
  <div class="block-bid-input" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="区块入札录入" 
      @back="$router.push('/trade')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 800px;">
      <el-form 
        ref="blockBidFormRef" 
        :model="blockBidForm" 
        :rules="blockBidRules" 
        label-width="120px"
        style="margin-top: 20px;"
      >
        <el-form-item label="受渡日" prop="deliveryDate">
          <el-date-picker
            v-model="blockBidForm.deliveryDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择受渡日"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="区块类型" prop="blockTypeCd">
          <el-select v-model="blockBidForm.blockTypeCd" placeholder="请选择区块类型" style="width: 100%;">
            <el-option label="STANDARD-常规区块" value="STANDARD"></el-option>
            <el-option label="LINK-P-链接父区块" value="LINK-P"></el-option>
            <el-option label="LINK-C-链接子区块" value="LINK-C"></el-option>
            <el-option label="LOOP-A-循环A区块" value="LOOP-A"></el-option>
            <el-option label="LOOP-B-循环B区块" value="LOOP-B"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="区域代码" prop="areaCd">
          <el-select v-model="blockBidForm.areaCd" placeholder="请选择区域代码" style="width: 100%;">
            <el-option label="1-北海道" value="1"></el-option>
            <el-option label="2-东北" value="2"></el-option>
            <el-option label="3-东京" value="3"></el-option>
            <el-option label="4-中部" value="4"></el-option>
            <el-option label="5-北陆" value="5"></el-option>
            <el-option label="6-关西" value="6"></el-option>
            <el-option label="7-中国" value="7"></el-option>
            <el-option label="8-四国" value="8"></el-option>
            <el-option label="9-九州" value="9"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间帯代码" prop="timeCd">
          <el-input 
            v-model="blockBidForm.timeCd" 
            placeholder="请输入4个及以上时间帯（用英文逗号分隔，如：01,02,03,04）"
            tooltip="需输入4个及以上连续/非连续时间帯，格式为01-48，英文逗号分隔"
          />
          <div style="margin-top: 8px; color: #666; font-size: 12px;">
            提示：需输入4个及以上时间帯，示例：01,02,03,04 或 10,11,12,13,14
          </div>
        </el-form-item>

        <el-form-item label="入札种别" prop="bidTypeCd">
          <el-select v-model="blockBidForm.bidTypeCd" placeholder="请选择入札种别" style="width: 100%;">
            <el-option label="SELL-LIMIT-卖出限价" value="SELL-LIMIT"></el-option>
            <el-option label="BUY-LIMIT-买入限价" value="BUY-LIMIT"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入札价格" prop="price">
          <el-input 
            v-model.number="blockBidForm.price" 
            placeholder="请输入10的倍数价格"
            suffix="円/MWh"
          />
        </el-form-item>

        <el-form-item label="入札量" prop="volume">
          <el-input 
            v-model.number="blockBidForm.volume" 
            placeholder="请输入保留1位小数的入札量"
            suffix="MW"
          />
        </el-form-item>

        <el-form-item label="受渡契约代码" prop="deliveryContractCd">
          <el-input v-model="blockBidForm.deliveryContractCd" placeholder="请输入契约代码"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input 
            v-model="blockBidForm.note" 
            type="textarea" 
            :rows="3" 
            placeholder="请输入备注（最多100字符）"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item style="text-align: right;">
          <el-button @click="$router.push('/trade')">取消</el-button>
          <el-button type="primary" @click="handleSubmit">下一步（确认）</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { blockBidDefaultData } from '../../../mock/bidMock'
import { ElMessage } from 'element-plus'

const router = useRouter()
const blockBidFormRef = ref(null)

// 区块入札表单数据
const blockBidForm = reactive({
  deliveryDate: blockBidDefaultData.deliveryDate,
  blockTypeCd: blockBidDefaultData.blockTypeCd,
  areaCd: blockBidDefaultData.areaCd,
  timeCd: blockBidDefaultData.timeCd,
  bidTypeCd: blockBidDefaultData.bidTypeCd,
  price: blockBidDefaultData.price,
  volume: blockBidDefaultData.volume,
  deliveryContractCd: blockBidDefaultData.deliveryContractCd,
  note: blockBidDefaultData.note
})

// 表单校验规则
const blockBidRules = reactive({
  deliveryDate: [{ required: true, message: '请选择受渡日', trigger: 'change' }],
  blockTypeCd: [{ required: true, message: '请选择区块类型', trigger: 'change' }],
  areaCd: [{ required: true, message: '请选择区域代码', trigger: 'change' }],
  timeCd: [
    { required: true, message: '请输入时间帯代码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value) {
          const timeList = value.split(',').filter(item => item.trim() !== '')
          if (timeList.length < 4) {
            callback(new Error('时间帯数量必须不少于4个'))
          } else {
            // 验证每个时间帯是否在01-48范围内
            const isValid = timeList.every(time => {
              const num = parseInt(time.trim())
              return !isNaN(num) && num >= 1 && num <= 48
            })
            if (!isValid) {
              callback(new Error('时间帯必须是1-48之间的数字，用英文逗号分隔'))
            } else {
              callback()
            }
          }
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  bidTypeCd: [{ required: true, message: '请选择入札种别', trigger: 'change' }],
  price: [
    { required: true, message: '请输入入札价格', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value && value % 10 !== 0) {
          callback(new Error('入札价格必须是10的倍数'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  volume: [
    { required: true, message: '请输入入札量', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value && String(value).split('.').length > 1 && String(value).split('.')[1].length > 1) {
          callback(new Error('入札量仅能保留1位小数'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  deliveryContractCd: [{ required: true, message: '请输入受渡契约代码', trigger: 'blur' }],
  note: [{ max: 100, message: '备注最多100个字符', trigger: 'blur' }]
})

// 提交跳转至确认页
const handleSubmit = async () => {
  try {
    await blockBidFormRef.value.validate()
    // 携带表单数据跳转至确认页
    router.push({
      name: 'BlockBidConfirm',
      state: {
        blockBidData: { ...blockBidForm }
      }
    })
  } catch (error) {
    ElMessage.warning('表单校验失败，请检查填写内容')
    console.log('表单校验失败：', error)
  }
}
</script>