var ftp = require('basic-ftp');
var fs = require('fs');

function _options(action, settings) {
    return {
        host: action.params.HOST,
        user: action.params.USER || settings.USER,
        password: action.params.PASSWORD || settings.PASSWORD,
        port: action.params.PORT,
        secure: 'true'
    }
}

function upload(action, settings) {
    let options = _options(action, settings);
    let localPath = action.params.LOCALFOLDER;
    let remotePath = action.params.REMOTEFOLDER;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access(options).then(function () {
        let stats = fs.statSync(localPath);
        if (stats.isDirectory()) {
            return client.ensureDir(remotePath).then(function () {
                return client.uploadDir(localPath).then(function () {
                    client.close()
                })
        })
        } else {
            return client.upload(fs.createReadStream(localPath), remotePath).then(function () {
                client.close()
            })
        }
    })
}


function remove(action, settings) {
    let options = _options(action, settings);
    let localPath = action.params.LOCALFOLDER;
    let remotePath = action.params.REMOTEFOLDER;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access(options).then(function () {
        let stats = fs.statSync(localPath);
        if (stats.isDirectory()) {
            return client.removeDir(localPath, remotePath).then(function () {
                client.close()
            })
        } else {
            return client.remove(remotePath).then(function () {
                client.close()
            })
        }
    })
}

function removeDir(action, settings) {
    let options = _options(action, settings);
    let remotePath = action.params.REMOTEFOLDER;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access(options).then(function () {
        return client.removeDir(remotePath).then(function () {
                client.close()
            })
    })
}

function remove(action, settings) {
    let options = _options(action, settings);
    let remotePath = action.params.REMOTEFILE;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access(options).then(function () {
        return client.remove(remotePath).then(function () {
                client.close()
        })
    })
}

function download(action, settings) {
    let options = _options(action, settings);
    let localPath = action.params.LOCALPATH;
    let remotePath = action.params.REMOTEFILE;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access(options).then(function () {
        return client.download(fs.createWriteStream(localPath), remotePath).then(function () {
            client.close()
        })
    })
}

module.exports = {
    upload: upload,
    remove: remove,
    removeDir: removeDir,
    download: download
}