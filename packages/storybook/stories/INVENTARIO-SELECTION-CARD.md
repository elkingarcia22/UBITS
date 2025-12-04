# Inventario de Casos de Uso - Selection Card

## Funcionalidades del Componente

1. **Estados** (SelectionCardState)
   - `default`: Estado por defecto
   - `selected`: Card seleccionada
   - `disabled`: Card deshabilitada

2. **Tamaños** (SelectionCardSize)
   - `sm`: Tamaño pequeño
   - `md`: Tamaño mediano (default)
   - `lg`: Tamaño grande

3. **Título** (string, requerido)
   - Título de la card

4. **Descripción** (string, opcional)
   - Descripción opcional (body-sm-regular)

5. **Icono** (string, opcional)
   - Nombre del icono FontAwesome (sin prefijo fa-)
   - Estilo: `regular` o `solid`

6. **Imagen** (string, opcional)
   - URL de imagen (reemplaza el icono si está presente)

7. **Selection Count** (objeto, opcional)
   - `current`: Número actual de seleccionados
   - `total`: Número total disponible
   - Muestra "X/Y seleccionados"

8. **Selección**
   - **Única**: Solo una card seleccionada a la vez
   - **Múltiple**: Múltiples cards seleccionadas

9. **Radio Button Visual**
   - Radio button a la derecha que refleja el estado de selección
   - Se actualiza automáticamente al seleccionar/deseleccionar

10. **Callbacks**
    - `onSelectionChange`: Cuando cambia la selección
    - `onClick`: Cuando se hace click en una card

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Card básica con todos los controladores

2. **BasicCard**
   - Card básica con solo título

3. **WithDescription**
   - Card con título y descripción

4. **WithIcon**
   - Card con icono

5. **WithIconRegular**
   - Card con icono estilo regular

6. **WithIconSolid**
   - Card con icono estilo solid

7. **WithImage**
   - Card con imagen (reemplaza icono)

8. **WithSelectionCount**
   - Card con contador de selección

9. **StateDefault**
   - Card en estado default

10. **StateSelected**
    - Card en estado selected

11. **StateDisabled**
    - Card en estado disabled

12. **SizeSmall**
    - Card tamaño pequeño (sm)

13. **SizeMedium**
    - Card tamaño mediano (md)

14. **SizeLarge**
    - Card tamaño grande (lg)

15. **SingleSelection**
    - Selección única (una card a la vez)

16. **MultipleSelection**
    - Selección múltiple (varias cards)

17. **PreSelected**
    - Cards pre-seleccionadas

18. **OnSelectionChange**
    - Con callback onSelectionChange

19. **OnClick**
    - Con callback onClick

20. **CompleteExample**
    - Ejemplo completo con todas las opciones

21. **MinimalExample**
    - Ejemplo mínimo (solo título)

22. **MultipleCards**
    - Múltiples cards en un contenedor

23. **MultipleCardsSingleSelection**
    - Múltiples cards con selección única

24. **MultipleCardsMultipleSelection**
    - Múltiples cards con selección múltiple

25. **MixedStates**
    - Cards con diferentes estados

26. **MixedSizes**
    - Cards con diferentes tamaños

27. **WithIconAndDescription**
    - Card con icono y descripción

28. **WithImageAndDescription**
    - Card con imagen y descripción

29. **WithSelectionCountAndDescription**
    - Card con contador y descripción

30. **LongTitle**
    - Card con título largo

31. **LongDescription**
    - Card con descripción larga

32. **AllFeatures**
    - Card con todas las características (icono, descripción, contador)

