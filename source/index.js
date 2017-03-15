"use strict";
function clear_database(connection) {
    return new Promise(function (resolve, reject) {
        return connection.db.collections(function (error, collections) {
            if (error)
                return reject(error);
            if (collections.length == 0)
                return resolve();
            var promises = collections
                .filter(function (c) { return c.s.name != 'system.indexes'; })
                .map(function (collection) {
                return new Promise(function (resolve, reject) {
                    collection.remove({}, function (error, result) {
                        if (error)
                            reject(error);
                        else
                            resolve();
                    });
                });
            });
            Promise.all(promises)
                .then(function () { return resolve(); });
        });
    });
}
exports.clear_database = clear_database;
//# sourceMappingURL=index.js.map