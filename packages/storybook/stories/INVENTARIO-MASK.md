# Inventario de Casos de Uso - Mask

## Funcionalidades del Componente

1. **TargetElement** (string | HTMLElement, requerido)
   - Selector CSS o elemento HTML que se quiere destacar

2. **Popover** (PopoverOptions, requerido)
   - Configuración del Popover que se mostrará
   - Incluye: title, bodyContent, width, footerButtons, etc.

3. **Padding** (number)
   - Padding adicional alrededor del elemento destacado (default: 8px)

4. **CloseOnOverlayClick** (boolean)
   - Si se debe cerrar al hacer clic en el overlay (default: true)

5. **OnClose** (callback)
   - Callback cuando se cierra la máscara

6. **Open** (boolean)
   - Si la máscara está abierta inicialmente (default: false)

7. **PopoverPosition** ('auto' | 'top' | 'bottom' | 'left' | 'right')
   - Posición del popover relativa al elemento destacado (default: 'auto')

8. **PopoverOffset** (number)
   - Offset del popover desde el elemento destacado (default: 12px)

9. **Métodos**
   - `open()`: Abre la máscara
   - `close()`: Cierra la máscara
   - `updateTarget(newTarget)`: Actualiza el elemento objetivo
   - `destroy()`: Destruye la máscara y limpia recursos

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Mask completo con todos los controladores

2. **PopoverPositionAuto**
   - Popover con posición automática

3. **PopoverPositionTop**
   - Popover en posición top

4. **PopoverPositionBottom**
   - Popover en posición bottom

5. **PopoverPositionLeft**
   - Popover en posición left

6. **PopoverPositionRight**
   - Popover en posición right

7. **PopoverWidthSmall**
   - Popover con ancho small (240px)

8. **PopoverWidthMedium**
   - Popover con ancho medium (360px, default)

9. **PopoverWidthLarge**
   - Popover con ancho large (400px)

10. **PopoverWidthXLarge**
    - Popover con ancho xlarge (480px)

11. **CustomPadding**
    - Máscara con padding personalizado

12. **CustomPopoverOffset**
    - Popover con offset personalizado

13. **CloseOnOverlayClick**
    - Máscara que se cierra al hacer clic en el overlay

14. **NoCloseOnOverlayClick**
    - Máscara que NO se cierra al hacer clic en el overlay

15. **OpenInitially**
    - Máscara abierta inicialmente

16. **ClosedInitially**
    - Máscara cerrada inicialmente

17. **OnCloseCallback**
    - Con callback onClose

18. **PopoverWithTitle**
    - Popover con título

19. **PopoverWithoutTitle**
    - Popover sin título

20. **PopoverWithFooterButtons**
    - Popover con botones en el footer

21. **PopoverPrimaryButtonOnly**
    - Popover solo con botón primario

22. **PopoverSecondaryButtonOnly**
    - Popover solo con botón secundario

23. **PopoverTertiaryButtonOnly**
    - Popover solo con botón terciario

24. **PopoverWithoutFooterButtons**
    - Popover sin botones en el footer

25. **OpenCloseMethods**
    - Demostrar métodos open() y close()

26. **UpdateTargetMethod**
    - Demostrar método updateTarget()

27. **DifferentTargetElements**
    - Máscara destacando diferentes tipos de elementos

28. **OnboardingFlow**
    - Flujo de onboarding con múltiples pasos

29. **MinimalExample**
    - Ejemplo mínimo

30. **CompleteExample**
    - Ejemplo completo con todas las opciones

