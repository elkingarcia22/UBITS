# Inventario de Casos de Uso - List

## Funcionalidades del Componente

1. **Items** (ListItem[])
   - Array de items de la lista (REQUERIDO)

2. **Size** ('xs' | 'sm' | 'md' | 'lg')
   - Tamaño de los items de la lista (default: 'md')

3. **MaxHeight** (string)
   - Altura máxima de la lista (para scroll) (default: '400px')

4. **Multiple** (boolean)
   - Si la lista permite selección múltiple (default: false)

5. **OnSelectionChange** (function)
   - Callback cuando cambia la selección

6. **ClassName** (string)
   - Clases CSS adicionales

7. **Attributes** (Record<string, string>)
   - Atributos HTML adicionales

8. **ListItem** (interface)
   - label: string
   - state?: 'default' | 'hover' | 'active' | 'disabled'
   - value?: string
   - selected?: boolean
   - onClick?: (item: ListItem, index: number) => void
   - attributes?: Record<string, string>

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - List completo con todos los controladores

2. **SizeXS**
   - Tamaño xs

3. **SizeSM**
   - Tamaño sm

4. **SizeMD**
   - Tamaño md (default)

5. **SizeLG**
   - Tamaño lg

6. **StateDefault**
   - Items en estado default

7. **StateHover**
   - Items en estado hover

8. **StateActive**
   - Items en estado active

9. **StateDisabled**
   - Items en estado disabled

10. **MixedStates**
    - Items con diferentes estados

11. **SelectedItem**
    - Item seleccionado

12. **MultipleSelectedItems**
    - Múltiples items seleccionados

13. **SingleSelection**
    - Selección simple

14. **MultipleSelection**
    - Selección múltiple

15. **WithScrollbar**
    - Con scrollbar UBITS

16. **WithoutScrollbar**
    - Sin scrollbar

17. **CustomMaxHeight**
    - Con altura máxima personalizada

18. **DefaultMaxHeight**
    - Con altura máxima por defecto (400px)

19. **FewItems**
    - Pocos items

20. **ManyItems**
    - Muchos items (con scroll)

21. **EmptyList**
    - Lista vacía

22. **ItemWithValue**
    - Items con valor

23. **ItemWithOnClick**
    - Items con callback onClick

24. **ItemWithAttributes**
    - Items con atributos personalizados

25. **OnSelectionChangeCallback**
    - Callback onSelectionChange

26. **AllSizes**
    - Todos los tamaños

27. **AllStates**
    - Todos los estados

28. **CompleteExample**
    - Ejemplo completo

29. **MinimalExample**
    - Ejemplo mínimo

