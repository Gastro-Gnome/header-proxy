const proxy = require('express-http-proxy');
var express  = require('express');
var app  = express();

app.use('/:id', express.static(__dirname + '/../'));

const port = 3000;
var serverOne = 'http://52.90.9.19/',
    ServerTwo = 'http://18.191.38.179/',
    ServerThree = 'http://13.57.181.95:1337/',
    ServerFour = ''

app.use('/:id/header', proxy(ServerTwo, {
    proxyReqPathResolver: req => {
        console.log('Grab Header')
        let url = req.url;
        if (url !== '/bundle.js'){
          url = '/header';
        }
        return `/${req.params.id}${url}`;
      }
  }));
app.use('/:id/reviews', proxy(ServerThree , {
    proxyReqPathResolver: req => {
        console.log('Grab Reviews')
        let url = req.url;
        if (url !== '/dist/bundle.js'){
          url = '/reviews';
        }
        return `/${req.params.id}${url}`;
      }
  }));
  app.use('/:id/photos', proxy(serverOne, {
      proxyReqPathResolver: (req) => {
          console.log('Grab Photos')
          let url = req.url;
      if (url !== '/main.js'){
        url = '/photos';
      }
      return `/${req.params.id}${url}`;
    }
  }));

app.get('/', (req, res)=>{
    res.end();
})
app.listen(port, function(){
    console.log('Header Proxy listening on port ' + port);
})

module.exports = app;
