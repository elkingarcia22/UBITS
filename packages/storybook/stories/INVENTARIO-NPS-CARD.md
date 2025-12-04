# Inventario de Casos de Uso - NPS Card

## Funcionalidades del Componente

1. **Title** (string)
   - Título del componente (default: 'Nivel de confianza')

2. **Score** (number)
   - Puntuación principal mostrada en el gauge (0-100) (default: 0)

3. **ScoreLabel** (string)
   - Etiqueta del score (ej: "Puntuación") (default: 'Puntuación')

4. **TotalResponses** (number)
   - Número total de respuestas (default: 0)

5. **ResponsesLabel** (string)
   - Texto para mostrar las respuestas (ej: "respuestas") (default: 'respuestas')

6. **Categories** (NPSCategory[])
   - Categorías de NPS
   - Cada categoría tiene: label, current, total, color, percentage (opcional)

7. **Size** ('sm' | 'md' | 'lg')
   - Tamaño del componente (default: 'md')

8. **ShowTitle** (boolean)
   - Mostrar el título (default: true)

9. **ShowResponsesCount** (boolean)
   - Mostrar el contador de respuestas (default: true)

10. **ShowGauge** (boolean)
    - Mostrar el gauge semicircular (default: true)

11. **ShowCategories** (boolean)
    - Mostrar las categorías (default: true)

12. **ShowInfoIcon** (boolean)
    - Mostrar icono de información junto al título (default: false)

13. **ShowActionButton** (boolean)
    - Mostrar botón de acción con flecha a la derecha (default: false)

14. **LowColor** (string)
    - Color del gauge para el segmento rojo (0-20) (default: 'var(--modifiers-normal-color-light-feedback-accent-error)')

15. **MediumColor** (string)
    - Color del gauge para el segmento amarillo (20-60) (default: 'var(--modifiers-normal-color-light-feedback-accent-warning)')

16. **HighColor** (string)
    - Color del gauge para el segmento verde (60-100) (default: 'var(--modifiers-normal-color-light-feedback-accent-success)')

17. **GaugeBackgroundColor** (string)
    - Color de fondo del gauge (default: 'var(--modifiers-normal-color-light-bg-3)')

18. **OnClick** (callback)
    - Handler de click en la tarjeta

19. **OnAction** (callback)
    - Handler de click en el botón de acción

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - NPS Card completo con todos los controladores

2. **SizeSM**
   - Tamaño small

3. **SizeMD**
   - Tamaño medium (default)

4. **SizeLG**
   - Tamaño large

5. **ScoreLow**
   - Score bajo (0-20)

6. **ScoreMedium**
   - Score medio (20-60)

7. **ScoreHigh**
   - Score alto (60-100)

8. **ScoreZero**
   - Score cero

9. **ScoreMax**
   - Score máximo (100)

10. **WithTitle**
    - Con título

11. **WithoutTitle**
    - Sin título

12. **WithResponsesCount**
    - Con contador de respuestas

13. **WithoutResponsesCount**
    - Sin contador de respuestas

14. **WithGauge**
    - Con gauge semicircular

15. **WithoutGauge**
    - Sin gauge semicircular

16. **WithCategories**
    - Con categorías

17. **WithoutCategories**
    - Sin categorías

18. **WithInfoIcon**
    - Con icono de información

19. **WithoutInfoIcon**
    - Sin icono de información

20. **WithActionButton**
    - Con botón de acción

21. **WithoutActionButton**
    - Sin botón de acción

22. **MultipleCategories**
    - Múltiples categorías

23. **SingleCategory**
    - Una sola categoría

24. **ManyResponses**
    - Muchas respuestas (100+)

25. **FewResponses**
    - Pocas respuestas (1-10)

26. **ZeroResponses**
    - Sin respuestas (0)

27. **CustomScoreLabel**
    - Con etiqueta personalizada para el score

28. **CustomResponsesLabel**
    - Con etiqueta personalizada para respuestas

29. **CustomColors**
    - Con colores personalizados para el gauge

30. **OnClickCallback**
    - Con callback onClick

31. **OnActionCallback**
    - Con callback onAction

32. **AllSizes**
    - Todos los tamaños

33. **AllScores**
    - Todos los rangos de score

34. **CompleteExample**
    - Ejemplo completo con todas las opciones

35. **MinimalExample**
    - Ejemplo mínimo

