use('somic');

db.clientes.insertMany([
    {
        documento: "123",
        nombre: "Farmacias La Economía",
        cupo: 80000.00,
        plazo_dias: 30,
        cartera: 52500.00
    },
    {
        documento: "321",
        nombre: "Droguería Salud Total",
        cupo: 180000.00,
        plazo_dias: 60,
        cartera: 0.00
    },
    {
        documento: "456",
        nombre: "Distribuidora Médica ABC",
        cupo: 250000.00,
        plazo_dias: 45,
        cartera: 15000.00
    }
]);

db.articulos.insertMany([
    {
        codigo: "ACX100",
        nombre: "Acetaminofén 500mg x 10 tabletas",
        laboratorio: "Genfar S.A.",
        saldo: 150,
        costo_unidad: 3500.00,
        precio_venta: 3500.00
    },
    {
        codigo: "IBP200",
        nombre: "Ibuprofeno 400mg x 20 cápsulas",
        laboratorio: "Bayer S.A.",
        saldo: 80,
        costo_unidad: 12500.00,
        precio_venta: 12500.00
    },
    {
        codigo: "OMZ20",
        nombre: "Omeprazol 20mg x 14 cápsulas",
        laboratorio: "Tecnoquímicas",
        saldo: 45,
        costo_unidad: 9800.00,
        precio_venta: 9800.00
    },
    {
        codigo: "LOR10",
        nombre: "Loratadina 10mg x 10 tabletas",
        laboratorio: "Procaps S.A.",
        saldo: 60,
        costo_unidad: 7500.00,
        precio_venta: 7500.00
    }
]);

db.factura.insertMany([
    {
        numero: "FE2025-001",
        fecha: new Date("2025-04-15"),
        fecha_vencimiento: new Date("2025-05-15"), 
        nit_cliente: "123",
        total_Venta: 52500.00,
        total_Costo: 42000.00,
        estado: "pendiente"
    },
    {
        numero: "FE2025-002",
        fecha: new Date("2025-04-18"),
        fecha_vencimiento: new Date("2025-06-17"),
        nit_cliente: "123",
        total_Costo: 9800.00,
        estado: "pagado"
    },
    {
        numero: "FE2025-003",
        fecha: new Date("2025-04-18"),
        fecha_vencimiento: new Date("2025-06-17"),
        nit_cliente: "321",
        total_Venta: 55000.00,
        estado: "pagado"
    },
    {
        numero: "FE2025-004",
        fecha: new Date("2025-04-18"),
        fecha_vencimiento: new Date("2025-06-17"),
        nit_cliente: "456",
        total_Venta: 15000.00,
        total_Costo: 98000.00,
        estado: "pendiente"
    }
]);

db.facturakardex.insertMany([
    {
        numero_factura: "FE2025-001",
        codigo_articulo: "ACX100",
        nombre_articulo: "Acetaminofén 500mg x 10 tabletas",
        naturaleza: "negativa (-)",
        unidades: 10,
        precio_venta_unitario: 5250.00,
        subtotal_venta: 52500.00,
    },
    {
        numero_factura: "FE2025-001",
        codigo_articulo: "IBP200",
        nombre_articulo: "Ibuprofeno 400mg x 20 cápsulas",
        naturaleza: "positiva (+)",
        unidades: 7,
        costo_unitario: 10000.00,
        subtotal_costo: 70000.00,
    },
    {
        numero_factura: "FE2025-002",
        codigo_articulo: "OMZ20",
        nombre_articulo: "Omeprazol 20mg x 14 cápsulas",
        naturaleza: "positiva (+)",
        unidades: 1,
        costo_unitario: 9800.00,
        subtotal_costo: 9800.00,
    },
    {
        numero_factura: "FE2025-003",
        codigo_articulo: "ACX100",
        nombre_articulo: "Acetaminofén 500mg x 10 tabletas",
        naturaleza: "negativa (-)",
        unidades: 10,
        precio_venta_unitario: 5500.00,
        subtotal_venta: 55000.00,
    },
    {
        numero_factura: "FE2025-004",
        codigo_articulo: "OMZ20",
        nombre_articulo: "Omeprazol 20mg x 14 cápsulas",
        naturaleza: "positiva (+)",
        unidades: 10,
        costo_unitario: 9800.00,
        subtotal_costo: 98000.00,
    },
    {
        numero_factura: "FE2025-004",
        codigo_articulo: "LOR10",
        nombre_articulo: "Loratadina 10mg x 10 tabletas",
        naturaleza: "negativa (-)",
        unidades: 2,
        precio_venta_unitario: 7500.00,
        subtotal_venta: 15000.00,
    }
]);