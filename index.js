/*
* Primary file to the API
*
*
*/

//Dependencies

/*Import node built in module called HTTP. This is the HTTP server that lets us listen on ports and respond with data. We will do this using a const and require statement. */

/*Import url library. This will parse url that client are asking for. Url is one of the resources that people will interact with when interacting with the API.*/

const http = require('http');
const url = require('url');

/*Use the http module defined to configure the server so that it responds to all requests of type string. We do this by creating a server object. Then use http.createServer to create the server and pass it a call back function. The call back function will accept two parametres, req which stands for request and res which stands for respond. We will then use a built in function inside the res object to send a string back in response to any request.*/

const server = http.createServer(function(req, res){

    res.end('Hello World\n');

});

/*Start the server and have it listen to port 3000. We do this using server.listen and pass it the port number and a call back funtion that tell us when the server is done listening.*/

server.listen(3000, function(){

    console.log('The server is listening to port 3000 now.');
    
});