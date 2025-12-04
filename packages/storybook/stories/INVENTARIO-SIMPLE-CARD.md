# Inventario de Casos de Uso - Simple Card

## Funcionalidades del Componente

1. **Contenido**
   - `title` (string, requerido): Título de la card
   - `subtitle` (string, opcional): Subtítulo de la card
   - `content` (string, opcional): Contenido de la card

2. **Header**
   - `showHeader` (boolean): Mostrar header decorativo
   - `headerBackground` (string): Token CSS o color para el fondo del header
   - `headerDecorations` (boolean): Mostrar burbujas decorativas en el header

3. **Tokens**
   - `backgroundColor` (string): Token CSS para el fondo de la card
   - `borderColor` (string): Token CSS para el borde de la card
   - `borderRadius` (string): Token CSS para el border-radius (siempre 8px)
   - `padding` (string): Token CSS para el padding de la card

4. **Tipografía**
   - `titleTypography`: 'ubits-heading-h1' | 'ubits-heading-h2' | 'ubits-body-lg' | 'ubits-body-md' | 'ubits-body-sm'
   - `subtitleTypography`: 'ubits-body-lg' | 'ubits-body-md' | 'ubits-body-sm'
   - `contentTypography`: 'ubits-body-md' | 'ubits-body-sm'

5. **Botones**
   - `buttons` (array): Array de botones con label, variant, size, disabled, onClick
   - `showButtons` (boolean): Mostrar botones en el footer

6. **Variantes**
   - `default`: Variante por defecto
   - `elevated`: Con sombra (elevación)
   - `bordered`: Con borde destacado
   - `flat`: Sin borde ni sombra

7. **Tamaños**
   - `sm`: 280px
   - `md`: 400px (default)
   - `lg`: 560px
   - `xl`: 720px

8. **Ancho máximo**
   - `maxWidth` (string, opcional): Ancho máximo personalizado

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Card completa con todos los controladores

2. **BasicCard**
   - Card básica con solo título

3. **WithSubtitle**
   - Card con título y subtítulo

4. **WithContent**
   - Card con título y contenido

5. **WithSubtitleAndContent**
   - Card con título, subtítulo y contenido

6. **WithHeader**
   - Card con header decorativo

7. **WithoutHeader**
   - Card sin header

8. **WithHeaderDecorations**
   - Card con header y decoraciones (burbujas)

9. **WithoutHeaderDecorations**
   - Card con header sin decoraciones

10. **VariantDefault**
    - Card variante default

11. **VariantElevated**
    - Card variante elevated (con sombra)

12. **VariantBordered**
    - Card variante bordered

13. **VariantFlat**
    - Card variante flat

14. **SizeSmall**
    - Card tamaño pequeño (sm)

15. **SizeMedium**
    - Card tamaño mediano (md)

16. **SizeLarge**
    - Card tamaño grande (lg)

17. **SizeXLarge**
    - Card tamaño extra grande (xl)

18. **WithButtons**
    - Card con botones

19. **WithoutButtons**
    - Card sin botones

20. **SingleButton**
    - Card con un solo botón

21. **MultipleButtons**
    - Card con múltiples botones

22. **ButtonVariants**
    - Card con botones de diferentes variantes

23. **ButtonSizes**
    - Card con botones de diferentes tamaños

24. **ButtonOnClick**
    - Card con botones y handlers onClick

25. **TitleTypographyH1**
    - Card con título typography h1

26. **TitleTypographyH2**
    - Card con título typography h2

27. **TitleTypographyBody**
    - Card con título typography body

28. **SubtitleTypography**
    - Card con diferentes subtítulo typography

29. **ContentTypography**
    - Card con diferentes contenido typography

30. **CustomMaxWidth**
    - Card con ancho máximo personalizado

31. **CustomHeaderBackground**
    - Card con header background personalizado

32. **CustomBackgroundColor**
    - Card con background color personalizado

33. **CustomBorderColor**
    - Card con border color personalizado

34. **LongTitle**
    - Card con título largo

35. **LongSubtitle**
    - Card con subtítulo largo

36. **LongContent**
    - Card con contenido largo

37. **MinimalExample**
    - Ejemplo mínimo (solo título)

38. **CompleteExample**
    - Ejemplo completo con todas las opciones

39. **AllVariants**
    - Múltiples cards con todas las variantes

40. **AllSizes**
    - Múltiples cards con todos los tamaños

