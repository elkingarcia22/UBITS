# Inventario de Casos de Uso - Radio Button

## Funcionalidades del Componente

1. **Label** (string)
   - Texto del label del radio button

2. **ComplementaryText** (string | undefined)
   - Texto complementario opcional (se muestra debajo del label)

3. **Value** (string)
   - Valor del radio button (para agrupar radio buttons)

4. **Name** (string)
   - Nombre del grupo de radio buttons (para agrupar)

5. **Checked** (boolean)
   - Si el radio button está seleccionado (default: false)

6. **Size** ('sm' | 'md')
   - Tamaño del radio button (default: 'md')
   - sm: 16px
   - md: 20px

7. **State** ('default' | 'hover' | 'active' | 'disabled')
   - Estado del radio button (default: 'default')

8. **Disabled** (boolean)
   - Si el radio button está deshabilitado (default: false)

9. **OnChange** (function)
   - Callback cuando cambia el estado del radio button

10. **ClassName** (string)
    - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Radio button completo con todos los controladores

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
   - Radio button seleccionado

9. **Unchecked**
   - Radio button no seleccionado

10. **WithComplementaryText**
    - Con texto complementario

11. **WithoutComplementaryText**
    - Sin texto complementario

12. **Disabled**
    - Radio button deshabilitado

13. **NotDisabled**
    - Radio button habilitado

14. **OnChangeCallback**
    - Callback onChange

15. **RadioGroup**
    - Grupo de radio buttons

16. **RadioGroupWithOneChecked**
    - Grupo con uno seleccionado

17. **RadioGroupAllUnchecked**
    - Grupo sin seleccionar

18. **RadioGroupWithComplementaryText**
    - Grupo con texto complementario

19. **RadioGroupDisabled**
    - Grupo deshabilitado

20. **RadioGroupMixedStates**
    - Grupo con diferentes estados

21. **AllSizes**
    - Todos los tamaños

22. **AllStates**
    - Todos los estados

23. **CompleteExample**
    - Ejemplo completo

24. **MinimalExample**
    - Ejemplo mínimo

