import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/Utils'
import User from '../model/User'
import moment from 'dayjs'

class UserController {
  // 用户签到接口
  async userSign (ctx) {
    // 取用户ID
    const obj = await getJWTPayload(ctx.header.authorization)
    // 查询用户上一次签到记录
    const record = await SignRecord.findByUid(obj._id)
    // const user = await User.findById(obj._id)
    let newRecord = {}
    let result = ''
    // 判断签到逻辑
    if (record !== null) {
      // 有历史的签到数据
      // 判断用户上一次签到记录的created时间是否与今天相同
      // 如果相同，代表用户是在连续签到
      // 如果当前时间的日期与用户上一次的签到日期相同，说明用户已经签到
    } else {
      // 无签到数据
      await User.updateOne({
        _id: obj._id
      }, {
        $set: { count: 1 },
        $inc: { favs: 5 }
      })
      // 保存用户的签到记录
      newRecord = new SignRecord({
        uid: obj._id,
        favs: 5,
        lastSign: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      await newRecord.save()
      result = {
        favs: 5,
        count: 1
      }
    }
    ctx.body = {
      code: 200,
      msg: '请求成功',
      ...result
    }
  }
}

export default new UserController()