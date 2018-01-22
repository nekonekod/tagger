export default class Illust {
    constructor(expl) {
        this._id = expl._id
        this.source = expl.source
        this.sourceId = expl.sourceId
        this.author = expl.author
        this.authorId = expl.authorId
        this.tags = expl.tags
        this.updateTime = expl.updateTime
        this.comment = expl.comment
        this.title = expl.title
        this.fav = expl.fav
    }

}