# Inventario de Casos de Uso - Stepper

## Funcionalidades del Componente

1. **Orientación** (StepperOrientation)
   - `horizontal`: Orientación horizontal (default)
   - `vertical`: Orientación vertical

2. **Tamaño** (StepperSize)
   - `xs`: Tamaño extra pequeño
   - `sm`: Tamaño pequeño
   - `md`: Tamaño mediano (default)
   - `lg`: Tamaño grande

3. **Mostrar título** (boolean)
   - `showTitle`: Mostrar títulos de los pasos

4. **Mostrar descripción** (boolean)
   - `showDescription`: Mostrar descripciones de los pasos

5. **Pasos** (StepperStep[])
   - `number`: Número del paso (1, 2, 3, etc.)
   - `title`: Título del paso
   - `description`: Descripción opcional del paso
   - `state`: Estado del paso

6. **Estados de pasos** (StepperStepState)
   - `default`: Estado por defecto
   - `completed`: Paso completado (muestra checkmark)
   - `active`: Paso activo
   - `error`: Paso con error
   - `warning`: Paso con advertencia

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Stepper completo con todos los controladores

2. **OrientationHorizontal**
   - Stepper orientación horizontal

3. **OrientationVertical**
   - Stepper orientación vertical

4. **SizeXS**
   - Stepper tamaño extra pequeño

5. **SizeSM**
   - Stepper tamaño pequeño

6. **SizeMD**
   - Stepper tamaño mediano

7. **SizeLG**
   - Stepper tamaño grande

8. **WithTitle**
   - Stepper con títulos

9. **WithoutTitle**
   - Stepper sin títulos

10. **WithDescription**
    - Stepper con descripciones

11. **WithoutDescription**
    - Stepper sin descripciones

12. **WithoutTitleAndDescription**
    - Stepper sin títulos ni descripciones

13. **StateDefault**
    - Paso en estado default

14. **StateCompleted**
    - Paso en estado completed (muestra checkmark)

15. **StateActive**
    - Paso en estado active

16. **StateError**
    - Paso en estado error

17. **StateWarning**
    - Paso en estado warning

18. **TwoSteps**
    - Stepper con 2 pasos

19. **ThreeSteps**
    - Stepper con 3 pasos

20. **FourSteps**
    - Stepper con 4 pasos

21. **FiveSteps**
    - Stepper con 5 pasos

22. **AllStates**
    - Stepper con todos los estados (default, completed, active, error, warning)

23. **ProgressiveSteps**
    - Stepper con pasos progresivos (completed → active → default)

24. **MixedStates**
    - Stepper con estados mixtos

25. **HorizontalWithTitle**
    - Stepper horizontal con títulos

26. **HorizontalWithDescription**
    - Stepper horizontal con descripciones

27. **VerticalWithTitle**
    - Stepper vertical con títulos

28. **VerticalWithDescription**
    - Stepper vertical con descripciones

29. **HorizontalAllSizes**
    - Stepper horizontal con todos los tamaños

30. **VerticalAllSizes**
    - Stepper vertical con todos los tamaños

31. **LongTitles**
    - Stepper con títulos largos

32. **LongDescriptions**
    - Stepper con descripciones largas

33. **MinimalExample**
    - Ejemplo mínimo (2 pasos, sin descripciones)

34. **CompleteExample**
    - Ejemplo completo con todas las opciones

