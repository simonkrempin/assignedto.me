migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  collection.createRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
})
