# Inventario de Casos de Uso - Tooltip

## Funcionalidades del Componente

1. **Title** (string, opcional)
   - Título del tooltip

2. **ShowTitle** (boolean)
   - Mostrar título (default: true)

3. **Description** (string, opcional)
   - Descripción o mensaje del tooltip

4. **ShowDescription** (boolean)
   - Mostrar descripción (default: true)

5. **Width** ('sm' | 'md' | 'lg')
   - Tamaño del tooltip (default: 'md')
   - sm: 120-240px, md: 160-320px, lg: 200-400px
   - El ancho se adapta automáticamente al contenido

6. **TailPosition** ('top' | 'bottom' | 'left' | 'right')
   - Posición del tail (flecha) (default: 'top')

7. **TailOffset** (number)
   - Offset del tail desde el centro (default: 0)

8. **PrimaryButton**
   - **Label**: Texto del botón primario
   - **Show**: Mostrar botón primario (default: false)
   - **Icon**: Icono del botón primario
   - **ShowIcon**: Mostrar icono en el botón primario (default: false)
   - **OnClick**: Callback cuando se hace clic

9. **SecondaryButton**
   - **Label**: Texto del botón secundario
   - **Show**: Mostrar botón secundario (default: false)
   - **Icon**: Icono del botón secundario
   - **ShowIcon**: Mostrar icono en el botón secundario (default: false)
   - **OnClick**: Callback cuando se hace clic

10. **TertiaryButton**
    - **Label**: Texto del botón terciario
    - **Show**: Mostrar botón terciario (default: false)
    - **Icon**: Icono del botón terciario
    - **ShowIcon**: Mostrar icono en el botón terciario (default: false)
    - **OnClick**: Callback cuando se hace clic

11. **Open** (boolean)
    - Si el tooltip está abierto inicialmente (default: false)

12. **CloseOnOutsideClick** (boolean)
    - Si se debe cerrar al hacer clic fuera (default: true)

13. **OnClose** (callback)
    - Callback cuando se cierra el tooltip

14. **Métodos**
    - `open()`: Abrir el tooltip
    - `close()`: Cerrar el tooltip
    - `updatePosition(position)`: Actualizar la posición del tooltip
    - `destroy()`: Destruir el tooltip y limpiar recursos

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Tooltip completo con todos los controladores

2. **WidthSmall**
   - Tooltip con ancho small (120-240px)

3. **WidthMedium**
   - Tooltip con ancho medium (160-320px, default)

4. **WidthLarge**
   - Tooltip con ancho large (200-400px)

5. **TailPositionTop**
   - Tail en posición top (default)

6. **TailPositionBottom**
   - Tail en posición bottom

7. **TailPositionLeft**
   - Tail en posición left

8. **TailPositionRight**
   - Tail en posición right

9. **TailOffset**
   - Tail con offset personalizado

10. **WithTitle**
    - Tooltip con título

11. **WithoutTitle**
    - Tooltip sin título (showTitle: false)

12. **WithDescription**
    - Tooltip con descripción

13. **WithoutDescription**
    - Tooltip sin descripción (showDescription: false)

14. **TitleOnly**
    - Tooltip solo con título (sin descripción)

15. **DescriptionOnly**
    - Tooltip solo con descripción (sin título)

16. **PrimaryButtonOnly**
    - Tooltip solo con botón primario

17. **SecondaryButtonOnly**
    - Tooltip solo con botón secundario

18. **TertiaryButtonOnly**
    - Tooltip solo con botón terciario

19. **PrimaryAndSecondary**
    - Tooltip con botones primario y secundario

20. **AllButtons**
    - Tooltip con todos los botones (tertiary, secondary, primary)

21. **PrimaryButtonWithIcon**
    - Botón primario con icono

22. **SecondaryButtonWithIcon**
    - Botón secundario con icono

23. **TertiaryButtonWithIcon**
    - Botón terciario con icono

24. **AllButtonsWithIcons**
    - Todos los botones con iconos

25. **ButtonCallbacks**
    - Tooltip con callbacks en todos los botones

26. **CloseOnOutsideClick**
    - Tooltip que se cierra al hacer clic fuera

27. **NoCloseOnOutsideClick**
    - Tooltip que NO se cierra al hacer clic fuera

28. **OpenInitially**
    - Tooltip abierto inicialmente

29. **ClosedInitially**
    - Tooltip cerrado inicialmente

30. **OnCloseCallback**
    - Tooltip con callback onClose

31. **UpdatePositionMethod**
    - Demostrar método updatePosition()

32. **OpenCloseMethods**
    - Demostrar métodos open() y close()

33. **WithReferenceElement**
    - Tooltip posicionado relativo a un elemento de referencia

34. **MinimalExample**
    - Ejemplo mínimo (solo descripción)

35. **CompleteExample**
    - Ejemplo completo con todas las opciones

