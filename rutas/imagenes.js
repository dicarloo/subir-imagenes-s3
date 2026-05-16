const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { subirImagen } = require('../s3')
const { limpiarNombre } = require('../validaciones')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const permitidos = ['image/jpeg', 'image/png', 'image/webp']
    if (permitidos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('formato no permitido'))
    }
  }
})

// router.post('/', upload.single('imagen'), async (req, res) => {
//   const url = await subirImagen(...)
//   res.json({ url })
// })

router.post('/subir', upload.single('imagen'), async (req, res) => {
  // console.log('[ruta imagenes] archivo recibido:', req.file?.originalname)

  if (!req.file) {
    return res.status(400).json({ error: 'falta la imagen' })
  }

  const nombreLimpio = limpiarNombre(req.file.originalname)
  const nombreFinal = `${uuidv4()}-${nombreLimpio}`

  try {
    const url = await subirImagen({
      nombre: nombreFinal,
      buffer: req.file.buffer,
      tipo: req.file.mimetype
    })

    return res.json({
      ok: true,
      url,
      nombre: nombreFinal,
      tamano: req.file.size
    })
  } catch (err) {
    console.error('error subiendo a s3:', err.message)
    return res.status(500).json({ error: 'no se pudo subir' })
  }
})

module.exports = router
