# Inventario de Casos de Uso - Button Feedback

## Funcionalidades del Componente

1. **Texto** (string, opcional)
   - Texto del botón flotante

2. **Icono** (string)
   - Icono del botón flotante (default: 'comment-dots')

3. **Posición** ('bottom-right' | 'bottom-left' | 'top-right' | 'top-left')
   - Posición del botón flotante (default: 'bottom-right')

4. **Offset** (number)
   - Offset desde el borde en píxeles (default: 24)

5. **Modal Title** (string)
   - Título del modal de feedback (default: 'Deja tu Feedback')

6. **Section Options** (array)
   - Opciones para el select de sección
   - Array de { value: string, text: string }

7. **Default Section** (string)
   - Valor por defecto del select de sección

8. **Comment Placeholder** (string)
   - Placeholder del textarea de comentarios

9. **N8N Webhook URL** (string, opcional)
   - URL del endpoint de n8n para enviar el feedback

10. **Callbacks**
    - `onFeedbackSent`: Callback cuando se envía el feedback exitosamente
    - `onCancel`: Callback cuando se cancela el feedback
    - `onClose`: Callback cuando se cierra el modal

11. **Visible** (boolean)
    - Si el botón está visible inicialmente (default: true)

12. **Métodos**
    - `show()`: Mostrar el botón
    - `hide()`: Ocultar el botón
    - `open()`: Abrir el modal manualmente
    - `close()`: Cerrar el modal
    - `destroy()`: Limpiar recursos

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - Button Feedback completo con todos los controladores

2. **PositionBottomRight**
   - Botón en posición bottom-right

3. **PositionBottomLeft**
   - Botón en posición bottom-left

4. **PositionTopRight**
   - Botón en posición top-right

5. **PositionTopLeft**
   - Botón en posición top-left

6. **WithText**
   - Botón con texto

7. **IconOnly**
   - Botón solo con icono (sin texto)

8. **CustomIcon**
   - Botón con icono personalizado

9. **CustomOffset**
   - Botón con offset personalizado

10. **CustomModalTitle**
    - Modal con título personalizado

11. **WithSectionOptions**
    - Modal con opciones de sección

12. **WithoutSectionOptions**
    - Modal sin opciones de sección

13. **DefaultSection**
    - Modal con sección por defecto

14. **CustomCommentPlaceholder**
    - Modal con placeholder personalizado

15. **OnFeedbackSent**
    - Con callback onFeedbackSent

16. **OnCancel**
    - Con callback onCancel

17. **OnClose**
    - Con callback onClose

18. **WithN8NWebhook**
    - Con URL de webhook de n8n

19. **Visible**
    - Botón visible inicialmente

20. **Hidden**
    - Botón oculto inicialmente

21. **ShowHideMethods**
    - Demostrar métodos show() y hide()

22. **OpenCloseMethods**
    - Demostrar métodos open() y close()

23. **MinimalExample**
    - Ejemplo mínimo (solo icono, sin opciones)

24. **CompleteExample**
    - Ejemplo completo con todas las opciones

25. **MultiplePositions**
    - Múltiples botones en diferentes posiciones

