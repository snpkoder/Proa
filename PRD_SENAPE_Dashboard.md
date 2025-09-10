# PRD: Dashboard Ejecutivo y Sistema Institucional SENAPE 2025

## 1. Pantalla Principal: Dashboard Ejecutivo Institucional

La página principal es un dashboard institucional, inspirado en el gráfico adjunto (dashb), mostrando resultados anuales, trimestrales y acumulados (por gestión), adaptado a los requerimientos del PEI y POA SENAPE.

### Componentes Clave (Frontend)

- **Indicadores Principales**
  - % Cumplimiento DEJURBE (Meta 95%)
  - % Calidad de registros DEJURBE (Meta 50%)
  - % Avance Físico Institucional (Meta 90%)
  - % Avance Financiero Institucional (Meta 90%)
  - Eficiencia relativa y ponderada (según fórmulas oficiales)
  - N° Acciones Estratégicas, Operaciones, Tareas
  - Presupuesto vigente y ejecutado

- **Visualizaciones Dinámicas**
  - Gauge charts para avance físico, financiero y eficiencia
  - Donut/pie para distribución de tareas y operaciones por área
  - Line/bar charts para evolución trimestral/anual de cumplimiento, calidad, presupuesto, tareas (usando Chart.js)
  - Grilla tipo hoja de cálculo para copiado/pegado y cálculos básicos (con opción para comentarios y aclaraciones)
  - Espacios para reportes automáticos (PDF/export Excel) y comentarios

- **Filtros y Navegación**
  - Filtros por gestión, área/dirección, tipo de indicador, periodo (anual, trimestral)
  - Navegación a dashboards operativos por área/dirección
  - Acceso rápido a reportes y panel de seguimiento

### Ejemplo de Layout (React/HTML/CSS + Chart.js)
- Utilizar React para componentes reutilizables, lazy loading y performance
- Diseño responsive, UX/UI moderno, modo oscuro opcional
- Carga de datos vía AJAX desde backend
- Espacios para comentarios y aclaraciones en gráficos y tablas

---

## 2. Backend: Microservicios PHP (Slim/Laravel recomendado)

**Módulos Principales:**

- `auth.php`: Autenticación 2FA, JWT, CSRF, HTTPS obligatorio
- `usuarios.php`: CRUD usuarios, roles y permisos (admin, técnico, evaluador)
- `poa.php`: Formulación, gestión, avance y modificación POA (validaciones automáticas)
- `indicadores.php`: Cálculo automático y seguimiento de indicadores estratégicos/complementarios según fórmulas oficiales
- `presupuesto.php`: Gestión presupuestaria, ejecución, modificaciones y análisis de eficiencia
- `reportes.php`: Generación de reportes PDF/Excel, logs de auditoría, exportación
- `integracion.php`: APIs REST para integración con sistemas SENAPE (DEJURBE, SIVALD, SIPROJ, etc.)
- `docs.php`: Gestión documental, control de versiones, flujos de aprobación

**Buenas Prácticas:**
- Validación/sanitización estricta (`filter_input`, PDO prepared statements, password_hash)
- Logs de auditoría detallados (access/change logs)
- Roles y permisos granular (middleware)
- Integración con sistemas externos vía APIs REST (documentados, tokenizados)
- Respuesta <3s, optimizaciones de rendimiento, caché de datos
- Despliegue seguro (HTTPS, backups automáticos, escalabilidad)

---

## 3. Base de Datos (MySQL, optimizada y ampliada)

### Tablas Clave

- **usuarios** (id, nombre, correo, clave_hash, rol, fecha_registro)
- **poa** (id, usuario_id, objetivo, actividad, indicador, presupuesto, fecha_inicio, fecha_fin, version, estado)
- **seguimiento** (id, poa_id, avance_porcentaje, observaciones, fecha_reporte, trimestre, gestion)
- **presupuesto** (id, poa_id, vigente, ejecutado, fecha, area, categoria, fuente, comentario)
- **indicadores** (id, codigo, nombre, formula, meta, resultado, periodo, area, comentario)
- **documentos** (id, tipo, nombre, version, fecha, url, area, estado)
- **modificaciones** (id, poa_id, fecha, motivo, importe, resolucion, informe_tecnico, informe_legal)
- **logs** (id, usuario_id, accion, fecha, modulo, detalle)
- **alertas** (id, tipo, poa_id, indicador_id, prioridad, mensaje, estado, fecha)

**Indices y optimizaciones:** Usar índices en campos de filtro frecuente (fecha, periodo, área, usuario_id), particionado por gestión, backups automáticos.

---

## 4. Seguridad y Normativa

- Cumplimiento estricto de normativa boliviana de administración pública y transparencia (Ley SAFCO, Decreto Supremo 0181, normativa de planificación y presupuesto)
- Autenticación de doble factor, cifrado datos sensibles
- Trazabilidad completa (audit trail, logs accesibles solo a auditores)
- Protección contra ataques comunes (XSS, CSRF, SQLi, brute force)
- Roles y permisos por módulo y tipo de usuario
- Integración con portales oficiales y sistemas estatales según protocolos SENAPE

---

## 5. Mejores Prácticas y Performance

- **Frontend:** Carga asíncrona, paginación, lazy loading, componentes reutilizables, diseño minimalista, accesibilidad, compatibilidad con navegadores modernos
- **Backend:** Microservicios, validación estricta, respuestas rápidas, caché en endpoints de consulta, logs detallados, integración RESTful
- **Database:** Consultas optimizadas, uso de vistas/materialized views para reportes, backups automáticos, escalabilidad horizontal

---

## 6. Requisitos Técnicos Clave

- UX/UI intuitivo, tiempo de respuesta <3s, uptime >99.5%
- Escalabilidad (horizontal/vertical)
- Seguridad robusta (2FA, cifrado, HTTPS)
- Compatibilidad y operación offline con sincronización
- Trazabilidad de todas las modificaciones

---

## 7. Referencias y Inspiración

- Normativa Bolivia: Ley SAFCO, DS 0181, manuales de planificación y presupuesto
- Portales similares: SINAPLAN, SIGEP, SICOES, dashboards institucionales ministeriales
- Talleres oficiales de formulación de POA/presupuesto y seguimiento/evaluación (consultar documentos y guías del Ministerio de Economía y Finanzas Públicas)

---

## 8. Inicia la Creación

### Siguiente paso: 
1. Crear el archivo `index.html` con el layout base del dashboard.
2. Implementar el backend básico (autenticación, consulta de indicadores, POA, presupuesto).
3. Desplegar el modelo de base de datos optimizado.
4. Iterar incorporando mejores prácticas y feedback de usuarios clave.

---

**Itera y corrige en el camino, siempre con las mejores prácticas de seguridad, performance y cumplimiento normativo.**
