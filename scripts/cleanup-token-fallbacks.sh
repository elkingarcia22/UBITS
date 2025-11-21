#!/bin/bash

# Script para eliminar fallbacks antiguos y valores hardcodeados
# Deja solo los tokens nuevos de Figma

COMPONENT=$1
CSS_FILE="packages/components/${COMPONENT}/src/styles/${COMPONENT}.css"

if [ -z "$COMPONENT" ]; then
    echo "❌ Error: Debes especificar el nombre del componente"
    echo "Uso: ./scripts/cleanup-token-fallbacks.sh <componente>"
    exit 1
fi

if [ ! -f "$CSS_FILE" ]; then
    echo "❌ Error: No se encontró el archivo $CSS_FILE"
    exit 1
fi

echo "🧹 LIMPIANDO FALLBACKS ANTIGUOS Y HARDCODEADOS: $COMPONENT"
echo "Archivo: $CSS_FILE"
echo ""

# Crear backup
BACKUP_FILE="${CSS_FILE}.backup.$(date +%s)"
cp "$CSS_FILE" "$BACKUP_FILE"
echo "✅ Backup creado: $BACKUP_FILE"
echo ""

# Contadores
OLD_FALLBACKS_REMOVED=0
HARDCODED_REMOVED=0

# Función para limpiar un patrón específico
clean_pattern() {
    local pattern=$1
    local description=$2
    
    # Buscar y contar ocurrencias
    local count=$(grep -c "$pattern" "$CSS_FILE" 2>/dev/null || echo "0")
    
    if [ "$count" -gt 0 ]; then
        echo "  🔍 Encontrados $count casos de: $description"
        
        # Usar sed para reemplazar
        # Patrón: var(--token-nuevo, var(--token-antiguo, #valor))
        # Resultado: var(--token-nuevo)
        sed -i.bak "s|var(--modifiers-normal-[^,)]*), var(--ubits-[^,)]*, [^)]*)|var(--modifiers-normal-color-light-fg-1-high)|g" "$CSS_FILE"
        
        # Patrón más específico: eliminar var(--ubits-*, #valor) del medio
        sed -i.bak "s|var(--modifiers-normal-[^,)]*), var(--ubits-[^,)]*, \([^)]*\))|var(--modifiers-normal-color-light-fg-1-high, \1)|g" "$CSS_FILE"
        
        # Eliminar el fallback hardcodeado también
        sed -i.bak "s|var(--modifiers-normal-[^,)]*), var(--ubits-[^,)]*)|var(--modifiers-normal-color-light-fg-1-high)|g" "$CSS_FILE"
        
        # Eliminar valores hardcodeados al final
        sed -i.bak "s|var(--modifiers-normal-[^,)]*), #\([^)]*\))|var(--modifiers-normal-color-light-fg-1-high)|g" "$CSS_FILE"
        sed -i.bak "s|var(--modifiers-normal-[^,)]*), rgba(\([^)]*\))|var(--modifiers-normal-color-light-fg-1-high)|g" "$CSS_FILE"
        
        OLD_FALLBACKS_REMOVED=$((OLD_FALLBACKS_REMOVED + count))
    fi
}

# Usar Python para hacer el reemplazo correctamente
python3 << EOF
import re
import sys

css_file = "$CSS_FILE"

try:
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    # Patrón 1: var(--token-nuevo, var(--token-antiguo, #valor))
    # Resultado: var(--token-nuevo)
    pattern1 = r'var\((--modifiers-normal-[^,)]+),\s*var\(--ubits-[^,)]+,\s*[^)]+\)\)'
    def replace1(match):
        return f'var({match.group(1)})'
    content, count1 = re.subn(pattern1, replace1, content)
    changes += count1
    
    # Patrón 2: var(--token-nuevo, var(--token-antiguo))
    # Resultado: var(--token-nuevo)
    pattern2 = r'var\((--modifiers-normal-[^,)]+),\s*var\(--ubits-[^,)]+\)\)'
    def replace2(match):
        return f'var({match.group(1)})'
    content, count2 = re.subn(pattern2, replace2, content)
    changes += count2
    
    # Patrón 3: var(--token-nuevo, #valor) - eliminar valor hardcodeado
    # Resultado: var(--token-nuevo)
    pattern3 = r'var\((--modifiers-normal-[^,)]+),\s*#[0-9a-fA-F]{3,8}\)'
    def replace3(match):
        return f'var({match.group(1)})'
    content, count3 = re.subn(pattern3, replace3, content)
    changes += count3
    
    # Patrón 4: var(--token-nuevo, rgba(...)) - eliminar valor hardcodeado
    # Resultado: var(--token-nuevo)
    pattern4 = r'var\((--modifiers-normal-[^,)]+),\s*rgba\([^)]+\)\)'
    def replace4(match):
        return f'var({match.group(1)})'
    content, count4 = re.subn(pattern4, replace4, content)
    changes += count4
    
    # Patrón 5: var(--ubits-spacing-*, valor) - mantener (no tienen equivalente en Figma)
    # Patrón 6: var(--ubits-border-radius-*, valor) - mantener (no tienen equivalente en Figma)
    # Estos NO se tocan
    
    if content != original_content:
        with open(css_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Se realizaron {changes} cambios")
        sys.exit(0)
    else:
        print("ℹ️  No se encontraron cambios necesarios")
        sys.exit(0)
        
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Limpieza completada"
    echo ""
    echo "📊 Resumen:"
    echo "   - Fallbacks antiguos eliminados"
    echo "   - Valores hardcodeados eliminados"
    echo "   - Solo quedan tokens nuevos de Figma"
    echo ""
    echo "⚠️  NOTA: Los tokens --ubits-spacing-* y --ubits-border-radius-* se mantienen"
    echo "   porque NO tienen equivalentes en Figma"
else
    echo "❌ Error durante la limpieza"
    exit 1
fi

