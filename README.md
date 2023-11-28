# jsBroadcastAPI

Prueba de Broadcast API

## Motivación

¿Han visto ese vídeo de moda donde se ven particulas rojas y verdes en dos ventanas separadas que se alínean entre sí? Lo pueden ver [aquí](https://twitter.com/_nonfigurativ_/status/1727322594570027343)

Sin ver el código fuente me parece interesante que pudan interactuar ventanas separadas en la misma URL. Esto se pued hacer con la [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API). Es muy interesante.

## Ejemplo

Hice un ejercicio básico (¡y desordenado!) para probar esta API. Cuando se abre la ventana, el programa le da un ID (un número aleatorio) y se informa al canal. Si se abre una nueva ventana, el programa le da otro ID e informa al canal. Ahora  ambas ventanas se enteran que existen. Al mover las ventanas una "flecha" (==>) se inclina apunando a donde está la ventana con ese ID.

## Limitaciones y mejoras

El código es sencillo y hecho a la rápida. La verdad estoy perdiendo tiempo de trabajar haciendo este ejercicio. Después lo ordenaré.

Utiliza el método *requestAnimationFrame* que es muy eficiente cuando se requiere hacer animaciones, pero a la implementación que hice le falta un poco de inteligencia para evitar tanto refresco. Si abren muchas ventanas puede que el navegador se ponga un poco lento.

En unos días haré algunas mejoras al código y pondré una animación más entretenida.
