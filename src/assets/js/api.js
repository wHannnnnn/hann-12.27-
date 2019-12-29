// 接口
const url = {
	// 商品列表
	shopList: 'shop/goods/list',
	// 商品详情
	shopDetail: 'shop/goods/detail',
	// 获取价格库存
	getPrice: 'shop/goods/price',
	// 获取运费模板
	getlogistics: 'shop/goods/price/freight',
	// 获取评论列表
	getReputation: 'shop/goods/reputation',


	// 登录模块
	// 获取短信验证码
	getSms: 'verification/sms/get',
	// 用户注册（手机号）
	userRegister: 'user/m/register',
	// 用户登录token
	login: 'user/m/login',
	//获取用户详情
	userDetail: 'user/detail',
	// 获取地址列表
	getAddress: 'user/shipping-address/list',
	// 添加收货地址
	addAddress: 'user/shipping-address/add',
	// 获取地址详情
	addressDetail: 'user/shipping-address/detail/v2',
	// 删除地址
	delAddress: 'user/shipping-address/delete',
	// 修改地址
	updateAddress: 'user/shipping-address/update'
}

export default url