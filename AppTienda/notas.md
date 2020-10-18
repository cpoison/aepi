## Rutas

Para iniciar mongodb:
```shell
mongod --dbpath="/Users/cpoison/Documents/AEPI/mongodata"

```

GET /productos - Recupera todos los productos
GET /productos/:idProducto - Recupera un único producto
GET /productos/new - Formulario con los datos de creación de producto
POST /productos/create - Genera un nuevo producto
GET /productos/edit/:IdProducto - Formulario para editar producto
POST /productos/update - Editar un producto
GET /productos/delete/:IdProducto - Borrar un producto

<!-- API -->

GET /api/productos - Recuperar todos los productos
POST /api/productos - Crear un producto
PUT /api/productos - Actualizar un producto
DELETE /api/productos - Borra un producto



POST /api/usuarios/login - Recibe username y password y devuelve token si la autenticacion es correcta

POST /api/usuarios/registro - Recibe los datos del usuario y crea uno nuevo
