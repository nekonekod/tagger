import _ from 'lodash'
import illstService from './illustService'


// @Override
// public List<TFileModel> queryTFile(IllustQueryParam param) {
//     if (Objects.isNull(param)) return tFiles();
//     List<IllustEntity> illusts = illustService.query(param);
//     log.info("queryTFile found {} illust records", illusts.size());
//     List<TFileModel> tFiles = fsWatcher.matchAndMap(
//             illusts, //illust matched query
//             IllustEntity::getSourceId, //match: filename like sourceId
//             file -> null,//orElse: null
//             TFileModel::fromIllustAndFile);
//     log.info("tFiles found {} records", tFiles.size());
//     return tFiles; //build TFile from illust and file
// }

// @Override
// public List<TFileModel> tFiles() {
//     List<IllustEntity> illusts = illustService.queryAll();
//     log.info("tFiles found {} illust records", illusts.size());
//     List<TFileModel> tfiles = fsWatcher.matchAndMap(
//             illusts, //illust matched query
//             IllustEntity::getSourceId, //match
//             TFileModel::fromFile,//orElse: build TFile from file
//             TFileModel::fromIllustAndFile);
//     log.info("tFiles found {} records", tfiles.size());
//     return tfiles; //build TFile
// }

export default {
    
}