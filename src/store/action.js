import LoginAjax from '@/api/Login/Login'
import WithdrawDepositAjax from '@/api/WithdrawDeposit/WithdrawDeposit'

const actions = {
  rolePermissionFn ({state, commit, rootState}) {
    LoginAjax.QueryMenus().then((response) => {
      if (response.code === 200) {
        commit('setMenuData', {menuData: response.data})
      }
    })
  },
  formatPeriod (data) {
    // 期间格式化发方法
    let formatStart = data.start.slice(0, 7).split('-').join('年')
    let formatEnd = data.end.slice(0, 7).split('-').join('年')
    if (formatStart === formatEnd) {
      this.periodContent = `${formatStart}期`
    } else {
      this.periodContent = `${formatStart}期 至 ${formatEnd}期`
    }
    this.periodData = data
  },
  // 查询提现列表数据
  queryWithdrawDepositData ({state, commit, rootState}, queryParams) {
    WithdrawDepositAjax.GetWithdrawData(queryParams).then((response) => {
      if (response.code === 200) {
        commit('setWithdrawData', {withdrawData: response.data})
      }
    })
  }
}

export default {
  actions
}
