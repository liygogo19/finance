/**
 * Created by liyang on 2017/4/17.
 */



var api_params={
    //base_url:"http://api.finance-self.dev/m1/",
    base_url:"http://api.agent.zhaofangroup.com/m1/",
    access_token_key:"finance",
    token_key_prefix:'Finace ',
    //update
    update_info:'agent/index',
    log_in:'agent/login',
    log_out:'agent/logout',
    get_captcha:'agent/captcha',
    for_captcha:'agent/captcha',
    request_sms_code:'agent/request-sms-code',
    before_register:'agent/before-register',
    register:'agent/register',
    reshuffle_password:'agent/reshuffle-password',
    edit_information:'agent/edit',
    config:'config',
    register_leader:'agent/show-leader-link',
    register_agent_leader:'agent/show-leader-to-agent-link',
    register_agent:'agent/show-link',
    //order
    add_order:'order/add',
    edit_order:'order/edit',
    get_order:'order/list',
    get_agents_order:'order/list-by-store',
    order_detail:'order/detail',
    //store
    store_list:'store/list',
    add_store:'store/add',
    store_detail:'store/store-achievement',
    edit_store:'store/edit',
    delete_store:'store/delete',
    person_achievment:'store/person-achievement',
    person_monthly_achievment:'store/person-statistics-by-month',
    person_five_month_achievment:'store/person-statistics-five-month',
    company_achievment:'store/company-achievement',
    company_monthly_achievment:'store/company-statistics-by-month',
    company_five_month_achievment:'store/company-statistics-five-month',
    store_achievment:'store/store-achievement',
    store_monthly_achievment:'store/store-statistics-by-month',
    store_five_month_achievment:'store/store-statistics-five-month',
    get_agents:'agent/list',
    delete_agents:'store/agent-delete',
    agent_detail:'store/person-achievement',
    change_manager:'store/change-manager',
    //achievement
    store_total_achievment:'store/manager-store-statistics-five-month',
}

module.exports = api_params;