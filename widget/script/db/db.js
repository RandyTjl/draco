document.write("<script language=javascript src='/script/config.js'></script>");

var db = api.require('db');
var dbName = config['db_name'];
//打开数据库
function openDb(db_name){
	if(db_name == '' || db_name == undefined ){
        db_name = dbName
	}
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
 function closeDb(db_name){
     if(db_name == '' || db_name == undefined ){
         db_name = dbName
     }
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

/**
 *数据库事务
 * @param name 数据库名称
 * @param operation	事务操作类型，取值范围如下：begin //开始事务 commit //提交事务 rollback //回滚操作
 */
 function transaction(db_name,operation){
    if(db_name == '' || db_name == undefined ){
        db_name = dbName
    }
	db.transaction({
		name: db_name,
		operation: operation
	}, function(ret, err) {
		if (ret.status) {
			alert(JSON.stringify(ret));
		} else {
			alert(JSON.stringify(err));
		}
	});
 }

/**
 * 数据库执行语句
 * @param db_name 数据库名字
 * @param sql sql语句
 */
 function executeSql(db_name,sql) {
     if(db_name == '' || db_name == undefined ){
         db_name = dbName
     }
     db.executeSql({
         name: db_name,
         sql: sql
     }, function(ret, err) {
         if (ret.status) {
             alert(JSON.stringify(ret));
         } else {
             alert(JSON.stringify(err));
         }
     });
 }

/**
 * 数据库查找
 * @param db_name
 * @param table_name 表名
 * @param where 查询条件array
 * @param order	排序条件array
 * @param filed	查询值
 * @returns {string}
 */
function selectSql(db_name,table_name,where,order,filed) {
	var sql = 'select '
    if(db_name == '' || db_name == undefined ){
        db_name = dbName
    }
    if(!table_name){
		return "数据表名不能为空";
	}
	if(filed){
        sql += filed+" from ";
	}else{
		sql += "* from ";
	}
	sql += table_name;
	if(where){
		var j =0
		sql += "where ";
		$.each(where,function (i,val) {
			if(j==0){
                sql += i+"="+val;
            }else{
                sql += " and "+i+"="+val;
            }
        })
	}
	if(order){
		var j = 0;
        sql += "order by ";
        $.each(order,function (i,val) {
            if(j==0){
                sql += i+" "+val;
            }else{
                sql += ","+i+"="+val;
            }
        })

	}

    db.selectSql({
        name: db_name,
        sql: sql
    }, function(ret, err) {
        if (ret.status) {
            return ret.data;
        } else {
            alert(JSON.stringify(err));
        }
    });
}

/**
 * 开启数据同步(即数据库长连接)
 * @param db_name
 */
function openDatabaseSync(db_name) {
    if(db_name == '' || db_name == undefined ){
        db_name = dbName
    }
    var ret = db.openDatabaseSync({
        name: db_name
    });
    if(!ret.status){
        alert(ret.msg);
	}
}

/**
 *关闭数据同步
 * @param db_name
 */
function closeDatabaseSync(db_name) {
    if(db_name == '' || db_name == undefined ){
        db_name = dbName
    }
    var ret = db.closeDatabaseSync({
        name: db_name
    });
    if(!ret.status){
        alert(ret.msg);
    }
}

/**
 * 数据库事务
 * @param db_name
 * @param operation描述：事务操作类型，取值范围如下：begin //开始事务 commit //提交事务 rollback //回滚操作
 */
function transactionSync(db_name,operation) {
    if(db_name == '' || db_name == undefined ){
        db_name = dbName
    }
    var ret = db.transactionSync({
        name: db_name,
        operation: operation
    });
    if(!ret.status){
        alert(ret.msg);
    }
}

/**
 * 执行sql语句
 * @param db_name
 * @param sql
 */
function executeSqlSync(db_name,sql) {
    if(db_name == '' || db_name == undefined ){
        db_name = dbName
    }
    var ret = db.executeSqlSync({
        name: db_name,
        sql: sql
    });
    if(!ret.status){
        alert(JSON.stringify(ret));
    }
}

/**
 * 数据库查找
 * @param db_name
 * @param table_name 表名
 * @param where 查询条件array
 * @param order	排序条件array
 * @param filed	查询值
 * @returns {string}
 */
function selectSqlSync(db_name,table_name,where,order,filed) {
    var sql = 'select '
    if(db_name == '' || db_name == undefined ){
        db_name = dbName
    }
    if(!table_name){
        return "数据表名不能为空";
    }
    if(filed){
        sql += filed+" from ";
    }else{
        sql += "* from ";
    }
    sql += table_name;
    if(where){
        var j =0
        sql += "where ";
        $.each(where,function (i,val) {
            if(j==0){
                sql += i+"="+val;
            }else{
                sql += " and "+i+"="+val;
            }
        })
    }
    if(order){
        var j = 0;
        sql += "order by ";
        $.each(order,function (i,val) {
            if(j==0){
                sql += i+" "+val;
            }else{
                sql += ","+i+"="+val;
            }
        })

    }
    var ret = db.selectSqlSync({
        name: db_name,
        sql: sql
    });
    if(!ret.status){
        alert(JSON.stringify(ret));
    }else{
    	return ret.data;
	}
}
 


