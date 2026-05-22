const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { subirImagen, eliminarImagen } = require('../s3')
const { limpiarNombre } = require('../validaciones')
const { validarImagen } = require('../middlewares/validarImagen')
const { upload } = require('../config/multerConfig')

// const multer = require('multer')

const router = express.Router()

// router.post('/', upload.single('imagen'), async (req, res) => {
//   const url = await subirImagen(...)
//   res.json({ url })
// })

router.post('/subir', upload.single('imagen'), validarImagen, async (req, res) => {
  // console.log('[ruta imagenes] archivo recibido:', req.file?.originalname)

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

router.delete('/eliminar/:nombre', async (req, res) => {
  const { nombre } = req.params

  if (!nombre) {
    return res.status(400).json({ error: 'falta el nombre' })
  }

  // console.log('eliminando archivo:', nombre)

  try {
    await eliminarImagen(nombre)
    return res.json({ ok: true, eliminado: nombre })
  } catch (err) {
    console.error('error eliminando de s3:', err.message)
    return res.status(500).json({ error: 'no se pudo eliminar' })
  }
})

// router.get('/lista', async (req, res) => {
//   // esto lo deje pendiente, falta implementar listado del bucket
// })

module.exports = router
