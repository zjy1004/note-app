import { Get, PostFromData } from '@/api/axios.config'

const MyCenterAjax = {
  queryUserInfo (params) {
    // 查询物流公司员工管理查看
    let result = Get('/crm/logisticsPersonnel/query/seeLogisticsPersonnel', params)
    return result
  },
  queryInfo (params) {
    // 查询经销商公司名称及经营地址
    let result = PostFromData('/crm/clientManageController/queryClientNameAddressVo', params)
    return result
  }
}

export default MyCenterAjax
