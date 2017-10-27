// illust:{name,source,sourceId,author,authorId,imgInfo,updateTime,tag:[]}
class illust {
  // name
  // source
  // sourceId
  // author
  // authorId
  // imgInfo
  // updateTime
  // tag
  constructor(source, sourceId) {
    this.source = source
    this.sourceId = sourceId
  }

  setName(name) {
    this.name = name
    return this
  }

  setAuthor(author, authorId) {
    this.author = author
    if (authorId)
      this.authorId = authorId
    return this
  }

  // addTag() {
  //   if (!this.tags) {
  //     this.tags = []
  //   }
  //   Array.prototype.slice.apply(arguments)
  //   this.tags.push(arguments)
  // }


  toString() {
    return JSON.stringify(this)
  }
}
