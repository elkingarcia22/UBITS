# Inventario de Casos de Uso - Circle Metric Card (Progress General Card)

## Funcionalidades del Componente

1. **Size** ('sm' | 'md' | 'lg')
   - Tamaño del componente (default: 'md')

2. **Layout** ('vertical' | 'horizontal')
   - Layout del componente (default: 'vertical')

3. **Title** (string)
   - Título del componente (default: 'Progreso general')

4. **MainPercentage** (number)
   - Porcentaje principal mostrado en el círculo (0-100, default: 50)

5. **MainLabel** (string)
   - Etiqueta del porcentaje principal (ej: "Ciclos", default: 'Ciclos')

6. **Categories** (ProgressCategory[])
   - Categorías de progreso
   - Cada categoría tiene: label (string), current (number), total (number), percentage (number, opcional)

7. **ShowTitle** (boolean)
   - Mostrar el título (default: true)

8. **ShowCircularProgress** (boolean)
   - Mostrar el indicador circular (default: true)

9. **ShowCategories** (boolean)
   - Mostrar las categorías (default: true)

10. **ShowInfoIcon** (boolean)
    - Mostrar icono de información junto al título (default: false)

11. **ShowActionButton** (boolean)
    - Mostrar botón de acción con flecha a la derecha (default: false)

12. **ProgressColor** (string)
    - Color del progreso circular (token UBITS o color hexadecimal, default: 'var(--ubits-chart-color-bg-neutral-blue-base)')

13. **CircleBackgroundColor** (string)
    - Color de fondo del círculo (token UBITS o color hexadecimal, default: 'var(--modifiers-normal-color-light-bg-3)')

14. **OnClick** (function)
    - Handler de click en la tarjeta

15. **OnAction** (function)
    - Handler de click en el botón de acción

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Circle Metric Card completo con todos los controladores

2. **SizeSM**
   - Tamaño small

3. **SizeMD**
   - Tamaño medium (default)

4. **SizeLG**
   - Tamaño large

5. **LayoutVertical**
   - Layout vertical (default)

6. **LayoutHorizontal**
   - Layout horizontal

7. **WithTitle**
   - Con título

8. **WithoutTitle**
   - Sin título

9. **WithCircularProgress**
   - Con indicador circular

10. **WithoutCircularProgress**
    - Sin indicador circular

11. **WithCategories**
    - Con categorías

12. **WithoutCategories**
    - Sin categorías

13. **WithInfoIcon**
    - Con icono de información

14. **WithoutInfoIcon**
    - Sin icono de información

15. **WithActionButton**
    - Con botón de acción

16. **WithoutActionButton**
    - Sin botón de acción

17. **MainPercentage0**
    - Porcentaje principal 0%

18. **MainPercentage25**
    - Porcentaje principal 25%

19. **MainPercentage50**
    - Porcentaje principal 50%

20. **MainPercentage75**
    - Porcentaje principal 75%

21. **MainPercentage100**
    - Porcentaje principal 100%

22. **SingleCategory**
    - Una sola categoría

23. **MultipleCategories**
    - Múltiples categorías (2, 3, 4, etc.)

24. **CategoryWithHighPercentage**
    - Categoría con porcentaje alto

25. **CategoryWithLowPercentage**
    - Categoría con porcentaje bajo

26. **CategoryWithZeroPercentage**
    - Categoría con porcentaje 0%

27. **CategoryWithFullPercentage**
    - Categoría con porcentaje 100%

28. **CustomProgressColor**
    - Color de progreso personalizado

29. **CustomCircleBackgroundColor**
    - Color de fondo del círculo personalizado

30. **OnClickCallback**
    - Callback de click en la tarjeta

31. **OnActionCallback**
    - Callback de click en el botón de acción

32. **AllSizes**
    - Todos los tamaños

33. **AllLayouts**
    - Todos los layouts

34. **AllMainPercentages**
    - Todos los porcentajes principales (0, 25, 50, 75, 100)

35. **CompleteExample**
    - Ejemplo completo con todas las opciones

36. **MinimalExample**
    - Ejemplo mínimo

