migrate((db) => {
  const collection = new Collection({
    "id": "b6lzimc4kfoxluf",
    "created": "2023-04-22 10:45:29.055Z",
    "updated": "2023-04-22 10:45:29.055Z",
    "name": "tasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ms4conhn",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "amtd3m7e",
        "name": "description",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "csremq4w",
        "name": "deadline",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
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
  const collection = dao.findCollectionByNameOrId("b6lzimc4kfoxluf");

  return dao.deleteCollection(collection);
})
