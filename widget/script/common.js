
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
