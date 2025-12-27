import Mock from 'mockjs'

// 清算结果查询数据
export const clearResultList = Mock.mock({
  'list|1-10': [
    {
      clearId: '@id',
      clearDate: '@date("yyyy-MM-dd")',
      subject: '@pick(["常规入札买卖清算", "区块入札买卖清算", "手续费清算", "消费税清算"])',
      totalAmount: function() {
        // 正值收入，负值支出
        return Mock.Random.boolean(0.4) ? Mock.Random.integer(1000, 10000) : -Mock.Random.integer(1000, 10000)
      },
      'detailList|2-5': [
        {
          feeName: '@pick(["买卖成交代金", "交易手续费", "消费税", "服务费", "其他费用"])',
          quantity: '@float(1, 100, 1, 1)',
          unitPrice: '@integer(10, 1000) * 10',
          amount: '@integer(100, 5000)',
          remark: '@ctitle(0, 10)'
        }
      ],
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
      status: '@pick(["已清算", "待清算", "异常"])'
    }
  ]
})

// 清算PDF预览模拟数据（Base64格式占位，实际可替换为真实PDF编码）
export const clearPdfData = {
  code: 200,
  msg: '获取PDF成功',
  pdfBase64: 'JVBERi0xLjUKJb/3/+KtIKEKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIgL1BhZ2VNb2RlIC9JbWFnZQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvU2l6ZSAyCi9Sb290IDcgMCBSCi9JRFs8MzY5Q0E0RjEtMUQ2NC00RjE5LTg5RjctRkE4Q0E4RjE5QzBdXQo+PgplbmRvYmoKMiAwIG9iago8PCAvVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA1OTUgODQyIF0KL1BhZ2VzIDQgMCBSCi9JRFs8RjE0QzE0RDctNTQzOS00RjEFLTg4RTctRjEzQkQzRjE0QzBdXQo+PgplbmRvYmoKMzAgb2JqCjw8IC9UeXBlIC9QYWdlCi9QYXJlbmQgMyAwIFIKL01lZGlhQm94IFsgMCAwIDU5NSA4NDIgXQovUGFnZXMgNSAwIFIKL0lEW1w8RjE0QzE0RDctNTQzOS00RjEFLTg4RTctRjEzQkQzRjE0QzBdXAp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTkgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMDQwIDAwMDAwIG4gCjAwMDAwMDAxMjAgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSA0Ci9JbWFnZSAvV2lkdGggNTk1Ci9IZWlnaHQgODQyCi9Db250ZW50cyA1IDAgUgovQ3JlYXRvciAoSGVsbG8gV29ybGQpCj4+CnN0YXJ0eHJlZgo0MjUKJSVFT0YK',
  fileName: '清算单据_' + Mock.Random.date('yyyyMMdd') + '.pdf'
}