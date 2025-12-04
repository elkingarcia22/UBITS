# Inventario de Casos de Uso - Bar Metric Card

## Funcionalidades del Componente

1. **Title** (string)
   - Título del componente (default: 'Métricas')

2. **ResponseCount** (number)
   - Cantidad de respuestas a mostrar debajo del título

3. **ShowResponseCount** (boolean)
   - Mostrar la cantidad de respuestas (default: false)

4. **BarData** (number[])
   - Datos para el gráfico de barras (array de valores)
   - Cada valor puede ser positivo o negativo

5. **BarLabels** (string[])
   - Etiquetas para las barras (opcional, si no se proporciona se usan índices)

6. **MaxValue** (number)
   - Valor máximo para el eje Y (si no se proporciona se calcula automáticamente)

7. **MinValue** (number)
   - Valor mínimo para el eje Y (si no se proporciona se calcula automáticamente)

8. **Categories** (BarCategory[])
   - Categorías de métricas
   - Cada categoría tiene: label, current, total, percentage (opcional)

9. **Layout** ('vertical' | 'horizontal')
   - Layout del componente (default: 'vertical')
   - Vertical: muestra gráfico SVG de barras + categorías estándar
   - Horizontal: muestra solo categorías con progress bars

10. **Size** ('sm' | 'md' | 'lg')
    - Tamaño del componente (default: 'md')

11. **ShowTitle** (boolean)
    - Mostrar el título (default: true)

12. **ShowBarChart** (boolean)
    - Mostrar el gráfico de barras (default: true)

13. **ShowCategories** (boolean)
    - Mostrar las categorías (default: true)

14. **ShowInfoIcon** (boolean)
    - Mostrar icono de información junto al título (default: false)

15. **ShowActionButton** (boolean)
    - Mostrar botón de acción con flecha a la derecha (default: false)

16. **ShowNegativeValues** (boolean)
    - Mostrar valores negativos (barras hacia abajo) (default: true)

17. **ShowGridLines** (boolean)
    - Mostrar líneas de guía (grid lines) (default: true)

18. **BarColor** (string)
    - Color de las barras (token UBITS) (default: 'var(--ubits-chart-color-bg-neutral-blue-base)')

19. **ChartBackgroundColor** (string)
    - Color de fondo del gráfico (token UBITS) (default: 'var(--modifiers-normal-color-light-bg-1)')

20. **GridLineColor** (string)
    - Color de las líneas de la grilla (token UBITS) (default: 'var(--modifiers-normal-color-light-border-1)')

21. **OnClick** (callback)
    - Handler de click en la tarjeta

22. **OnAction** (callback)
    - Handler de click en el botón de acción

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Bar Metric Card completo con todos los controladores

2. **LayoutVertical**
   - Layout vertical (gráfico SVG + categorías estándar)

3. **LayoutHorizontal**
   - Layout horizontal (solo categorías con progress bars)

4. **SizeSM**
   - Tamaño small

5. **SizeMD**
   - Tamaño medium (default)

6. **SizeLG**
   - Tamaño large

7. **WithTitle**
   - Con título

8. **WithoutTitle**
   - Sin título

9. **WithResponseCount**
   - Con cantidad de respuestas

10. **WithoutResponseCount**
    - Sin cantidad de respuestas

11. **WithBarChart**
    - Con gráfico de barras

12. **WithoutBarChart**
    - Sin gráfico de barras

13. **WithCategories**
    - Con categorías

14. **WithoutCategories**
    - Sin categorías

15. **WithInfoIcon**
    - Con icono de información

16. **WithoutInfoIcon**
    - Sin icono de información

17. **WithActionButton**
    - Con botón de acción

18. **WithoutActionButton**
    - Sin botón de acción

19. **WithNegativeValues**
    - Con valores negativos (barras hacia abajo)

20. **WithoutNegativeValues**
    - Sin valores negativos (solo positivos)

21. **WithGridLines**
    - Con líneas de guía

22. **WithoutGridLines**
    - Sin líneas de guía

23. **WithBarLabels**
    - Con etiquetas para las barras

24. **WithoutBarLabels**
    - Sin etiquetas para las barras

25. **WithCustomMaxMin**
    - Con valores máximo y mínimo personalizados

26. **WithoutCustomMaxMin**
    - Sin valores máximo y mínimo (calculados automáticamente)

27. **MultipleCategories**
    - Múltiples categorías

28. **SingleCategory**
    - Una sola categoría

29. **OnClickCallback**
    - Con callback onClick

30. **OnActionCallback**
    - Con callback onAction

31. **AllSizes**
    - Todos los tamaños

32. **AllLayouts**
    - Todos los layouts

33. **CompleteExample**
    - Ejemplo completo con todas las opciones

34. **MinimalExample**
    - Ejemplo mínimo

