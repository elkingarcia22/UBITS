# Inventario de Casos de Uso - Skeleton

## Funcionalidades del Componente

1. **Variant** ('text' | 'circle' | 'rectangle' | 'custom')
   - Variante del skeleton (default: 'text')
   - 'text': Líneas de texto
   - 'circle': Círculo (para avatares)
   - 'rectangle': Rectángulo (para imágenes, cards)
   - 'custom': Forma personalizada

2. **Size** ('xs' | 'sm' | 'md' | 'lg' | 'xl')
   - Tamaño del skeleton (default: 'md')

3. **Width** (number | string | 'full')
   - Ancho del skeleton (para text y rectangle)
   - Puede ser un número (px), porcentaje, o 'full' para 100%
   - Default: 'full'

4. **Height** (number | string)
   - Alto del skeleton (para rectangle y custom)
   - Puede ser un número (px) o porcentaje

5. **Lines** (number)
   - Número de líneas de texto (solo para variant='text')
   - Default: 1

6. **Animated** (boolean)
   - Si el skeleton debe tener animación de pulso
   - Default: true

7. **ClassName** (string)
   - Clases CSS adicionales

8. **Style** (string)
   - Estilos inline adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Skeleton completo con todos los controladores

2. **VariantText**
   - Skeleton variante text (líneas de texto)

3. **VariantCircle**
   - Skeleton variante circle (círculo para avatares)

4. **VariantRectangle**
   - Skeleton variante rectangle (rectángulo para imágenes/cards)

5. **VariantCustom**
   - Skeleton variante custom (forma personalizada)

6. **SizeXS**
   - Skeleton tamaño extra small

7. **SizeSM**
   - Skeleton tamaño small

8. **SizeMD**
   - Skeleton tamaño medium (default)

9. **SizeLG**
   - Skeleton tamaño large

10. **SizeXL**
    - Skeleton tamaño extra large

11. **WidthFull**
    - Skeleton con ancho completo (100%)

12. **WidthFixed**
    - Skeleton con ancho fijo (px)

13. **WidthPercentage**
    - Skeleton con ancho porcentual

14. **HeightFixed**
    - Skeleton con alto fijo (px)

15. **HeightPercentage**
    - Skeleton con alto porcentual

16. **Lines1**
    - Skeleton text con 1 línea

17. **LinesMultiple**
    - Skeleton text con múltiples líneas

18. **Animated**
    - Skeleton con animación de pulso

19. **NotAnimated**
    - Skeleton sin animación

20. **AllVariants**
    - Todas las variantes

21. **AllSizes**
    - Todos los tamaños

22. **TextSizes**
    - Todos los tamaños para variante text

23. **CircleSizes**
    - Todos los tamaños para variante circle

24. **RectangleSizes**
    - Todos los tamaños para variante rectangle

25. **CompleteExample**
    - Ejemplo completo con todas las opciones

26. **MinimalExample**
    - Ejemplo mínimo

