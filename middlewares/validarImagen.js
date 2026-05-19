// middleware para validar antes de que llegue al handler

// function validarImagen(req, res, next) {
//   if (!req.file) return res.status(400).json({ error: 'sin imagen' })
//   next()
// }

function validarImagen(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: 'no se envio ninguna imagen' })
  }

  const maxBytes = 5 * 1024 * 1024
  if (req.file.size > maxBytes) {
    return res.status(400).json({ error: 'imagen muy grande, maximo 5mb' })
  }

  // console.log('imagen valida, pasando al handler')
  next()
}

module.exports = { validarImagen }
