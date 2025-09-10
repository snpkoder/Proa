-- Corrigiendo y optimizando el modelo relacional para SENAPE

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  clave_hash VARCHAR(255) NOT NULL,
  rol ENUM('admin','tecnico','evaluador') NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE poa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  objetivo TEXT NOT NULL,
  actividad TEXT NOT NULL,
  indicador TEXT NOT NULL,
  presupuesto DECIMAL(12,2) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  version INT DEFAULT 1,
  estado ENUM('vigente','modificado','anulado') DEFAULT 'vigente',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE seguimiento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poa_id INT NOT NULL,
  avance_porcentaje INT NOT NULL,
  observaciones TEXT,
  fecha_reporte DATE NOT NULL,
  trimestre INT,
  gestion INT,
  FOREIGN KEY (poa_id) REFERENCES poa(id)
);

CREATE TABLE presupuesto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poa_id INT NOT NULL,
  vigente DECIMAL(12,2) NOT NULL,
  ejecutado DECIMAL(12,2) NOT NULL,
  fecha DATE NOT NULL,
  area VARCHAR(50),
  categoria VARCHAR(50),
  fuente VARCHAR(50),
  comentario TEXT,
  FOREIGN KEY (poa_id) REFERENCES poa(id)
);

CREATE TABLE indicadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  formula TEXT NOT NULL,
  meta DECIMAL(6,2) NOT NULL,
  resultado DECIMAL(6,2),
  periodo VARCHAR(20),
  area VARCHAR(50),
  comentario TEXT
);

CREATE TABLE documentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50),
  nombre VARCHAR(150),
  version INT,
  fecha DATE,
  url VARCHAR(255),
  area VARCHAR(50),
  estado ENUM('vigente','archivado','anulado') DEFAULT 'vigente'
);

CREATE TABLE modificaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poa_id INT NOT NULL,
  fecha DATE NOT NULL,
  motivo TEXT,
  importe DECIMAL(12,2),
  resolucion VARCHAR(100),
  informe_tecnico VARCHAR(100),
  informe_legal VARCHAR(100),
  FOREIGN KEY (poa_id) REFERENCES poa(id)
);

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  accion VARCHAR(100) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modulo VARCHAR(50),
  detalle TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE alertas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50),
  poa_id INT,
  indicador_id INT,
  prioridad ENUM('baja','media','alta'),
  mensaje TEXT,
  estado ENUM('pendiente','resuelta') DEFAULT 'pendiente',
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poa_id) REFERENCES poa(id),
  FOREIGN KEY (indicador_id) REFERENCES indicadores(id)
);

-- Índices y optimización para consultas frecuentes
CREATE INDEX idx_poa_gestion ON seguimiento(gestion);
CREATE INDEX idx_poa_area ON presupuesto(area);
CREATE INDEX idx_indicador_area ON indicadores(area);
CREATE INDEX idx_logs_modulo ON logs(modulo);