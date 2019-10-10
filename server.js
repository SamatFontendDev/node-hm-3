const express = require('express');
const path = require('path');
const app = express();


app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, './public/')));

app.use('/', require('./routes/index'));

app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
});

app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500)
    res.render('error', { message: err.message, error: err });
  })
  
const server = app.listen(process.env.PORT || 3000, function () {
    console.log('Сервер запущен на порте: ' + server.address().port);
})
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });