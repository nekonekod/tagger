const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const suffix = ['jpg', 'png', 'jpeg', 'gif']

function mExists(path) {
    return fs.existsSync(path)
}

function mIsFile(path) {
    return mExists(path) && fs.statSync(path).isFile()
}

function mIsDir(path) {
    return mExists(path) && fs.statSync(path).isDirectory()
}

function mIsDirOrMkdir(path) {
    if (mExists(path)) {
        return fs.statSync(path).isDirectory()
    } else {
        return !fs.mkdirSync(path)
    }
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

function doRenamePixivImageFiles(dir, dupDir, cb) {
    if (!mIsDir(dir)) {
        console.log('isDir', dir)
        throw new Error("renamePixivImageFiles:dir不存在", dir);
    }
    if (!mIsDirOrMkdir(dupDir)) {
        throw new Error("renamePixivImageFiles:创建dupDir失败", dupDir);
    }
    //now dir and dupDir both exists
    mDealFileIn(dir, (f) => {
        if (f.fPath.indexOf('/.') >= 0)
            return false
        else if (f.isDir)
            return true
        return f.isFile && _(suffix).some(suffix => {
            return _(f.fName).endsWith(suffix)
        })
    }, function(f) {
        const mark = "_p."
        if (f.fName.indexOf(mark) > -1) {
            let newPath = f.fPath.replace(mark, '.')
            if (mExists(newPath)) {
                console.warn('file dup exists:', f.fPath, 'try do be ', newPath, 'but already existed')
                newPath = path.join(dupDir, f.fName)
            }
            let err = fs.renameSync(f.fPath, newPath)
            if (err) {
                throw new Error('重命名失败：', f.fPath, newPath, err)
            } else {
                console.log('rename:', f.fPath, 'to', newPath)
            }
        }
    }, true);
    cb && cb({
        status: 1
    })
}

doRenamePixivImageFiles('/Users/nekod/Downloads/test/facades', '/Users/nekod/Downloads/test/dup', null)