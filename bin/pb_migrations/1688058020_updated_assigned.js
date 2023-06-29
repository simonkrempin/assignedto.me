migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z8ja063uwjtkgp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mraipq49",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
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
    "id": "mraipq49",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "email"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
