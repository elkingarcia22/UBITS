# Inventario de Casos de Uso - Sidebar

## Funcionalidades del Componente

1. **Variant** ('colaborador' | 'admin')
   - Variante del sidebar (default: 'colaborador')

2. **BodyButtons** (SidebarButton[])
   - Botones del body (navegación principal)
   - Cada botón tiene: section, icon, tooltip, href (opcional), onClick (opcional), state (opcional)

3. **FooterButtons** (SidebarFooterButton[])
   - Botones del footer (opcionales, solo en admin: API, Centro de ayuda)
   - Extiende SidebarButton con id opcional

4. **LogoImage** (string)
   - URL de la imagen del logo (default: 'images/Ubits-logo.svg')

5. **LogoHref** (string)
   - URL del logo (default: 'index.html' o 'admin.html' según variant)

6. **AvatarImage** (string)
   - URL de la imagen del avatar (default: 'images/Profile-image.jpg')

7. **ProfileMenuItems** (ProfileMenuItem[])
   - Items del menú de perfil
   - Cada item tiene: icon, label, href (opcional), onClick (opcional), divider (opcional)

8. **DarkModeEnabled** (boolean)
   - Si el dark mode toggle está habilitado (default: true)

9. **OnActiveButtonChange** (function)
   - Callback cuando cambia el botón activo

10. **OnAvatarClick** (function)
    - Callback cuando se hace click en el avatar

11. **OnDarkModeToggle** (function)
    - Callback cuando se cambia el dark mode

12. **Height** (number | string)
    - Altura del sidebar (se ajusta dinámicamente si no se especifica)

13. **Button States**
    - default: estado por defecto
    - active: botón activo
    - disabled: botón deshabilitado

14. **Tooltips**
    - Tooltips que aparecen al hacer hover sobre los botones

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Sidebar completo con todos los controladores

2. **VariantColaborador**
   - Variante colaborador

3. **VariantAdmin**
   - Variante admin

4. **WithBodyButtons**
   - Con botones del body

5. **WithoutBodyButtons**
   - Sin botones del body

6. **WithFooterButtons**
   - Con botones del footer (admin)

7. **WithoutFooterButtons**
   - Sin botones del footer

8. **ActiveButton**
   - Con botón activo

9. **NoActiveButton**
   - Sin botón activo

10. **DisabledButton**
    - Con botón deshabilitado

11. **ButtonWithHref**
    - Botón con URL (href)

12. **ButtonWithOnClick**
    - Botón con callback onClick

13. **ButtonWithoutHrefOrOnClick**
    - Botón sin href ni onClick

14. **WithProfileMenu**
    - Con menú de perfil

15. **WithoutProfileMenu**
    - Sin menú de perfil

16. **ProfileMenuItemWithHref**
    - Item del menú de perfil con URL

17. **ProfileMenuItemWithOnClick**
    - Item del menú de perfil con callback

18. **ProfileMenuItemDivider**
    - Item del menú de perfil como divider

19. **WithDarkModeToggle**
    - Con toggle de dark mode

20. **WithoutDarkModeToggle**
    - Sin toggle de dark mode

21. **OnDarkModeToggleCallback**
    - Callback cuando se cambia el dark mode

22. **OnActiveButtonChangeCallback**
    - Callback cuando cambia el botón activo

23. **OnAvatarClickCallback**
    - Callback cuando se hace click en el avatar

24. **CustomLogoImage**
    - Logo personalizado

25. **DefaultLogoImage**
    - Logo por defecto

26. **CustomLogoHref**
    - URL del logo personalizada

27. **DefaultLogoHref**
    - URL del logo por defecto

28. **CustomAvatarImage**
    - Avatar personalizado

29. **DefaultAvatarImage**
    - Avatar por defecto

30. **CustomHeight**
    - Altura personalizada

31. **AutoHeight**
    - Altura automática (ajuste dinámico)

32. **Tooltips**
    - Tooltips en los botones

33. **ManyBodyButtons**
    - Muchos botones del body

34. **FewBodyButtons**
    - Pocos botones del body

35. **CompleteExample**
    - Ejemplo completo

36. **MinimalExample**
    - Ejemplo mínimo

