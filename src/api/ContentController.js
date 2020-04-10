import Post from '../modle/Post'

class ContentController {
    async getPostList (ctx) {
        const body = ctx.query
        const sort = body.sort ? body.sort : 'created'
        const page = body.page ? parseInt(body.page) : 0
        const limit = body.limit ? parseInt(body.limit) : 20
        let options = {}
        if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
            options.catalog = body.catalog
        }
        if (typeof body.isTop !== 'undefined') {
            options.isTop = body.isTop
        }
        if (typeof body.status !== 'undefined') {
            options.status = body.status
        }
        if (typeof body.isEnd !== 'undefined') {
            options.isEnd = body.isEnd
        }
        await Post.getList(options, sort, page, limit)
    }
}

export default new ContentController()