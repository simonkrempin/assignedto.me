migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z8ja063uwjtkgp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q3blu8ad",
    "name": "task",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "b6lzimc4kfoxluf",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z8ja063uwjtkgp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q3blu8ad",
    "name": "task",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "b6lzimc4kfoxluf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
