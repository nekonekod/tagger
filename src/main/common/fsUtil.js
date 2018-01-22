import fs from 'fs'
import _ from 'lodash'
import path from 'path'

function mExists(path) {
    return fs.existsSync(path)
}

function mIsFile(path) {
    return mExists(path) && fs.statSync(path).isFile()
}

function mIsDir(path) {
    return mExists(path) && fs.statSync(path).isDirectory()
}

function mDealFileIn(dirPath, fileFilter, fileConsumer, recursive) {
    recursive = recursive || false
    fs.readdir(dirPath, (err, files) => {
        if (err) throw new Error('读' + dirPath + '文件夹时发生错误')
        _(files).map(fName => {
            let fPath = path.join(dirPath, fName)
            return {
                fName: fName,
                fPath: fPath,
                isFile: mIsFile(fPath),
                isDir: mIsDir(fPath)
            }
        }).filter(f => {
            return fileFilter && fileFilter(f)
        }).forEach(f => {
            if (recursive && f.isDir) {
                //deal recursive
                mDealFileIn(f.fPath, fileFilter, fileConsumer, recursive)
            } else if (f.isFile) {
                fileConsumer && fileConsumer(f) //deal file
            }
        })
    })
}

export default {
    exists(path) {
        return mExists(path)
    },
    isFile(path) {
        return mIsFile(path)
    },
    isDir(path) {
        return mIsDir(path)
    },
    /**
     * 如果path是文件夹返回true
     * 如果path不是文件夹，则创建文件夹，创建成功后返回true
     * 其他情况返回false
     * @param path 
     */
    isDirOrMkdir(path) {
        if (mExists(path)) {
            return fs.statSync(path).isDirectory()
        } else {
            return !fs.mkdirSync(path)
        }
    },
    /**
     * 处理某文件夹下的文件
     * @param dirPath 文件夹路径
     * @param fileFilter 过滤，要返回true/false function(f) 其中f:{fName:'',fPath:''}
     * @param fileConsumer 处理文件 function(f) 其中f:{fName:'',fPath:''}
     * @param recursive 递归子文件夹
     */
    dealFileIn(dirPath, fileFilter, fileConsumer, recursive) {
        mDealFileIn(dirPath, fileFilter, fileConsumer, recursive)
    }
}