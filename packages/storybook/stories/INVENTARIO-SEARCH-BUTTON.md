# Inventario de Casos de Uso - Search Button

## Funcionalidades del Componente

1. **Active** (boolean)
   - Si el botón está en modo activo (muestra input) (default: false)

2. **Size** ('sm' | 'md')
   - Tamaño del botón (default: 'md')
   - sm: 32px
   - md: 40px

3. **State** ('default' | 'hover' | 'active' | 'disabled')
   - Estado del botón (default: 'default')

4. **Disabled** (boolean)
   - Si el botón está deshabilitado (default: false)

5. **Placeholder** (string)
   - Placeholder del input cuando está activo (default: '')

6. **Value** (string)
   - Valor del input cuando está activo (default: '')

7. **Width** (number)
   - Ancho del input cuando está activo (en px) (default: 248)

8. **OnChange** (function)
   - Callback cuando cambia el valor del input

9. **OnClick** (function)
   - Callback cuando se hace click en el botón

10. **OnFocus** (function)
    - Callback cuando el input recibe focus

11. **OnBlur** (function)
    - Callback cuando el input pierde focus

12. **ClassName** (string)
    - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Search button completo con todos los controladores

2. **ModeButton**
   - Modo botón (no activo)

3. **ModeInput**
   - Modo input (activo)

4. **SizeSM**
   - Tamaño sm

5. **SizeMD**
   - Tamaño md (default)

6. **StateDefault**
   - Estado default

7. **StateHover**
   - Estado hover

8. **StateActive**
   - Estado active (despliega input)

9. **StateDisabled**
   - Estado disabled

10. **ActiveWithValue**
    - Activo con valor

11. **ActiveWithoutValue**
    - Activo sin valor

12. **ActiveWithClearButton**
    - Activo con botón de limpiar visible

13. **ActiveWithoutClearButton**
    - Activo sin botón de limpiar

14. **WithPlaceholder**
    - Con placeholder

15. **WithoutPlaceholder**
    - Sin placeholder

16. **CustomWidth**
    - Ancho personalizado

17. **DefaultWidth**
    - Ancho por defecto (248px)

18. **Disabled**
    - Search button deshabilitado

19. **NotDisabled**
    - Search button habilitado

20. **OnChangeCallback**
    - Callback onChange

21. **OnClickCallback**
    - Callback onClick

22. **OnFocusCallback**
    - Callback onFocus

23. **OnBlurCallback**
    - Callback onBlur

24. **AllSizes**
    - Todos los tamaños

25. **AllStates**
    - Todos los estados

26. **CompleteExample**
    - Ejemplo completo

27. **MinimalExample**
    - Ejemplo mínimo

