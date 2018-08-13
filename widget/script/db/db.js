document.write(”<script language=javascript src='/script/config.js'><\/script>”);

var db = api.require('db');

//打开数据库
function openDb(db_name){
	db.openDatabase({
		name: db_name
	}, function(ret, err) {
		if (ret.status) {
			alert(JSON.stringify(ret));
		} else {
			alert(JSON.stringify(err));
		}
	});
}

//关闭数据库
 function closeDb(){
	 db.closeDatabase({
		name: db_name
	}, function(ret, err) {
		if (ret.status) {
			alert(JSON.stringify(ret));
		} else {
			alert(JSON.stringify(err));
		}
	});
 }
 
 function transaction(){
	 
 }
 


