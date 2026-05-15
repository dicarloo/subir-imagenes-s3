require('dotenv').config()
const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { subirImagen } = require('./s3')
const { limpiarNombre } = require('./validaciones')

const app = express()
const PORT = process.env.PORT || 3000

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // console.log('mimetype recibido:', file.mimetype)
    const permitidos = ['image/jpeg', 'image/png', 'image/webp']
    if (permitidos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('solo se permiten imagenes jpg, png o webp'))
    }
  }
})

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/subir', upload.single('imagen'), async (req, res) => {
  // console.log('req.file:', req.file)
  // console.log('headers:', req.headers)

  if (!req.file) {
    return res.status(400).json({ error: 'no se recibio ninguna imagen' })
  }

  const nombreLimpio = limpiarNombre(req.file.originalname)
  const nombreArchivo = `${uuidv4()}-${nombreLimpio}`

  // const nombreArchivo = req.file.originalname
  // const nombreArchivo = Date.now() + '_' + req.file.originalname

  try {
    const url = await subirImagen({
      nombre: nombreArchivo,
      buffer: req.file.buffer,
      tipo: req.file.mimetype
    })

    // console.log('url generada:', url)

    res.json({ url, nombre: nombreArchivo })
  } catch (error) {
    console.error('error al subir:', error.message)
    res.status(500).json({ error: 'fallo al subir la imagen' })
  }
})

app.use((err, req, res, next) => {
  if (err.message === 'solo se permiten imagenes jpg, png o webp') {
    return res.status(400).json({ error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'error interno' })
})

app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`)
})
