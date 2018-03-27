# www.freelog.com


## 节点
用户访问节点时，服务端会返回节点设置展示的pagebuild。

### pagebuild
pagebuild描述当前节点页面的布局和展示的widget。widget决定widget所占区域内所需要展示的内容。最终渲染出一个完整的节点页面给用户。

#### pagebuild执行流程

<img src="http://visuals.oss-cn-shenzhen.aliyuncs.com/pagebuild-parser.png" style="max-width:50%">


##### widget render流程
<img src="http://visuals.oss-cn-shenzhen.aliyuncs.com/pagebuild-infra.jpg" style="max-width:100%">


#### event code
定义widget可触发中断事件对应的处理器（service）。

比如定义authEvent->authHandler，表示事件名为authEvent被trigger时，调用对应的处理器authHandler。


#### exception code
后端返回给前端的响应中异常码对应的前端解释。主要用户告诉widget开发者和普通用户遇到对应的异常码时，知道是出了什么问题，以及应该如何处理。

