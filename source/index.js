"use strict";
var mongoose_1 = require("mongoose");
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
function create_model(name, properties, options) {
    if (options === void 0) { options = {}; }
    var schema = new mongoose_1.Schema(properties, options);
    return mongoose_1.model(name, schema);
}
function define_schema(definitions) {
    var result = {};
    for (var name_1 in definitions) {
        var definition = definitions[name_1];
        result[name_1] = create_model(name_1, definition);
    }
    return result;
}
exports.define_schema = define_schema;
//# sourceMappingURL=index.js.map