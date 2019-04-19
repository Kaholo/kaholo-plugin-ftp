var ftp = require('basic-ftp');
var fs = require('fs');

function upload(action, settings) {
    let host = action.params.HOST;
    let user = action.params.USER;
    let password = settings.PASSWORD;
    let secure = "true";
    let port = action.params.PORT;
    let localPath = action.params.LOCALFOLDER;
    let remotePath = action.params.REMOTEFOLDER;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access({host: host, user: user, password: password, port: port, secure: secure}).then(function () {
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
    let host = action.params.HOST;
    let user = action.params.USER;
    let password = settings.PASSWORD;
    let secure = "true";
    let port = action.params.PORT;
    let localPath = action.params.LOCALFOLDER;
    let remotePath = action.params.REMOTEFOLDER;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access({host: host, user: user, password: password, port: port, secure: secure}).then(function () {
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
    let host = action.params.HOST;
    let user = action.params.USER || settings.USER;
    let password = action.params.PASSWORD || settings.PASSWORD;
    let secure = "true";
    let port = action.params.PORT;
    let remotePath = action.params.REMOTEFOLDER;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access({host: host, user: user, password: password, port: port, secure: secure}).then(function () {
        return client.removeDir(remotePath).then(function () {
                client.close()
            })
    })
}

function remove(action, settings) {
    let host = action.params.HOST;
    let user = action.params.USER || settings.USER;
    let password = action.params.PASSWORD || settings.PASSWORD;
    let secure = "true";
    let port = action.params.PORT;
    let remotePath = action.params.REMOTEFILE;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    return client.access({host: host, user: user, password: password, port: port, secure: secure}).then(function () {
        return client.remove(remotePath).then(function () {
                client.close()
        })
    })
}

function download(action, settings) {
    let host = action.params.HOST;
    let user = action.params.USER || settings.USER;
    let password = action.params.PASSWORD || settings.PASSWORD;
    let secure = "true";
    let port = action.params.PORT;
    let remotePath = action.params.REMOTEFILE;
    let localPath = action.params.LOCALPATH;
    var client = new ftp.Client();
    client.ftp.verbose = true;
    client.access({host: host, user: user, password: password, port: port, secure: secure}).then(function () {
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