# Inventario de Casos de Uso - Drawer Navigation

## Funcionalidades del Componente

1. **Title** (string, requerido)
   - Título principal del drawer

2. **Complementary Text** (string, opcional)
   - Texto secundario opcional debajo del título

3. **Width** (100 | 80 | 60 | 50 | 40 | 30)
   - Ancho del drawer como porcentaje del viewport (default: 40)

4. **Body Content** (string | (() => string))
   - Contenido del body del drawer (HTML string o función que retorna HTML)

5. **Footer Buttons**
   - **Tertiary**: Botón terciario (izquierda)
   - **Secondary**: Botón secundario (derecha)
   - **Primary**: Botón primario (derecha)
   - Cada botón tiene `label` y `onClick`

6. **OnClose** (callback)
   - Callback cuando se hace clic en el botón de cerrar

7. **Open** (boolean)
   - Si el drawer está abierto inicialmente (default: false)

8. **CloseOnOverlayClick** (boolean)
   - Si se debe cerrar al hacer clic en el overlay (default: true)

9. **Métodos**
   - `open()`: Abrir el drawer
   - `close()`: Cerrar el drawer
   - `updateContent(content)`: Actualizar el contenido del body

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Drawer completo con todos los controladores

2. **Width100**
   - Drawer con ancho 100%

3. **Width80**
   - Drawer con ancho 80%

4. **Width60**
   - Drawer con ancho 60%

5. **Width50**
   - Drawer con ancho 50%

6. **Width40**
   - Drawer con ancho 40% (default)

7. **Width30**
   - Drawer con ancho 30%

8. **WithComplementaryText**
   - Drawer con texto complementario

9. **WithoutComplementaryText**
   - Drawer sin texto complementario

10. **WithFooterButtons**
    - Drawer con todos los botones del footer

11. **FooterTertiaryOnly**
    - Drawer solo con botón terciario

12. **FooterSecondaryOnly**
    - Drawer solo con botón secundario

13. **FooterPrimaryOnly**
    - Drawer solo con botón primario

14. **FooterSecondaryAndPrimary**
    - Drawer con botones secundario y primario

15. **WithoutFooterButtons**
    - Drawer sin botones del footer

16. **CloseOnOverlayClick**
    - Drawer que se cierra al hacer clic en el overlay

17. **NoCloseOnOverlayClick**
    - Drawer que NO se cierra al hacer clic en el overlay

18. **OpenInitially**
    - Drawer abierto inicialmente

19. **ClosedInitially**
    - Drawer cerrado inicialmente

20. **OnCloseCallback**
    - Drawer con callback onClose

21. **FooterButtonCallbacks**
    - Drawer con callbacks en los botones del footer

22. **UpdateContentMethod**
    - Demostrar método updateContent()

23. **OpenCloseMethods**
    - Demostrar métodos open() y close()

24. **BodyContentString**
    - Body content como string HTML

25. **BodyContentFunction**
    - Body content como función que retorna HTML

26. **LongContent**
    - Drawer con contenido largo (scrollable)

27. **ShortContent**
    - Drawer con contenido corto

28. **EmptyContent**
    - Drawer sin contenido (placeholder)

29. **FormContent**
    - Drawer con formulario en el body

30. **ListContent**
    - Drawer con lista en el body

31. **MinimalExample**
    - Ejemplo mínimo (solo título)

32. **CompleteExample**
    - Ejemplo completo con todas las opciones

