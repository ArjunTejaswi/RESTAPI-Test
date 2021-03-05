 const http = require('http')

 const app =  require('./app')

 //env varibale if not set then it used as 3000
 const port = process.env.PORT || 3000

 //creating server command by passing listner
 const server = http.createServer(app);

server.listen(port)