"use strict";
function clear_database(connection) {
    return new Promise(function (resolve, reject) {
        return connection.db.collections(function (error, collections) {
            if (error)
                return reject(error);
            if (collections.length == 0)
                return resolve();
            var promises = collections.map(function (collection) {
                return collection.remove({});
            });
            Promise.all(promises)
                .then(function () { return resolve(); });
        });
    });
}
exports.clear_database = clear_database;
//# sourceMappingURL=index.js.map