const mutations = {
  // 个人中心显示状态更新
  updatePersonSettingShow (state, options) {
    let {showSetting} = options
    state.showSetting = showSetting
  },
  // 设置提现列表数据
  setWithdrawData (state, options) {
    let {withdrawData} = options
    let temp = this.getters.receiveSelectedList
    state.withdrawData = withdrawData.list
    withdrawData.list.forEach(item => {
      item.clientAccountList.forEach(innerItem => {
        temp.forEach(selectItem => {
          if (innerItem.waybillId === selectItem.waybillId) {
            this.commit('clickWaybillItem', {boxItem: innerItem, check: true})
          }
        })
      })
    })
  },
  // 提现列表点击日期分组
  clickDateGroup (state, options) {
    let {check, groupItem} = options
    state.withdrawData.forEach(outerItem => {
      if (groupItem.id === outerItem.id) {
        outerItem.check = check
        outerItem.clientAccountList.forEach(item1 => {
          if (outerItem.id === item1.pid) {
            item1.check = check
          }
        })
      }
    })
  },
  // 提现列表点击行运单记录
  clickWaybillItem (state, options) {
    let {check, boxItem} = options
    state.withdrawData = state.withdrawData.map(item => {
      item.clientAccountList.forEach(item1 => {
        if (item1.id === boxItem.id) {
          item1.check = check
        }
      })
      return item
    })
    console.log(state.withdrawData, 'rrrr')
    state.withdrawData = state.withdrawData.map(item => {
      if (item.id === boxItem.pid) {
        item.check = item.clientAccountList.every(item1 => {
          return item1.check
        })
      }
      return item
    })
  },
  // 点击购物车行减少按钮
  reduceWaybill (state, options) {
    let {boxItem} = options
    state.withdrawData = state.withdrawData.map(item => {
      if (item.id === boxItem.pid) {
        item.clientAccountList.forEach(childItem => {
          if (boxItem.id === childItem.id) {
            childItem.check = false
          }
        })
      }
      return item
    })
  }
}

export default {
  mutations
}
