# Inventario de Casos de Uso - Input

## Funcionalidades del Componente

1. **Type** ('text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select' | 'textarea' | 'search' | 'autocomplete' | 'calendar')
   - Tipo de input (default: 'text')

2. **Size** ('xs' | 'sm' | 'md' | 'lg')
   - Tamaño del input (default: 'md')

3. **State** ('default' | 'hover' | 'focus' | 'active' | 'invalid' | 'disabled')
   - Estado del input (default: 'default')

4. **Label** (string)
   - Texto del label

5. **Placeholder** (string)
   - Texto del placeholder

6. **HelperText** (string)
   - Texto de ayuda (helper text)

7. **ShowLabel** (boolean)
   - Mostrar/ocultar label (default: true)

8. **ShowHelper** (boolean)
   - Mostrar/ocultar helper text (default: false)

9. **ShowCounter** (boolean)
   - Mostrar/ocultar contador de caracteres (default: false)

10. **MaxLength** (number)
    - Máximo de caracteres para el contador (default: 50)

11. **Mandatory** (boolean)
    - Mostrar texto mandatory/optional (default: false)

12. **MandatoryType** ('obligatorio' | 'opcional')
    - Tipo de mandatory (default: 'obligatorio')

13. **LeftIcon** (string)
    - Icono izquierdo (nombre FontAwesome sin prefijo)

14. **RightIcon** (string)
    - Icono derecho (nombre FontAwesome sin prefijo)

15. **SelectOptions** (SelectOption[])
    - Opciones para SELECT

16. **AutocompleteOptions** (AutocompleteOption[])
    - Opciones para AUTOCOMPLETE

17. **Value** (string)
    - Valor inicial del input

18. **ShowRichTextToolbar** (boolean)
    - Mostrar/ocultar barra de herramientas de texto enriquecido (solo para textarea) (default: false)

19. **OnChange** (function)
    - Callback cuando cambia el valor

20. **OnFocus** (function)
    - Callback cuando se enfoca

21. **OnBlur** (function)
    - Callback cuando se desenfoca

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Input completo con todos los controladores

2. **TypeText**
   - Tipo text

3. **TypeEmail**
   - Tipo email

4. **TypePassword**
   - Tipo password (con toggle)

5. **TypeNumber**
   - Tipo number

6. **TypeTel**
   - Tipo tel

7. **TypeURL**
   - Tipo url

8. **TypeSelect**
   - Tipo select

9. **TypeTextarea**
   - Tipo textarea

10. **TypeSearch**
    - Tipo search (con botón clear)

11. **TypeAutocomplete**
    - Tipo autocomplete

12. **TypeCalendar**
    - Tipo calendar

13. **SizeXS**
    - Tamaño xs

14. **SizeSM**
    - Tamaño sm

15. **SizeMD**
    - Tamaño md (default)

16. **SizeLG**
    - Tamaño lg

17. **StateDefault**
    - Estado default

18. **StateHover**
    - Estado hover

19. **StateFocus**
    - Estado focus

20. **StateActive**
    - Estado active

21. **StateInvalid**
    - Estado invalid

22. **StateDisabled**
    - Estado disabled

23. **WithLabel**
    - Con label

24. **WithoutLabel**
    - Sin label

25. **WithPlaceholder**
    - Con placeholder

26. **WithoutPlaceholder**
    - Sin placeholder

27. **WithHelperText**
    - Con helper text

28. **WithoutHelperText**
    - Sin helper text

29. **ShowHelper**
    - Mostrar helper text

30. **HideHelper**
    - Ocultar helper text

31. **ShowCounter**
    - Mostrar contador

32. **HideCounter**
    - Ocultar contador

33. **WithMaxLength**
    - Con maxLength

34. **MandatoryObligatorio**
    - Mandatory obligatorio

35. **MandatoryOpcional**
    - Mandatory opcional

36. **WithoutMandatory**
    - Sin mandatory

37. **WithLeftIcon**
    - Con icono izquierdo

38. **WithRightIcon**
    - Con icono derecho

39. **WithBothIcons**
    - Con ambos iconos

40. **WithoutIcons**
    - Sin iconos

41. **WithValue**
    - Con valor inicial

42. **WithoutValue**
    - Sin valor inicial

43. **SelectWithOptions**
    - Select con opciones

44. **SelectWithManyOptions**
    - Select con muchas opciones (scroll infinito)

45. **AutocompleteWithOptions**
    - Autocomplete con opciones

46. **TextareaWithRichTextToolbar**
    - Textarea con barra de herramientas

47. **TextareaWithoutRichTextToolbar**
    - Textarea sin barra de herramientas

48. **OnChangeCallback**
    - Callback onChange

49. **OnFocusCallback**
    - Callback onFocus

50. **OnBlurCallback**
    - Callback onBlur

51. **AllSizes**
    - Todos los tamaños

52. **AllStates**
    - Todos los estados

53. **AllTypes**
    - Todos los tipos

54. **CompleteExample**
    - Ejemplo completo

55. **MinimalExample**
    - Ejemplo mínimo

