import Mock from 'mockjs'

// 常规成交查询结果
const areaMap = {
  1: '北海道',
  2: '东北',
  3: '东京',
  4: '中部',
  5: '北陆',
  6: '关西',
  7: '中国',
  8: '四国',
  9: '九州'
};

export const normalDealList = Mock.mock({
  list: function() {
    const len = Mock.Random.integer(5, 12); // 5-12 条数据
    const bidTypes = ["SELL-LIMIT", "BUY-LIMIT", "SELL-FIT", "SELL-APPROVAL"];
    const result = [];

    for (let i = 0; i < len; i++) {
      const areaCd = Mock.Random.integer(1, 9);
      const bidVolume = parseFloat(Mock.Random.float(1, 10, 1, 1).toFixed(1)); // 保留1位小数
      const dealPrice = Mock.Random.boolean(0.7) ? Mock.Random.integer(100, 1000) * 10 : 0;
      const dealVolume = dealPrice > 0 
        ? parseFloat(Mock.Random.float(0.1, bidVolume, 1, 1).toFixed(1)) 
        : 0;

      result.push({
        bidId: Mock.Random.id(),
        deliveryDate: Mock.Random.date('yyyy-MM-dd'),
        areaCd: areaCd,
        areaName: areaMap[areaCd],
        timeCd: Mock.Random.integer(1, 48),
        bidTypeCd: Mock.Random.pick(bidTypes),
        bidPrice: Mock.Random.integer(100, 1000) * 10,
        bidVolume: bidVolume,
        dealPrice: dealPrice,
        dealVolume: dealVolume,
        deliveryContractCd: Mock.Random.string('upper', 8),
        note: Mock.Random.ctitle(0, 20),
        dealStatus: dealVolume > 0 ? '已成交' : '未成交'
      });
    }

    return result;
  }
});

// 区块成交查询结果
export const defaultBlockDealList = Mock.mock({
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
      bidPrice: '@integer(100, 1000) * 10',
      bidVolume: '@float(1, 10, 1, 1)',
      dealPrice: function() {
        return Mock.Random.boolean(0.6) ? Mock.Random.integer(100, 1000) * 10 : 0
      },
      dealVolume: function() {
        return this.dealPrice > 0 ? Mock.Random.float(0.1, this.bidVolume, 1, 1) : 0
      },
      timeCd: function() {
        const timeList = []
        const count = Mock.Random.integer(4,8)
        for(let i=0; i<count; i++){
          timeList.push(Mock.Random.integer(1,48).toString().padStart(2,'0'))
        }
        return timeList.sort((a,b) => a - b).join(',')
      },
      dealResultCd: '@pick(["ACCEPT", "REJECT"])',
      dealResultName: function() {
        return this.dealResultCd === 'ACCEPT' ? '成交通过' : '成交驳回'
      },
      deliveryContractCd: '@string("upper", 8)'
    }
  ]
})

// 全成交查询结果（整合常规+区块）
export const defaultAllDealList = Mock.mock({
  list: function() {
    const len = Mock.Random.integer(8, 15); // 8 到 15 条数据
    const bidTypes = ['常规入札', '区块入札'];
    const result = [];

    for (let i = 0; i < len; i++) {
      const areaCd = Mock.Random.integer(1, 9);
      const bidType = Mock.Random.pick(bidTypes);
      const deliveryDate = Mock.Random.date('yyyy-MM-dd');
      const timeCd = Mock.Random.integer(1, 48);
      const bidPrice = Mock.Random.integer(100, 1000) * 10;
      const bidVolume = parseFloat(Mock.Random.float(1, 10, 1, 1).toFixed(1)); // 保留1位小数

      const dealPrice = Mock.Random.boolean(0.7) ? Mock.Random.integer(100, 1000) * 10 : 0;
      const dealVolume = dealPrice > 0 
        ? parseFloat(Mock.Random.float(0.1, bidVolume, 1, 1).toFixed(1)) 
        : 0;

      result.push({
        bidId: Mock.Random.id(),
        bidType: bidType,
        deliveryDate: deliveryDate,
        areaCd: areaCd,
        areaName: areaMap[areaCd],
        timeCd: timeCd,
        bidPrice: bidPrice,
        bidVolume: bidVolume,
        dealPrice: dealPrice,
        dealVolume: dealVolume,
        dealStatus: dealVolume > 0 ? '已成交' : '未成交'
      });
    }

    return result;
  }
});

// 市场结果查询数据
export const marketResultData = Mock.mock({
  deliveryDate: '@date("yyyy-MM-dd")',
  systemPrice: '@integer(100, 1000) * 10',
  totalVolume: '@integer(1000, 10000, 1, 1)',
  areaList: function() {
    const areaNames = ['北海道','东北','东京','中部','北陆','关西','中国','四国','九州'];
    return Array.from({ length: 9 }, (_, i) => ({
      areaCd: i + 1,
      areaName: areaNames[i],
      areaPrice: Mock.Random.integer(100, 1000) * 10,
      areaVolume: Mock.Random.integer(100, 1000)
    }));
  },
  timeList: function() {
    return Array.from({ length: 48 }, (_, i) => ({
      timeCd: i + 1,
      timePrice: Mock.Random.integer(100, 1000) * 10,
      timeVolume: Mock.Random.integer(10, 100)
    }));
  }
})