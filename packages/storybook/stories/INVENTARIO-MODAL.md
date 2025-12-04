# Inventario de Casos de Uso - Modal

## Funcionalidades del Componente

1. **Title** (string, requerido)
   - Título del modal

2. **BodyContent** (string | (() => string))
   - Contenido del body del modal (HTML string o función que retorna HTML)

3. **Size** ('sm' | 'md' | 'lg' | 'xl' | 'full')
   - Ancho del modal (default: 'md')
   - sm: 320px, md: 480px, lg: 640px, xl: 800px, full: 1280px

4. **FullScreen** (boolean)
   - Si el modal debe ocupar altura máxima (default: false)

5. **FooterButtons**
   - **Tertiary**: Botón terciario (izquierda)
   - **Secondary**: Botón secundario (derecha)
   - **Primary**: Botón primario (derecha)
   - Cada botón tiene `label` y `onClick`

6. **OnClose** (callback)
   - Callback cuando se hace clic en el botón de cerrar

7. **Open** (boolean)
   - Si el modal está abierto inicialmente (default: false)

8. **CloseOnOverlayClick** (boolean)
   - Si se debe cerrar al hacer clic en el overlay (default: true)

9. **Métodos**
   - `open()`: Abrir el modal
   - `close()`: Cerrar el modal
   - `updateContent(content)`: Actualizar el contenido del body

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Modal completo con todos los controladores

2. **SizeSmall**
   - Modal con tamaño small (320px)

3. **SizeMedium**
   - Modal con tamaño medium (480px, default)

4. **SizeLarge**
   - Modal con tamaño large (640px)

5. **SizeXLarge**
   - Modal con tamaño xlarge (800px)

6. **SizeFull**
   - Modal con tamaño full (1280px)

7. **FullScreen**
   - Modal en modo full-screen

8. **NotFullScreen**
   - Modal sin full-screen (default)

9. **WithFooterButtons**
   - Modal con todos los botones del footer

10. **FooterTertiaryOnly**
    - Modal solo con botón terciario

11. **FooterSecondaryOnly**
    - Modal solo con botón secundario

12. **FooterPrimaryOnly**
    - Modal solo con botón primario

13. **FooterSecondaryAndPrimary**
    - Modal con botones secundario y primario

14. **WithoutFooterButtons**
    - Modal sin botones del footer

15. **CloseOnOverlayClick**
    - Modal que se cierra al hacer clic en el overlay

16. **NoCloseOnOverlayClick**
    - Modal que NO se cierra al hacer clic en el overlay

17. **OpenInitially**
    - Modal abierto inicialmente

18. **ClosedInitially**
    - Modal cerrado inicialmente

19. **OnCloseCallback**
    - Con callback onClose

20. **FooterButtonCallbacks**
    - Modal con callbacks en los botones del footer

21. **BodyContentString**
    - Body content como string HTML

22. **BodyContentFunction**
    - Body content como función que retorna HTML

23. **LongContent**
    - Modal con contenido largo (scrollable)

24. **ShortContent**
    - Modal con contenido corto

25. **EmptyContent**
    - Modal sin contenido (placeholder)

26. **FormContent**
    - Modal con formulario en el body

27. **UpdateContentMethod**
    - Demostrar método updateContent()

28. **OpenCloseMethods**
    - Demostrar métodos open() y close()

29. **MinimalExample**
    - Ejemplo mínimo (solo título)

30. **CompleteExample**
    - Ejemplo completo con todas las opciones

