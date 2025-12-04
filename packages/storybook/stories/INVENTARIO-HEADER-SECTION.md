# Inventario de Casos de Uso - HeaderSection

## Funcionalidades del Componente

1. **Title** (string)
   - Título de la sección (heading h2)

2. **Show Title** (boolean)
   - Mostrar/ocultar título

3. **Back Button** (boolean)
   - Mostrar botón de atrás (secundario md, icon-only, arrow-left)

4. **Info Button** (boolean)
   - Mostrar botón de información (sm, tertiary, icon-only, circle-info)
   - Con tooltip opcional

5. **Status Tag** (boolean)
   - Mostrar status tag al lado del botón de información
   - Con diferentes estados (completed, published, active, etc.)

6. **Actions** (array)
   - Acciones (botones md)
   - Puede incluir: botón AI, acciones secundarias, acciones primarias

7. **Show Actions** (boolean)
   - Mostrar/ocultar todas las acciones

8. **Secondary Button** (boolean)
   - Botón secundario adicional (secundario md)

9. **Options Button** (boolean)
   - Botón de opciones (3 puntos horizontales) con menú dropdown

10. **Breadcrumb** (boolean)
    - Breadcrumb debajo del header (16px de distancia)

11. **Callbacks**
    - onBackClick: Handler para botón de atrás
    - onInfoClick: Handler para botón de información
    - onSecondaryButtonClick: Handler para botón secundario
    - onOptionsClick: Handler para botón de opciones

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - HeaderSection completo con todos los controles

2. **BasicTitle**
   - Solo título básico

3. **WithBackButton**
   - Título con botón de atrás

4. **WithInfoButton**
   - Título con botón de información

5. **WithInfoButtonAndTooltip**
   - Título con botón de información y tooltip

6. **WithStatusTag**
   - Título con status tag

7. **WithStatusTagActive**
   - Status tag con estado 'active'

8. **WithStatusTagCompleted**
   - Status tag con estado 'completed'

9. **WithStatusTagPending**
   - Status tag con estado 'pending'

10. **WithBackAndInfo**
    - Título con botón de atrás e información

11. **WithBackInfoAndStatusTag**
    - Título con botón de atrás, información y status tag

12. **WithoutTitle**
    - Sin título (solo botones)

13. **WithSecondaryActions**
    - Con acciones secundarias

14. **WithPrimaryActions**
    - Con acciones primarias

15. **WithAIAction**
    - Con botón AI

16. **WithMultipleActions**
    - Con múltiples acciones (secundarias y primarias)

17. **WithSecondaryButton**
    - Con botón secundario adicional

18. **WithOptionsButton**
    - Con botón de opciones

19. **WithOptionsMenu**
    - Con botón de opciones y menú dropdown

20. **WithBreadcrumb**
    - Con breadcrumb

21. **WithBreadcrumbMultipleItems**
    - Con breadcrumb de múltiples items

22. **CompleteExample**
    - Ejemplo completo con todas las opciones

23. **MinimalExample**
    - Ejemplo mínimo (solo título)

24. **ActionsOnly**
    - Solo acciones (sin título)

25. **TitleWithActions**
    - Título con acciones

26. **LongTitle**
    - Título largo (prueba de truncamiento)

27. **OnBackClick**
    - Con handler onBackClick

28. **OnInfoClick**
    - Con handler onInfoClick

29. **OnSecondaryButtonClick**
    - Con handler onSecondaryButtonClick

30. **OnOptionsClick**
    - Con handler onOptionsClick

