'use strict';

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middleWares = jsonServer.defaults();

server.use(middleWares);
server.use(jsonServer.rewriter({
  '/api/v1/*':'/$1',
  '/api/v1/*/*':'/$1/$2'
}))
server.use(router);
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  res.status(200).jsonp({
   count: res.locals.data.length,
   results: [res.locals.data]
  })
}

server.listen(3000, () => {
  console.log('JSON Server on port 3000.')
})