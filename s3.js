const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

// const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const cliente = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

// const cliente = new S3Client({ region: process.env.AWS_REGION })

async function subirImagen({ nombre, buffer, tipo }) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `imagenes/${nombre}`,
    Body: buffer,
    ContentType: tipo
    // ACL: 'public-read'
  }

  // console.log('params s3:', params)

  const comando = new PutObjectCommand(params)
  await cliente.send(comando)

  const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/imagenes/${nombre}`

  // const url = await getUrlFirmada(nombre)
  // console.log('url armada:', url)

  return url
}

// async function getUrlFirmada(nombre) {
//   const comando = new GetObjectCommand({
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: `imagenes/${nombre}`
//   })
//   const url = await getSignedUrl(cliente, comando, { expiresIn: 3600 })
//   return url
// }

module.exports = { subirImagen }
