const proxy = require('express-http-proxy');
var express  = require('express');
var app  = express();
//var httpProxy = require('http-proxy');
//var apiProxy = httpProxy.createProxyServer();
app.use(express.static(__dirname + '/../'));

const port = 5000;
var serverOne = 'http://ec2-52-90-9-19.compute-1.amazonaws.com/',
    ServerTwo = 'http://18.191.38.179/',
    ServerThree = 'http://13.52.99.182:1337',
    ServerFour = ''
 
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

// app.use('/header', proxy(ServerTwo));
// app.use('/photos', proxy(serverOne));
// app.use('/reviews', proxy(ServerThree));


app.use('/header', proxy(ServerTwo, {
    proxyReqPathResolver: req => {
      if(req.url === '/bundle.js') {
        return req.url;
      } else {
        return '/header' + req.url
      }
    }
  }));;
app.use('/reviews', proxy(ServerThree, {
    proxyReqPathResolver: req => {
      if(req.url === '/dist/bundle.js') {
        return req.url;
      } else {
        return '/reviews' + req.url
      }
    }
  }));
app.use('/photos', proxy(serverOne, {
    proxyReqPathResolver: req => {
      if(req.url === '/main.js') {
        return req.url;
      } else {
        return '/photos' + req.url
      }
    }
  }));
  ;

app.get('/', (req, res)=>{
    res.end();
})
app.listen(port, function(){
    console.log('Header Proxy listening on port ' + port);
})

module.exports = app;
//reviews 3003
//reservations 3004

