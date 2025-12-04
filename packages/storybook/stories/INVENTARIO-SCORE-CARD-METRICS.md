# Inventario de Casos de Uso - Score Card Metrics

## Funcionalidades del Componente

1. **Size** ('sm' | 'md' | 'lg')
   - Tamaño de la tarjeta (default: 'md')

2. **Title** (string)
   - Título de la métrica

3. **TotalResponses** (number)
   - Número total de respuestas

4. **ResponsesLabel** (string)
   - Etiqueta para las respuestas (default: 'respuestas')

5. **Average** (number)
   - Promedio de calificación (0-5)

6. **AverageLabel** (string)
   - Etiqueta para el promedio (default: 'Promedio:')

7. **Score** (number)
   - Score actual (0-5) para mostrar en las estrellas

8. **LeftLabel** (string)
   - Etiqueta izquierda del gráfico (default: '0')

9. **RightLabel** (string)
   - Etiqueta derecha del gráfico (default: '5')

10. **ChartDescription** (string)
    - Texto descriptivo debajo del gráfico (default: '0 a 5 del gráfico')

11. **TitleIcon** (string)
    - Icono opcional para el título (nombre de FontAwesome sin el prefijo 'fa-')

12. **TitleIconStyle** ('regular' | 'solid')
    - Estilo del icono del título (default: 'regular')

13. **TitleIconColor** (string)
    - Color del icono del título (usando tokens UBITS)

14. **ShowInfoIcon** (boolean)
    - Mostrar icono de información junto al título (default: false)

15. **ShowActionButton** (boolean)
    - Mostrar botón de acción con flecha a la derecha (default: false)

16. **OnClick** (function)
    - Handler de click en la tarjeta

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Score Card Metrics completo con todos los controladores

2. **SizeSM**
   - Tamaño small

3. **SizeMD**
   - Tamaño medium (default)

4. **SizeLG**
   - Tamaño large

5. **WithTitleIcon**
   - Con icono en el título

6. **WithoutTitleIcon**
   - Sin icono en el título

7. **TitleIconStyleRegular**
   - Icono del título estilo regular

8. **TitleIconStyleSolid**
   - Icono del título estilo solid

9. **WithTitleIconColor**
   - Con color personalizado en el icono del título

10. **WithInfoIcon**
    - Con icono de información

11. **WithoutInfoIcon**
    - Sin icono de información

12. **WithActionButton**
    - Con botón de acción

13. **WithoutActionButton**
    - Sin botón de acción

14. **Score0**
    - Score 0 (0 estrellas)

15. **Score1**
    - Score 1 (1 estrella)

16. **Score2**
    - Score 2 (2 estrellas)

17. **Score3**
    - Score 3 (3 estrellas)

18. **Score4**
    - Score 4 (4 estrellas)

19. **Score5**
    - Score 5 (5 estrellas completas)

20. **ScoreDecimal**
    - Score con decimales (ej: 3.5)

21. **Average0**
    - Promedio 0

22. **Average1**
    - Promedio 1

23. **Average2**
    - Promedio 2

24. **Average3**
    - Promedio 3

25. **Average4**
    - Promedio 4

26. **Average5**
    - Promedio 5

27. **AverageDecimal**
    - Promedio con decimales (ej: 4.25)

28. **ZeroResponses**
    - Sin respuestas (0)

29. **FewResponses**
    - Pocas respuestas (1-10)

30. **ManyResponses**
    - Muchas respuestas (100+)

31. **CustomResponsesLabel**
    - Etiqueta personalizada para respuestas

32. **CustomAverageLabel**
    - Etiqueta personalizada para promedio

33. **CustomLeftLabel**
    - Etiqueta izquierda personalizada

34. **CustomRightLabel**
    - Etiqueta derecha personalizada

35. **CustomChartDescription**
    - Descripción personalizada del gráfico

36. **OnClickCallback**
    - Callback de click en la tarjeta

37. **AllSizes**
    - Todos los tamaños

38. **AllScores**
    - Todos los scores (0, 1, 2, 3, 4, 5)

39. **AllAverages**
    - Todos los promedios (0, 1, 2, 3, 4, 5)

40. **CompleteExample**
    - Ejemplo completo con todas las opciones

41. **MinimalExample**
    - Ejemplo mínimo

