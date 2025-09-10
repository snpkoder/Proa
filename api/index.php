<?php
// Slim Framework recomendado para microservicio liviano
require 'vendor/autoload.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Seguridad: CORS, HTTPS, validación
$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->add(function (Request $req, Response $res, $next) {
    $res = $res->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Solo HTTPS
    if ($req->getUri()->getScheme() !== 'https' && getenv('APP_ENV') === 'prod') {
        return $res->withStatus(403)->withJson(['error' => 'HTTPS requerido']);
    }
    return $next($req, $res);
});

// Dashboard principal
$app->get('/api/dashboard', function (Request $request, Response $response) {
    $periodo = $request->getQueryParams()['periodo'] ?? '2025';
    // TODO: conectar a DB, obtener datos reales
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
        ],
        'evolucion' => [97, 99, 98, 100, 98, 99, 97],
        'distribucion' => [20, 12, 19, 61, 11, 49, 17, 5],
        'tabla' => [
            ['area'=>"DRP",'tareas'=>17,'ejecPOA'=>97.65,'ejecPpto'=>95.22],
            ['area'=>"DDBRAE",'tareas'=>8,'ejecPOA'=>100,'ejecPpto'=>99.85],
            ['area'=>"DLEGSS",'tareas'=>18,'ejecPOA'=>96.94,'ejecPpto'=>96.26]
        ]
    ];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});

// TODO: endpoints para autenticación, usuarios, poa, indicadores, presupuesto, reportes, integración, seguridad

$app->run();