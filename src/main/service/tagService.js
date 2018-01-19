import _ from 'lodash'

const separator = '$'

function reMapTags() {
  let map = new Map()
  map.set('艦これかっこいい', '艦これ')
  map.set('響', '响')
  return map
}

function ignoreTags() {
  let set = new Set()
  set.add('艦これ1000users入り')
  return set
}

export default {
  updateTagString(arr) {
    let reMap = reMapTags()
    let ignore = ignoreTags()

    let distincted = _.chain(arr).map(t => { //do map and ignore
      let f = null
      if (t && t.trim() !== '') {
        t = t.trim()
        let mepped = reMap.get(t)
        f = mepped ? mepped : (ignore.has(t) ? null : t)
      }
      return f
    }).filter(t => t && t.trim() !== '')
      .uniq()
      .value()
    let tagStr = distincted.length < 1 ? null : separator + distincted.join(separator) + separator
    return tagStr
  },
  /**
   * 对tag数组进行非空过滤，忽略，重映射，去重操作
   * @param arr 原tag数组
   */
  updateTags(arr){
    let reMap = reMapTags()
    let ignore = ignoreTags()

    return _.chain(arr).map(t => { //do map and ignore
      let f = null
      if (t && t.trim() !== '') {
        t = t.trim()
        let mepped = reMap.get(t)
        f = mepped ? mepped : (ignore.has(t) ? null : t)
      }
      return f
    }).filter(t => t && t.trim() !== '')
      .uniq()
      .value()
  }
}