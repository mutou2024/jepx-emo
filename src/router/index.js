import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import TradeHome from '../pages/trade/TradeHome.vue'

// 常规入札页面
import NormalBidInput from '../pages/trade/normal/NormalBidInput.vue'
import NormalBidConfirm from '../pages/trade/normal/NormalBidConfirm.vue'
import NormalBidResult from '../pages/trade/normal/NormalBidResult.vue'
import NormalBidQuery from '../pages/trade/normal/NormalBidQuery.vue'
import NormalBidDetail from '../pages/trade/normal/NormalBidDetail.vue'
import NormalBidDelete from '../pages/trade/normal/NormalBidDelete.vue'
import NormalBidDelConfirm from '../pages/trade/normal/NormalBidDelConfirm.vue'
import NormalBidDelResult from '../pages/trade/normal/NormalBidDelResult.vue'

// 区块入札页面
import BlockBidInput from '../pages/trade/block/BlockBidInput.vue'
import BlockBidConfirm from '../pages/trade/block/BlockBidConfirm.vue'
import BlockBidResult from '../pages/trade/block/BlockBidResult.vue'
import BlockBidQuery from '../pages/trade/block/BlockBidQuery.vue'

// 成交结果查询页面
import NormalDealQuery from '../pages/trade/deal/NormalDealQuery.vue'
import BlockDealQuery from '../pages/trade/deal/BlockDealQuery.vue'
import AllDealQuery from '../pages/trade/deal/AllDealQuery.vue'

// 市场结果与清算页面
import MarketResult from '../pages/trade/market/MarketResult.vue'
import ClearResult from '../pages/trade/clear/ClearResult.vue'
import ClearPdfPreview from '../pages/trade/clear/ClearPdfPreview.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/trade', name: 'TradeHome', component: TradeHome },

  // 常规入札路由（完整画面迁移链路）
  { path: '/normal/bid/input', name: 'NormalBidInput', component: NormalBidInput },
  {
    path: '/trade/normal/bid-confirm',
    name: 'NormalBidConfirm',
    component: NormalBidConfirm
  },
  { path: '/normal/bid/result', name: 'NormalBidResult', component: NormalBidResult },
  { path: '/normal/bid/query', name: 'NormalBidQuery', component: NormalBidQuery },
  { path: '/normal/bid/detail', name: 'NormalBidDetail', component: NormalBidDetail },
  { path: '/normal/bid/delete', name: 'NormalBidDelete', component: NormalBidDelete },
  { path: '/normal/bid/delete/confirm', name: 'NormalBidDelConfirm', component: NormalBidDelConfirm },
  { path: '/normal/bid/delete/result', name: 'NormalBidDelResult', component: NormalBidDelResult },

  // 区块入札路由
  { path: '/block/bid/input', name: 'BlockBidInput', component: BlockBidInput },
  { path: '/block/bid/confirm', name: 'BlockBidConfirm', component: BlockBidConfirm },
  { path: '/block/bid/result', name: 'BlockBidResult', component: BlockBidResult },
  { path: '/block/bid/query', name: 'BlockBidQuery', component: BlockBidQuery },
  
  // 区块入札删除
  {
    path: '/block/bid/delete',
    name: 'BlockBidDelete',
    component: () => import('../pages/trade/block/BlockBidDelete.vue')
  },
  // 区块入札删除结果
  {
    path: '/block/bid/delResult',
    name: 'BlockBidDelResult',
    component: () => import('../pages/trade/block/BlockBidDelResult.vue'),
    props: true
  },

  // 成交结果路由
  { path: '/deal/normal', name: 'NormalDealQuery', component: NormalDealQuery },
  { path: '/deal/block', name: 'BlockDealQuery', component: BlockDealQuery },
  { path: '/deal/all', name: 'AllDealQuery', component: AllDealQuery },

  // 市场结果与清算路由
  { path: '/market/result', name: 'MarketResult', component: MarketResult },
  { path: '/clear/result', name: 'ClearResult', component: ClearResult },
  { path: '/clear/pdf', name: 'ClearPdfPreview', component: ClearPdfPreview }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router