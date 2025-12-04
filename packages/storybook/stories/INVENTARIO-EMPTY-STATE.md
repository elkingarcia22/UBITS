# Inventario de Casos de Uso - Empty State

## Funcionalidades del Componente

1. **Title** (string, requerido)
   - Título del empty state

2. **Description** (string, opcional)
   - Descripción o mensaje del empty state

3. **ImageUrl** (string, opcional)
   - URL de la imagen/ilustración

4. **Icon** (string, opcional)
   - Nombre del icono FontAwesome a mostrar (si no hay imagen)

5. **IconSize** ('sm' | 'md' | 'lg' | 'xl')
   - Tamaño del icono (default: 'lg')

6. **Action Label** (string, opcional)
   - Texto del botón de acción principal

7. **OnAction** (callback, opcional)
   - Callback cuando se hace clic en el botón de acción

8. **ShowPrimaryButton** (boolean)
   - Mostrar botón primario (default: false)

9. **PrimaryButtonIcon** (string, opcional)
   - Icono del botón primario

10. **ShowPrimaryButtonIcon** (boolean)
    - Mostrar icono en el botón primario (default: false)

11. **SecondaryActionLabel** (string, opcional)
    - Texto del botón secundario

12. **OnSecondaryAction** (callback, opcional)
    - Callback cuando se hace clic en el botón secundario

13. **ShowSecondaryButton** (boolean)
    - Mostrar botón secundario (default: false)

14. **SecondaryButtonIcon** (string, opcional)
    - Icono del botón secundario

15. **ShowSecondaryButtonIcon** (boolean)
    - Mostrar icono en el botón secundario (default: false)

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Empty State completo con todos los controladores

2. **WithIcon**
   - Empty State con icono

3. **WithImage**
   - Empty State con imagen

4. **WithoutVisual**
   - Empty State sin icono ni imagen (solo texto)

5. **WithDescription**
   - Empty State con descripción

6. **WithoutDescription**
   - Empty State sin descripción (solo título)

7. **PrimaryButtonOnly**
   - Empty State solo con botón primario

8. **SecondaryButtonOnly**
   - Empty State solo con botón secundario

9. **BothButtons**
   - Empty State con ambos botones

10. **WithoutButtons**
    - Empty State sin botones

11. **PrimaryButtonWithIcon**
    - Botón primario con icono

12. **SecondaryButtonWithIcon**
    - Botón secundario con icono

13. **BothButtonsWithIcons**
    - Ambos botones con iconos

14. **OnActionCallback**
    - Con callback onAction

15. **OnSecondaryActionCallback**
    - Con callback onSecondaryAction

16. **BothCallbacks**
    - Con ambos callbacks

17. **IconSizeSmall**
    - Icono tamaño small

18. **IconSizeMedium**
    - Icono tamaño medium

19. **IconSizeLarge**
    - Icono tamaño large (default)

20. **IconSizeXLarge**
    - Icono tamaño xlarge

21. **NoData**
    - Empty State para "No hay datos"

22. **NoSearchResults**
    - Empty State para "No hay resultados de búsqueda"

23. **NoFilterResults**
    - Empty State para "No hay resultados de filtros"

24. **ErrorState**
    - Empty State para estado de error

25. **SuccessState**
    - Empty State para estado de éxito

26. **LoadingState**
    - Empty State para estado de carga (con spinner)

27. **MinimalExample**
    - Ejemplo mínimo (solo título)

28. **CompleteExample**
    - Ejemplo completo con todas las opciones

