document.write("<script language=javascript src='/script/config.js'></script>");

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
    api.ajax({
        url: url,
        method: method,
        data: data
    }, function(ret, err) {
    	if(callback){
    		callback(ret,err);
		}else{
            if (ret) {
                api.alert({ msg: JSON.stringify(ret) });
            } else {
                api.alert({ msg: JSON.stringify(err) });
            }
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
    api.ajax({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            body: {
                name: 'haha'
            }
        }
    }, function(ret, err) {
        if (ret) {
            api.alert({ msg: JSON.stringify(ret) });
        } else {
            api.alert({ msg: JSON.stringify(err) });
        }
    });
}

