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

    /*Using the url library, get the url and perse it. We do this by creating a variable and assigning it the value url.perse which takes two parametres, the requested url and a boolian true. The second parametre asks the query string module to perse metadata about the requested url.*/

    const parsedUrl = url.parse(req.url,true); // Correct perse to parse

    /*Get path from parsedUrl object. pathname is a key set on parsedUrl object, which is basically an untrimmed path that the user requested.*/

    /*Get trimmed path. This will trim off from our url any of the symbols in the first parametre and replace them with an empty space in the second parametre.*/

    const path =parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    /*Get the query string as an object and assign it to a variable. We do this by declaring a variable and assigning it the querry from parsedURL. The query object can be found inb the parsedURL thatnks to the true boolian value we assigned to the url.parse parametres. This means that if someone sends a url with queries, they will be parsed to our query string object.*/

    const queryStringObject = parsedUrl.query;

    /*Define how to get HTTP Method. This will tell us which HTTP method the user is requesting. Method include POST, GET, PUT, DELETE and HEAD. The method is one of the objects available in the (req) object. We also specify that everything is in lower case. */

    const method = req.method.toLowerCase();

    /*Get the headers as an object*/

    const headers = req.headers;

    /*Send the response. We will use our original response in the function.*/
    res.end('Hello World\n');

    /*Log the request path.*/
    /*Modify log out statment to include HTTP method*/
    /*Modify log out statement to include queryStringObject output*/
    /*Modify log out statement to include headers output*/

    console.log('Request received on path: ' + trimmedPath + 'with method: ' + method + ' with these query string parametres',queryStringObject + 'Request received with these headers',headers); //syntax error correction

});

/*Start the server and have it listen to port 3000. We do this using server.listen and pass it the port number and a call back funtion that tell us when the server is done listening.*/

server.listen(3000, function(){

    console.log('The server is listening to port 3000 now.');
    
});