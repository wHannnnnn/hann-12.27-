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
	// 用户列表
	getAdress: (params) => {
		return http.get(api.getAdress, params)
	},
}
export default methods