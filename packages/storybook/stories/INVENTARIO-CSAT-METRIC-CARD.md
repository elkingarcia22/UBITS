# Inventario de Casos de Uso - CSAT Metric Card

## Funcionalidades del Componente

1. **Title** (string)
   - Título de la métrica (requerido)

2. **TotalResponses** (number)
   - Número total de respuestas

3. **ResponsesLabel** (string)
   - Etiqueta para las respuestas (default: 'respuestas')

4. **Average** (number)
   - Promedio de calificación (0-5)

5. **AverageLabel** (string)
   - Etiqueta para el promedio (default: 'Promedio:')

6. **Score** (number)
   - Score actual (0-5) para mostrar en las caritas
   - Se mapea a índices 0-4 (1->0, 2->1, 3->2, 4->3, 5->4)

7. **TitleIcon** (string)
   - Icono opcional para el título (nombre de FontAwesome sin prefijo 'fa-')

8. **TitleIconStyle** ('regular' | 'solid')
   - Estilo del icono del título (default: 'regular')

9. **TitleIconColor** (string)
   - Color del icono del título (usando tokens UBITS)

10. **ShowInfoIcon** (boolean)
    - Mostrar icono de información junto al título (default: false)

11. **ShowActionButton** (boolean)
    - Mostrar botón de acción con flecha a la derecha (default: false)

12. **Size** ('sm' | 'md' | 'lg')
    - Tamaño de la tarjeta (default: 'md')

13. **OnClick** (callback)
    - Handler de click en la tarjeta

## Caritas (Faces)

El componente muestra 5 caritas con sus respectivos colores:
- 0 (Score 1): Muy malo - face-angry - Rojo (error)
- 1 (Score 2): Malo - face-sad-tear - Naranja/Amarillo (warning)
- 2 (Score 3): Regular - face-meh - Azul (info)
- 3 (Score 4): Bueno - face-smile - Verde (success)
- 4 (Score 5): Muy bueno - face-smile-beam - Verde (success)

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - CSAT Metric Card completo con todos los controladores

2. **SizeSM**
   - Tamaño small

3. **SizeMD**
   - Tamaño medium (default)

4. **SizeLG**
   - Tamaño large

5. **Score1**
   - Score 1 (Muy malo - cara enojada roja)

6. **Score2**
   - Score 2 (Malo - cara triste naranja)

7. **Score3**
   - Score 3 (Regular - cara neutral azul)

8. **Score4**
   - Score 4 (Bueno - cara sonriente verde)

9. **Score5**
   - Score 5 (Muy bueno - cara sonriente amplia verde)

10. **WithTitleIcon**
    - Con icono en el título

11. **WithoutTitleIcon**
    - Sin icono en el título

12. **TitleIconStyleRegular**
    - Icono del título estilo regular

13. **TitleIconStyleSolid**
    - Icono del título estilo solid

14. **WithTitleIconColor**
    - Con color personalizado para el icono del título

15. **WithInfoIcon**
    - Con icono de información

16. **WithoutInfoIcon**
    - Sin icono de información

17. **WithActionButton**
    - Con botón de acción

18. **WithoutActionButton**
    - Sin botón de acción

19. **WithCustomResponsesLabel**
    - Con etiqueta personalizada para respuestas

20. **WithCustomAverageLabel**
    - Con etiqueta personalizada para promedio

21. **HighAverage**
    - Promedio alto (4.5-5.0)

22. **MediumAverage**
    - Promedio medio (2.5-4.4)

23. **LowAverage**
    - Promedio bajo (0-2.4)

24. **ManyResponses**
    - Muchas respuestas (100+)

25. **FewResponses**
    - Pocas respuestas (1-10)

26. **ZeroResponses**
    - Sin respuestas (0)

27. **OnClickCallback**
    - Con callback onClick

28. **AllSizes**
    - Todos los tamaños

29. **AllScores**
    - Todos los scores (1-5)

30. **CompleteExample**
    - Ejemplo completo con todas las opciones

31. **MinimalExample**
    - Ejemplo mínimo

