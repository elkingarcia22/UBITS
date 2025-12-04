# Inventario de Casos de Uso - Toast

## Funcionalidades del Componente

1. **Type** ('success' | 'info' | 'warning' | 'error')
   - Tipo de toast (default: 'info')

2. **Title** (string, opcional)
   - Título del toast (se muestra arriba alineado con el botón X)

3. **Message** (string, requerido)
   - Mensaje del toast (cuerpo)

4. **Duration** (number)
   - Duración en milisegundos antes de cerrar automáticamente (0 = persistente)
   - Por defecto: success/info (3500ms), warning (5000ms), error (6500ms)

5. **NoClose** (boolean)
   - Si el toast NO tiene botón de cerrar (default: false)

6. **PauseOnHover** (boolean)
   - Si el timer se pausa cuando el usuario hace hover o focus (default: true)

7. **Action** (ToastAction)
   - Botón de acción opcional dentro del toast
   - { label: string, onClick: () => void }

8. **ContainerId** (string)
   - ID del contenedor donde se mostrará el toast (default: 'ubits-toast-container')

9. **OnClose** (callback)
   - Callback llamado cuando el toast se cierra

10. **Métodos**
    - `showToast(type, message, options)`: Muestra un toast
    - `renderToast(options)`: Renderiza el HTML del toast

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Toast completo con todos los controladores

2. **TypeSuccess**
   - Toast de tipo success

3. **TypeInfo**
   - Toast de tipo info (default)

4. **TypeWarning**
   - Toast de tipo warning

5. **TypeError**
   - Toast de tipo error

6. **WithTitle**
   - Toast con título

7. **WithoutTitle**
   - Toast sin título

8. **ShortMessage**
   - Toast con mensaje corto

9. **LongMessage**
   - Toast con mensaje largo

10. **WithAction**
    - Toast con botón de acción

11. **WithoutAction**
    - Toast sin botón de acción

12. **DurationDefault**
    - Toast con duración por defecto según tipo

13. **DurationCustom**
    - Toast con duración personalizada

14. **DurationPersistent**
    - Toast persistente (duration: 0)

15. **WithCloseButton**
    - Toast con botón de cerrar (default)

16. **WithoutCloseButton**
    - Toast sin botón de cerrar (noClose: true)

17. **PauseOnHover**
    - Toast con pausa en hover (default)

18. **NoPauseOnHover**
    - Toast sin pausa en hover

19. **OnCloseCallback**
    - Toast con callback onClose

20. **ActionCallback**
    - Toast con callback en botón de acción

21. **MultipleToasts**
    - Múltiples toasts apilados (máximo 3)

22. **Stacking**
    - Demostrar apilado de toasts

23. **AutoClose**
    - Toast que se cierra automáticamente

24. **ManualClose**
    - Toast que se cierra manualmente

25. **SuccessWithAction**
    - Toast success con acción

26. **ErrorWithAction**
    - Toast error con acción

27. **WarningWithAction**
    - Toast warning con acción

28. **InfoWithAction**
    - Toast info con acción

29. **CompleteExample**
    - Ejemplo completo con todas las opciones

30. **MinimalExample**
    - Ejemplo mínimo (solo mensaje)

