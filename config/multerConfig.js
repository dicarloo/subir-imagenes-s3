const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// })

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const permitidos = ['image/jpeg', 'image/png', 'image/webp']
    // console.log('tipo de archivo:', file.mimetype)
    if (permitidos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('formato no permitido'))
    }
  }
})

module.exports = { upload }
