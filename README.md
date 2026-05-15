# subir-imagenes-s3

endpoint en express para subir imagenes directamente a un bucket de s3

## setup

```bash
npm install
cp .env.example .env
# editar .env con tus credenciales
```

## uso

```bash
npm run dev
```

POST `/subir` con form-data, campo `imagen`

```bash
curl -X POST http://localhost:3000/subir \
  -F "imagen=@foto.jpg"
```

respuesta:
```json
{
  "url": "https://tu-bucket.s3.us-east-1.amazonaws.com/imagenes/uuid-foto.jpg",
  "nombre": "uuid-foto.jpg"
}
```

## variables de entorno

ver `.env.example`

## notas

- maximo 5mb por imagen
- formatos: jpg, png, webp
- las imagenes se guardan en `imagenes/` dentro del bucket
