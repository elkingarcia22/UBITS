# Inventario de Casos de Uso - Timeline

## Funcionalidades del Componente

1. **Avatar** (boolean)
   - Mostrar avatar en cada item del timeline
   - Mutuamente excluyente con icono

2. **Fecha** (boolean)
   - Mostrar fecha en cada item

3. **Descripción** (boolean)
   - Mostrar descripción en cada item

4. **Icono** (boolean)
   - Mostrar icono en el marcador del timeline
   - Mutuamente excluyente con avatar

5. **Alineación** ('left' | 'center')
   - `left`: Alineación izquierda (default)
   - `center`: Alineación centrada (contenido a los lados)

6. **Estados** ('default' | 'filled')
   - `default`: Círculo sin relleno
   - `filled`: Círculo relleno

7. **Filled Items** (number)
   - Cantidad de items con círculo relleno (0-4)

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Timeline completo con todos los controladores

2. **AlignmentLeft**
   - Timeline con alineación izquierda

3. **AlignmentCenter**
   - Timeline con alineación centrada

4. **WithAvatar**
   - Timeline con avatares

5. **WithIcon**
   - Timeline con iconos

6. **WithDate**
   - Timeline con fechas

7. **WithoutDate**
   - Timeline sin fechas

8. **WithDescription**
   - Timeline con descripciones

9. **WithoutDescription**
   - Timeline sin descripciones

10. **StateDefault**
    - Timeline con todos los items en estado default

11. **StateFilled**
    - Timeline con todos los items en estado filled

12. **MixedStates**
    - Timeline con estados mixtos (default y filled)

13. **FilledItems0**
    - Timeline con 0 items rellenos

14. **FilledItems1**
    - Timeline con 1 item relleno

15. **FilledItems2**
    - Timeline con 2 items rellenos

16. **FilledItems3**
    - Timeline con 3 items rellenos

17. **FilledItems4**
    - Timeline con 4 items rellenos

18. **MinimalExample**
    - Ejemplo mínimo (solo título, sin fecha ni descripción)

19. **CompleteExample**
    - Ejemplo completo con todas las opciones

20. **LeftAlignmentWithIcon**
    - Timeline izquierda con iconos

21. **LeftAlignmentWithAvatar**
    - Timeline izquierda con avatares

22. **CenterAlignmentWithIcon**
    - Timeline centrada con iconos

23. **CenterAlignmentWithAvatar**
    - Timeline centrada con avatares

24. **LongTitles**
    - Timeline con títulos largos

25. **LongDescriptions**
    - Timeline con descripciones largas

26. **ProgressiveFilled**
    - Timeline con items progresivamente rellenos

