# subir-imagenes-s3

endpoint en express para subir imagenes directamente a un bucket de s3

## setup

```bash
npm install
```

crear un archivo `.env` en la raiz del proyecto con esto:

```
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=nombre-de-tu-bucket
PORT=3000
```

## uso

```bash
npm run dev
```

POST `/imagenes/subir` con form-data, campo `imagen`

```bash
curl -X POST http://localhost:3000/imagenes/subir \
  -F "imagen=@foto.jpg"
```

respuesta:
```json
{
  "ok": true,
  "url": "https://tu-bucket.s3.us-east-1.amazonaws.com/imagenes/uuid-foto.jpg",
  "nombre": "uuid-foto.jpg",
  "tamano": 204800
}
```

## notas

- maximo 5mb por imagen
- formatos: jpg, png, webp
- las imagenes se guardan en `imagenes/` dentro del bucket
