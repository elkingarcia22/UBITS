# Inventario de Casos de Uso - Tabs

## Funcionalidades del Componente

1. **Tabs** (TabItem[])
   - Array de tabs a mostrar
   - Cada tab tiene: id, label, icon (opcional), active (opcional), url (opcional), onClick (opcional), disabled (opcional)

2. **ActiveTabId** (string)
   - ID del tab activo (opcional, si no se proporciona se usa el primer tab con active: true)

3. **OnTabChange** (function)
   - Callback cuando cambia el tab activo

4. **ClassName** (string)
   - Clases CSS adicionales para el contenedor

5. **Tab Properties**
   - **Icon**: Icono FontAwesome (clase completa, ej: "far fa-home" o "fas fa-grid")
   - **Active**: Si el tab está activo (opcional)
   - **URL**: URL a la que redirige al hacer click (opcional)
   - **OnClick**: Callback cuando se hace click (opcional, usado si no hay URL)
   - **Disabled**: Si el tab está deshabilitado (opcional)

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Tabs completo con todos los controladores

2. **WithIcons**
   - Tabs con iconos

3. **WithoutIcons**
   - Tabs sin iconos

4. **ActiveTab**
   - Con tab activo

5. **NoActiveTab**
   - Sin tab activo (se usa el primero por defecto)

6. **TabWithActiveProperty**
   - Tab con propiedad active: true

7. **TabWithURL**
   - Tab con URL (navegación directa)

8. **TabWithOnClick**
   - Tab con callback onClick

9. **TabDisabled**
   - Tab deshabilitado

10. **MultipleDisabledTabs**
    - Múltiples tabs deshabilitados

11. **OnTabChangeCallback**
    - Callback cuando cambia el tab activo

12. **TabOnClickCallback**
    - Callback cuando se hace click en un tab específico

13. **IconStyleActive**
    - Icono con estilo solid cuando está activo

14. **IconStyleInactive**
    - Icono con estilo regular cuando está inactivo

15. **IconRegularPrefix**
    - Icono con prefijo "far" (regular)

16. **IconSolidPrefix**
    - Icono con prefijo "fas" (solid)

17. **IconWithoutPrefix**
    - Icono sin prefijo (se agrega automáticamente)

18. **FewTabs**
    - Pocos tabs (2-3)

19. **ManyTabs**
    - Muchos tabs (5+)

20. **LongLabels**
    - Labels largos

21. **ShortLabels**
    - Labels cortos

22. **MixedTabs**
    - Tabs mixtos (algunos con iconos, algunos sin)

23. **AllTabsWithIcons**
    - Todos los tabs con iconos

24. **AllTabsWithoutIcons**
    - Todos los tabs sin iconos

25. **CustomClassName**
    - Con clase CSS personalizada

26. **WithoutClassName**
    - Sin clase CSS personalizada

27. **EmptyTabs**
    - Array de tabs vacío

28. **SingleTab**
    - Un solo tab

29. **CompleteExample**
    - Ejemplo completo

30. **MinimalExample**
    - Ejemplo mínimo

