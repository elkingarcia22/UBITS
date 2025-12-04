# Inventario de Casos de Uso - Scrollbar

## Funcionalidades del Componente

1. **Orientation** ('vertical' | 'horizontal')
   - Orientación del scrollbar (default: 'vertical')

2. **State** ('default')
   - Estado del scrollbar (default: 'default')
   - Actualmente solo soporta 'default'

3. **ContainerId** (string)
   - ID del contenedor donde se renderizará el scrollbar

4. **TargetId** (string)
   - ID del elemento scrollable al que está asociado el scrollbar

5. **ClassName** (string)
   - Clases CSS adicionales

## Características Especiales

- Scrollbar personalizado UBITS
- Se sincroniza automáticamente con el elemento scrollable asociado
- Aparece en hover y se adapta al tamaño del contenido
- Soporta arrastrar (drag) la barra del scrollbar
- Soporta clic en el área del scrollbar para navegar
- Se oculta automáticamente cuando no hay scroll necesario
- Soporta orientación vertical y horizontal
- Usa ResizeObserver para detectar cambios en el contenido

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Scrollbar completo con todos los controladores

2. **OrientationVertical**
   - Scrollbar orientación vertical

3. **OrientationHorizontal**
   - Scrollbar orientación horizontal

4. **WithLongContent**
   - Scrollbar con contenido largo (vertical)

5. **WithWideContent**
   - Scrollbar con contenido ancho (horizontal)

6. **WithShortContent**
   - Scrollbar con contenido corto (no aparece scrollbar)

7. **DragAndDrop**
   - Scrollbar con funcionalidad de arrastrar

8. **ClickToNavigate**
   - Scrollbar con funcionalidad de clic para navegar

9. **AutoHide**
   - Scrollbar que se oculta cuando no hay scroll necesario

10. **DynamicContent**
    - Scrollbar que se adapta a contenido dinámico

11. **MultipleScrollbars**
    - Múltiples scrollbars en la misma página

12. **CompleteExample**
    - Ejemplo completo con todas las opciones

13. **MinimalExample**
    - Ejemplo mínimo

