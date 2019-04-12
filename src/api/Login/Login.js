import { PostFromData, Post, Get } from '@/api/axios.config'

const LoginAjax = {
  Login (params) {
    // 登录
    let result = PostFromData('/crm/auth/login', params)
    return result
  },
  updatePsd (params) {
    // 修改密码
    let result = Post('/crm/auth/password/update', params)
    return result
  },
  QueryUserState (params) {
    // 用户开通状态查询
    let result = Get('finance/register/queryFundAccountRegisterStatus', params)
    return result
  }
}

export default LoginAjax
