# telegraf.js-mongo
[beta] telegraf.js middleware to push info about bot users to mongodb

usage:
```
const mongoMiddleware = require('telegraf-mongodb-middleware')(mongoDbConnectionString);
bot.use(mongoMiddleware);
```

`mongoDbConnectionString` here is the connection string to mongodb

use it before any other message handlers (like `on`, `help`, `start`, others)

every message from any user updates or creates corresponding document in `users` collection:
```
{
"_id":{"$oid":"5eabe9897ddf3f01d1de2947"},
"id":63182434, - id
"__v":0,
"date":{"$date":"2020-05-01T09:18:35.952Z"}, - date of first event
"first_name":"МЕМОЛОГИЧЕСКАЯ ЭКСПЕДИЦИЯ", - first_name, last_name if exists
"language_code":"en", - telegram language
"ping":{"$date":"2020-05-04T11:34:24.764Z"}, - last message time
"username":"dmitryq", - username
"messages":107 - count of user's messages
}
```

## TODO:
* another table and option for storing messages
* maybe error handling
