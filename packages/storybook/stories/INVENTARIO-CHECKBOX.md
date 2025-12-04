# Inventario de Casos de Uso - Checkbox

## Funcionalidades del Componente

1. **Label** (string)
   - Texto del label del checkbox

2. **ComplementaryText** (string)
   - Texto complementario opcional (se muestra debajo del label)

3. **Value** (string)
   - Valor del checkbox

4. **Name** (string)
   - Nombre del checkbox (para agrupar checkboxes)

5. **Checked** (boolean)
   - Si el checkbox está seleccionado (default: false)

6. **Indeterminate** (boolean)
   - Si el checkbox está en estado indeterminado (muestra línea horizontal en vez de check) (default: false)

7. **Size** ('sm' | 'md')
   - Tamaño del checkbox (sm: 16px, md: 20px) (default: 'md')

8. **State** ('default' | 'hover' | 'active' | 'disabled')
   - Estado del checkbox (default: 'default')

9. **Disabled** (boolean)
   - Si el checkbox está deshabilitado (default: false)

10. **OnChange** (function)
    - Callback cuando cambia el estado del checkbox

11. **ClassName** (string)
    - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Checkbox completo con todos los controladores

2. **SizeSM**
   - Tamaño sm

3. **SizeMD**
   - Tamaño md (default)

4. **Checked**
   - Checkbox seleccionado

5. **Unchecked**
   - Checkbox no seleccionado

6. **Indeterminate**
   - Checkbox en estado indeterminado

7. **StateDefault**
   - Estado default

8. **StateHover**
   - Estado hover

9. **StateActive**
   - Estado active

10. **StateDisabled**
    - Estado disabled

11. **Disabled**
    - Checkbox deshabilitado

12. **WithLabel**
    - Con label

13. **WithoutLabel**
    - Sin label (label vacío)

14. **WithComplementaryText**
    - Con texto complementario

15. **WithoutComplementaryText**
    - Sin texto complementario

16. **WithValue**
    - Con valor

17. **WithoutValue**
    - Sin valor

18. **WithName**
    - Con nombre (para agrupar)

19. **WithoutName**
    - Sin nombre

20. **OnChangeCallback**
    - Callback cuando cambia el estado

21. **CheckedWithComplementaryText**
    - Seleccionado con texto complementario

22. **IndeterminateWithComplementaryText**
    - Indeterminado con texto complementario

23. **DisabledWithComplementaryText**
    - Deshabilitado con texto complementario

24. **AllSizes**
    - Todos los tamaños

25. **AllStates**
    - Todos los estados

26. **CustomClassName**
    - Con clase CSS personalizada

27. **CompleteExample**
    - Ejemplo completo

28. **MinimalExample**
    - Ejemplo mínimo

