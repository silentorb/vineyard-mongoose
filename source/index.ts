export function clear_database(connection): Promise<any> {
  return new Promise((resolve, reject) => {
    return connection.db.collections((error, collections) => {
      if (error)
        return reject(error)

      if (collections.length == 0)
        return resolve()

      const promises = collections
        .filter(c=>c.s.name != 'system.indexes')
        .map(collection => {
        return new Promise((resolve, reject) => {
          collection.remove({}, (error, result) => {
            if (error)
              reject(error)
            else
              resolve()
          })
        })
      })

      Promise.all(promises)
        .then(() => resolve())
    })
  })
}