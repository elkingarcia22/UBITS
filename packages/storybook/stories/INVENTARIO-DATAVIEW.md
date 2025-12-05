# Inventario de Casos de Uso - DataView

## Funcionalidades del Componente

1. **Products** (ProductData[])
   - Array de productos a mostrar (REQUERIDO)

2. **Size** ('sm' | 'md' | 'lg')
   - Tamaño del componente (default: 'md')
   - sm: imagen 80px
   - md: imagen 120px
   - lg: imagen 160px

3. **ShowCategory** (boolean)
   - Mostrar categoría del producto (default: true)

4. **ShowRating** (boolean)
   - Mostrar rating con estrellas (default: true)

5. **ShowPrice** (boolean)
   - Mostrar precio del producto (default: true)

6. **ShowWishlist** (boolean)
   - Mostrar botón de favoritos (default: true)

7. **ShowBuyButton** (boolean)
   - Mostrar botón de compra (default: true)

8. **BuyButtonText** (string)
   - Texto del botón de compra (default: 'Buy Now')

9. **BuyButtonIcon** (string)
   - Icono del botón de compra (default: 'shopping-cart')

10. **WishlistIcon** (string)
    - Icono del botón de favoritos (default: 'heart')

11. **OnProductClick** (function)
    - Callback cuando se hace click en el producto

12. **OnBuyClick** (function)
    - Callback cuando se hace click en el botón de compra

13. **OnWishlistClick** (function)
    - Callback cuando se hace click en el botón de favoritos

14. **ProductData** (interface)
    - id?: string
    - image: string
    - imageAlt?: string
    - category: string
    - name: string
    - rating: number (0-5)
    - price: number
    - stockStatus?: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK'
    - inWishlist?: boolean

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - DataView completo con todos los controladores

2. **SizeSM**
   - Tamaño sm

3. **SizeMD**
   - Tamaño md (default)

4. **SizeLG**
   - Tamaño lg

5. **ShowCategory**
   - Con categoría visible

6. **HideCategory**
   - Sin categoría

7. **ShowRating**
   - Con rating visible

8. **HideRating**
   - Sin rating

9. **ShowPrice**
   - Con precio visible

10. **HidePrice**
    - Sin precio

11. **ShowWishlist**
    - Con botón de favoritos visible

12. **HideWishlist**
    - Sin botón de favoritos

13. **ShowBuyButton**
    - Con botón de compra visible

14. **HideBuyButton**
    - Sin botón de compra

15. **CustomBuyButtonText**
    - Con texto personalizado del botón de compra

16. **CustomBuyButtonIcon**
    - Con icono personalizado del botón de compra

17. **CustomWishlistIcon**
    - Con icono personalizado del botón de favoritos

18. **StockStatusInStock**
    - Productos con stock disponible

19. **StockStatusLowStock**
    - Productos con stock bajo

20. **StockStatusOutOfStock**
    - Productos sin stock

21. **MixedStockStatus**
    - Productos con diferentes estados de stock

22. **WithWishlistItems**
    - Productos en favoritos

23. **WithoutWishlistItems**
    - Productos sin favoritos

24. **MixedWishlistItems**
    - Algunos productos en favoritos

25. **DifferentRatings**
    - Productos con diferentes ratings

26. **DifferentPrices**
    - Productos con diferentes precios

27. **SingleProduct**
    - Un solo producto

28. **MultipleProducts**
    - Múltiples productos

29. **ManyProducts**
    - Muchos productos

30. **OnProductClickCallback**
    - Callback onProductClick

31. **OnBuyClickCallback**
    - Callback onBuyClick

32. **OnWishlistClickCallback**
    - Callback onWishlistClick

33. **AllSizes**
    - Todos los tamaños

34. **CompleteExample**
    - Ejemplo completo

35. **MinimalExample**
    - Ejemplo mínimo

