# source-code-redux
[![](https://img.shields.io/badge/Redux-V4.0.4-yellow.svg)](https://github.com/reduxjs/redux/tree/v4.0.4)  ![](https://img.shields.io/badge/language-Javascript-orange.svg)  ![](https://img.shields.io/badge/license-MIT-green.svg)

[redux](https://github.com/reduxjs/redux) 源码精简及中文注释


## Introduction

`redux` 源码的代码量也就 1000 多行，但是关于 `redux` 的使用往往可以讲上半本书，这样的魔力促使我想要去了解 `redux` 的每一行代码，并把精简和注释后的代码分享出来。

其实 `redux` 作为状态管理的工具，完全不需要依赖其他的框架就可以独立运行，为了方便学习，我这里写了几个 `Demo`，可以直接在 `node` 环境下运行， 因此在看代码的时候可以随时的进行调试，提供的4个 `Demo` 是循序渐进的，可跟着节奏一步步的学习.


| Demo | 说明 |
| --- | --- | 
| demo-1 | 仅使用 `createStore` 实现基本的状态管理功能 |
| demo-2 | 使用 `combineReducers` 实现 `Reducer` 和 `state` 的按组件拆分 |
| demo-3 | 使用 `bindActionCreators` 封装 `dispatch` 的细节 |
| demo-4 | 使用 `applyMiddleware` 添加中间件，使 `Redux` 可支持异步的 `action` |


## Features

- [x] 保留 Redux 功能性代码，删除类型检查之类的代码
- [x] 借助 Demo 直接调试源码


## Use

1. yarn
2. yarn start [number] 

```shell
PS source-code-redux> yarn start 1
yarn run v1.16.0
$ node index.js 1
---state change---
{ count: 2，name: 'Jack' }
---state change---
{ count: 1，name: 'Jack' }
---state change---
{ count: 1，name: 'LiKe' }
Done in 1.59s.
```





