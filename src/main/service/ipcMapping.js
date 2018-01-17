import ipcM from '../common/ipcM'
import fsService from '../service/fsService'
import pixivService from '../service/pixivService'
import illustService from '../service/illustService'

ipcM.on('import/pixiv', pixivService.import)
ipcM.on('fs/watch/register', fsService.register)
// ipcM.on('fs/watch/unregister', fsService.unregister)
ipcM.on('fs/watch/watchedDirs', fsService.watchedDirs)
ipcM.on('illust/getById', illustService.getById)