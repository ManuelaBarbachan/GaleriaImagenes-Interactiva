# GaleriaImagenes-Interactiva
Barbachan, Carballido, Iriarte, Kanas, Paredes

El objetivo es construir una galería de imágenes donde los estudiantes apliquen los hooks de optimización para manejar el estado, el rendimiento y la interacción con el DOM de manera eficiente.

# Requisitos de la Aplicación

### 1- Estructura Base:
- **Un componente principal Gallery.jsx que contendrá toda la lógica.**
- **Un componente ImageCard.jsx para mostrar cada imagen individualmente.**
- **Un componente ControlPanel.jsx para los botones y controles de la galería.**

### 2- Funcionalidades:
- **Mostrar una lista de imágenes (puedes usar URLs de imágenes de prueba).**
- **Un botón para cambiar el tamaño de todas las imágenes (small, medium, large).**
- **Un botón "Me gusta" en cada imagen.**
- **Un contador de "Me gusta" total que se muestre en el panel de control.**
- **Un botón para "Reproducir" una animación simulando un "carrusel".**

# Implementación de los Hooks (El Desafío)

Los estudiantes deben aplicar los siguientes hooks para optimizar la aplicación:

### 1- useMemo:
- **El Reto: El contador total de "Me gusta" se debe recalcular cada vez que se presiona un "Me gusta" en cualquier imagen. El cálculo de la suma de "Me gusta" de todas las imágenes lo asumimos como costoso.**
- **Aplicación: Utilizar useMemo para memorizar el conteo total de "Me gusta". La función de cálculo solo se debe volver a ejecutar cuando el estado de las imágenes (images) cambie, evitando recálculos innecesarios en cada renderización.**

### 2- useCallback:
- **El Reto: La función handleLike (manejar el "Me gusta") se pasará como una prop a cada componente ImageCard.js. Queremos que estos componentes se re-rendericen solo cuando sea necesario.**
- **Aplicación: Envolver la función handleLike en useCallback en el componente padre (Gallery.jsx). Esto asegura que cada componente hijo ImageCard (que debería estar optimizado con React.memo) no se re-renderice solo porque el padre se re-renderizó.**

### 3- useState:
- **El Reto: El botón "Reproducir" inicia una animación de un carrusel. Necesitamos una manera de controlar la animación (ej. setInterval) sin causar re-renderizaciones constantes. Además, el ControlPanel debe poder detener la animación.**
- **Aplicación: Usar useRef para guardar el ID del temporizador del setInterval Almacenar este valor en una referencia permite que persista a lo largo de los renders, y el botón "Detener" puede acceder a él para llamar a clearInterval() y detener la animación.**

### 4- Context:
- **El Reto: El "tamaño de la imagen" (small, medium, large) es un estado global que afecta a todas las imágenes. Pasar esta prop manualmente a cada ImageCard es un "prop drilling" innecesario.**
- **Aplicación: Crear un ImageSizeContext y un Provider que envuelva la lista de imágenes. El componente ImageCard consumirá el contexto directamente con useContext, obteniendo el tamaño y ajustando su estilo, sin depender de props intermedias.**


