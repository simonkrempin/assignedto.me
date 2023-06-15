migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  collection.listRule = "@request.auth.id = @collection.tasks.creator.id"
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id = @collection.tasks.creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  collection.listRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
