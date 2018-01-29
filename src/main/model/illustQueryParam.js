import _ from 'lodash'

function notEmpty(param) {
    return (param && _(param).trim() !== '') ? true : false;
}

export default class IllustQueryParam {
    constructor(expl) {
        this._id = expl._id
        this.source = expl.source
        this.sourceId = expl.sourceId
        this.author = expl.author
        this.authorId = expl.authorId
        this.tags = expl.tags
        this.comment = expl.comment
        this.title = expl.title
        this.maxFav = expl.maxFav
        this.minFav = expl.minFav
    }
    isEmptyCondition() {
        return !(notEmpty(this._id) ||
            notEmpty(this.source) || notEmpty(this.sourceId) ||
            notEmpty(this.author) || notEmpty(this.authorId) ||
            (this.tags && this.tags.length > 0 ) ||
            notEmpty(this.comment) || notEmpty(this.title) ||
            notEmpty(this.maxFav) || notEmpty(this.minFav))
    }

}