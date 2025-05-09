

# **Sistema de Facturación SIMIC - Documentación para Desarrolladores**

**Desarrollado por:** Ludwing Santiago Villamizar Murillo

## **🚀 Introducción**

Si deseas **probar el sistema sin instalar nada**, visita la rama `master` donde encontrarás:
👉 [Demo en producción](https://somic-facturacion-production.up.railway.app/)

Si prefieres **ejecutarlo localmente**, continúa con esta guía para desarrolladores.

------

## **📌 Descripción del Proyecto**

Sistema de facturación completo con:

- **Backend**: API REST con Node.js + Express (arquitectura MVC).
- **Frontend**: React.js con diseño responsive.
- **Base de datos**: MongoDB Atlas (NoSQL).
- **Validaciones**: Joi para esquemas + validaciones personalizadas.

### **🔧 Stack Tecnológico (MERN)**

| Capa           | Tecnologías                                          |
| :------------- | :--------------------------------------------------- |
| **Frontend**   | React, Vite, Axios, CSS Modules, React Router        |
| **Backend**    | Node.js, Express, Mongoose (ODM), Joi (validaciones) |
| **Base Datos** | MongoDB Atlas (Cloud)                                |
| **Deploy**     | Railway (Fullstack)                                  |

------

## **⚙️ Configuración Inicial**

### **1. Requisitos Previos**

- Node.js v18+
- npm v10.2.4 (`npm install -g npm@10.2.4`)
- MongoDB Compass (opcional)
- Postman (para pruebas de API)

### **2. Clonar el Repositorio**

```
git clone https://github.com/tu-repositorio/somic-facturacion.git  
cd somic-facturacion  
git checkout develop  # Cambia a rama de desarrollo  
```

### **3. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```
# Backend  
VITE_PORT_BACKEND=5001  
VITE_HOSTNAME=127.10.10.0  

# MongoDB (reemplaza con tus credenciales)  
URI_MONGODB=mongodb+srv://<user>:<password>@cluster0.r1bf6ku.mongodb.net/  
```

🔐 **Nota**: Usa una conexión segura a MongoDB Atlas con IP whitelisted.

------

## **📦 Instalación y Ejecución**

### **1. Instalar Dependencias**

```
npm install  # Instala dependencias del backend  
cd client  
npm install  # Instala dependencias del frontend  
cd ..  
```

### **2. Poblar la Base de Datos**

Ejecuta el script inicial en **MongoDB Compass** o la CLI:

```
use('somic');  

// Inserta clientes, artículos y facturas de prueba  
// (Ver script completo en api/scripts/initDB.js)  
```

### **3. Iniciar Servidores**

| Ambiente | Comando         | URL Acceso                                          |
| :------- | :-------------- | :-------------------------------------------------- |
| Backend  | `npm run start` | [http://127.10.10.0:5001](http://127.10.10.0:5001/) |
| Frontend | `npm run dev`   | [http://localhost:5002](http://localhost:5002/)     |

------

## **🧠 Arquitectura del Proyecto**

### **Estructura de Directorios**

```
somic-facturacion/  
├── api/  
│   ├── controllers/    # Lógica de endpoints  
│   ├── models/         # Esquemas Mongoose  
│   ├── routes/         # Definición de rutas  
│   ├── scripts/        # Datos iniciales  
│   └── validations/    # Esquemas Joi  
├── client/             # Frontend React  
└── .env.example        # Plantilla de variables  
```

### **🔍 Endpoints del Backend**

### **Clientes**

| Método | Ruta           | Descripción                |
| :----- | :------------- | :------------------------- |
| GET    | `/cliente`     | Lista todos los NITs       |
| GET    | `/cliente/:id` | Detalle de cliente por NIT |
| POST   | `/cliente`     | Crea nuevo cliente         |

### **Artículos**

| Método | Ruta                 | Descripción                |
| :----- | :------------------- | :------------------------- |
| GET    | `/articulos`         | Lista códigos de artículos |
| GET    | `/articulos/:codigo` | Detalle de artículo        |
| POST   | `/articulos`         | Crea nuevo artículo        |

### **Facturas**

| Método | Ruta                              | Descripción                 |
| :----- | :-------------------------------- | :-------------------------- |
| GET    | `/facturas`                       | Lista todas las facturas    |
| GET    | `/facturas/:id`                   | Facturas por cliente (NIT)  |
| GET    | `/facturas/completa/:factura`     | Detalle completo de factura |
| GET    | `/facturas/factura-kardex/kardex` | Kardex completo             |
| POST   | `/facturas`                       | Crea nueva factura          |

------

## **🛡️ Validaciones con Joi**

El sistema implementa **validaciones en capas**:

### **Ejemplo: Esquema de Artículo**

```
// api/validations/articulo.js  
const Joi = require('joi');  

const articuloSchema = Joi.object({  
  codigo: Joi.string().required(),  
  nombre: Joi.string().min(3).required(),  
  laboratorio: Joi.string().required(),  
  saldo: Joi.number().integer().min(0).required(),  
  costo_unidad: Joi.number().positive().required(),  
  precio_venta: Joi.number().min(Joi.ref('costo_unidad'))  
});  
```

**Errores comunes**:

```
{  
  "status": 400,  
  "message": "\"precio_venta\" must be greater than or equal to \"costo_unidad\""  
}  
```

------

## Consultas manualmente en Postman rápido y sencillo luego de ejecutar el script.

## Clientes:

Get

```
http://127.10.10.0:5001/cliente
```

Trae el documento de todos los clientes y como ejemplo retorna esto:

```
{
  "status": 200,
  "message": [
    {
      "documento": "123"
    },
    {
      "documento": "456"
    }
  ]
}
```



Get

```
http://127.10.10.0:5001/cliente/:id
```

Trae el documento del cliente que pongas en la url relmplazando el :id :

```
{
  "status": 200,
  "message": [
    {
      "_id": "681da11eb05ce3cb72bbf7f9",
      "documento": "123",
      "nombre": "Mediclinicos",
      "cupo": 980000,
      "plazo_dias": 30,
      "cartera": 120000
    }
  ]
}
```



Post

```
http://127.10.10.0:5001/cliente
```

Debes pasar esto por el req body:

```
{
	"documento": "123",
	"nombre": "Farmacias La Economía",
	"plazo_dias": 30,
	"cartera": 52500.00
}
```

## Artículos:

Get

```
http://127.10.10.0:5001/articulos
```

Trae todos los códigos de los articulos y como ejemplo retorna esto:

```
{
  "status": 200,
  "message": [
    {
      "codigo": "DLMDL"
    },
    {
      "codigo": "OMPRZ"
    }
  ]
}
```



Get

```
http://127.10.10.0:5001/articulos/:codigo
```

Trae el articulo que pongas en la url relmplazando el :codigo y como ejemplo retorna esto :

```
{
  "status": 200,
  "message": [
    {
      "_id": "681da13ab05ce3cb72bbf7fa",
      "codigo": "DLMDL",
      "nombre": "Acetamenofen",
      "laboratorio": "Campuslands",
      "saldo": 120,
      "costo_unidad": 6000,
      "precio_venta": 6000
    }
  ]
}
```



Post

```
http://127.10.10.0:5001/articulos
```

Debes pasar esto por el req body:

```
{
  "codigo": "OMIC",
  "nombre": "Omicomicosis",
  "laboratorio": "Medicina general",
  "saldo": 150,
  "costo_unidad": 3500.00
}
```

## Facturas:

Get

```
http://127.10.10.0:5001/facturas
```

Trae todas las facturas y como ejemplo retorna esto:

```
{
  "status": 200,
  "message": [
    {
      "_id": "681da155b05ce3cb72bbf7fb",
      "numero": "FE1280208567",
      "nit_cliente": "123",
      "fecha": "2025-05-09T06:31:49.777Z",
      "fecha_vencimiento": "2025-06-08T06:31:49.777Z",
      "total_Venta": 0,
      "total_Costo": 60000,
      "estado": "pendiente"
    },
    {
      "_id": "681da166b05ce3cb72bbf7fd",
      "numero": "FE3356526694",
      "nit_cliente": "123",
      "fecha": "2025-05-09T06:32:06.665Z",
      "fecha_vencimiento": "2025-06-08T06:32:06.665Z",
      "total_Venta": 120000,
      "total_Costo": 0,
      "estado": "pendiente"
    },
    {
      "_id": "681da1dcb05ce3cb72bbf801",
      "numero": "FE4922053892",
      "nit_cliente": "456",
      "fecha": "2025-05-09T06:34:04.409Z",
      "fecha_vencimiento": "2025-07-23T06:34:04.409Z",
      "total_Venta": 120000,
      "total_Costo": 70000,
      "estado": "pendiente"
    }
  ]
}
```



Get

```
http://127.10.10.0:5001/facturas/:id
```

Trae todas las facturas cambiando el :id por un nit de un cliente y retorna todas las facturas de ese cliente en especifico, por ejemplo :

```
{
  "status": 200,
  "message": [
    {
      "_id": "681da155b05ce3cb72bbf7fb",
      "numero": "FE1280208567",
      "nit_cliente": "123",
      "fecha": "2025-05-09T06:31:49.777Z",
      "fecha_vencimiento": "2025-06-08T06:31:49.777Z",
      "total_Venta": 0,
      "total_Costo": 60000,
      "estado": "pendiente"
    },
    {
      "_id": "681da166b05ce3cb72bbf7fd",
      "numero": "FE3356526694",
      "nit_cliente": "123",
      "fecha": "2025-05-09T06:32:06.665Z",
      "fecha_vencimiento": "2025-06-08T06:32:06.665Z",
      "total_Venta": 120000,
      "total_Costo": 0,
      "estado": "pendiente"
    }
  ]
}
```



Get

```
http://127.10.10.0:5001/facturas/completa/:factura
```

Trae toda la informacion de la factura que coloques cambiando el :factura por el numero de alguna factura emitida, como ejemplo trae esto:

```
{
  "status": 200,
  "message": [
    {
      "_id": "681da155b05ce3cb72bbf7fb",
      "numero": "FE1280208567",
      "nit_cliente": "123",
      "fecha": "2025-05-09T06:31:49.777Z",
      "fecha_vencimiento": "2025-06-08T06:31:49.777Z",
      "total_Venta": 0,
      "total_Costo": 60000,
      "estado": "pendiente",
      "articulos": [
        {
          "_id": "681da155b05ce3cb72bbf7fc",
          "numero_factura": "FE1280208567",
          "codigo_articulo": "DLMDL",
          "nombre_articulo": "Acetamenofen",
          "naturaleza": "positiva (+)",
          "unidades": 10,
          "costo_unitario": 6000,
          "subtotal_venta": 0,
          "subtotal_costo": 60000
        }
      ],
      "nombre_empresa": "Mediclinicos"
    }
  ]
}
```



Get

```
http://127.10.10.0:5001/facturas/factura-kardex/kardex
```

Trae todos los kardex o articulos que estan relacionados a las facturas ya emitidas, y como ejemplo trae esto :

```
{
  "status": 200,
  "message": [
    {
      "_id": "681da155b05ce3cb72bbf7fc",
      "numero_factura": "FE1280208567",
      "codigo_articulo": "DLMDL",
      "nombre_articulo": "Acetamenofen",
      "naturaleza": "positiva (+)",
      "unidades": 10,
      "costo_unitario": 6000,
      "subtotal_venta": 0,
      "subtotal_costo": 60000
    },
    {
      "_id": "681da166b05ce3cb72bbf7fe",
      "numero_factura": "FE3356526694",
      "codigo_articulo": "DLMDL",
      "nombre_articulo": "Acetamenofen",
      "naturaleza": "negativa (-)",
      "unidades": 20,
      "precio_venta_unitario": 6000,
      "subtotal_venta": 120000,
      "subtotal_costo": 0
    },
    {
      "_id": "681da1dcb05ce3cb72bbf802",
      "numero_factura": "FE4922053892",
      "codigo_articulo": "OMPRZ",
      "nombre_articulo": "Omeprazol",
      "naturaleza": "positiva (+)",
      "unidades": 20,
      "costo_unitario": 3500,
      "subtotal_venta": 0,
      "subtotal_costo": 70000
    },
    {
      "_id": "681da1dcb05ce3cb72bbf803",
      "numero_factura": "FE4922053892",
      "codigo_articulo": "DLMDL",
      "nombre_articulo": "Acetamenofen",
      "naturaleza": "negativa (-)",
      "unidades": 20,
      "precio_venta_unitario": 6000,
      "subtotal_venta": 120000,
      "subtotal_costo": 0
    }
  ]
}
```



Post

```
http://127.10.10.0:5001/facturas
```

Debes pasar esto por el req body:

```
{
  "factura": {
    "numero": "FE1280208567",
    "nit_cliente": "123"
  },
  "articulos": [
    {
      "codigo_articulo": "DLMDL",
      "numero_factura": "FE1280208567",
      "nombre_articulo": "Acetamenofen",
      "naturaleza": "positiva (+)",
      "unidades": 10,
      "costo_unitario": 6000
    }  
  ],
  "cartera": 20,
  "plazo_dias": 30
}
```

## **🧪 Pruebas con Postman**

Importa la colección `SIMIC.postman_collection.json` incluida en el repositorio.

### **Ejemplo: Crear Factura**

```
POST http://127.10.10.0:5001/facturas  
Body (raw-JSON):  
{  
  "factura": {  
    "numero": "FE2025001",  
    "nit_cliente": "123"  
  },  
  "articulos": [  
    {  
      "codigo_articulo": "ACX100",  
      "naturaleza": "negativa (-)",  
      "unidades": 5,  
      "precio_venta_unitario": 4000  
    }  
  ],  
  "plazo_dias": 30  
}  
```

------

## **🚨 Solución de Problemas**

### **Error: Conexión a MongoDB**

```
MongoServerError: bad auth  
```

✅ **Solución**:

1. Verifica `URI_MONGODB` en `.env`.
2. Asegura que tu IP esté whitelisted en MongoDB Atlas.

### **Error: Puerto en Uso**

```
Error: listen EADDRINUSE: address already in use :::5001  
```

✅ **Solución**:

```
lsof -i :5001  # Identifica el proceso  
kill -9 <PID>  # Finaliza el proceso  
```

------

## **📈 Próximas Mejoras**

- Tests unitarios con Jest
- Dockerización del proyecto
- Swagger para documentación de API