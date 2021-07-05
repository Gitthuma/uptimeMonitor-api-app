/*
* Primary file to the API
*
*
*/

//Dependencies

/*Import node built in module called HTTP. This is the HTTP server that lets us listen on ports and respond with data. We will do this using a const and require statement. */

/*Import url library. This will parse url that client are asking for. Url is one of the resources that people will interact with when interacting with the API.*/

/*Require a library called string decoder. The StringDecoder library has other things but for our purpose we need the StringDecoder property of that object.*/

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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

    /*Get the payload if any. For this we will need a library called string decoder, So we are going to require it as one of the dependancies.*/
    
    /*Create a new string decorder. When you create a string decoder, you should tell it what char set to expect and in our case is utf-8. This is the case for most JSON API*/

    /*Node deals heavily with streams. These are bits of information coming in at a time as opposed to all at once. Payloads that come in as part of an HTTP request, come in to the HTTP server as a stream, so we need to collect that stream as it comes in, and then when the stream tells us that we are at the end coalesce it into one coherent thing before we can figure out what that payload is. So before we do that, we need to creat a new string to hold it. We are goin to call it buffer and initialize it to an empty string itself and as new data comes in, we will append it to that empty string. we do that by binding it to an event that the request object emits, and that event is called data. So when the request object emits the event data, we want a call back function data to be called so that the data that is being emited to be passed to this call back. Then the buffer that we created earlier should have the data appended to it through a string decoder. So the buffer is going to be appended with decorder.write plus the data that we receive.*/ 
    
    /*We then need another event that tells us that the stream is done, when it is done, that event is called end. When the request object emits end, we call a function call back that doesn't take any parametres that will append the buffer with decoder.end()*/

    /*After the end event is done, we need to continue with the other processes namely sending response and loggin the request. To do this we need to change the position of both response code and the logging code from where they are into the handler of the end event. This is done because even when the request doesnt have a payload, the end event will still be called.*/

    const decoder = new StringDecoder('utf-8');

    var buffer = ''; //Changed variable from const to var

    req.on('data', function(data){

        buffer += decoder.write(data); //corrected syntax

    });

    req.on('end', function(){

        buffer += decoder.end();

        /*Send the response. We will use our original response in the function.*/
        res.end('Hello World\n');

        /*Log the request path.*/
        /*Modify log out statment to include HTTP method*/
        /*Modify log out statement to include queryStringObject output*/
        /*Modify log out statement to only include headers output*/
        /*Modify log out statement to only include payload request*/

        console.log('Request received with this payload: ', buffer); 

    });

});

/*Start the server and have it listen to port 3000. We do this using server.listen and pass it the port number and a call back funtion that tell us when the server is done listening.*/

server.listen(3000, function(){

    console.log('The server is listening to port 3000 now.');
    
});

/*Define handlers. This is where the router will route traffic to when a request is called, to find a  corresponding handler. We will name it handlers and initialize it to an empty object.*/

const handlers = {};

/*Write the sample handler structure. Its going to be a function that accepts data and a callback as parametres. The data that it receives will be a bulk of everything contained in the request. The callback will be what the handlers will output after they are done handling the request. the output will include two things: the HTTP status code and a payload which should be an object*/

handlers.sample = function(data, callback){

    //Callback a HTTP status code and a payload object
    callback(406, {'name' : 'sample handler'});

};

/*Define the not found handler structure. We dont need to write this inside the router as it will only be called when nothing matches anything else in the router. This will be a function that accepts data and a callback as parametres.*/

handlers.notFound = function(data, callback){

    //Callback a HTTP status
    callback(404);

};

/*Define a request router. This will route the requests to their respective handlers. We will call it router and it is going to be an object. This is because each path is unique so an object will be best for the work.We will define one path for now, the path will be called sample and it will call the sample path handler.*/

const router = {

    "sample" : handlers.sample

};