export default class TFile {
    constructor(expl) {
        //==== from illust ===
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
        //===== from file ====
        this.dir = expl.dir
        this.file = expl.file
    }

}