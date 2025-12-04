# Inventario de Casos de Uso - Button AI

## Funcionalidades del Componente

1. **Variant** ('primary' | 'secondary')
   - Variante del botón AI (default: 'primary')
   - Solo incluye 2 variantes (primary y secondary)

2. **Size** ('xs' | 'sm' | 'md' | 'lg' | 'xl')
   - Tamaño del botón (default: 'md')

3. **Text** (string)
   - Texto del botón

4. **Icon** (string)
   - Nombre del icono FontAwesome (sin prefijo 'fa-')
   - Ej: 'sparkles' para 'fa-sparkles'

5. **IconStyle** ('regular' | 'solid')
   - Estilo del icono FontAwesome (default: 'regular')

6. **IconOnly** (boolean)
   - Solo icono, sin texto (default: false)

7. **Disabled** (boolean)
   - Botón deshabilitado (default: false)

8. **Badge** (boolean)
   - Mostrar badge de notificación (default: false)

9. **Active** (boolean)
   - Modificador active/outline (default: false)

10. **OnClick** (callback)
    - Handler de click

11. **ClassName** (string)
    - Clases CSS adicionales

12. **Attributes** (Record<string, string>)
    - Atributos HTML adicionales

## Características Especiales

- Estilo redondeado (pill shape) con `border-radius: 9999px`
- Gradiente radial en variante primary
- Icono siempre a la izquierda del texto (no hay iconPosition)
- No tiene opciones de loading, floating, fullWidth, block, dropdown, tooltip

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Button AI completo con todos los controladores

2. **VariantPrimary**
   - Botón AI variante primary

3. **VariantSecondary**
   - Botón AI variante secondary

4. **SizeXS**
   - Botón AI tamaño extra small

5. **SizeSM**
   - Botón AI tamaño small

6. **SizeMD**
   - Botón AI tamaño medium (default)

7. **SizeLG**
   - Botón AI tamaño large

8. **SizeXL**
   - Botón AI tamaño extra large

9. **WithIcon**
   - Botón AI con icono

10. **IconOnly**
    - Botón AI solo icono (sin texto)

11. **IconStyleRegular**
    - Icono estilo regular (far)

12. **IconStyleSolid**
    - Icono estilo solid (fas)

13. **WithText**
    - Botón AI solo con texto

14. **WithIconAndText**
    - Botón AI con icono y texto

15. **Disabled**
    - Botón AI deshabilitado

16. **WithBadge**
    - Botón AI con badge de notificación

17. **Active**
    - Botón AI con estado active

18. **OnClickCallback**
    - Botón AI con callback onClick

19. **AllVariants**
    - Todas las variantes (primary, secondary)

20. **AllSizes**
    - Todos los tamaños

21. **AllIconStyles**
    - Todos los estilos de icono

22. **CompleteExample**
    - Ejemplo completo con todas las opciones

23. **MinimalExample**
    - Ejemplo mínimo

