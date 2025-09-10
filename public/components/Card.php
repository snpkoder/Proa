<?php
class Card {
  public static function render($titulo, $contenido, $extraClass = '') {
    return <<<HTML
<div class="card-floating $extraClass">
  <div class="card-header">
    <h3>$titulo</h3>
  </div>
  <div class="card-body">
    $contenido
  </div>
</div>
HTML;
  }
}
?>