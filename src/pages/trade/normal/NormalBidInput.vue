<template>
  <div class="normal-bid-input" style="padding: 20px; background-color: #f5f7fa; min-height: 100vh;">
    <el-page-header 
      content="常规入札录入" 
      @back="$router.push('/trade')"
      style="margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 8px;"
    ></el-page-header>

    <el-card shadow="hover" style="max-width: 800px;">
      <el-form 
        ref="bidFormRef" 
        :model="bidForm" 
        :rules="bidRules" 
        label-width="120px"
        style="margin-top: 20px;"
      >
        <el-form-item label="受渡日" prop="deliveryDate">
          <el-date-picker
            v-model="bidForm.deliveryDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择受渡日"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item label="区域代码" prop="areaCd">
          <el-select v-model="bidForm.areaCd" placeholder="请选择区域代码" style="width: 100%;">
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
          <el-select v-model="bidForm.timeCd" placeholder="请选择时间帯代码" style="width: 100%;">
            <el-option v-for="i in 48" :key="i" :label="i" :value="i.toString()"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入札种别" prop="bidTypeCd">
          <el-select v-model="bidForm.bidTypeCd" placeholder="请选择入札种别" style="width: 100%;">
            <el-option label="SELL-LIMIT-卖出限价" value="SELL-LIMIT"></el-option>
            <el-option label="BUY-LIMIT-买入限价" value="BUY-LIMIT"></el-option>
            <el-option label="SELL-FIT-FIT卖出" value="SELL-FIT"></el-option>
            <el-option label="SELL-APPROVAL-承认电源卖出" value="SELL-APPROVAL"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入札价格" prop="price">
          <el-input 
            v-model.number="bidForm.price" 
            placeholder="请输入10的倍数价格"
            suffix="円/MWh"
          />
        </el-form-item>

        <el-form-item label="入札量" prop="volume">
          <el-input 
            v-model.number="bidForm.volume" 
            placeholder="请输入保留1位小数的入札量"
            suffix="MW"
          />
        </el-form-item>

        <el-form-item label="受渡契约代码" prop="deliveryContractCd">
          <el-input v-model="bidForm.deliveryContractCd" placeholder="请输入契约代码"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input 
            v-model="bidForm.note" 
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
import { normalBidDefaultData } from '../../../mock/bidMock'

const router = useRouter()
const bidFormRef = ref(null)

// 入札表单数据
const bidForm = reactive({
  deliveryDate: normalBidDefaultData.deliveryDate,
  areaCd: normalBidDefaultData.areaCd,
  timeCd: normalBidDefaultData.timeCd,
  bidTypeCd: normalBidDefaultData.bidTypeCd,
  price: normalBidDefaultData.price,
  volume: normalBidDefaultData.volume,
  deliveryContractCd: normalBidDefaultData.deliveryContractCd,
  note: normalBidDefaultData.note
})

// 表单校验规则
const bidRules = reactive({
  deliveryDate: [{ required: true, message: '请选择受渡日', trigger: 'change' }],
  areaCd: [{ required: true, message: '请选择区域代码', trigger: 'change' }],
  timeCd: [{ required: true, message: '请选择时间帯代码', trigger: 'change' }],
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
    await bidFormRef.value.validate()
    // 使用 state 来传递表单数据
    router.push({
      name: 'NormalBidConfirm',
      state: {
        bidData: { ...bidForm }
      }
    })
  } catch (error) {
    console.log('表单校验失败：', error)
  }
}
</script>