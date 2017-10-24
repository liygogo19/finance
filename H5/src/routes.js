export default [
    {
        path: '/index/',
        component: require('./app.vue')
    },{
        path: '/demo/',
        component: require('./pages/demo.vue')
    },
    {
        path: '/login/',
        component: require('./pages/login/login.vue')
    },
    {
        path: '/forget/password/',
        component: require('./pages/login/forgetPsd.vue')
    },
    {
        path: '/demo/',
        component: require('./pages/demo.vue')
    },
    //lee
    {
        path: '/signup/normal/:leader_ref',
        component: require('./pages/login/registerNormal.vue')
    },
    {
        path: '/signup/employee/:agent_ref',
        component: require('./pages/login/registerEmployee.vue')
    },
    {
        path: '/signup/manager/:manager_ref',
        component: require('./pages/login/registerManager.vue')
    },
    {
        path: '/signup/success/',
        component: require('./pages/login/registerSuccess.vue')
    },
    // B part
    {
        path: '/order/add_order/',
        component: require('./pages/order/add_order.vue')
    },
    {
        path: '/order/order_fail/',
        component: require('./pages/order/order_fail.vue')
    },
    {
        path: '/order/order_success/',
        component: require('./pages/order/order_success.vue')
    },
    {
        path: '/order/seller-information/',
        component: require('./pages/order/seller-information.vue')
    },
    {
        path: '/order/property-information/',
        component: require('./pages/order/property-information.vue')
    },
    {
        path: '/order/buyer-information/',
        component: require('./pages/order/buyer-information.vue')
    },
    // C part
    {
        path: '/account/profile/',
        component: require('./pages/account/profile.vue')
    },{
        path: '/order/company_performance/',
        component: require('./pages/order/company_performance.vue')
    },{
        path: '/order/personal_performance/',
        component: require('./pages/order/personal_performance.vue')
    },{
        path: '/info/seller-information/',
        component: require('./pages/info/seller-information.vue')
    },{
        path: '/info/property-information/',
        component: require('./pages/info/property-information.vue')
    },{
        path: '/info/buyer-information/',
        component: require('./pages/info/buyer-information.vue')
    },{
        path: '/store/my-store/',
        component: require('./pages/store/my-store.vue')
    },{
        path: '/store/my-store-shopowner/',
        component: require('./pages/store/my-store-shopowner.vue')
    },{
        path: '/store/store-information/',
        component: require('./pages/store/store-information.vue')
    },{
        path: '/store/edit-store/:postId',
        component: require('./pages/store/edit-store.vue')
    },{
        path: '/store/store-details/:postId',
        component: require('./pages/store/store-details.vue')
    },
    {
        path: '/account/index/',
        component: require('./pages/account/index.vue')
    },
    {
        path: '/account/edit/name/',
        component: require('./pages/account/editName.vue')
    },
    {
        path: '/account/edit/phone/',
        component: require('./pages/account/editPhone.vue')
    },
    {
        path: '/account/edit/password/',
        component: require('./pages/account/editPsd.vue')
    },
    {
        path: '/account/myOrders/',
        component: require('./pages/account/myOrders.vue')
    },
    {
        path: '/account/employeeOrders/',
        component: require('./pages/account/employeeOrders.vue')
    },
    {
        path: '/account/employeeOrders/:storeId',
        component: require('./pages/account/employeeOrders.vue')
    },
    {
        path: '/account/mySalesmans/',
        component: require('./pages/account/mySalesmans.vue')
    },
    {
        path: '/order/detail/:orderId',
        component: require('./pages/account/orderDetail.vue')
    },
    {
        path: '/salesman/detail/:storeId/:agentId',
        component: require('./pages/account/salesmanDetail.vue')
    },{
        path: '/invite/invite-friends/',
        component: require('./pages/invite/invite-friends.vue')
    },{
        path: '/invite/invite-friends-boss/',
        component: require('./pages/invite/invite-friends-boss.vue')
    },{
        path: '/invite/invite-friends-salesman/',
        component: require('./pages/invite/invite-friends-salesman.vue')
    },{
        path: '/test/',
        component: require('./pages/test.vue')
    },
]