# learn-node

- blog-node 使用原生 `node`

- blog-express 使用 `express`

- ~~blog-koa 使用 `koa`~~

## 工具

`nodemon` 监测文件变化

`cross-env` 设置环境变量

使用 Linux 的 crontab 执行定时任务


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

## redis

启动 redis：进入安装目录执行 `redis-server.exe`

另外开启一个 cmd 窗口，执行 `redis-cli`

## nginx 本地配置代理

我们需要在本地同时启动前端页面和接口，但是由于系统限制无法在同一接口启用，因此需要使用 nginx 反向代理。

前端页面可以使用 `http-server -p 8080` 启动，接口用 node 服务，接口为 4396。

下载好 nginx 后打开安装目录下的 conf/nginx.conf 文件，做如下修改：

```
#user  nobody;
# 工作的进程数
worker_processes  1;

# ...

#location / {
#    root   html;
#    index  index.html index.htm;
#}

server {
  # 要监听的端口
  listen  80;

  # 设置代理
  location / {
    proxy_pass http://localhost:8080;
  }
  location /api/ {
    proxy_pass http://localhost:4396;
    proxy_set_header Host $host;
  }
}

# ...
```

意思就是将本地 8080 端口代理到 80，将本地 4396 端口下的 /api/ 代理到 80。

修改成功后保存，在 nginx 安装目录执行 `./nginx.exe` 启动服务即可。

浏览器中输入 localhost 应该可访问前端页面和调用接口了。

## pm2 

常用命令

pm2 start <appFile> 启动

pm2 list 列表

pm2 restart <appName>/<id> 重新启动

pm2 stop <appName>/<id> 停止

pm2 delete <appName>/<id> 删除

pm2 info <appName>/<id> 进程信息

pm2 log <appName>/<id> 进程日志

pm2 monit <appName>/<id> 监视进程
