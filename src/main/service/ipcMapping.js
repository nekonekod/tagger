import ipcM from '../common/ipcM'
import fsService from '../service/fsService'
import pixivService from '../service/pixivService'
import illustService from '../service/illustService'

let app

ipcM.on('pixiv/importRaw', pixivService.importRaw)
ipcM.on('pixiv/rename', pixivService.renamePixivImageFiles)
ipcM.on('fs/watch/register', fsService.register)
// ipcM.on('fs/watch/unregister', fsService.unregister)
ipcM.on('fs/watch/watchedDirs', fsService.watchedDirs)
ipcM.on('illust/getById', illustService.getById)

export default{
    init(appRef){
        console.log('ipcMapping init')
        app = appRef
    }
}