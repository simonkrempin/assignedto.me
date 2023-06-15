migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z8ja063uwjtkgp")

  collection.listRule = "@request.auth.id = @collection.assigned.user.id"
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id = @collection.assigned.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z8ja063uwjtkgp")

  collection.listRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
