import Post from '../modle/Post'

class ContentController {
    async getPostList (ctx) {
        const body = ctx.query
        let options = {}
        await Post.getList()
    }
}

export default new ContentController()