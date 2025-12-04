# Inventario de Casos de Uso - Card Content

## Funcionalidades del Componente

1. **Tipos de Contenido** (11 tipos)
   - Curso, Cápsula, Charla, Artículo, Podcast, Libro, Ideas de libro, Caso de estudio, Documento técnico, Ejercicios de práctica, Ruta de aprendizaje

2. **Estados** (3 estados)
   - `default`: Estado por defecto (sin badge)
   - `progress`: En progreso (badge "En progreso")
   - `completed`: Completado (badge "Completado")

3. **Niveles** (3 niveles)
   - `Básico`: Icono gauge-min
   - `Intermedio`: Icono gauge
   - `Avanzado`: Icono gauge-max

4. **Competencias** (35 competencias oficiales UBITS)
   - Accountability, Administración de negocios, Agilidad, Comunicación, etc.

5. **Idiomas** (3 idiomas)
   - Español, Inglés, Portugués

6. **Proveedores** (18 proveedores)
   - UBITS, Microsoft, Hubspot, Harvard Business Publishing, TED, AWS, etc.

7. **Duración** (9 opciones)
   - 15 min, 30 min, 45 min, 60 min, 75 min, 90 min, 120 min, 180 min, 240 min

8. **Progreso** (0-100)
   - Barra de progreso visible cuando status es 'progress' o 'completed'

9. **onClick Handler**
   - Callback opcional cuando se hace click en la card

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Card con estado por defecto

2. **StatusDefault**
   - Card con estado 'default' (sin badge de estado)

3. **StatusProgress**
   - Card con estado 'progress' (badge "En progreso")
   - Con progreso visible (ej: 45%)

4. **StatusCompleted**
   - Card con estado 'completed' (badge "Completado")
   - Con progreso 100%

5. **LevelBasic**
   - Card con nivel 'Básico'

6. **LevelIntermediate**
   - Card con nivel 'Intermedio'

7. **LevelAdvanced**
   - Card con nivel 'Avanzado'

8. **Progress0**
   - Card con progreso 0% (sin barra visible)

9. **Progress25**
   - Card con progreso 25%

10. **Progress50**
    - Card con progreso 50%

11. **Progress75**
    - Card con progreso 75%

12. **Progress100**
    - Card con progreso 100%

13. **TypeCurso**
    - Card tipo 'Curso'

14. **TypeCapsula**
    - Card tipo 'Cápsula'

15. **TypeCharla**
    - Card tipo 'Charla'

16. **TypeArticulo**
    - Card tipo 'Artículo'

17. **TypePodcast**
    - Card tipo 'Podcast'

18. **TypeLibro**
    - Card tipo 'Libro'

19. **TypeIdeasDeLibro**
    - Card tipo 'Ideas de libro'

20. **TypeCasoDeEstudio**
    - Card tipo 'Caso de estudio'

21. **TypeDocumentoTecnico**
    - Card tipo 'Documento técnico'

22. **TypeEjerciciosDePractica**
    - Card tipo 'Ejercicios de práctica'

23. **TypeRutaDeAprendizaje**
    - Card tipo 'Ruta de aprendizaje'

24. **LanguageSpanish**
    - Card en idioma 'Español'

25. **LanguageEnglish**
    - Card en idioma 'Inglés'

26. **LanguagePortuguese**
    - Card en idioma 'Portugués'

27. **ProviderUBITS**
    - Card con proveedor 'UBITS'

28. **ProviderMicrosoft**
    - Card con proveedor 'Microsoft'

29. **ProviderHubspot**
    - Card con proveedor 'Hubspot'

30. **MultipleCards**
    - Múltiples cards en un grid
    - Con diferentes estados, niveles, tipos

31. **OnClickHandler**
    - Card con onClick handler
    - Muestra alert cuando se hace click

32. **LongTitle**
    - Card con título largo (prueba de truncamiento)

33. **DifferentCompetencies**
    - Cards con diferentes competencias

34. **DifferentDurations**
    - Cards con diferentes duraciones

35. **CompleteExample**
    - Card completa con todos los campos configurados

