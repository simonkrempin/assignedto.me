migrate((db) => {
  const collection = new Collection({
    "id": "4z8ja063uwjtkgp",
    "created": "2023-04-22 10:51:58.218Z",
    "updated": "2023-04-22 10:51:58.218Z",
    "name": "assigned",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mraipq49",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "q3blu8ad",
        "name": "task",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "b6lzimc4kfoxluf",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "2s9zvnm1",
        "name": "completed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4z8ja063uwjtkgp");

  return dao.deleteCollection(collection);
})
