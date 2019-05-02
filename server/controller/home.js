const ejs = require('ejs')
const { getTemplate } = require('../common/utils')
module.exports = { 
    index : async (req, res, next) => {
        try {
			const template = await getTemplate('index.ejs')
			let html = ejs.render(template, { title: '首页' })
			res.send(html)
		} catch (e) {
			next(e)
		}
    }
}