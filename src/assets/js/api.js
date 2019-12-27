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
	getAdress: 'user/shipping-address/list'
}

export default url