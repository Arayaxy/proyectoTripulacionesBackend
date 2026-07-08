-- CreateTable
CREATE TABLE "clientes" (
    "id_cliente" UUID NOT NULL,
    "cliente" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "espacios" (
    "id_espacio" UUID NOT NULL,
    "nombre_espacio" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "aforo" TEXT NOT NULL,
    "nota" TEXT NOT NULL,
    "telefono_contacto" INTEGER NOT NULL,
    "nombre_contacto" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "salaId" UUID NOT NULL,

    CONSTRAINT "espacios_pkey" PRIMARY KEY ("id_espacio")
);

-- CreateTable
CREATE TABLE "estados" (
    "id_estado" UUID NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id_estado")
);

-- CreateTable
CREATE TABLE "eventos_ponentes" (
    "id_evento_ponente" UUID NOT NULL,
    "nombre_hotel" TEXT NOT NULL,
    "nota_transporte" TEXT NOT NULL,
    "horario_ida_transporte" TEXT NOT NULL,
    "horario_vuelta_transporte" TEXT NOT NULL,
    "localizacion_hotel" TEXT NOT NULL,
    "horario_ponencia" TEXT NOT NULL,
    "checkin_horario" TEXT NOT NULL,
    "ponente_estado" TEXT NOT NULL,
    "presentacion_link" TEXT NOT NULL,
    "billete_ida_link" TEXT NOT NULL,
    "billete_vuelta_link" TEXT NOT NULL,
    "tipo_ponencia" TEXT NOT NULL,
    "ponenteId" UUID NOT NULL,

    CONSTRAINT "eventos_ponentes_pkey" PRIMARY KEY ("id_evento_ponente")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id_evento" UUID NOT NULL,
    "nombre_evento" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "lugar_confirmado" TEXT NOT NULL,
    "fecha_inicio" INTEGER NOT NULL,
    "fecha_fin" INTEGER NOT NULL,
    "numero_personas" INTEGER NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "nota" TEXT NOT NULL,
    "presupuestoId" UUID,
    "clienteId" UUID NOT NULL,
    "estadoId" UUID NOT NULL,
    "salaId" UUID NOT NULL,
    "evento_ponenteId" UUID NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "ponentes" (
    "id_ponente" UUID NOT NULL,
    "nombre_ponente" TEXT NOT NULL,
    "docu_identificacion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "foto_link" TEXT NOT NULL,
    "cv_link" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "ponentes_pkey" PRIMARY KEY ("id_ponente")
);

-- CreateTable
CREATE TABLE "presupuestos" (
    "id_presupuesto" UUID NOT NULL,
    "estado_prespuesto" BOOLEAN NOT NULL,
    "total" INTEGER NOT NULL,
    "fecha" INTEGER NOT NULL,
    "nota_ubicacion" TEXT NOT NULL,
    "precio_ubicacion" INTEGER NOT NULL,
    "nota_catering" TEXT NOT NULL,
    "precio_catering" INTEGER NOT NULL,
    "nota_audiovisuales" TEXT NOT NULL,
    "precio_audiovisuales" INTEGER NOT NULL,
    "nota_otros" TEXT NOT NULL,
    "precio_otros" INTEGER NOT NULL,
    "catering" BOOLEAN NOT NULL,
    "audiovisuales" BOOLEAN NOT NULL,
    "otros" BOOLEAN NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "presupuestos_pkey" PRIMARY KEY ("id_presupuesto")
);

-- CreateTable
CREATE TABLE "salas" (
    "id_sala" UUID NOT NULL,
    "nombre_Sala" TEXT NOT NULL,
    "tipo_sala" TEXT NOT NULL,
    "capacidad_max_sala" TEXT NOT NULL,
    "nota_sala" TEXT NOT NULL,

    CONSTRAINT "salas_pkey" PRIMARY KEY ("id_sala")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" UUID NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "espacios_email_contacto_key" ON "espacios"("email_contacto");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_presupuestoId_key" ON "eventos"("presupuestoId");

-- CreateIndex
CREATE UNIQUE INDEX "ponentes_email_key" ON "ponentes"("email");

-- AddForeignKey
ALTER TABLE "espacios" ADD CONSTRAINT "espacios_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas"("id_sala") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_ponentes" ADD CONSTRAINT "eventos_ponentes_ponenteId_fkey" FOREIGN KEY ("ponenteId") REFERENCES "ponentes"("id_ponente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES "presupuestos"("id_presupuesto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estados"("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas"("id_sala") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_evento_ponenteId_fkey" FOREIGN KEY ("evento_ponenteId") REFERENCES "eventos_ponentes"("id_evento_ponente") ON DELETE RESTRICT ON UPDATE CASCADE;
