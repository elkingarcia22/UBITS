# Inventario de Casos de Uso - Progress Bar

## Funcionalidades del Componente

1. **Size** ('xs' | 'sm' | 'md' | 'lg')
   - Tamaño del progress bar (default: 'md')
   - XS: 4px, SM: 8px, MD: 16px, LG: 20px

2. **Value** (number)
   - Valor del progreso (0-100)
   - Solo se usa cuando variant es 'default'

3. **Variant** ('default' | 'multi-color')
   - Variante del progress bar (default: 'default')
   - Default: Un solo color (azul neutral)
   - Multi-color: Múltiples segmentos con diferentes colores

4. **Segments** (ProgressSegment[])
   - Segmentos para la variante multi-color
   - Cada segmento tiene: value (0-100), color ('yellow' | 'green' | 'gray' | 'info' | 'error')
   - El segmento gris se calcula automáticamente como el resto que falta para llegar a 100%

5. **Indicator** (boolean | string)
   - Indicador de texto (porcentaje o texto personalizado)
   - Si es true, muestra el porcentaje automáticamente
   - Si es string, muestra ese texto
   - Si es false o undefined, no muestra indicador

6. **ClassName** (string)
   - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Progress Bar completo con todos los controladores

2. **SizeXS**
   - Tamaño extra small (4px)

3. **SizeSM**
   - Tamaño small (8px)

4. **SizeMD**
   - Tamaño medium (16px, default)

5. **SizeLG**
   - Tamaño large (20px)

6. **VariantDefault**
   - Variante default (un solo color)

7. **VariantMultiColor**
   - Variante multi-color (múltiples segmentos)

8. **Value0**
   - Valor 0%

9. **Value25**
   - Valor 25%

10. **Value50**
    - Valor 50%

11. **Value75**
    - Valor 75%

12. **Value100**
    - Valor 100%

13. **WithIndicator**
    - Con indicador de porcentaje

14. **WithoutIndicator**
    - Sin indicador

15. **CustomIndicator**
    - Con indicador de texto personalizado

16. **MultiColor2Segments**
    - Multi-color con 2 segmentos

17. **MultiColor3Segments**
    - Multi-color con 3 segmentos

18. **MultiColor4Segments**
    - Multi-color con 4 segmentos

19. **MultiColor5Segments**
    - Multi-color con 5 segmentos

20. **MultiColorAllColors**
    - Multi-color con todos los colores disponibles

21. **MultiColorYellow**
    - Multi-color con segmento amarillo

22. **MultiColorGreen**
    - Multi-color con segmento verde

23. **MultiColorGray**
    - Multi-color con segmento gris

24. **MultiColorInfo**
    - Multi-color con segmento info (azul)

25. **MultiColorError**
    - Multi-color con segmento error (rojo)

26. **AllSizes**
    - Todos los tamaños

27. **AllVariants**
    - Todas las variantes

28. **AllValues**
    - Todos los valores principales (0, 25, 50, 75, 100)

29. **CompleteExample**
    - Ejemplo completo con todas las opciones

30. **MinimalExample**
    - Ejemplo mínimo

