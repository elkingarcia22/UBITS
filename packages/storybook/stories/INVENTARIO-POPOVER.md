# Inventario de Casos de Uso - Popover

## Funcionalidades del Componente

1. **Title** (string, opcional)
   - Título del popover

2. **BodyContent** (string | (() => string))
   - Contenido del body del popover (HTML string o función que retorna HTML)

3. **Width** ('sm' | 'md' | 'lg' | 'xl')
   - Ancho del popover (default: 'md')
   - sm: 240px, md: 360px, lg: 400px, xl: 480px

4. **TailPosition** ('top' | 'bottom' | 'left' | 'right')
   - Posición del tail (flecha) (default: 'top')

5. **TailOffset** (number)
   - Offset horizontal del tail desde el centro (default: 0)

6. **FooterButtons**
   - **Tertiary**: Botón terciario (izquierda)
   - **Secondary**: Botón secundario (derecha)
   - **Primary**: Botón primario (derecha)
   - Cada botón tiene `label` y `onClick`

7. **OnClose** (callback)
   - Callback cuando se hace clic fuera del popover

8. **Open** (boolean)
   - Si el popover está abierto inicialmente (default: false)

9. **CloseOnOutsideClick** (boolean)
   - Si se debe cerrar al hacer clic fuera (default: true)

10. **Position** (object)
    - Posición del popover (coordenadas absolutas)
    - { top?: number, left?: number, right?: number, bottom?: number }

11. **ReferenceElement** (HTMLElement)
    - Elemento de referencia para posicionar el popover

12. **Métodos**
    - `open()`: Abrir el popover
    - `close()`: Cerrar el popover
    - `updateContent(content)`: Actualizar el contenido del body
    - `updatePosition(position)`: Actualizar la posición del popover
    - `destroy()`: Destruir el popover y limpiar recursos

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Popover completo con todos los controladores

2. **WidthSmall**
   - Popover con ancho small (240px)

3. **WidthMedium**
   - Popover con ancho medium (360px, default)

4. **WidthLarge**
   - Popover con ancho large (400px)

5. **WidthXLarge**
   - Popover con ancho xlarge (480px)

6. **TailPositionTop**
   - Tail en posición top (default)

7. **TailPositionBottom**
   - Tail en posición bottom

8. **TailPositionLeft**
   - Tail en posición left

9. **TailPositionRight**
   - Tail en posición right

10. **TailOffset**
    - Tail con offset personalizado

11. **WithTitle**
    - Popover con título

12. **WithoutTitle**
    - Popover sin título

13. **WithFooterButtons**
    - Popover con todos los botones del footer

14. **FooterTertiaryOnly**
    - Popover solo con botón terciario

15. **FooterSecondaryOnly**
    - Popover solo con botón secundario

16. **FooterPrimaryOnly**
    - Popover solo con botón primario

17. **FooterSecondaryAndPrimary**
    - Popover con botones secundario y primario

18. **WithoutFooterButtons**
    - Popover sin botones del footer

19. **CloseOnOutsideClick**
    - Popover que se cierra al hacer clic fuera

20. **NoCloseOnOutsideClick**
    - Popover que NO se cierra al hacer clic fuera

21. **OpenInitially**
    - Popover abierto inicialmente

22. **ClosedInitially**
    - Popover cerrado inicialmente

23. **OnCloseCallback**
    - Con callback onClose

24. **FooterButtonCallbacks**
    - Popover con callbacks en los botones del footer

25. **BodyContentString**
    - Body content como string HTML

26. **BodyContentFunction**
    - Body content como función que retorna HTML

27. **LongContent**
    - Popover con contenido largo (scrollable)

28. **ShortContent**
    - Popover con contenido corto

29. **EmptyContent**
    - Popover sin contenido (placeholder)

30. **UpdateContentMethod**
    - Demostrar método updateContent()

31. **UpdatePositionMethod**
    - Demostrar método updatePosition()

32. **OpenCloseMethods**
    - Demostrar métodos open() y close()

33. **WithReferenceElement**
    - Popover posicionado relativo a un elemento de referencia

34. **WithAbsolutePosition**
    - Popover con posición absoluta

35. **MinimalExample**
    - Ejemplo mínimo

36. **CompleteExample**
    - Ejemplo completo con todas las opciones

