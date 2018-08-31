document.write("<script language=javascript src='./script/config.js'></script>");
document.write("<script language=javascript src='./script/api.js'></script>");

//获得随机整数
function getRandnum(n,m){
		var c = m-n+1;
		return Math.floor(Math.random()*c+n);
}
//返回到指定页面
function returnWin(win_name){
	//如果存在返回页面则返回到指定页面，否则返回到上一页
	if(win_name){
		api.closeToWin({
				name: win_name
		});
	}else{
		api.closeWin();
	}
}

//版本更新
function fnCheckUpdate () {
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err){
        if (ret && ret.status) {
            if(!ret.result.update){
                api.alert({
                    title: '版本更新',
                    msg: '当前已是最新版本，版本号：' + api.appVersion
                });
            } else {
                api.confirm({
                    title: '有新版本',
                    msg: '已发布最新版本，建议您尽快更新。版本号：' + ret.result.version,
                    buttons:['马上更新', '以后再说']
                },function(ret,err){
                    if(ret.buttonIndex == 1){
                        alert('点击了马上更新');
                    }
                });
            }
        }
    });
}

/**
 * form方式提交
 * @param url
 * @param method
 * @param data
 */
function ajaxForm(url,method,data,callback) {
	url = config['url']+url;
	headers = {
        "apiToken":$api.getStorage("apiToken")
    };
    api.ajax({
        url: url,
        method: method,
        headers:headers,
        data:data,
    }, function(ret) {
        api.alert({ title: '操作失败', msg:JSON.stringify(ret) });
        if(ret.status){
            callback(ret);
        }else{
            api.alert({ title: '操作失败', msg:ret.message });
        }
    });
}

/**
 *
 * @param url
 * @param method
 * @param data
 * @param callback
 */
function ajaxJson(url,method,data,callback) {
    // 提交JSON数据
    url = config['url']+url;
    headers = {
        "apiToken":$api.getStorage("apiToken"),
        'Content-Type': 'application/json;charset=utf-8'
    };
    api.ajax({
        url: url,
        method: 'post',
        headers: headers,
        data: data
    }, function(ret, err) {
        if(ret.statusCode){
            callback(ret);
        }else{
            api.alert({ title: '操作失败', msg:ret.message});
        }
    });
}

/**
 * 获得apiToken用于首页判断
 */
function getApiToken() {
    apiToken = $api.getStorage("apiToken");
    if(apiToken == '' || apiToken == undefined){
       return false;
    }
    return apiToken;
}

/**
 * 打开首页
 */
function fnOpenMain(url) {
    if(url == ''){
        url = './html/main.html';
    }
    api.openWin({
        name: 'main',
        url: url,
        bounces: false,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false,
        slidBackEnabled: false
    });
};

/**
 * 打开登录页
 */
function fnOpenLogin() {
    api.openWin({
        name: 'login_header',
        url: './html/login_header.html',
        pageParam: {
            name: 'login',
            url: './login.html',
            title: '登录'
        }
    })
}

