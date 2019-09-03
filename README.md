# Auto Beast Form

基于 Beast 相关组件的可配置化表单

## 运行

```bash
$ yarn start
```

然后访问 9002 端口查看demo。

## 问题

* 代码可维护性问题：
	* 现在表单相关的代码写法比较多样，有用 FormItem 实现的，有用 useFormApi 和 useFormState 实现的，有用 value、onChange 手动实现的，而使用 FormItem 写法比较复杂。
	* 逻辑混杂，联动逻辑没有通用解决方案，需要在组件内写大量的 onChange Handler，导致业务组件变得非常臃肿。
* 研发效率问题：代码重用较少，一些通用的组件，如 beast-core 内的组件没有做进一步封装，每次都要自己写。
* 性能问题：render props 性能比较差，每个组件都单独做性能处理需要些大量个业务无关的代码，统一收拢起来便于提升性能和维护。
* 数据驱动问题：有一些场景表单是非常动态化的，用模板来做就需要在模板写大量的配置判断逻辑，用配置化可以非常方便做到。
 
## 目标

* 代码风格一致，通过一套配置生成表单，所有的表单都是一套配置逻辑，基本不需要自己写 jsx
* 视图是组件化的，将通用视图交互逻辑层层抽象封装，进一步简化核心视图复杂度。
* 逻辑是分层的，核心业务逻辑是一层，非业务逻辑是一层，view 是一层，每一层不掺杂其它层级的职能。
 
## 思路
* 借助 beast-from 的能力，实现每个状态的自己管理，自己做渲染更新。
* 把常用的组件都封装起来，通过字符串简单配置，同时支持自定义 field 组件。
* 把 formApi 和 formState 的能力强化，提升性能。
* 支持动态渲染。
* 副作用独立管理，提升view的可维护性。
* 嵌套数据结构路径自动拼接。
 
## 支持配置类型
 
### 基础组件
 
内置支持 beast-core 提供的基础组件，如 Input、Select、Switch 等：

![](https://wiki2.corp.yiran.com/download/attachments/63708571/image2019-9-3%2017%3A53%3A52.png?version=1&modificationDate=1567504432324&api=v2)

### 自定义组件
 
可以通过 ui.widget 可以自定义组件 

![](https://wiki2.corp.yiran.com/download/attachments/63708571/image2019-9-3%2017%3A55%3A26.png?version=1&modificationDate=1567504526080&api=v2)
 
### 嵌套field
 
嵌套数组
 
![](https://wiki2.corp.yiran.com/download/attachments/63708571/image2019-9-3%2017%3A56%3A29.png?version=1&modificationDate=1567504589951&api=v2)

嵌套对象

![](https://wiki2.corp.yiran.com/download/attachments/63708571/image2019-9-3%2017%3A57%3A5.png?version=1&modificationDate=1567504625899&api=v2)
 
### 表单联动
 
![](https://wiki2.corp.yiran.com/download/attachments/63708571/image2019-9-3%2017%3A57%3A46.png?version=1&modificationDate=1567504666588&api=v2)
 
## 未来

### 表单物料
  
很多表单场景的物料比较通用，可以收集起来成一个表单物料库

### 表单中台
 
搭建一套表单中台，通过表单中台快速配置一个表单页面，包括数据请求、初始化表单、表单动态渲染回填、表单输入校验，表单提交等整个表单页面生命周期
 
这样可以做到快速支持业务，不发布上下线
 
### 模板
 
提供一些配置模板，直接通过模板来快速生成符合需求的模板页面

### 可视化配置

提供一套可视化配置，简化上手难度，提升开发效率。
 
 
