import { Post, Get } from '@/api/axios.config'
const WaybillAjax = {
  AllWaybill (params) {
    // 经销商app-全部运单
    let result = Post('/waybill/api/waybillApp/querySendClientAllWaybill', params)
    return result
  },
  WaybillDetail (params) {
    // 经销商app-运单详情
    let result = Get('/waybill/api/waybillApp/sendClientinfo', params)
    return result
  }
}

export default WaybillAjax
