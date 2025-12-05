# Inventario de Casos de Uso - Toggle

## Funcionalidades del Componente

1. **Label** (string | undefined)
   - Texto del label del toggle

2. **ComplementaryText** (string | undefined)
   - Texto complementario opcional (se muestra debajo del label)

3. **Value** (string | undefined)
   - Valor del toggle

4. **Name** (string | undefined)
   - Nombre del toggle (para agrupar toggles)

5. **Checked** (boolean)
   - Si el toggle está activado (default: false)

6. **Size** ('sm' | 'md')
   - Tamaño del toggle (default: 'md')
   - sm: 33x16px
   - md: 36x20px

7. **State** ('default' | 'hover' | 'active' | 'disabled')
   - Estado del toggle (default: 'default')

8. **Disabled** (boolean)
   - Si el toggle está deshabilitado (default: false)

9. **OnChange** (function)
   - Callback cuando cambia el estado del toggle

10. **ClassName** (string)
    - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Toggle completo con todos los controladores

2. **SizeSM**
   - Tamaño sm

3. **SizeMD**
   - Tamaño md (default)

4. **StateDefault**
   - Estado default

5. **StateHover**
   - Estado hover

6. **StateActive**
   - Estado active

7. **StateDisabled**
   - Estado disabled

8. **Checked**
   - Toggle activado

9. **Unchecked**
   - Toggle desactivado

10. **WithLabel**
    - Con label

11. **WithoutLabel**
    - Sin label

12. **WithComplementaryText**
    - Con texto complementario

13. **WithoutComplementaryText**
    - Sin texto complementario

14. **Disabled**
    - Toggle deshabilitado

15. **NotDisabled**
    - Toggle habilitado

16. **OnChangeCallback**
    - Callback onChange

17. **WithValue**
    - Con valor

18. **WithName**
    - Con nombre

19. **ToggleGroup**
    - Grupo de toggles

20. **ToggleGroupWithSomeChecked**
    - Grupo con algunos activados

21. **ToggleGroupAllUnchecked**
    - Grupo sin activar

22. **ToggleGroupWithComplementaryText**
    - Grupo con texto complementario

23. **ToggleGroupDisabled**
    - Grupo deshabilitado

24. **AllSizes**
    - Todos los tamaños

25. **AllStates**
    - Todos los estados

26. **CompleteExample**
    - Ejemplo completo

27. **MinimalExample**
    - Ejemplo mínimo

