# Inventario de Casos de Uso - Breadcrumb

## Funcionalidades del Componente

1. **Items** (BreadcrumbItem[])
   - Array de items del breadcrumb
   - Cada item tiene: id, label, url (opcional), onClick (opcional), active (opcional), disabled (opcional)

2. **Separator** (string)
   - Separador entre items (default: '>')

3. **OnItemClick** (function)
   - Callback cuando se hace click en un item

4. **Active Item**
   - El último item siempre está activo (bold)
   - Los demás items están en estado default (regular)

5. **Clickable Items**
   - Items con URL: se renderizan como `<a>`
   - Items con onClick: se renderizan como `<button>`
   - Items activos o deshabilitados: se renderizan como `<span>`

6. **Disabled Items**
   - Items deshabilitados no son clickeables

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Breadcrumb completo con todos los controladores

2. **BasicBreadcrumb**
   - Breadcrumb básico con 3 items

3. **LongBreadcrumb**
   - Breadcrumb largo con 8 items

4. **ShortBreadcrumb**
   - Breadcrumb corto con 2 items

5. **WithURLs**
   - Breadcrumb con items que tienen URLs

6. **WithoutURLs**
   - Breadcrumb con items sin URLs (solo onClick)

7. **WithOnClick**
   - Breadcrumb con callbacks onClick en items

8. **WithoutOnClick**
   - Breadcrumb sin callbacks onClick

9. **WithDisabledItem**
   - Breadcrumb con un item deshabilitado

10. **AllItemsDisabled**
    - Breadcrumb con todos los items deshabilitados (excepto el activo)

11. **SeparatorDefault**
    - Separador por defecto (>)

12. **SeparatorSlash**
    - Separador slash (/)

13. **SeparatorArrow**
    - Separador flecha (→)

14. **SeparatorCustom**
    - Separador personalizado (ej: •)

15. **SingleItem**
    - Breadcrumb con un solo item

16. **MultipleItems**
    - Breadcrumb con múltiples items (3, 4, 5, etc.)

17. **OnItemClickCallback**
    - Callback cuando se hace click en un item

18. **ItemWithURL**
    - Item con URL (navegación)

19. **ItemWithOnClick**
    - Item con onClick (callback)

20. **ItemActive**
    - Item activo (último item)

21. **ItemDisabled**
    - Item deshabilitado

22. **MixedItems**
    - Breadcrumb con items mixtos (algunos con URL, algunos con onClick)

23. **LongLabels**
    - Breadcrumb con labels largos

24. **ShortLabels**
    - Breadcrumb con labels cortos

25. **EmptyBreadcrumb**
    - Breadcrumb sin items

26. **AllSeparators**
    - Todos los separadores comunes

27. **CompleteExample**
    - Ejemplo completo con todas las opciones

28. **MinimalExample**
    - Ejemplo mínimo

