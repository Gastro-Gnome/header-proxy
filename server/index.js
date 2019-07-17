const proxy = require('express-http-proxy');
var express  = require('express');
var app      = express();
//var httpProxy = require('http-proxy');
//var apiProxy = httpProxy.createProxyServer();
app.use(express.static(__dirname + '/../'));

const port = 5000;
var serverOne = 'http://localhost:3001',
    ServerTwo = 'http://localhost:3002',
    ServerThree = 'http://localhost:3003',
    ServerFour = 'http://localhost:3004'
 
// app.all("/photos", function(req, res) {
//     console.log('redirecting to Server1 Photos');
//     apiProxy.web(req, res, {target: serverOne});
// });

// app.all("/header", function(req, res) {
//     console.log('redirecting to Server2 Header');
//     apiProxy.web(req, res, {target: ServerTwo});
// });

// app.all("/reviews", function(req, res) {
//     console.log('redirecting to Server3');
//     apiProxy.web(req, res, {target: ServerThree});
// });

// app.all("/reservations", function(req, res) {
//     console.log('redirecting to Server2');
//     apiProxy.web(req, res, {target: ServerFour});
// });

app.use('/header', proxy(ServerTwo));
app.use('/photos', proxy(serverOne));
app.use('/reviews', proxy(ServerThree));

app.get('/', (req, res)=>{
    res.end();
})
app.listen(port, function(){
    console.log('Header Proxy listening on port ' + port);
})

module.exports = app;
//reviews 3003
//reservations 3004

