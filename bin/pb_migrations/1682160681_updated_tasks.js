migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  // remove
  collection.schema.removeField("dsjlb5tn")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dsjlb5tn",
    "name": "assignees",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
