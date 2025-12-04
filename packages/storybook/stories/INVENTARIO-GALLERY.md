# Inventario de Casos de Uso - Gallery

## Funcionalidades del Componente

1. **Layout** ('grid' | 'masonry' | 'list')
   - Grid: Layout en cuadrícula
   - Masonry: Layout tipo mampostería
   - List: Layout en lista

2. **Size** ('xs' | 'sm' | 'md' | 'lg' | 'xl')
   - Tamaño de la galería

3. **Columns** (1-12)
   - Número de columnas (solo para layout grid)

4. **Gap** (0-48 px)
   - Espacio entre items en píxeles

5. **Show Thumbnails** (boolean)
   - Mostrar thumbnails en lugar de imágenes completas

6. **Lazy Load** (boolean)
   - Cargar imágenes de forma diferida

7. **Lightbox** (boolean)
   - Activar lightbox al hacer click en las imágenes

8. **Aspect Ratio** (string)
   - Aspect ratio para las imágenes (ej: '16/9', '1/1', '4/3')

9. **Callbacks**
   - onItemClick: Handler para click en item
   - onImageLoad: Handler cuando se carga una imagen
   - onImageError: Handler cuando hay error al cargar imagen

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Galería completa con todos los controles

2. **LayoutGrid**
   - Galería con layout grid (default)

3. **LayoutMasonry**
   - Galería con layout masonry

4. **LayoutList**
   - Galería con layout list

5. **SizeXS**
   - Galería tamaño xs

6. **SizeSM**
   - Galería tamaño sm

7. **SizeMD**
   - Galería tamaño md (default)

8. **SizeLG**
   - Galería tamaño lg

9. **SizeXL**
   - Galería tamaño xl

10. **Columns1**
    - Galería con 1 columna

11. **Columns2**
    - Galería con 2 columnas

12. **Columns3**
    - Galería con 3 columnas (default)

13. **Columns4**
    - Galería con 4 columnas

14. **Columns6**
    - Galería con 6 columnas

15. **Gap0**
    - Galería sin espacio entre items (gap: 0)

16. **Gap8**
    - Galería con gap pequeño (8px)

17. **Gap16**
    - Galería con gap medio (16px, default)

18. **Gap24**
    - Galería con gap grande (24px)

19. **Gap32**
    - Galería con gap muy grande (32px)

20. **WithThumbnails**
    - Galería con thumbnails

21. **WithoutThumbnails**
    - Galería sin thumbnails (default)

22. **LazyLoad**
    - Galería con lazy loading

23. **WithoutLazyLoad**
    - Galería sin lazy loading (default)

24. **Lightbox**
    - Galería con lightbox activado

25. **WithoutLightbox**
    - Galería sin lightbox (default)

26. **AspectRatio16_9**
    - Galería con aspect ratio 16:9

27. **AspectRatio1_1**
    - Galería con aspect ratio 1:1 (cuadrado)

28. **AspectRatio4_3**
    - Galería con aspect ratio 4:3

29. **OnItemClick**
    - Galería con onClick handler

30. **OnImageLoad**
    - Galería con onImageLoad handler

31. **OnImageError**
    - Galería con onImageError handler

32. **FewItems**
    - Galería con pocas imágenes

33. **ManyItems**
    - Galería con muchas imágenes

34. **MasonryWithThumbnails**
    - Layout masonry con thumbnails

35. **ListLayout**
    - Layout list con diferentes configuraciones

36. **CompleteExample**
    - Galería completa con todas las opciones configuradas

