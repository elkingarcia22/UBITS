# Inventario de Casos de Uso - Slider

## Funcionalidades del Componente

1. **Orientation** ('horizontal' | 'vertical')
   - Orientación del slider (default: 'horizontal')

2. **Mode** ('single' | 'range')
   - Modo del slider: single (un valor) o range (dos valores) (default: 'single')

3. **Size** ('xs' | 'sm' | 'md' | 'lg')
   - Tamaño del slider (default: 'md')

4. **State** ('default' | 'disabled')
   - Estado del slider (default: 'default')

5. **Min** (number)
   - Valor mínimo (default: 0)

6. **Max** (number)
   - Valor máximo (default: 100)

7. **Step** (number)
   - Paso (step) del slider (default: 1)

8. **Value** (number)
   - Valor inicial (para modo single)

9. **Values** ([number, number])
   - Valores iniciales (para modo range) [min, max]

10. **ShowInputs** (boolean)
    - Mostrar inputs numéricos (default: false)

11. **ShowLabel** (boolean)
    - Mostrar/ocultar label (default: true)

12. **ShowHelper** (boolean)
    - Mostrar/ocultar helper text (default: false)

13. **ShowMarks** (boolean)
    - Mostrar marcas/ticks en el slider (default: false)

14. **Marks** (number[])
    - Valores donde mostrar marcas (si showMarks es true)

15. **ShowRangeGuide** (boolean)
    - Mostrar guía visual del rango debajo del slider (default: false)

16. **Label** (string)
    - Texto del label

17. **HelperText** (string)
    - Texto de ayuda (helper text)

18. **OnChange** (function)
    - Callback cuando cambia el valor (modo single)

19. **OnRangeChange** (function)
    - Callback cuando cambian los valores (modo range)

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Slider completo con todos los controladores

2. **OrientationHorizontal**
   - Orientación horizontal

3. **OrientationVertical**
   - Orientación vertical

4. **ModeSingle**
   - Modo single (un valor)

5. **ModeRange**
   - Modo range (dos valores)

6. **SizeXS**
   - Tamaño xs

7. **SizeSM**
   - Tamaño sm

8. **SizeMD**
   - Tamaño md (default)

9. **SizeLG**
   - Tamaño lg

10. **StateDefault**
    - Estado default

11. **StateDisabled**
    - Estado disabled

12. **WithInputs**
    - Con inputs numéricos

13. **WithoutInputs**
    - Sin inputs numéricos

14. **WithLabel**
    - Con label

15. **WithoutLabel**
    - Sin label

16. **WithHelperText**
    - Con helper text

17. **WithoutHelperText**
    - Sin helper text

18. **ShowHelper**
    - Mostrar helper text

19. **WithMarks**
    - Con marcas/ticks

20. **WithoutMarks**
    - Sin marcas/ticks

21. **WithRangeGuide**
    - Con guía visual del rango

22. **WithoutRangeGuide**
    - Sin guía visual del rango

23. **CustomMinMax**
    - Con min y max personalizados

24. **CustomStep**
    - Con step personalizado

25. **SingleWithValue**
    - Modo single con valor inicial

26. **RangeWithValues**
    - Modo range con valores iniciales

27. **OnChangeCallback**
    - Callback onChange (modo single)

28. **OnRangeChangeCallback**
    - Callback onRangeChange (modo range)

29. **AllSizes**
    - Todos los tamaños

30. **AllOrientations**
    - Todas las orientaciones

31. **CompleteExample**
    - Ejemplo completo

32. **MinimalExample**
    - Ejemplo mínimo

