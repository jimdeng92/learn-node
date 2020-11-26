# learn-node

- blog-1 使用原生 `node`

- blog-2 使用 `express`

- blog-3 使用 `koa`

`nodemon` 监测文件变化

`cross-env` 设置环境变量


## 常用 SQL 语句

### 基本操作

``` sql
-- 查看版本
select version();
-- 使用数据库
user myblog;
-- 查看表
show tables;
```

### 插入

特殊字段是 SQL 关键字的（如下面语句的 password）使用反引号。

``` sql
insert into users (username, `password`, realname) values ('zhangsan', 123, '张三')
```

### 查询

``` sql
-- * 表示全部，两条短横线注释语句。
select * from users;
-- 一般不使用 * 号直接查询。
select id, username from users;
-- 模糊查询关键字：like，搭配 %% 使用
select * from users where password like '%1%';
-- 排序关键字：order by ，反向排序关键字：desc。
select * from users where password like '%1%' order by id desc;
-- 不相等查询
select * from users where username <> '0';
```

### 更新

``` sql
update users set realname='李四2' where username='lisi';
-- 上述语句报错可执行这个命令解决。
SET SQL_SAFE_UPDATES=0;
```

### 删除

``` sql
-- 一般不使用 delete，而使用软删除。
delete from users where username='lisi';

update users set state='0' where username='lisi';
```

### 在 Node 中使用 MySql

``` js
const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  prot: '3306',
  database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
const sql = `select * from users;`
con.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result)
})
```
