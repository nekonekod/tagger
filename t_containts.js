let _ = require('lodash')

function vagueMatchTag(tagsArr, explTags) {
    return explTags && tagsArr && _(explTags).filter(t => {
        let tmp = _(tagsArr).filter(t2 => t2.indexOf(t) > -1).value()
        return tmp.length > 0
    }).value().length > 0
}

console.log(vagueMatchTag(['tag1','tag2'],['ta23g1']))