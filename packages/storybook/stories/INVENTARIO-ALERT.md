# Inventario de Casos de Uso - Alert

## Funcionalidades del Componente

1. **Tipos** (AlertType)
   - `success`: Alert de éxito (verde)
   - `info`: Alert informativo (azul)
   - `warning`: Alert de advertencia (naranja)
   - `error`: Alert de error (rojo)

2. **Mensaje** (string)
   - Mensaje del alert (puede incluir HTML básico)

3. **Closable** (boolean)
   - Si el alert tiene botón de cerrar (default: true)

4. **Action** (AlertAction, opcional)
   - Botón de acción opcional dentro del alert
   - `label`: Etiqueta del botón
   - `onClick`: Callback cuando se hace clic

5. **Duration** (number)
   - Duración en milisegundos antes de auto-cerrar (0 = no auto-close, default: 0)

6. **onClose** (callback, opcional)
   - Callback llamado cuando el alert se cierra

7. **className** (string, opcional)
   - Clases CSS adicionales

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Alert completo con todos los controladores

2. **TypeSuccess**
   - Alert tipo success

3. **TypeInfo**
   - Alert tipo info

4. **TypeWarning**
   - Alert tipo warning

5. **TypeError**
   - Alert tipo error

6. **WithCloseButton**
   - Alert con botón de cerrar

7. **WithoutCloseButton**
   - Alert sin botón de cerrar

8. **WithAction**
   - Alert con botón de acción

9. **AutoClose**
   - Alert con auto-cierre

10. **AutoCloseFast**
    - Alert con auto-cierre rápido (1 segundo)

11. **AutoCloseSlow**
    - Alert con auto-cierre lento (10 segundos)

12. **OnCloseCallback**
    - Alert con callback onClose

13. **LongMessage**
    - Alert con mensaje largo

14. **HTMLMessage**
    - Alert con mensaje HTML

15. **MinimalExample**
    - Ejemplo mínimo (solo mensaje)

16. **CompleteExample**
    - Ejemplo completo con todas las opciones

17. **AllTypes**
    - Múltiples alerts mostrando todos los tipos

18. **MultipleAlerts**
    - Múltiples alerts apilados

19. **SuccessWithAction**
    - Alert success con botón de acción

20. **InfoWithAction**
    - Alert info con botón de acción

21. **WarningWithAction**
    - Alert warning con botón de acción

22. **ErrorWithAction**
    - Alert error con botón de acción

23. **SuccessAutoClose**
    - Alert success con auto-cierre

24. **InfoAutoClose**
    - Alert info con auto-cierre

25. **WarningAutoClose**
    - Alert warning con auto-cierre

26. **ErrorAutoClose**
    - Alert error con auto-cierre

