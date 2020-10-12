# JSP 元素

[TOC]

## 指示元素：<%@ 指示类型 [属性=“值”]* %>

JSP指示(Directive)元素的主要目的，在于指示容器将JSP转译为Servlet源代码时，一些必须遵守的信息。

指示元素的语法如下所示：

<%@ 指示类型 [属性=“值”]* %>

在JSP中有三种常用的指示类型：**paga、include** 与 **taglib**。

- **page** 指示类型告知容器如何转译目前的JSP网页。

- **include** 指示类型告知容器，将指定的JSP页面包括进来进行转译。

- **taglib** 指示类型告知容器如何转译这个页面中的标签库(Tag Library) 。

指示元素中可以有多对的属性/值，必要时，同一个指示类型可以用数个指示元素来设置。

### 指示类型：page

首先说明 **page** 指示类型：

**page.jsp**

```
<%@page import="java.time.LocalDateTime" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html>
    <head>
    	<meta charset="UTF-8">
    	<title>Page指示元素</title>
	</head>
	<body>
    	<hl>现在时间:<%= LocalDateTime.now() %></hl>
    </body>
</html>
```

上例使用了 page 指示类型的 **import 、contenType** 与 **pageEncoding** 三个属性。

#### 常用属性

- **import** 属性告知容器转译JSP时， 必须在源代码中包括的import陈述， 范例中的import属性在转译后的Servlet源代码中会产生：

  ```
  import java.time.LocalDateTime;
  ```

  也可以在同一个 **import**  属性中， 使用逗号分隔数个import的内容：
   ske page import-"java.time， Local DateTime， cc.open home..uts

  ```
  <%@page import="java.time.LocalDateTime, cc.openhome.*" %>
  ```

- **contentType** 属性告知容器转译JSP时， 必须使用 **HttpServletRequest** 的 `setContentType()` ，调用方法时传入的参数就是**contentType** 的属性值。

- **pageEncoding** 属性告知这个JSP网页中的文字编码， 以及内容类型附加的charset设置。根据范例中contentType与page Encoding属性的设置， 转译后的Servlet源代码必须包括这行代码：

  ```
  response.setContentType("text/html; charset=UTF-8");
  ```

可以在使用 page 类型时一行一行地编写，也可以编写在同一个元素中。例如：

```
<%@page import="java.time.LocalDateTime" contentType="text/html" pageEncoding="UTF-8" %>
```

 **import 、contenType** 与 **pageEncoding** 是最常用到的三个属性。



#### 非常用属性

page 指示类型还有一些可以设置的属性：

- **info** 属性：用于设置目前JSP页面的基本信息，这个信息最后会转换为Servlet程序中使用 `getServletInfo()` 取得的信息。
- **autoFlush** 属性：用于设置输出串流是否要自动清除， 默认是true。如果设置为false， 而缓冲区满了却还没调用 `flush()` 数据送出至浏览器， 则会引发异常。
- **buffer** 属性：用于设置至浏览器的输出串流缓冲区大小， 设置时必须指定单位，例如 `buffer="16kb"` 。默认是8kb。
- **errorPage** 属性：用于设置当JSP执行错误而产生异常时，该转发哪一个页面处理这个异常。
- **extends** 属性：用来指定JSP网页转译为Servlet程序之后， 该继承哪一个类。以Tomcat为例， 默认是继承自HttpJspBase（HttpJspBase又继承自HttpServlet）。但几乎不会使用到这个属性。
- **isErrorPage** 属性：设置JSP页面是否为处理异常的页面， 这个属性要与 **errorPage**配合使用。
- **language** 属性：指定容器使用哪种语言的语法来转译JSP网页，言下之意是JSP可使用其他语言来转译，不过事实上**目前只能使用Java的语法**（默认使用java）。
- **session** 属性：设置是否在转译后的Servlet源代码中具有创建HttpSession对象的语句。默认是true， 若某些页面不需作进程跟踪，可以设成false。
- **isELIgnored** 属性：设置JSP网页中是否忽略表达式语言(Expression Language) ，默认是false， 如果设置为true， 不转译表达式语言。这个设置会覆盖web.xml中的 `<el-ignored>` 设置。
- **isThreadSafe** 属性：告知容器编写JSP时是否注意到线程安全，默认值是true。如果设置为false，转译之后的Servlet会实现SingleThreadModel 接口，每次请求时将创建一个Servlet实例来服务请求。虽然可以避免线程安全问题，然而会引起性能问题，不建议设置为false。



### 指示类型：include

**include** 指示类型， 它用来告知容器包括另一个网页的内容进行转译。

来看个范例：**main.jsp**

```
<%@page contentType="text/html" pageEncoding="UTF-8 %>
<%@include file="/WEB-INF/jspf/header.jspf" %>
    <h1>include 示范本体</hl>
<%@include file="/WEB-INE/jspf/footer.jspf" %>
```

上面这个程序在第一次执行时， 会把 **header.jspf** 与 **foot.jspf** 的内容包括进来作转译。假设这两个文件的内容分别是：

**header.jspf** 

```
<%@page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
    <head>
    	<meta charset="UTF-8">
    	<title>include 示范开头</title>
	</head>
	<body>
```

 **foot.jspf**

```
<%@page pageEncoding="UTF-8" %>
	</body>
</html>
```

在实际执行时， 容器会组合 **main.jsp、header.jspf** 与 footer.jspf 的内容后，再转译为Servlet，也就是说，相当于转译这个JSP：

```
<%@page contentType="text/html" pageEncoding="UTF-8 %>
<!DOCTYPE html>
<html>
    <head>
    	<meta charset="UTF-8">
    	<title>include 示范开头</title>
	</head>
	<body>
    	<h1>include 示范本体</hl>
	</body>
</html>
```

所以最后会生成一个Servlet（而不是三个）， 也就是说，使用指令元素 **include** 来包括其他网页内容时，会在转译时期就决定转译后的Servlet内容，**这是一种静态的包括方式**。



### 在 web.xml 声明

可以在web.xml中统一默认的网页编码、内容类型、缓冲区大小等。例如：

```
<web-app ...>
    ...
	<jsp-config>
    	<jsp-property-group>
    		<url-pattern>*.jap</url-pattern>
			<page-encoding>UTF-8</page-encoding>
			<default-content-type>text/html</default-content-type>
    		<buffer>16kb</buffer>
    	</jsp-property-group>
    </jsp-config>
</web-app>
```

也可以声明指定的JSP开头与结尾要包括的网页：

```
<web-app ...>
	...
	<jsp-config>
   		<jsp-property-group>
   			<url-pattern>*.jsp</url-pattern>
 			<include-prelude>/WEB-INF/jspf/pre.jspf</include-preludes>
   			<include-coda>/WEB-INF/jspf/coda.jspf</include-coda>
   		</jsp-property-group>
   </jsp-config>
</web-app>
```

另外，注意到指示元素编写如下：

```
<%@page import="java.time.LocalDateTime" %>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
Hello!
```

因为在编写JSP指示元素时，换行了两次，这两次换行的字符也会输出，最后产生的HTML会有两个换行字符，接着才是“Hello!”字符串的输出。一般来说， 这不会有什么问题， 但如果想要忽略这样的换行，可以在web.xml中设置：

```
<web-app ...>
	<jsp-config>
		<jsp-property-group>
			<url-pattern>*.jsps</url-pattern>
   			<trim-directive-whitespaces>true</trim-directive-whitespaces>
   		</jsp-property-group>
   </jsp-config>
</web-app>
```



[返回目录](#JSP 元素)

------



## 声明、Scriptlet 与表达式元素

JSP网页会转译为Servlet类，转译后的Servlet类应该包括哪些类成员、哪种方法声明或哪些语句，在编写JSP时，可以使用声明(Declaration) 元素、Scriptlet元素及表达式(Expression)元素来指定。

### 声明元素：<%! 类成员声明或方法声明 %>

在 `<%!` 与 `%>` 之间声明的代码，都将转译为Servlet中的类成员或方法，之所以称为声明元素，是指它用来声明类成员与方法。举个例子来说， 如果在JSP中编写以下片段：

```
<%!
	String name = "caterpillar";
	String password = "123456";
	
	boolean check User(String name, string password) {
    	return this.name.equals(name) && this.password.equals(password);
%>
```

则转译后的Servlet代码， 将会有以下内容：

```
package org.apache.jsp;
...略
public final class index_jsp ...略 {
	String name = "caterpillar";
 	String password = "123456";
	
	boolean check User(String name, string password) {
    	return this.name.equals(name) && this.password.equals(password);
    }
   ...略
}
```

所以使用 `<%!` 与 `%>` 声明变量时，必须小心数据共享与线程安全的问题。

容器默认会使用同一个Servlet实例来服务不同用户的请求，每个请求是一个线程， 而 `<%!` 与 `%>` 声明的变量对应至类变量成员，因此会有线程共享访问的问题。

如果有一些初始化操作，想要在JSP载入时执行，可以重新定义 `jspInit()` 方法，或在 `jspDestroy()` 中定义结尾动作。定义 `jspInit()` 与 `jspDestroy()` 的方法，就在 `<%!` 与 `%>` 之间进行，这样转译后的Servlet源代码，会有相对应的方法片段出现。例如：

```
<%!
	public void jspInit() {
		// 初始化动作
	}
    
	public void jspDestroy() {
		// 结尾动作
	}

%>
```



### 代码片段：Scriptlet 元素  <% Java 语句 %>

语法规则：

```
<% Java 语句 %>
```

在声明元素中可以编写Java语句， 就如同在Java的方法中编写语句一样。事实上， `<%` 与 %> 钞之间包括的内容，将被转译为Servlet源代码 `_jspService()` 方法中的内容。举个例子：

```
<%
	String name = request.getParameter("name");
	String password = request.getParameter("password");
    if(checkUser(name, password)) {
%>

    <h1>登录成功</h1>
    
<%
	}
    else {
%>

	<h1>登录失败</h1>
	
<%
	}
%>
```

这段JSP中的 Seriptlet ，在转译为Servlet后，会有以下对应的源代码：

```
package org.apache.jsp;
... 略
public final class login_jap ... 略 {
	// 略 ...
	public void _JspService(HttpServletRequest request, HttpServletResponse response) throws                     	java.io.IOException, ServletException {
		
        // 略 ...
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        
        if(checkUser(name, password)) {
        	out.write("\n");
        	out.write("<h1>登录成功</h1>\n");
        } else {
            out.write("\n");
        	out.write("<h1>登录失敗</h1>\n");
        }
        
        ... 略
	}

}
```

直接在JSP中编写的HTML，都会变成out对象输出的内容。Scriptlet出现的顺序，也就是在转译为Servlet后， 语句出现在`_jspService()` 中的顺序。



### 表达式元素：<%= Java 表达式 %>

语法规则：

```
<%= Java 表达式 %>
```

可以在表达式元素中编写Java表达式， 表达式的运算结果将直接输出为网页的一部分。

例如之前看过的范例中，使用到一段表达式元素：

现在时间：``<%= LocalDateTime.now() %>`

注意，表达式元素中不用加上分号（;）。这个表达式元素在转译为Servlet之后，会在 `_jspService()` 中产生以下语句：

```
out.print(LocalDateTime.now());
```

表达式元素中的表达式，会直接转译为out对象输出时的指定内容（这也是为什么表达式元素中不用加上分号的原因）。



[返回目录](#JSP 元素)

------



## 注释元素

### Java 注释

在JSP网页中， 可以在 `<%` 与 %> 之间直接使用Java语法编写程序，因此可在其中使用Java的注释方式来编写注释文件，也就是可以使用 // 或 `/*` 与 `*/` 来编写注释。例如：

```
<%
	// 单行注释
	out.println("随便显示一段文字");
	/*多行注释*/
%>
```

在转译为Servlet源代码之后， `<%` 与 %> 之间设置的注释， 在Servlet源代码中对应的位置也会有对应的注释文字。若想观察JSP转换为Servlet后的某段特定源代码，可以使用这种注释方式当作一种标记，方便直接看到转换后的代码位于哪一行。



### HTML网页注释

另一个是HTML网页使用的注释方式 `<!--`与 `-->`， 这并不是JSP的注释。例如， 下面这段网页中的注释：

```
<!-- 网页注释 -->
```

在转译为Servlet之后， 只是产生这样的一行语句：

```
out.write("<!-- 网页注释 -->");
```

这个注释文字也会输出至浏览器成为HTML注释，在查看HTML源代码时，也就可以看到注释文字。



### JSP注释

JSP有一个专用的注释， 即 `<%--` 与 `--%>`，例如：

```
<%-- JSP 注释 --%>
```

容器在转译JSP至Servlet时， 会忽略 `<%--` 与 `--%>`之间的文字， 生成的Servlet中不包括注释文字，也不会输出至浏览器。



### 动态注释

由于 HTML 注释对 JSP 嵌入的代码不起作用，因此可以利用他们的组合构成动态的 HTML 注释文本。

在 JSP 页面中添加动态注释：

```
<!-- <%= new Date() %> -->
```

上述代码将当前日期和时间作为 HTML 注释文本。



[返回目录](#JSP 元素)

------

