import Mock from 'mockjs'

// 常规入札录入默认数据
export const normalBidDefaultData = {
  deliveryDate: Mock.Random.date('yyyy-MM-dd'),
  areaCd: '1', // 北海道
  timeCd: '01', // 第一个30分钟时段
  bidTypeCd: 'SELL-LIMIT',
  price: Mock.Random.integer(100, 1000) * 10, // 10的倍数
  volume: Mock.Random.float(1, 10, 1, 1), // 保留1位小数
  deliveryContractCd: Mock.Random.string('upper', 8),
  note: Mock.Random.ctitle(5, 20)
}

// 常规入札查询结果Mock数据
export const normalBidQueryList = Mock.mock({
  'list|5-10': [
    {
      bidId: '@id',
      deliveryDate: '@date("yyyy-MM-dd")',
      areaCd: '@integer(1,9)',
      areaName: function() {
        const areaMap = {1:'北海道',2:'东北',3:'东京',4:'中部',5:'北陆',6:'关西',7:'中国',8:'四国',9:'九州'}
        return areaMap[this.areaCd]
      },
      timeCd: '@integer(1,48)',
      bidTypeCd: '@pick(["SELL-LIMIT", "BUY-LIMIT", "SELL-FIT", "SELL-APPROVAL"])',
      price: '@integer(100, 1000) * 10',
      volume: '@float(1, 10, 1, 1)',
      deliveryContractCd: '@string("upper", 8)',
      note: '@ctitle(0, 20)',
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
    }
  ]
})

// 区块入札默认数据
export const blockBidDefaultData = {
  deliveryDate: Mock.Random.date('yyyy-MM-dd'),
  blockTypeCd: 'STANDARD',
  areaCd: '3', // 东京
  timeCd: '01,02,03,04', // 4个以上时间帯
  bidTypeCd: 'SELL-LIMIT',
  price: Mock.Random.integer(100, 1000) * 10,
  volume: Mock.Random.float(1, 10, 1, 1),
  deliveryContractCd: Mock.Random.string('upper', 8),
  note: Mock.Random.ctitle(5, 20)
}

// 区块入札查询结果Mock数据
export const blockBidQueryList = Mock.mock({
  'list|3-8': [
    {
      bidId: '@id',
      deliveryDate: '@date("yyyy-MM-dd")',
      blockTypeCd: '@pick(["STANDARD", "LINK-P", "LINK-C", "LOOP-A", "LOOP-B"])',
      blockName: function() {
        const blockMap = {
          'STANDARD':'常规区块',
          'LINK-P':'链接父区块',
          'LINK-C':'链接子区块',
          'LOOP-A':'循环A区块',
          'LOOP-B':'循环B区块'
        }
        return blockMap[this.blockTypeCd]
      },
      areaCd: '@integer(1,9)',
      areaName: function() {
        const areaMap = {1:'北海道',2:'东北',3:'东京',4:'中部',5:'北陆',6:'关西',7:'中国',8:'四国',9:'九州'}
        return areaMap[this.areaCd]
      },
      timeCd: function() {
        // 随机4-8个时间帯
        const timeList = []
        const count = Mock.Random.integer(4,8)
        for(let i=0; i<count; i++){
          timeList.push(Mock.Random.integer(1,48).toString().padStart(2,'0'))
        }
        return timeList.sort((a,b) => a - b).join(',')
      },
      bidTypeCd: '@pick(["SELL-LIMIT", "BUY-LIMIT"])',
      price: '@integer(100, 1000) * 10',
      volume: '@float(1, 10, 1, 1)',
      deliveryContractCd: '@string("upper", 8)',
      note: '@ctitle(0, 20)',
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
    }
  ]
})

// 入札提交结果Mock数据
export const bidSubmitResult = {
  code: 200,
  msg: '入札提交成功',
  bidCount: Mock.Random.integer(1, 5),
  bidIds: Mock.mock('@id|1-5').split('|')
}

// 入札删除结果Mock数据
export const bidDeleteResult = {
  code: 200,
  msg: '入札删除成功',
  delCount: Mock.Random.integer(1, 3)
}

// 区块入札删除结果
export const blockBidDelResult = {
  code: 200,
  msg: '区块入札删除成功',
  delCount: 0,
  bidIds: []
}