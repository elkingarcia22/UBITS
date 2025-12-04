# Inventario de Casos de Uso - TabBar

## Funcionalidades del Componente

1. **Items** (TabBarItem[])
   - Array de items del TabBar
   - Cada item tiene: id, label, icon (opcional), avatar (opcional), avatarAlt (opcional), onClick (opcional)

2. **ActiveTabId** (string)
   - ID del tab activo

3. **Visible** (boolean)
   - Mostrar el TabBar (default: false, solo visible en móvil)

4. **DarkModeEnabled** (boolean)
   - Habilitar dark mode toggle automático (default: false)

5. **OnTabChange** (function)
   - Callback cuando cambia el tab activo

6. **OnDarkModeToggle** (function)
   - Callback para toggle de dark mode

7. **FloatingMenuSections** (FloatingMenuSection[])
   - Secciones del Floating Menu (se muestra cuando se hace click en "Módulos")
   - Cada sección puede ser: accordion (con subitems) o enlace directo (isLink: true)

8. **ProfileMenuItems** (ProfileMenuItem[])
   - Items del Profile Menu (se muestra cuando se hace click en "Mi perfil")
   - Soporta tree menu con children anidados

9. **OnFloatingMenuItemClick** (function)
   - Callback cuando se hace click en un item del Floating Menu

10. **OnProfileMenuItemClick** (function)
    - Callback cuando se hace click en un item del Profile Menu

11. **TreeMenuSize** ('xs' | 'sm' | 'md' | 'lg')
    - Tamaño del tree menu (default: 'md')

12. **Item Types**
    - Con icono: usa icon
    - Con avatar: usa avatar (alternativa a icono)
    - Con onClick: callback personalizado

13. **Variants**
    - Colaborador: Floating Menu y Profile Menu específicos
    - Admin: Floating Menu y Profile Menu específicos

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - TabBar completo con todos los controladores

2. **VariantColaborador**
   - Variante colaborador

3. **VariantAdmin**
   - Variante admin

4. **WithIcons**
   - Items con iconos

5. **WithAvatar**
   - Items con avatar

6. **MixedItems**
   - Items mixtos (algunos con iconos, algunos con avatar)

7. **ActiveTab**
   - Con tab activo

8. **NoActiveTab**
   - Sin tab activo

9. **ItemWithOnClick**
   - Item con callback onClick

10. **ItemWithoutOnClick**
    - Item sin onClick

11. **OnTabChangeCallback**
    - Callback cuando cambia el tab activo

12. **Visible**
    - TabBar visible

13. **Hidden**
    - TabBar oculto

14. **WithDarkModeToggle**
    - Con toggle de dark mode

15. **WithoutDarkModeToggle**
    - Sin toggle de dark mode

16. **OnDarkModeToggleCallback**
    - Callback cuando se cambia el dark mode

17. **WithFloatingMenu**
    - Con Floating Menu (Módulos)

18. **WithoutFloatingMenu**
    - Sin Floating Menu

19. **FloatingMenuWithAccordions**
    - Floating Menu con accordions (subitems)

20. **FloatingMenuWithLinks**
    - Floating Menu con enlaces directos (isLink: true)

21. **FloatingMenuMixed**
    - Floating Menu mixto (algunos accordions, algunos enlaces)

22. **OnFloatingMenuItemClickCallback**
    - Callback cuando se hace click en un item del Floating Menu

23. **WithProfileMenu**
    - Con Profile Menu (Mi perfil)

24. **WithoutProfileMenu**
    - Sin Profile Menu

25. **ProfileMenuWithTree**
    - Profile Menu con tree menu (children anidados)

26. **ProfileMenuWithoutTree**
    - Profile Menu sin tree menu (items simples)

27. **OnProfileMenuItemClickCallback**
    - Callback cuando se hace click en un item del Profile Menu

28. **TreeMenuSizeXS**
    - Tree menu tamaño xs

29. **TreeMenuSizeSM**
    - Tree menu tamaño sm

30. **TreeMenuSizeMD**
    - Tree menu tamaño md (default)

31. **TreeMenuSizeLG**
    - Tree menu tamaño lg

32. **FewItems**
    - Pocos items (2-3)

33. **ManyItems**
    - Muchos items (5+)

34. **LongLabels**
    - Labels largos

35. **ShortLabels**
    - Labels cortos

36. **CompleteExample**
    - Ejemplo completo

37. **MinimalExample**
    - Ejemplo mínimo

