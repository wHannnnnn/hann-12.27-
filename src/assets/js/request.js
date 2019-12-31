import http from './http.js'
import api from './api.js'
// 请求方法
const methods = {
	// 商品列表
	shopList: (params) => {
		return http.post(api.shopList,params)
	},
	// 商品详情
	shopDetail: (params) => {
		return http.get(api.shopDetail,params)
	},
	// 获取价格
	getPrice: (params) => {
		return http.post(api.getPrice,params)
	},
	// 获取运费模板
	getlogistics: (params) => {
		return http.get(api.getlogistics, params)
	},
	// 获取评论
	getReputation: (params) => {
		return http.post(api.getReputation, params)
	},
	// 加入购物车
	addCart: (params) => {
		return http.post(api.addCart, params)
	},
	// 读取购物车数据
	getCartInfo: (params) => {
		return http.get(api.getCartInfo, params)
	},
	// 修改购物车购买数量
	cartNumber: (params) => {
		return http.post(api.cartNumber, params)
	},
	// 删除购物车一条数据
	removeCart: (params) => {
		return http.post(api.removeCart, params)
	},
	// 清空购物车
	emptyCart: (params) => {
		return http.post(api.emptyCart, params)
	},
	// 下单
	creatOrder: (params) => {
		return http.post(api.creatOrder, params)
	},

	// 登录模块
	// 获取验证码
	getSms: (params) => {
		return http.get(api.getSms, params)
	},
	// 用户注册（手机）
	userRegister: (params) => {
		return http.post(api.userRegister, params)
	},
	// 用户登录token
	login: (params) => {
		return http.post(api.login, params)
	},
	//用户详情
	userDetail: (params) => {
		return http.get(api.userDetail, params)
	},
	// 用户地址列表
	getAddress: (params) => {
		return http.get(api.getAddress, params)
	},
	// 添加地址
	addAddress: (params) => {
		return http.post(api.addAddress, params)
	},
	//地址详情
	addressDetail: (params) => {
		return http.get(api.addressDetail, params)
	},
	// 删除地址
	delAddress: (params) => {
		return http.post(api.delAddress, params)
	},
	// 修改地址
	updateAddress: (params) => {
		return http.post(api.updateAddress, params)
	},
	// 默认地址
	defaultAddress: (params) => {
		return http.get(api.defaultAddress, params)
	},

}
export default methods