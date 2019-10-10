const path = require('path');

module.exports.get = function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public/') });
}
  
module.exports.post = function (req, res) {
    res.json({ title: 'Main' });
}
  