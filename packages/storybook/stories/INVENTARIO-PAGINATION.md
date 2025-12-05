# Inventario de Casos de Uso - Pagination

## Funcionalidades del Componente

1. **CurrentPage** (number)
   - Página actual (1-indexed) (default: 1)

2. **TotalPages** (number)
   - Total de páginas (REQUERIDO)

3. **TotalItems** (number)
   - Total de items (opcional, para mostrar información adicional)

4. **ItemsPerPage** (number)
   - Items por página (opcional, para mostrar información adicional)

5. **Variant** ('default' | 'compact' | 'minimal')
   - Variante visual del paginador (default: 'default')

6. **Size** ('sm' | 'md' | 'lg')
   - Tamaño del paginador (default: 'md')

7. **MaxVisiblePages** (number)
   - Número máximo de páginas visibles (para variante default) (default: 7)

8. **ShowFirst** (boolean)
   - Mostrar botón "Primera página" (default: true)

9. **ShowLast** (boolean)
   - Mostrar botón "Última página" (default: true)

10. **ShowPrevNext** (boolean)
    - Mostrar botones anterior/siguiente (default: true)

11. **ShowInfo** (boolean)
    - Mostrar información de items (ej: "1-10 de 100") (default: false)

12. **ShowItemsPerPage** (boolean)
    - Mostrar selector de items por página (default: false)

13. **ItemsPerPageOptions** (number[])
    - Opciones de items por página (solo si showItemsPerPage es true) (default: [10, 20, 50, 100])

14. **OnPageChange** (function)
    - Callback cuando cambia la página

15. **OnItemsPerPageChange** (function)
    - Callback cuando cambia items por página

16. **Labels** (object)
    - Texto personalizado para botones (first, last, previous, next, page, of, items, itemsPerPage)

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Pagination completo con todos los controladores

2. **VariantDefault**
   - Variante default

3. **VariantCompact**
   - Variante compact

4. **VariantMinimal**
   - Variante minimal

5. **SizeSM**
   - Tamaño sm

6. **SizeMD**
   - Tamaño md (default)

7. **SizeLG**
   - Tamaño lg

8. **CurrentPage1**
   - Página actual 1 (primera página)

9. **CurrentPageMiddle**
   - Página actual en el medio

10. **CurrentPageLast**
    - Página actual última

11. **FewPages**
    - Pocas páginas (menos que maxVisiblePages)

12. **ManyPages**
    - Muchas páginas (más que maxVisiblePages)

13. **ShowFirst**
    - Con botón Primera

14. **HideFirst**
    - Sin botón Primera

15. **ShowLast**
    - Con botón Última

16. **HideLast**
    - Sin botón Última

17. **ShowPrevNext**
    - Con botones Anterior/Siguiente

18. **HidePrevNext**
    - Sin botones Anterior/Siguiente

19. **ShowInfo**
    - Con información de items

20. **HideInfo**
    - Sin información de items

21. **ShowItemsPerPage**
    - Con selector de items por página

22. **HideItemsPerPage**
    - Sin selector de items por página

23. **CustomItemsPerPageOptions**
    - Opciones personalizadas de items por página

24. **MaxVisiblePages3**
    - Máximo 3 páginas visibles

25. **MaxVisiblePages5**
    - Máximo 5 páginas visibles

26. **MaxVisiblePages10**
    - Máximo 10 páginas visibles

27. **OnPageChangeCallback**
    - Callback onPageChange

28. **OnItemsPerPageChangeCallback**
    - Callback onItemsPerPageChange

29. **CustomLabels**
    - Labels personalizados

30. **AllVariants**
    - Todas las variantes

31. **AllSizes**
    - Todos los tamaños

32. **CompleteExample**
    - Ejemplo completo

33. **MinimalExample**
    - Ejemplo mínimo

