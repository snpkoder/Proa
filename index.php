<?php
// Carga del componente Card y datos del dashboard SENAPE

require_once __DIR__ . '/components/Card.php';

// Mock inicial de datos, reemplazar por consulta a backend/DB
$data = [
  'cumplimiento' => 100,
  'calidad' => 78,
  'fisico' => 99.23,
  'financiero' => 96.32,
  'ponderada' => 98.0,
  'ponderadaEval' => "Eficiente",
  'relativa' => 0.97,
  'relativaEval' => "Eficiente",
  'presupuesto' => [
    'vigente' => 21373333,
    'ejecutado' => 21005852,
    'porcentaje' => 98.28
  ],
  'acciones' => [
    'estrategicas' => 3,
    'cortoPlazo' => 8,
    'operaciones' => 69,
    'tareas' => 190
  ]
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>SENAPE Dashboard Ejecutivo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles/card-floating.css">
  <link rel="stylesheet" href="styles/main.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <header>
    <h1>SENAPE Dashboard Ejecutivo</h1>
    <nav>
      <button id="refreshBtn">Actualizar</button>
      <select id="periodoSelect">
        <option value="2025">Gestión 2025</option>
        <option value="2024">Gestión 2024</option>
        <option value="trimestre">Trimestre actual</option>
        <option value="acumulado">Acumulado</option>
      </select>
    </nav>
  </header>
  <main>
    <section id="indicadores" class="grid-4">
      <?php
        echo Card::render(
          'DEJURBE Cumplimiento',
          '<canvas id="cumplimientoChart"></canvas><p>Meta: 95% | Actual: '.$data['cumplimiento'].'%</p>'
        );
        echo Card::render(
          'Calidad Registros DEJURBE',
          '<canvas id="calidadChart"></canvas><p>Meta: 50% | Actual: '.$data['calidad'].'%</p>'
        );
        echo Card::render(
          'Avance Físico Institucional',
          '<canvas id="fisicoChart"></canvas><p>Meta: 90% | Actual: '.$data['fisico'].'%</p>'
        );
        echo Card::render(
          'Avance Financiero Institucional',
          '<canvas id="financieroChart"></canvas><p>Meta: 90% | Actual: '.$data['financiero'].'%</p>'
        );
      ?>
    </section>
    <section id="eficiencia" class="grid-2">
      <?php
        echo Card::render(
          'Eficiencia Ponderada',
          '<canvas id="ponderadaChart"></canvas><p>Evaluación: '.$data['ponderadaEval'].'</p>'
        );
        echo Card::render(
          'Eficiencia Relativa',
          '<canvas id="relativaChart"></canvas><p>Evaluación: '.$data['relativaEval'].'</p>'
        );
      ?>
    </section>
    <section id="resumen" class="grid-2">
      <?php
        echo Card::render(
          'Presupuesto',
          '<strong>Vigente:</strong> Bs '.number_format($data['presupuesto']['vigente'],2,'.',',').'<br>
           <strong>Ejecutado:</strong> Bs '.number_format($data['presupuesto']['ejecutado'],2,'.',',').'<br>
           <strong>% Ejecución:</strong> '.$data['presupuesto']['porcentaje'].'%'
        );
        echo Card::render(
          'N° Acciones, Operaciones, Tareas',
          '<ul>
            <li>Acciones Estratégicas: '.$data['acciones']['estrategicas'].'</li>
            <li>Acciones de Corto Plazo: '.$data['acciones']['cortoPlazo'].'</li>
            <li>Operaciones: '.$data['acciones']['operaciones'].'</li>
            <li>Tareas: '.$data['acciones']['tareas'].'</li>
          </ul>'
        );
      ?>
    </section>
    <section id="graficosAvance">
      <?php
        echo Card::render(
          'Evolución de Indicadores',
          '<canvas id="evolucionChart"></canvas>'
        );
        echo Card::render(
          'Distribución de Tareas/Operaciones por Área',
          '<canvas id="distribucionChart"></canvas>'
        );
      ?>
    </section>
    <section id="tablaDatos">
      <h2>Datos Detallados (copiar/pegar)</h2>
      <div id="tablaContainer"></div>
      <button id="exportBtn">Exportar Excel</button>
    </section>
    <section id="comentarios">
      <h2>Comentarios y Aclaraciones</h2>
      <textarea id="comentarioInput" placeholder="Agregue comentarios..."></textarea>
      <button id="guardarComentarioBtn">Guardar</button>
    </section>
  </main>
  <footer>
    <small>SENAPE &copy; 2025. Cumplimiento Ley SAFCO y DS 0181. Uptime 99.5%.</small>
  </footer>
  <script src="scripts/dashboard.js"></script>
</body>
</html>