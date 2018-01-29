import ipcM from '../common/ipcM'
import fsService from '../service/fsService'
import pixivService from '../service/pixivService'
import illustService from '../service/illustService'
import tFileService from '../service/tfileService'

let app

ipcM.on('pixiv/importRaw', pixivService.ipcImportRaw)
ipcM.on('pixiv/rename', pixivService.ipcRenamePixivImageFiles)
ipcM.on('fs/watch/register', fsService.ipcRegister)
// ipcM.on('fs/watch/unregister', fsService.ipcUnregister)
ipcM.on('fs/watch/watchedDirs', fsService.ipcWatchedDirs)
ipcM.on('illust/getById', illustService.ipcGetById)
ipcM.on('tFile/query',tFileService.ipcQueryTFile)

export default{
    init(appRef){
        console.log('ipcMapping init')
        app = appRef
    }
}