migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  collection.listRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  collection.listRule = ""

  return dao.saveCollection(collection)
})
