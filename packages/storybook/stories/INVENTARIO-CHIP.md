# Inventario de Casos de Uso - Chip

## Funcionalidades del Componente

1. **Label** (string)
   - Texto del chip (requerido)

2. **Size** ('xs' | 'sm' | 'md' | 'lg')
   - Tamaño del chip (default: 'md')
   - xs: 20px, sm: 24px, md: 28px, lg: 36px

3. **State** ('default' | 'hover' | 'active' | 'pressed' | 'focus' | 'disabled')
   - Estado del chip (default: 'default')

4. **LeftIcon** (string)
   - Icono izquierdo (nombre del icono FontAwesome sin el prefijo 'fa-')
   - Ej: 'tag', 'user'

5. **RightIcon** (string)
   - Icono derecho para el botón de cerrar (default: 'xmark')
   - Se usa si closable es true

6. **Clickable** (boolean)
   - Si el chip es clickeable (añade estilos hover/active y cursor pointer) (default: false)

7. **Closable** (boolean)
   - Si el chip tiene botón de cerrar (default: false)

8. **OnClick** (callback)
   - Función a ejecutar cuando se hace clic en el chip (solo si clickable es true)

9. **OnClose** (callback)
   - Función a ejecutar cuando se hace clic en el botón de cerrar

10. **ClassName** (string)
    - Clases CSS adicionales

11. **ContainerId** (string)
    - ID del contenedor donde se renderizará el chip (solo para createChip)

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Chip completo con todos los controladores

2. **SizeXS**
   - Chip tamaño extra small (20px)

3. **SizeSM**
   - Chip tamaño small (24px)

4. **SizeMD**
   - Chip tamaño medium (28px, default)

5. **SizeLG**
   - Chip tamaño large (36px)

6. **StateDefault**
   - Chip estado default

7. **StateHover**
   - Chip estado hover

8. **StateActive**
   - Chip estado active

9. **StatePressed**
   - Chip estado pressed

10. **StateFocus**
    - Chip estado focus (con borde y box-shadow)

11. **StateDisabled**
    - Chip estado disabled

12. **WithLeftIcon**
    - Chip con icono izquierdo

13. **WithRightIcon**
    - Chip con icono derecho (botón de cerrar)

14. **WithBothIcons**
    - Chip con icono izquierdo y derecho

15. **WithoutIcons**
    - Chip sin iconos

16. **Clickable**
    - Chip clickeable

17. **Closable**
    - Chip con botón de cerrar

18. **ClickableAndClosable**
    - Chip clickeable y con botón de cerrar

19. **OnClickCallback**
    - Chip con callback onClick

20. **OnCloseCallback**
    - Chip con callback onClose

21. **AllSizes**
    - Todos los tamaños

22. **AllStates**
    - Todos los estados

23. **CompleteExample**
    - Ejemplo completo con todas las opciones

24. **MinimalExample**
    - Ejemplo mínimo

