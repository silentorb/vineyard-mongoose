export function clear_database(connection): Promise<any> {
  return new Promise((resolve, reject) => {
    return connection.db.collections((error, collections) => {
      if (error)
        return reject(error)

      if (collections.length == 0)
        return resolve()

      const promises = collections.map(collection => {
        return collection.remove({})
      })

      Promise.all(promises)
        .then(() => resolve())
    })
  })
}