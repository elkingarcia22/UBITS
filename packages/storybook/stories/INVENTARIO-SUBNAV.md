# Inventario de Casos de Uso - SubNav

## Funcionalidades del Componente

1. **Variant** (SubNavVariant)
   - Variante del SubNav (template, aprendizaje, desempeno, encuestas, tareas, empresa, admin-aprendizaje, admin-desempeno)
   - Default: 'template'

2. **Tabs** (SubNavTab[])
   - Tabs personalizados (para variante template)
   - Cada tab tiene: id, label, icon, url (opcional), onClick (opcional), active (opcional)

3. **ActiveTabId** (string)
   - ID del tab activo

4. **ShowIcons** (boolean)
   - Mostrar iconos en los tabs (default: false)

5. **OnTabChange** (function)
   - Callback cuando cambia el tab activo

6. **Tab States**
   - Active: tab activo (resaltado)
   - Default: tab inactivo

7. **Navigation**
   - Con URL: navegación directa
   - Con onClick: callback personalizado
   - Sin URL ni onClick: solo cambio visual

## Casos de Uso a Documentar

1. ✅ **Default** (Ya existe)
   - SubNav completo con todos los controladores

2. **VariantTemplate**
   - Variante template (plantilla genérica)

3. **VariantAprendizaje**
   - Variante aprendizaje

4. **VariantDesempeno**
   - Variante desempeño

5. **VariantEncuestas**
   - Variante encuestas

6. **VariantTareas**
   - Variante tareas

7. **VariantEmpresa**
   - Variante empresa

8. **VariantAdminAprendizaje**
   - Variante admin-aprendizaje

9. **VariantAdminDesempeno**
   - Variante admin-desempeño

10. **WithIcons**
    - Con iconos visibles

11. **WithoutIcons**
    - Sin iconos (solo texto)

12. **ActiveTab**
    - Con tab activo

13. **NoActiveTab**
    - Sin tab activo (usa el primero por defecto)

14. **TabWithURL**
    - Tab con URL (navegación)

15. **TabWithOnClick**
    - Tab con onClick (callback)

16. **TabWithoutURLOrOnClick**
    - Tab sin URL ni onClick (solo cambio visual)

17. **OnTabChangeCallback**
    - Callback cuando cambia el tab activo

18. **CustomTabs**
    - Tabs personalizados (variante template)

19. **FewTabs**
    - Pocos tabs (1-2)

20. **ManyTabs**
    - Muchos tabs (5+)

21. **LongLabels**
    - Labels largos

22. **ShortLabels**
    - Labels cortos

23. **AllVariants**
    - Todas las variantes

24. **CompleteExample**
    - Ejemplo completo

25. **MinimalExample**
    - Ejemplo mínimo

