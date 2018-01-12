import ipcM from './ipcM'
import fsService from '../service/fsService'

ipcM.on('fs/watch/register', fsService.register)
ipcM.on('fs/watch/unregister', fsService.unregister)