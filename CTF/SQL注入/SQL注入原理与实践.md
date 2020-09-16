# SQL注入的原理与实践

[TOC]

## SQL注入原理

SQL注入攻击指的是通过构建特殊的输入作为参数传入Web应用程序，而这些输入大都是SQL语法里的一些组合，通过执行SQL语句进而执行攻击者所要的操作，其主要原因是程序没有细致地过滤用户输入的数据，致使非法数据侵入系统。

### 手工注入思路

1.判断是否存在注入，注入是字符型还是数字型

2.猜解SQL查询语句中的字段数

3.确定显示的字段顺序

4.获取当前数据库

5.获取数据库中的表

6.获取表中的字段名

7.下载数据



## SQL注入步骤

### 一、源码分析

```
<?php
    header("Content-type: text/html; charset=utf-8");

    $link = @mysql_connect('127.0.0.1', 'root', '');  // 连接数据库
    mysql_select_db('sqli');    // 选择默认数据库为sqli
    mysql_set_charset('utf8');  // 设置编码为utf8

    if(!isset($_GET['id'])){
        header("Location: sqli-1.php?id=1");    // 如果没有传参，则重定向到这个页面，也就是如果没有传参，默认传参数id=1
    }

    $id = $_GET['id'];  // 获取用户提交的id参数的值
 	$sql = "select * from `new` where id = " . $id; // 拼接SQL语句，由于直接获取用户的输入后，没有任何处理，存在SQL注入
    $result = mysql_query($sql);
    while($row = mysql_fetch_array($result, MYSQL_ASSOC)){  // 遍历输出查询结果，MYSQL_ASSOC表示						mysql_fetch_array返回的结果格式为关联数组形式，即可以使用数据库中的字段作为索引获取值。
        echo '<h2>' . $row['title'] . '</h2>';
        echo '<p>' . $row['content'] . '</p>';
}
```

1. 代码已经写了注释，如果没有给这个页面传参数，则默认传一个id参数，它的值为1。

2. 在13行，获取到用户传过来的参数后，直接进入了SQL语句，带进了查询语句，没有任何其他操作，很明显的存在SQL注入。

3. 在sql语句中，new被反引号包起来了。

   **PS：**反引号为了区分MYSQL的保留字与普通字符而引入的符号。
   		举个例子：SELECT `select` FROM \`test\` WHERE select=’字段值’
      	 在test表中，有个select字段，如果不用反引号，MYSQL将把select视为保留字而导致出错，所以，有MYSQL保留字作为字段的，必须加上反引号来区分。

### 二、注入点判断

1. **单引号判断**

   判断网站是否存在注入点最常见的是加单引号，即“ **‘** ’“，如果不加单引号页面显示正常，而加了单引号以后，页面显示不正常或者错误，则说明网页存在SQL注入。

   <img src="image\1.png" style="zoom: 67%;" />

   先在URL后面加一个单引号，可以看到页面报错了，这个警告的意思是：`mysql_fetch_array()`这个函数第一个参数期望的参数类型是一个资源集，但是给的是一个布尔值，出现该警告的位置在代码的第15行。

   查看代码，发现它的第一个参数`$result`这个参数的值来自第14行，它是`mysql_query()`执行后的返回值。

   <img src="image\headImg.png" style="zoom:80%;" />

   查看php官方手册，可以看到`mysql_query()`在查询出错的情况下会返回false，还有一种情况就是在没有权限访问查询语句中引用的表的时候，也会返回false。

   <img src="image/2.png" alt="img" style="zoom:80%;" />

   这里明显不会是第二种情况，因为我们没有输入单引号的时候，能正常查询，而我们又没有修改查询的表，所以排除这种情况。所以可能就是前面的语句在MySQL里执行出错了，于是返回了false，这说明我们传进去的参数`1’`破坏了SQL语句，我们可以稍微修改下代码，在第14行后面输出一下当前执行的sql语句。修改后的代码如下：

   <img src="image/3.png" alt="img" style="zoom:80%;" />

   然后再次访问页面，输出了数据库最终执行的SQL语句，为：`select * from new where id = 1'`，该SQL语句有错误，因为如果单引号或者双引号不是出现在字符串中的时候，单引号、双引号都是成对出现的，SQL数据库将单引号解析成代码与数据间的分界线，在单引号外面的内容是需要运行的代码，而单引号引起来的内容都是数据。

   <img src="image\5.png" style="zoom:80%;" />

   通过添加**单引号**来判断页面是否存在SQL注入，是因为我们添加的单引号被传到了SQL语句中，破坏了原本的SQL语句，还造成了语法错误，所以SQL语句执行，页面返回跟正常的时候会有不同。

2. **`and 1=1`和`and 1=2` 判断**

   还有一种就是如果加**`and 1=1`** 页面显示正常，加**`and 1=2`**页面不正常或者错误，同样说明存在SQL注入。

   首先传个 `1 and 1=1`，页面显示正常，而且最终执行的SQL语句是: `select * from new where id = 1 and 1=1`

   <img src="image\8.png" style="zoom:80%;" />

   再次尝试`1 and 1=2`，页面除了输出最终执行的SQL页面，没有其他任何输出。

   ![img](image\7.png)

   这里SQL语句执行并没有出错，问题出在`and 1=2`上，where指查询满足后面的数据，也就是说需要查找`id = 1`的数据，并且需要 `1=2`，但是`1=2`这是用于不可能满足的。所以，这个语句被数据库准确无误地执行了，但是它并没有找到符合条件的数据，所以没有任何数据输出。而前面加 `1 and 1=1`能正常返回数据，是因为`1=1`这个永远为真，所以这个条件可以说是跟没加一样。

   当然这**只能大概判断**，而**不是说明该页面一定存在注入**。

3. `or 1=1`

   那万能密码又是怎么回事呢？ 网上找到的万能密码都是类似’ or 1=1这种，为什么输入这个字符串就可以绕过登录了呢？ 我们也用or 1=1试试，看在这个页面提交这个值是什么效果。

   访问`http://sqli.com/sqli-1.php?id=1 or 1=1`

![img](image\9.png)

   最终执行的SQL语句是：`select * from new where id = 1 or 1=1`。

   它这里只要满足`id =1` 或者`1=1`任意一个条件，而`1=1`永远为真，所以返回了所有的数据，其效果与`select * from new`一样。

### 三、联合查询：`union`

`union`可以**合并两条或者多条select语句**的查询结果，它的语法如下：

`Select column-1,column-2,…,column-N from table-1 union select column-1,column-2,…,column-N from table-2`

它的返回值是两个select语句查询结果组成的表。我们可以通过在第一个查询后面注入一个union运算符，并添加另外一个任意查询，就可以读取到数据库中用户可以访问的任何表。但是，使用union有一些限制：

1. 两个查询返回的列数必须相同。
2. 两个select语句对应列所返回的数据类型必须是相同或者是兼容的。

  两个查询返回的列数必须相同时什么意思呢？

  是指当前的两个select 他们查询的列的个数必须一致，如果第一个select查询了5列，则第二个select也必须查询5列。

  如：`select title, content from new union select username, password from user`;

  像上面的查询，列数相同，会返回这2个查询的结果集。

### 四、查询表中列的数量：`order by`

我们这里重点关注怎么知道查询中列的数量，代码中，写的是`select * from new`，直接在代码中看不出来`new`这个表中有多少列，而需要去查看建表语句，而在实际应用中，除非是开源的CMS，否则你不可能准确知道它查询了多少列，这就需要我们想个办法来获取当前查询的列数。

一个简单的办法是通过`order by` 子句来确定。`Order by` 是根据指定的列名进行排序。

`Order by` 子句可以接受一个列名作为参数，也可以接受一个简单的、能表示特定列的数字，所以可以通过增大`order by` 子句中代表列的数字来识别查询中的列数。

访问`http://sqli.com/sqli-1.php?id=1 order by 1`，页面正常。

访问`http://sqli.com/sqli-1.php?id=1 order by 2`，页面正常。

访问`http://sqli.com/sqli-1.php?id=1 order by 3`，页面正常。

访问`http://sqli.com/sqli-1.php?id=1 order by 4`，页面错误。

则可以确定表中共有3列。

### 五、确定列的输出位置

根据`union`的语法，构造注入语句。

通过前面的测试已经知道这个查询一共查询了3列，在符合`union`操作符的前提下，可以构造如下语句：

访问`http://sqli.com/sqli-1.php?id=1 union select “test”,”test2”,”test3”`

  ![img](https://www.hetianlab.com/headImg.action?guideImg=GBee9320adea6e062017111714221600001/acb41ebb-cd2e-422b-837a-625d6578af88.png)

在第二个`select`中，如果该列被原样输出了，说明在该列可以用来获取信息，

通过上面的方法确定输出位置以后，我们就可以用来获取数据啦！

我们可以执行一些数据库函数，如：执行`database()`来查看当前数据库，执行`user()`来查看当前连接数据库的用户。

<img src="image\10.png" alt="img" style="zoom: 80%;" />

我们的目标是获取`user`表中的用户名和密码，查看sql.sql文件，可以看到`user`表中存在`username, password`字段

![img](image\11.png)

所以就可以构造如下语句：

`http://sqli.com/sqli-1.php?id=1 union select null, username, password from user`

<img src="image\12.png" alt="img" style="zoom:80%;" />

这样就获取了user表中所有的用户名和密码。

### 六、爆破数据库字段：`information_schema`

如何在不知道建表语句的情况下，通过注入来获取当前连接数据库的账号所有有权限访问的数据库名、表名以及字段呢？

这就需要了解mysql数据库的`information_schema` 这个数据库了。

 `information_schema`数据库是MySQL自带的，MySQL 5以下没有这个数据库，它提供了访问数据库元数据的方式。

什么是元数据呢？元数据是关于数据的数据，如数据库名或表名，列的数据类型，或访问权限等。也就是说`information_schema`中保存着关于MySQL服务器所维护的所有其他数据库的信息。如**数据库名，数据库的表，表栏的数据类型与访问权限**等。在`INFORMATION_SCHEMA`中，有数个只读表。

在SQL注入中，我们重点关注的表有如下几个，因为主要的时候主要利用这几个表来**获取数据**：

- **`SCHEMATA`：**提供了当前mysql数据库中所有数据库的信息，其中**`SCHEMA_NAME`字段**保存了所有的**数据库名**。`show databases`的结果取自此表。

-  **`TABLES`：**提供了关于数据库中的表的信息，详细表述了某个表属于哪个`schema`，表类型，表引擎，创建时间等信息，其中**`table_name`字段**保存了所有列名信息，**`show tables from schemaname`**的结果取自此表。

-  **`COLUMNS`：**提供了表中的列信息。详细表述了某张表的所有列以及每个列的信息，其中**`column_name`**保存了所有的**字段**信息。**`show columns from schemaname.tablename`**的结果取自此表。

1. **获取数据库名**

   `select schema_name from schemata` 

   `select schema_name from information_schema.schemata limit 0,1` 

   在注入中，我们可以通过注入`select schema_name from schemata` 来查询的**当前数据库中所有的数据库名**，如果去查看一些爆数据库名的注入语句，就会发现里面包含这么一句：`select schema_name from information_schema.schemata limit 0,1` ，其原理就是通过查询`information_schema.schemata`中`schema_name`的结果，其中`limit 0，1`用来获取第一条记录，通过递增第一个参数，可以每次获取一条记录，也就是一次获取一个数据库名，直到出现错误为止，说明没有更多的错误。

2. **获取数据库中的表名**

   `select TABLE_NAME from information_schema.TABLES where TABLE_SCHEMA = database();`

   通常在获取了数据库名后，就会选择感兴趣的数据库，然后来获取其中的数据，首先需要获取感兴趣的数据库中的所有表名，通过**查询`information_schema`库中的`TABLES`表**就可以获取表名。

   在**TABLES表**中，它保存了所有数据库中的所有表名以及这个表所属的库，意思是说，不管你在哪个数据库中的表，在这里都会有一条记录对应，如果你在一个数据库中创建了一个表，相应地在这个表里，也会有一条记录对应你创建的那个表。

   **TABLE_NAME**保存的是**表名**，而**TABLE_SCHEMA**保存的是这个表名所在的**数据库**。

   那么我们就可以使用**TABLE_SCHEMTA字段**作为查询条件，查询**TABLE_NAME**，即可得知所有指定数据库中的所有表名。比如，我们想要通过**information_schema数据库**来查询**sqli数据库**中所有的表，那么就可以使用如下SQL语句：

   `select TABLE_NAME from information_schema.TABLES where TABLE_SCHEMA = 'sqli';`

3. **获取表中字段名称**

   `select column_name from information_schema.columns where TABLE_SCHEMA='sqli' and TABLE_NAME='user';`

   知道了表名，那么如何获取表中的字段呢？要知道我们没有表名的话，会把所有的数据查询出来，而如果注入没有回显，不能进行`union`查询，那么想要获取我们的标目数据，无疑效率极低。

   幸运的是，在`information_schema`数据库中，同样存在一个表，它保存了整个数据中，所有的列名，这个表就是**COLUMNS**。

   与注入相关的存在3个字段，分别是**TABLE_SCHEMA、TABLE_NAME**以及**COLUMN_NAME**，**COLUMN_NAME**则是一个列名记录。

   我们就可以查询把**TABLE_NAME** 和**TABLE_SCHEMA**做为查询条件，查询符合条件的**COLUMN_NAME**，也就是**查询指定数据库中某表中的字段**。

   比如，我们要通过`information_schema`数据库的**columns表**查询**sqli数据库**中**user表**中所有的字段，可以执行如下SQL语句：

   `select column_name from information_schema.columns where TABLE_SCHEMA='sqli' and TABLE_NAME='user';`

  **知道了库名、表名、字段，如果有回显且支持联合查询，就可以直接通过在注入点后面注入一个联合查询语句，即可直接获取数据，如果不能回显，则可能需要通过盲注获取数据。**



[返回目录](#SQL注入的原理与实践)

------



## SQL常用数据库函数

### 一、数学函数

```
abs(x) 返回x的绝对值
bin(x) 返回x的二进制（``oct``返回八进制，``hex``返回十六进制）
ceiling(x) 返回大于x的最小整数值
exp(x) 返回值e（自然对数的底）的x次方
floor(x) 返回小于x的最大整数值
greatest(x1,x2,...,xn) 返回集合中最大的值
least(x1,x2,...,xn) 返回集合中最小的值
ln(x) 返回x的自然对数
log(x,y) 返回x的以y为底的对数
mod(x,y) 返回x``/``y的模（余数）
pi() 返回pi的值（圆周率）
rand() 返回０到１内的随机值,可以通过提供一个参数(种子)使rand()随机数生成器生成一个指定的值。
round(x,y) 返回参数x的四舍五入的有y位小数的值
sign(x) 返回代表数字x的符号的值
sqrt(x) 返回一个数的平方根
truncate(x,y) 返回数字x截短为y位小数的结果
```

### 二、聚合函数(常用于group by从句的select查询中)

```
avg(col) 返回指定列的平均值
count(col) 返回指定列中非null值的个数
min(col) 返回指定列的最小值
max(col) 返回指定列的最大值
sum(col) 返回指定列的所有值之和
group_concat(col) 返回由属于一组的列值连接组合而成的结果
```

### 三、字符串函数 

```
ascii(char)返回字符的ascii码值
bit_length(str)返回字符串的比特长度
concat(s1,s2...,sn)将s1,s2...,sn连接成字符串
concat_ws(sep,s1,s2...,sn)将s1,s2...,sn连接成字符串，并用sep字符间隔
insert(str,x,y,instr) 将字符串``str``从第x位置开始，y个字符长的子串替换为字符串instr，返回结果
find_in_set(str,list)分析逗号分隔的``list``列表，如果发现``str``，返回``str``在``list``中的位置
lcase(str)或lower(str) 返回将字符串``str``中所有字符改变为小写后的结果
left(``str``,x)返回字符串``str``中最左边的x个字符
length(s)返回字符串``str``中的字符数
ltrim(``str``) 从字符串``str``中切掉开头的空格
position(substr ``in` `str``) 返回子串substr在字符串``str``中第一次出现的位置
quote(``str``) 用反斜杠转义``str``中的单引号
repeat(``str``,srchstr,rplcstr)返回字符串``str``重复x次的结果
reverse(``str``) 返回颠倒字符串``str``的结果
right(``str``,x) 返回字符串``str``中最右边的x个字符
rtrim(``str``) 返回字符串``str``尾部的空格
strcmp(s1,s2)比较字符串s1和s2
trim(``str``)去除字符串首部和尾部的所有空格
ucase(``str``)或upper(``str``) 返回将字符串``str``中所有字符转变为大写后的结果
```

### 四、日期和时间函数 

```
curdate()或current_date() 返回当前的日期
curtime()或current_time() 返回当前的时间
date_add(date,interval ``int` `keyword)返回日期date加上间隔时间``int``的结果(``int``必须按照关键字进行格式化),如：selectdate_add(current_date,interval ``6` `month);
date_format(date,fmt) 依照指定的fmt格式格式化日期date值
date_sub(date,interval ``int` `keyword)返回日期date加上间隔时间``int``的结果(``int``必须按照关键字进行格式化),如：selectdate_sub(current_date,interval ``6` `month);
dayofweek(date) 返回date所代表的一星期中的第几天(``1``~``7``)
dayofmonth(date) 返回date是一个月的第几天(``1``~``31``)
dayofyear(date) 返回date是一年的第几天(``1``~``366``)
dayname(date) 返回date的星期名，如：select dayname(current_date);
from_unixtime(ts,fmt) 根据指定的fmt格式，格式化unix时间戳ts
hour(time) 返回time的小时值(``0``~``23``)
minute(time) 返回time的分钟值(``0``~``59``)
month(date) 返回date的月份值(``1``~``12``)
monthname(date) 返回date的月份名，如：select monthname(current_date);
now() 返回当前的日期和时间
quarter(date) 返回date在一年中的季度(``1``~``4``)，如select quarter(current_date);
week(date) 返回日期date为一年中第几周(``0``~``53``)
year(date) 返回日期date的年份(``1000``~``9999``)


一些示例：
获取当前系统时间：select from_unixtime(unix_timestamp());
select extract(year_month ``from` `current_date);
select extract(day_second ``from` `current_date);
select extract(hour_minute ``from` `current_date);
返回两个日期值之间的差值(月数)：select period_diff(``200302``,``199802``);
在mysql中计算年龄：
select date_format(from_days(to_days(now())``-``to_days(birthday)),``'%y'``)``+``0` `as age ``from` `employee;
这样，如果brithday是未来的年月日的话，计算结果为``0``。
下面的sql语句计算员工的绝对年龄，即当birthday是未来的日期时，将得到负值。
select date_format(now(), ``'%y'``) ``-` `date_format(birthday, ``'%y'``) ``-``(date_format(now(), ``'00-%m-%d'``) <date_format(birthday, ``'00-%m-%d'``)) as age ``from` `employee
```

### 五、加密函数 

```
aes_encrypt(``str``,key) 返回用密钥key对字符串``str``利用高级加密标准算法加密后的结果，调用aes_encrypt的结果是一个二进制字符串，以blob类型存储
aes_decrypt(``str``,key) 返回用密钥key对字符串``str``利用高级加密标准算法解密后的结果
decode(``str``,key) 使用key作为密钥解密加密字符串``str
encrypt(``str``,salt) 使用unixcrypt()函数，用关键词salt(一个可以惟一确定口令的字符串，就像钥匙一样)加密字符串``str
encode(``str``,key) 使用key作为密钥加密字符串``str``，调用encode()的结果是一个二进制字符串，它以blob类型存储
md5() 计算字符串``str``的md5校验和
password(``str``) 返回字符串``str``的加密版本，这个加密过程是不可逆转的，和unix密码加密过程使用不同的算法。
sha() 计算字符串``str``的安全散列算法(sha)校验和


示例：
select encrypt(``'root'``,``'salt'``);
select encode(``'xufeng'``,``'key'``);
select decode(encode(``'xufeng'``,``'key'``),``'key'``);``#加解密放在一起
select aes_encrypt(``'root'``,``'key'``);
select aes_decrypt(aes_encrypt(``'root'``,``'key'``),``'key'``);
select md5(``'123456'``);
select sha(``'123456'``);
```

### 六、控制流函数 

```
mysql有``4``个函数是用来进行条件操作的，这些函数可以实现sql的条件逻辑，允许开发者将一些应用程序业务逻辑转换到数据库后台。
mysql控制流函数：
case when[test1] then [result1]...``else` `[default] end如果testn是真，则返回resultn，否则返回default
case [test] when[val1] then [result]...``else` `[default]end 如果test和valn相等，则返回resultn，否则返回default
if``(test,t,f) 如果test是真，返回t；否则返回f
ifnull(arg1,arg2) 如果arg1不是空，返回arg1，否则返回arg2
nullif(arg1,arg2) 如果arg1``=``arg2返回null；否则返回arg1
这些函数的第一个是ifnull()，它有两个参数，并且对第一个参数进行判断。如果第一个参数不是null，函数就会向调用者返回第一个参数；如果是null,将返回第二个参数。
如：select ifnull(``1``,``2``), ifnull(null,``10``),ifnull(``4``*``null,``'false'``);
nullif()函数将会检验提供的两个参数是否相等，如果相等，则返回null，如果不相等，就返回第一个参数。
如：select nullif(``1``,``1``),nullif(``'a'``,``'b'``),nullif(``2``+``3``,``4``+``1``);
和许多脚本语言提供的``if``()函数一样，mysql的``if``()函数也可以建立一个简单的条件测试，这个函数有三个参数，第一个是要被判断的表达式，如果表达式为真，``if``()将会返回第二个参数，如果为假，``if``()将会返回第三个参数。
如：selectif(``1``<``10``,``2``,``3``),``if``(``56``>``100``,``'true'``,``'false'``);
if``()函数在只有两种可能结果时才适合使用。然而，在现实世界中，我们可能发现在条件测试中会需要多个分支。在这种情况下，mysql提供了case函数，它和php及perl语言的switch``-``case条件例程一样。
case函数的格式有些复杂，通常如下所示：
case [expression to be evaluated]
when [val ``1``] then [result ``1``]
when [val ``2``] then [result ``2``]
when [val ``3``] then [result ``3``]
......
when [val n] then [result n]
else` `[default result]
end
这里，第一个参数是要被判断的值或表达式，接下来的是一系列的when``-``then块，每一块的第一个参数指定要比较的值，如果为真，就返回结果。所有的when``-``then块将以``else``块结束，当end结束了所有外部的case块时，如果前面的每一个块都不匹配就会返回``else``块指定的默认结果。如果没有指定``else``块，而且所有的when``-``then比较都不是真，mysql将会返回null。
case函数还有另外一种句法，有时使用起来非常方便，如下：
case
when [conditional test ``1``] then [result ``1``]
when [conditional test ``2``] then [result ``2``]
else` `[default result]
end
这种条件下，返回的结果取决于相应的条件测试是否为真。


示例：
mysql>select case ``'green'
when ``'red'` `then ``'stop'
when ``'green'` `then ``'go'` `end;
select case ``9` `when ``1` `then ``'a'` `when ``2` `then ``'b'` `else` `'n/a'` `end;
select case when (``2``+``2``)``=``4` `then ``'ok'` `when(``2``+``2``)<>``4` `then ``'not ok'` `end asstatus;
select name,``if``((isactive ``=` `1``),``'已激活'``,``'未激活'``) as result fromuserlogininfo;
select fname,lname,(math``+``sci``+``lit) as total,
case when (math``+``sci``+``lit) < ``50` `then ``'d'
when (math``+``sci``+``lit) between ``50` `and` `150` `then ``'c'
when (math``+``sci``+``lit) between ``151` `and` `250` `then ``'b'
else` `'a'` `end
as grade ``from` `marks;
select ``if``(encrypt(``'sue'``,``'ts'``)``=``upass,``'allow'``,``'deny'``) as loginresultfrom users where uname ``=` `'sue'``;``#一个登陆验证
```

### 七、格式化函数 

```
date_format(date,fmt) 依照字符串fmt格式化日期date值
format``(x,y) 把x格式化为以逗号隔开的数字序列，y是结果的小数位数
inet_aton(ip) 返回ip地址的数字表示
inet_ntoa(num) 返回数字所代表的ip地址
time_format(time,fmt) 依照字符串fmt格式化时间time值
其中最简单的是``format``()函数，它可以把大的数值格式化为以逗号间隔的易读的序列。


示例：
select ``format``(``34234.34323432``,``3``);
select date_format(now(),``'%w,%d %m %y %r'``);
select date_format(now(),``'%y-%m-%d'``);
select date_format(``19990330``,``'%y-%m-%d'``);
select date_format(now(),``'%h:%i %p'``);
select inet_aton(``'10.122.89.47'``);
select inet_ntoa(``175790383``);
```

### 八、类型转化函数 

```
为了进行数据类型转化，mysql提供了cast()函数，它可以把一个值转化为指定的数据类型。类型有：binary,char,date,time,datetime,signed,unsigned
示例：
select cast(now() as signed integer),curdate()``+``0``;
select ``'f'``=``binary ``'f'``,``'f'``=``cast(``'f'` `as binary);
```

### 九、系统信息函数

```
database() 返回当前数据库名
benchmark(count,expr) 将表达式expr重复运行count次
connection_id() 返回当前客户的连接``id
found_rows() 返回最后一个select查询进行检索的总行数
user()或system_user() 返回当前登陆用户名
version() 返回mysql服务器的版本

示例：
select database(),version(),user();
selectbenchmark(``9999999``,log(rand()``*``pi()));``#该例中,mysql计算log(rand()*pi())表达式9999999次。
```



[返回目录](#SQL注入的原理与实践)

------

