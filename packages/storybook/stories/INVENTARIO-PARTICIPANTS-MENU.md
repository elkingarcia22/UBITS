# Inventario de Casos de Uso - Menu de Participantes

## Funcionalidades del Componente

1. **Title** (string)
   - Título del menú (default: 'Participantes')

2. **SearchPlaceholder** (string)
   - Placeholder del input de búsqueda (default: 'Buscar participan...')

3. **Participants** (Participant[])
   - Lista de participantes
   - Cada participante tiene: id, name, role, avatarImage (opcional), status (opcional), selected (opcional)

4. **SelectedParticipantId** (string)
   - ID del participante seleccionado

5. **OnParticipantSelect** (function)
   - Callback cuando se selecciona un participante

6. **OnSearchChange** (function)
   - Callback cuando se cambia el texto de búsqueda

7. **OnFilterClick** (function)
   - Callback cuando se hace clic en el botón de filtro

8. **OnFilterChange** (function)
   - Callback cuando cambian los filtros aplicados

9. **ShowAvatar** (boolean)
   - Mostrar avatar de los participantes (default: true)

10. **ShowRole** (boolean)
    - Mostrar rol de los participantes (default: true)

11. **ShowStatusTag** (boolean)
    - Mostrar status tag de los participantes (default: true)

12. **EnableScrollbar** (boolean)
    - Activar scrollbar de UBITS para la lista (default: true)

13. **ParticipantStatus** ('bajo' | 'medio' | 'alto' | 'muy-alto')
    - Estados del participante para el status tag

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Menu completo con todos los controladores

2. **WithTitle**
   - Con título personalizado

3. **WithoutTitle**
   - Sin título (usar default)

4. **CustomSearchPlaceholder**
   - Placeholder de búsqueda personalizado

5. **DefaultSearchPlaceholder**
   - Placeholder de búsqueda por defecto

6. **WithAvatar**
   - Con avatares visibles

7. **WithoutAvatar**
   - Sin avatares

8. **WithRole**
   - Con roles visibles

9. **WithoutRole**
   - Sin roles

10. **WithStatusTag**
    - Con status tags visibles

11. **WithoutStatusTag**
    - Sin status tags

12. **WithScrollbar**
    - Con scrollbar activado

13. **WithoutScrollbar**
    - Sin scrollbar (limitado a 6-7 items)

14. **SelectedParticipant**
    - Con participante seleccionado

15. **NoSelectedParticipant**
    - Sin participante seleccionado

16. **OnParticipantSelectCallback**
    - Callback cuando se selecciona un participante

17. **OnSearchChangeCallback**
    - Callback cuando se cambia el texto de búsqueda

18. **OnFilterClickCallback**
    - Callback cuando se hace clic en el botón de filtro

19. **OnFilterChangeCallback**
    - Callback cuando cambian los filtros aplicados

20. **ParticipantWithAvatarImage**
    - Participante con imagen de avatar

21. **ParticipantWithoutAvatarImage**
    - Participante sin imagen de avatar (usa iniciales)

22. **ParticipantStatusBajo**
    - Participante con status 'bajo'

23. **ParticipantStatusMedio**
    - Participante con status 'medio'

24. **ParticipantStatusAlto**
    - Participante con status 'alto'

25. **ParticipantStatusMuyAlto**
    - Participante con status 'muy-alto'

26. **AllParticipantStatuses**
    - Todos los estados de participante

27. **ManyParticipants**
    - Muchos participantes (más de 10)

28. **FewParticipants**
    - Pocos participantes (menos de 5)

29. **SingleParticipant**
    - Un solo participante

30. **EmptyParticipants**
    - Sin participantes (empty state)

31. **SearchFunctionality**
    - Funcionalidad de búsqueda

32. **FilterFunctionality**
    - Funcionalidad de filtros

33. **SearchAndFilterCombined**
    - Búsqueda y filtros combinados

34. **LongNames**
    - Nombres largos

35. **ShortNames**
    - Nombres cortos

36. **LongRoles**
    - Roles largos

37. **ShortRoles**
    - Roles cortos

38. **CompleteExample**
    - Ejemplo completo

39. **MinimalExample**
    - Ejemplo mínimo

