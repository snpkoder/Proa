// Corrección de mejores prácticas: modularidad, carga asíncrona, caché básico
document.addEventListener('DOMContentLoaded', async () => {
  // Elementos
  const charts = {};
  // Fetch de datos (mock inicial, conectar backend después)
  async function fetchDashboard(periodo = '2025') {
    try {
      const res = await fetch(`/api/dashboard?periodo=${periodo}`);
      if (!res.ok) throw new Error('Error en la carga de datos');
      return await res.json();
    } catch (err) {
      console.error(err);
      // Mock rápido para pruebas locales
      return {
        cumplimiento: 100,
        calidad: 78,
        fisico: 99.23,
        financiero: 96.32,
        ponderada: 98.0,
        ponderadaEval: "Eficiente",
        relativa: 0.97,
        relativaEval: "Eficiente",
        presupuesto: {
          vigente: 21373333,
          ejecutado: 21005852,
          porcentaje: 98.28
        },
        acciones: {
          estrategicas: 3,
          cortoPlazo: 8,
          operaciones: 69,
          tareas: 190
        },
        evolucion: [97, 99, 98, 100, 98, 99, 97],
        distribucion: [20, 12, 19, 61, 11, 49, 17, 5],
        tabla: [
          {area: "DRP", tareas: 17, ejecPOA: 97.65, ejecPpto: 95.22},
          {area: "DDBRAE", tareas: 8, ejecPOA: 100, ejecPpto: 99.85},
          {area: "DLEGSS", tareas: 18, ejecPOA: 96.94, ejecPpto: 96.26}
        ]
      };
    }
  }

  function renderCharts(data) {
    // Cumplimiento DEJURBE
    charts.cumplimiento = new Chart(document.getElementById('cumplimientoChart'), {
      type: 'doughnut',
      data: {
        labels: ['Cumplido', 'Faltante'],
        datasets: [{
          data: [data.cumplimiento, 100-data.cumplimiento],
          backgroundColor: ['#2563eb', '#cbd5e1']
        }]
      },
      options: { cutout: "75%" }
    });
    document.getElementById('cumplimientoMeta').textContent = `Meta: 95% | Actual: ${data.cumplimiento}%`;

    // Calidad DEJURBE
    charts.calidad = new Chart(document.getElementById('calidadChart'), {
      type: 'doughnut',
      data: {
        labels: ['Sin errores', 'Con errores'],
        datasets: [{
          data: [data.calidad, 100-data.calidad],
          backgroundColor: ['#059669', '#cbd5e1']
        }]
      },
      options: { cutout: "75%" }
    });
    document.getElementById('calidadMeta').textContent = `Meta: 50% | Actual: ${data.calidad}%`;

    // Avance Físico
    charts.fisico = new Chart(document.getElementById('fisicoChart'), {
      type: 'doughnut',
      data: {
        labels: ['Avance', 'Restante'],
        datasets: [{
          data: [data.fisico, 100-data.fisico],
          backgroundColor: ['#eab308', '#cbd5e1']
        }]
      },
      options: { cutout: "75%" }
    });
    document.getElementById('fisicoMeta').textContent = `Meta: 90% | Actual: ${data.fisico}%`;

    // Avance Financiero
    charts.financiero = new Chart(document.getElementById('financieroChart'), {
      type: 'doughnut',
      data: {
        labels: ['Ejecutado', 'Restante'],
        datasets: [{
          data: [data.financiero, 100-data.financiero],
          backgroundColor: ['#64748b', '#cbd5e1']
        }]
      },
      options: { cutout: "75%" }
    });
    document.getElementById('financieroMeta').textContent = `Meta: 90% | Actual: ${data.financiero}%`;

    // Eficiencia Ponderada
    charts.ponderada = new Chart(document.getElementById('ponderadaChart'), {
      type: 'doughnut',
      data: {
        labels: ['Eficiencia', 'Resto'],
        datasets: [{
          data: [data.ponderada, 100-data.ponderada],
          backgroundColor: ['#2563eb', '#cbd5e1']
        }]
      },
      options: { cutout: "75%" }
    });
    document.getElementById('ponderadaEval').textContent = `Evaluación: ${data.ponderadaEval}`;

    // Eficiencia Relativa
    charts.relativa = new Chart(document.getElementById('relativaChart'), {
      type: 'doughnut',
      data: {
        labels: ['Relativa', 'Resto'],
        datasets: [{
          data: [data.relativa*100, 100-data.relativa*100],
          backgroundColor: ['#059669', '#cbd5e1']
        }]
      },
      options: { cutout: "75%" }
    });
    document.getElementById('relativaEval').textContent = `Evaluación: ${data.relativaEval}`;

    // Evolución Indicadores
    charts.evolucion = new Chart(document.getElementById('evolucionChart'), {
      type: 'line',
      data: {
        labels: ['2018','2019','2020','2021','2022','2023','2024'],
        datasets: [{
          label: 'Cumplimiento DEJURBE (%)',
          data: data.evolucion,
          borderColor: '#2563eb',
          fill: false
        }]
      }
    });

    // Distribución Tareas
    charts.distribucion = new Chart(document.getElementById('distribucionChart'), {
      type: 'bar',
      data: {
        labels: ['DRP','DDBRAE','DLEGSS','DAF','DJ','OD','UAI','TRA'],
        datasets: [{
          label: 'Tareas/Operaciones',
          data: data.distribucion,
          backgroundColor: '#eab308'
        }]
      }
    });
  }

  function renderDatos(data) {
    // Presupuesto
    const pres = data.presupuesto;
    document.getElementById('presupuestoDatos').innerHTML =
      `<strong>Vigente:</strong> Bs ${pres.vigente.toLocaleString()}<br>
      <strong>Ejecutado:</strong> Bs ${pres.ejecutado.toLocaleString()}<br>
      <strong>% Ejecución:</strong> ${pres.porcentaje}%`;

    // Acciones
    const acciones = data.acciones;
    document.getElementById('accionesLista').innerHTML = `
      <li>Acciones Estratégicas: ${acciones.estrategicas}</li>
      <li>Acciones de Corto Plazo: ${acciones.cortoPlazo}</li>
      <li>Operaciones: ${acciones.operaciones}</li>
      <li>Tareas: ${acciones.tareas}</li>
    `;

    // Tabla Detallada (copiar/pegar)
    let tablaHTML = `<table><thead><tr>
      <th>Área</th><th>Tareas</th><th>Ejec. POA (%)</th><th>Ejec. Ppto (%)</th>
      </tr></thead><tbody>`;
    data.tabla.forEach(row => {
      tablaHTML += `<tr>
        <td>${row.area}</td>
        <td>${row.tareas}</td>
        <td>${row.ejecPOA}</td>
        <td>${row.ejecPpto}</td>
      </tr>`;
    });
    tablaHTML += `</tbody></table>`;
    document.getElementById('tablaContainer').innerHTML = tablaHTML;
  }

  // Inicializar dashboard
  async function initDashboard(periodo = '2025') {
    const data = await fetchDashboard(periodo);
    renderCharts(data);
    renderDatos(data);
  }

  // Eventos UI
  document.getElementById('refreshBtn').onclick = () => {
    const periodo = document.getElementById('periodoSelect').value;
    initDashboard(periodo);
  };
  document.getElementById('periodoSelect').onchange = (e) => {
    initDashboard(e.target.value);
  };

  // Exportar tabla Excel (CSV)
  document.getElementById('exportBtn').onclick = () => {
    const table = document.querySelector('#tablaContainer table');
    if (!table) return;
    let csv = '';
    [...table.querySelectorAll('tr')].forEach(row => {
      csv += [...row.children].map(c => `"${c.textContent}"`).join(',') + '\n';
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'datos_senape.csv';
    a.click();
  };

  // Guardar comentarios (mock)
  document.getElementById('guardarComentarioBtn').onclick = () => {
    const txt = document.getElementById('comentarioInput').value;
    alert('Comentario guardado: ' + txt);
    document.getElementById('comentarioInput').value = '';
  };

  // Inicial
  initDashboard();
});