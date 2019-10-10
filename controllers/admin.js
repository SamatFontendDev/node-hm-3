const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const db = require('../models/db')();

module.exports.get = function (req, res) {
    res.sendFile('admin.html', { root: path.join(__dirname, '../public/') });
};
  
module.exports.adminUpload = function (req, res, next) {
    let form = new formidable.IncomingForm();
    let upload = path.join('./public', 'upload');
  
    if (!fs.existsSync(upload)) {
      fs.mkdirSync(upload);
    }

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, function (err, fields, files) {
        if (err) {
          return next(err);
        }

        const valid = validation(fields, files)

        if (valid.err) {
            fs.unlinkSync(files.photo.path)
            return res.redirect(`/?msg=${valid.status}`)
        }

        const fileName = path.join(upload, files.photo.name)

        fs.rename(files.photo.path, fileName, function (err) {
            if (err) {
                console.error(err.message);
                return
            }

            let dir = fileName.substr(fileName.indexOf('\\'))
            let obj =  {
                    'name': fields.name
                    'img': dir,
                    'price': fields.price
                };
            
          
            db.set('product', obj)
            db.save()
            res.redirect('/admin')
        });
    });
};

module.exports.adminSkills = function(req, res, next) {
  
}

const validation = (fields, files) => {
    if (files.photo.name === '' || files.photo.size === 0) {
      return { status: 'Не загружена картинка!', err: true }
    }
    if (!fields.name) {
      return { status: 'Не указано описание товара!', err: true }
    }
    if(fields.price) {
        return {status: 'Не указанна цена товара!'}
    }
    return { status: 'Ok', err: false }
  }