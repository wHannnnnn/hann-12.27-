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
	// 加入购物车
	addCart: 'shopping-cart/add',
	// 读取购物车数据
	getCartInfo: 'shopping-cart/info',
	// 修改购物车购买数量
	cartNumber: 'shopping-cart/modifyNumber',
	// 删除购物车一条数据
	removeCart: 'shopping-cart/remove',
	// 清空购物车
	emptyCartL: 'shopping-cart/empty',
	// 创建订单
	creatOrder: 'order/create',
	// 订单列表
	orderList: 'order/list',
	// 订单详情
	orderDetail: 'order/detail',
	// 可领取的优惠券列表
	discountsList: 'discounts/coupons',
	// 领取优惠券
	discountsFetch: 'discounts/fetch',

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
	updateAddress: 'user/shipping-address/update',
	// 默认地址
	defaultAddress: 'user/shipping-address/default/v2'

}

export default url