# Inventario de Casos de Uso - Menu

## Funcionalidades del Componente

1. **LogoImage** (string)
   - URL de la imagen del logo

2. **AppName** (string)
   - Nombre de la aplicación

3. **LogoHref** (string)
   - URL a la que redirige el logo

4. **Width** (string | number)
   - Ancho del menú

5. **Sections** (MenuSection[])
   - Array de secciones del menú
   - Cada sección tiene: id, title, items

6. **MenuItems** (MenuItem[])
   - Array de items del menú
   - Cada item tiene: id, label, icon, iconStyle, badge, active, disabled, href, onClick

7. **UserInfo** (MenuUserInfo)
   - Información del usuario
   - Incluye: avatarImage, name, role, onAvatarClick

8. **OnActiveItemChange** (function)
   - Callback cuando cambia el item activo

9. **Badge** (MenuBadge)
   - Badge del item
   - Incluye: content, variant

10. **IconStyle** ('regular' | 'solid')
    - Estilo del icono

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Menu completo con todos los controladores

2. **WithLogo**
   - Con logo

3. **WithoutLogo**
   - Sin logo

4. **WithAppName**
   - Con nombre de aplicación

5. **WithoutAppName**
   - Sin nombre de aplicación

6. **WithLogoHref**
   - Con URL en el logo

7. **WithoutLogoHref**
   - Sin URL en el logo

8. **SingleSection**
   - Una sola sección

9. **MultipleSections**
   - Múltiples secciones

10. **SectionWithTitle**
    - Sección con título

11. **SectionWithoutTitle**
    - Sección sin título (aunque técnicamente es requerido)

12. **ItemWithIcon**
    - Item con icono

13. **ItemWithoutIcon**
    - Item sin icono

14. **IconStyleRegular**
    - Icono estilo regular

15. **IconStyleSolid**
    - Icono estilo solid

16. **ItemWithBadge**
    - Item con badge

17. **ItemWithoutBadge**
    - Item sin badge

18. **BadgeVariantSuccess**
    - Badge variante success

19. **BadgeVariantWarning**
    - Badge variante warning

20. **BadgeVariantError**
    - Badge variante error

21. **BadgeVariantInfo**
    - Badge variante info

22. **ItemActive**
    - Item activo

23. **ItemDisabled**
    - Item deshabilitado

24. **ItemWithHref**
    - Item con URL (href)

25. **ItemWithOnClick**
    - Item con callback onClick

26. **ItemWithoutHrefOrOnClick**
    - Item sin href ni onClick

27. **WithUserInfo**
    - Con información del usuario

28. **WithoutUserInfo**
    - Sin información del usuario

29. **UserInfoWithAvatarClick**
    - Información del usuario con callback onAvatarClick

30. **OnActiveItemChangeCallback**
    - Callback cuando cambia el item activo

31. **CustomWidth**
    - Ancho personalizado

32. **DefaultWidth**
    - Ancho por defecto

33. **ManyItems**
    - Muchos items en una sección

34. **FewItems**
    - Pocos items en una sección

35. **LongLabels**
    - Labels largos

36. **ShortLabels**
    - Labels cortos

37. **AllBadgeVariants**
    - Todas las variantes de badge

38. **AllIconStyles**
    - Todos los estilos de icono

39. **CompleteExample**
    - Ejemplo completo

40. **MinimalExample**
    - Ejemplo mínimo

