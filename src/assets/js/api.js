// 接口
const url = {
	// 分类列表
	category: 'shop/goods/category/all',
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
	// 可领取的优惠券列表
	discountsList: 'discounts/coupons',
	// 领取优惠券
	discountsFetch: 'discounts/fetch',
	// 我的优惠券
	myDiscounts: '/discounts/my',
	// 创建订单
	creatOrder: 'order/create',
	// 订单列表
	orderList: 'order/list',
	// 订单详情
	orderDetail: 'order/detail',
	// 取消订单
	closeOrder: 'order/close',
	// 删除订单
	deleteOrder: 'order/delete',
	// 申请售后
	refundApply: 'order/refundApply/apply',
	// 订单统计
	orderStatistics: 'order/statistics',
	// 确认收货
	orderDelivery: 'order/delivery',
	// 上传图片至服务器
	uploadFile: 'dfs/upload/file',
	// 发布评价
	orderReputation: 'order/reputation',
	// 登录模块
	// 获取短信验证码
	getSms: 'verification/sms/get',
	// 获取图形验证码
	getPic: 'verification/pic/get',
	// 校验验证码
	checkSms: 'verification/sms/check',
	// 校验图形验证码
	checkPic: 'verification/pic/check',
	// 用户注册（手机号）
	userRegister: 'user/m/register',
	// 修改用户信息
	userModify: 'user/modify',
	
	// 修改密码
	resetPwd: 'user/m/reset-pwd',
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
	defaultAddress: 'user/shipping-address/default/v2',

}

export default url