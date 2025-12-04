# Inventario de Casos de Uso - Carousel

## Funcionalidades del Componente

1. **Items Per View** (1-6)
   - Número de items visibles a la vez

2. **Show Arrows** (boolean)
   - Mostrar/ocultar flechas de navegación

3. **Show Dots** (boolean)
   - Mostrar/ocultar indicadores de paginación

4. **Autoplay** (boolean)
   - Auto-reproducir el carrusel

5. **Autoplay Interval** (1000-10000 ms)
   - Intervalo en milisegundos para autoplay

6. **Loop** (boolean)
   - Loop infinito (volver al inicio al llegar al final)

7. **Gap** (0-48 px)
   - Espacio entre items en píxeles

8. **Arrow Position** ('inside' | 'outside')
   - Posición de las flechas de navegación

9. **Dot Position** ('bottom' | 'top')
   - Posición de los indicadores de paginación

10. **Card Size** ('sm' | 'md' | 'lg' | 'xl')
    - Tamaño de las Simple Cards

11. **Card Variant** ('default' | 'elevated' | 'bordered' | 'flat')
    - Variante de las Simple Cards

12. **Show Card Header** (boolean)
    - Mostrar/ocultar header en las Simple Cards

13. **Show Card Buttons** (boolean)
    - Mostrar/ocultar botones en las Simple Cards

14. **onItemClick** (callback)
    - Handler para click en item

15. **onSlideChange** (callback)
    - Handler para cambio de slide

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Carrusel completo con todos los controles

2. **ItemsPerView1**
   - Carrusel con 1 item visible a la vez

3. **ItemsPerView2**
   - Carrusel con 2 items visibles a la vez

4. **ItemsPerView3**
   - Carrusel con 3 items visibles a la vez (default)

5. **ItemsPerView4**
   - Carrusel con 4 items visibles a la vez

6. **ItemsPerView5**
   - Carrusel con 5 items visibles a la vez

7. **ItemsPerView6**
   - Carrusel con 6 items visibles a la vez

8. **WithoutArrows**
   - Carrusel sin flechas de navegación

9. **WithoutDots**
   - Carrusel sin indicadores de paginación

10. **WithoutArrowsAndDots**
    - Carrusel sin flechas ni dots

11. **Autoplay**
    - Carrusel con autoplay activado

12. **AutoplayFast**
    - Carrusel con autoplay rápido (1000ms)

13. **AutoplaySlow**
    - Carrusel con autoplay lento (5000ms)

14. **Loop**
    - Carrusel con loop infinito

15. **AutoplayWithLoop**
    - Carrusel con autoplay y loop

16. **Gap0**
    - Carrusel sin espacio entre items (gap: 0)

17. **Gap8**
    - Carrusel con gap pequeño (8px)

18. **Gap16**
    - Carrusel con gap medio (16px, default)

19. **Gap24**
    - Carrusel con gap grande (24px)

20. **Gap32**
    - Carrusel con gap muy grande (32px)

21. **ArrowPositionInside**
    - Carrusel con flechas dentro del contenedor

22. **ArrowPositionOutside**
    - Carrusel con flechas fuera del contenedor (default)

23. **DotPositionTop**
    - Carrusel con dots en la parte superior

24. **DotPositionBottom**
    - Carrusel con dots en la parte inferior (default)

25. **CardSizeSmall**
    - Carrusel con cards pequeñas (sm)

26. **CardSizeMedium**
    - Carrusel con cards medianas (md, default)

27. **CardSizeLarge**
    - Carrusel con cards grandes (lg)

28. **CardSizeXLarge**
    - Carrusel con cards extra grandes (xl)

29. **CardVariantDefault**
    - Carrusel con cards variante default

30. **CardVariantElevated**
    - Carrusel con cards variante elevated (default)

31. **CardVariantBordered**
    - Carrusel con cards variante bordered

32. **CardVariantFlat**
    - Carrusel con cards variante flat

33. **WithoutCardHeader**
    - Carrusel con cards sin header

34. **WithoutCardButtons**
    - Carrusel con cards sin botones

35. **WithoutCardHeaderAndButtons**
    - Carrusel con cards sin header ni botones

36. **OnItemClick**
    - Carrusel con onClick handler en items

37. **OnSlideChange**
    - Carrusel con onSlideChange handler

38. **FewItems**
    - Carrusel con pocos items (menos que itemsPerView)

39. **ManyItems**
    - Carrusel con muchos items (más de 20)

40. **CompleteExample**
    - Carrusel completo con todas las opciones configuradas

