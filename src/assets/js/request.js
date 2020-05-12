import http from './http.js'
import api from './api.js'
// 请求方法
const methods = {
	banner: params => http.get(api.banner, params),
	// 商品分类
	category: params => http.get(api.category, params),
	// 商品列表
	shopList: params => http.post(api.shopList,params),
	// 商品详情
	shopDetail: params => http.get(api.shopDetail,params),
	// 获取价格
	getPrice: params => http.post(api.getPrice,params),
	// 获取运费模板
	getlogistics: params => http.get(api.getlogistics, params),
	// 文件上传
	uploadFile: params => http.file(api.uploadFile, params),
	// 获取评论
	getReputation: params => http.post(api.getReputation, params),
	// 加入购物车
	addCart: params => http.post(api.addCart, params),
	// 读取购物车数据
	getCartInfo: params => http.get(api.getCartInfo, params),
	// 修改购物车购买数量
	cartNumber: params => http.post(api.cartNumber, params),
	// 删除购物车一条数据
	removeCart: params => http.post(api.removeCart, params),
	// 清空购物车
	emptyCart: params => http.post(api.emptyCart, params),
	// 可领取的优惠券列表
	discountsList: params => http.get(api.discountsList, params),
	// 领取优惠券
	discountsFetch: params => http.post(api.discountsFetch, params),
	// 我的优惠券
	myDiscounts: params => http.get(api.myDiscounts, params),
	// 下单
	creatOrder: params => http.post(api.creatOrder, params),
	// 获取订单列表
	orderList: params => http.post(api.orderList, params),
	// 订单详情
	orderDetail: params => http.get(api.orderDetail, params),
	// 取消订单
	closeOrder: params => http.post(api.closeOrder, params),
	// 删除订单
	deleteOrder: params => http.post(api.deleteOrder, params),
	// 申请售后
	refundApply: params => http.post(api.refundApply, params),
	// 订单统计
	orderStatistics: params => http.get(api.orderStatistics, params),
	// 确认收货
	orderDelivery: params => http.post(api.orderDelivery, params),
	// 发布评价
	orderReputation: params => http.post(api.orderReputation, params),
	// 登录模块
	// 获取验证码
	getSms: params => http.get(api.getSms, params),
	// 校验验证码
	checkSms: params => http.post(api.checkSms, params),
	// 用户注册（手机）
	userRegister: params => http.post(api.userRegister, params),
	// 用户登录token
	login: params => http.post(api.login, params),
	//用户详情
	userDetail: params => http.get(api.userDetail, params),
	userModify: params => http.post(api.userModify, params),
	// 修改密码
	resetPwd: params => http.post(api.resetPwd, params),
	// 用户地址列表
	getAddress: params => http.get(api.getAddress, params),
	// 添加地址
	addAddress: params => http.post(api.addAddress, params),
	//地址详情
	addressDetail: params => http.get(api.addressDetail, params),
	// 删除地址
	delAddress: params => http.post(api.delAddress, params),
	// 修改地址
	updateAddress: params => http.post(api.updateAddress, params),
	// 默认地址
	defaultAddress: params => http.get(api.defaultAddress, params),
	// 验证码
	getPic: params => http.pic(api.getPic, params),
	checkPic: params => http.post(api.checkPic, params),
	partner: params => http.post(api.partner, params),
}
export default methods