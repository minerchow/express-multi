import axios from 'axios'
// styles
import 'less/index.less'
import ejs from 'ejs/ejs.min';
let partTpl =  require('../tpls/includes/part.ejs');
const isDev = process.env.NODE_ENV === 'development'

// 在开发环境下，使用 raw-loader 引入 ejs 模板文件，强制 webpack 将其视为需要热更新的一部分 bundle
if (isDev) {
	require('raw-loader!../tpls/index.ejs')
}

async function welcome () {
	let res = await sayHello()
    console.log(res)
  //  document.getElementById('container').innerHTML = partTpl({name:"aaa"})
   var html = ejs.render(partTpl,{name:"333"});
   document.getElementById('container').innerHTML = html;
}

function sayHello () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('hello world')
		}, 2000)
	})
}

welcome()

if (module.hot) {
	module.hot.accept()
	/**
	 * 监听 hot module 完成事件，重新从服务端获取模板，替换掉原来的 document
	 * 这种热更新方式需要注意：
	 * 1. 如果你在元素上之前绑定了事件，那么热更新之后，这些事件可能会失效
	 * 2. 如果事件在模块卸载之前未销毁，可能会导致内存泄漏
	 */
	module.hot.dispose(() => {
		const href = window.location.href
		axios.get(href).then(res => {
			const template = res.data
			document.body.innerHTML = template
		}).catch(e => {
			console.error(e)
		})
	})
}
