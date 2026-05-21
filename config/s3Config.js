const { S3Client } = require('@aws-sdk/client-s3')

// let cliente = null

// function getCliente() {
//   if (!cliente) {
//     cliente = new S3Client({ region: process.env.AWS_REGION })
//   }
//   return cliente
// }

const cliente = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

// console.log('cliente s3 inicializado en region:', process.env.AWS_REGION)

module.exports = { cliente }
