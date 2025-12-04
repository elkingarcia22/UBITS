# Inventario de Casos de Uso - Calendar

## Funcionalidades del Componente

1. **Mode** ('single' | 'range')
   - Modo de selección: 'single' para fecha única, 'range' para rango de fechas (default: 'single')

2. **SelectedDate** (Date | null)
   - Fecha seleccionada (modo single) o fecha de inicio (modo range)

3. **EndDate** (Date | null)
   - Fecha de fin (solo para modo range)

4. **MinDate** (Date | null)
   - Fecha mínima permitida

5. **MaxDate** (Date | null)
   - Fecha máxima permitida

6. **InitialDate** (Date)
   - Fecha inicial a mostrar (por defecto: fecha actual)

7. **OnDateSelect** (function)
   - Callback cuando se selecciona una fecha (modo single)

8. **OnRangeSelect** (function)
   - Callback cuando se selecciona un rango (modo range)

9. **ClassName** (string)
   - Clase CSS adicional para el contenedor

10. **Style** (string)
    - Estilos inline adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Calendar completo con todos los controladores

2. **ModeSingle**
   - Modo single (fecha única)

3. **ModeRange**
   - Modo range (rango de fechas)

4. **WithSelectedDate**
   - Con fecha seleccionada

5. **WithoutSelectedDate**
   - Sin fecha seleccionada

6. **WithEndDate**
   - Con fecha de fin (modo range)

7. **WithoutEndDate**
   - Sin fecha de fin

8. **WithMinDate**
   - Con fecha mínima

9. **WithoutMinDate**
   - Sin fecha mínima

10. **WithMaxDate**
    - Con fecha máxima

11. **WithoutMaxDate**
    - Sin fecha máxima

12. **WithMinAndMaxDate**
    - Con fecha mínima y máxima

13. **WithInitialDate**
    - Con fecha inicial personalizada

14. **WithoutInitialDate**
    - Sin fecha inicial (usa fecha actual)

15. **OnDateSelectCallback**
    - Callback cuando se selecciona una fecha

16. **OnRangeSelectCallback**
    - Callback cuando se selecciona un rango

17. **SingleWithSelectedDate**
    - Modo single con fecha seleccionada

18. **RangeWithSelectedAndEndDate**
    - Modo range con fecha de inicio y fin

19. **RangeWithOnlyStartDate**
    - Modo range con solo fecha de inicio

20. **WithDateRestrictions**
    - Con restricciones de fecha (minDate y maxDate)

21. **WithoutDateRestrictions**
    - Sin restricciones de fecha

22. **CustomClassName**
    - Con clase CSS personalizada

23. **CustomStyle**
    - Con estilos inline personalizados

24. **CompleteExample**
    - Ejemplo completo

25. **MinimalExample**
    - Ejemplo mínimo

