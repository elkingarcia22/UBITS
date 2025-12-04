# Inventario de Casos de Uso - File Upload

## Funcionalidades del Componente

1. **State** ('default' | 'dragging' | 'error' | 'disabled' | 'filled' | 'files-list')
   - Estado del componente (default: 'default')

2. **Files** (FileInfo[])
   - Array de archivos a mostrar (para vista files-list)
   - FileInfo: name, size, progress (0-100), status ('pending' | 'uploading' | 'completed' | 'error'), id

3. **MaxFiles** (number)
   - Número máximo de archivos permitidos (default: 6)

4. **MaxSize** (number)
   - Tamaño máximo por archivo en bytes (default: 5242880 = 5MB)

5. **ShowFileSize** (boolean)
   - Si se muestra el tamaño del archivo (default: true)

6. **ShowActions** (boolean)
   - Si se muestran los botones de acción (re-subir y eliminar) (default: true)

7. **ShowProgress** (boolean)
   - Si se muestra la barra de progreso (default: true)

8. **ShowIcon** (boolean)
   - Si se muestra el icono en el drop zone (default: false)

9. **DropText** (string)
   - Texto personalizado para el área de drop (default: 'Arrastra tus archivos aquí')

10. **ConstraintsText** (string)
    - Texto de restricciones (ej: 'Max 6 files · Up to 5MB')

11. **SelectButtonText** (string)
    - Texto del botón de selección (default: 'Seleccionar archivos')

12. **OnClick** (function)
    - Callback cuando se hace clic en el área de upload

13. **OnAddFiles** (function)
    - Callback cuando se hace clic en el botón de agregar archivos

14. **OnRemoveAll** (function)
    - Callback cuando se hace clic en el botón de eliminar todos

15. **OnReupload** (function)
    - Callback cuando se hace clic en el botón de re-subir

16. **OnRemove** (function)
    - Callback cuando se hace clic en el botón de eliminar un archivo específico

17. **OnDragOver** (function)
    - Callback cuando se arrastra un archivo sobre el área

18. **OnDrop** (function)
    - Callback cuando se suelta un archivo sobre el área

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - File Upload completo con todos los controladores

2. **StateDefault**
   - Estado default

3. **StateDragging**
   - Estado dragging

4. **StateError**
   - Estado error

5. **StateDisabled**
   - Estado disabled

6. **StateFilesList**
   - Estado files-list (con archivos)

7. **WithFiles**
   - Con archivos (vista files-list)

8. **WithoutFiles**
   - Sin archivos (vista drop zone)

9. **SingleFile**
   - Un solo archivo

10. **MultipleFiles**
    - Múltiples archivos

11. **FileStatusPending**
    - Archivo con estado pending

12. **FileStatusUploading**
    - Archivo con estado uploading

13. **FileStatusCompleted**
    - Archivo con estado completed

14. **FileStatusError**
    - Archivo con estado error

15. **FileWithProgress**
    - Archivo con progreso

16. **FileWithoutProgress**
    - Archivo sin progreso

17. **ShowFileSize**
    - Mostrar tamaño del archivo

18. **HideFileSize**
    - Ocultar tamaño del archivo

19. **ShowProgress**
    - Mostrar barra de progreso

20. **HideProgress**
    - Ocultar barra de progreso

21. **ShowActions**
    - Mostrar botones de acción

22. **HideActions**
    - Ocultar botones de acción

23. **ShowIcon**
    - Mostrar icono en drop zone

24. **HideIcon**
    - Ocultar icono en drop zone

25. **CustomDropText**
    - Texto personalizado para drop zone

26. **CustomConstraintsText**
    - Texto personalizado de restricciones

27. **CustomSelectButtonText**
    - Texto personalizado del botón de selección

28. **MaxFiles1**
    - Máximo 1 archivo (modo single)

29. **MaxFilesMultiple**
    - Máximo múltiples archivos

30. **CustomMaxSize**
    - Tamaño máximo personalizado

31. **OnClickCallback**
    - Callback cuando se hace clic

32. **OnAddFilesCallback**
    - Callback cuando se agregan archivos

33. **OnRemoveAllCallback**
    - Callback cuando se eliminan todos

34. **OnRemoveCallback**
    - Callback cuando se elimina un archivo

35. **OnDragOverCallback**
    - Callback cuando se arrastra sobre el área

36. **OnDropCallback**
    - Callback cuando se suelta un archivo

37. **CompleteExample**
    - Ejemplo completo

38. **MinimalExample**
    - Ejemplo mínimo

