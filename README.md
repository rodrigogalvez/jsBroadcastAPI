# jsBroadcastAPI

Prueba de Broadcast API

## Motivación

¿Han visto ese vídeo de moda donde se ven particulas rojas y verdes en dos ventanas separadas que se alínean entre sí? Lo pueden ver [aquí](https://twitter.com/_nonfigurativ_/status/1727322594570027343)

Sin ver el código fuente me parece interesante que pudan interactuar ventanas separadas en la misma URL. Esto se puede hacer con la [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API). Es muy interesante.

## Ejemplo

Hice un ejercicio básico para probar esta API. Consiste en una aplicación que dibuja círculos que salen al azar desde el centro de la pantalla. Cuando se abre una ventana nueva, la ventana anterior y la nueva se reconocen y se "saludan" informando donde están. Luego los círculos se distribuyen al centro de la distancia entre las dos ventanas. Si se abre una tercera, todas se "saludan" y los círculos se distribuyen en el centro de las tres.

Pueden probar el ejemplo [aquí](https://rodrigogalvez.github.io/jsBroadcastAPI/). Se debe abrir dos o más veces para que sea interesante.

![Captura ejemplo](/BroadcastAPI.png)

## Limitaciones y mejoras

Esta es la segunda versión de este programa. La anterior quedó en una carpeta llamada "old".

El código ya no es tan sencillo. Está más ordenado.
