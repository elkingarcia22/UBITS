#!/bin/bash
# Script para verificar migración de un componente
# Uso: ./scripts/verify-migration.sh [COMPONENTE]

COMPONENTE=$1

if [ -z "$COMPONENTE" ]; then
  echo "❌ Error: Debes especificar el nombre del componente"
  echo "Uso: ./scripts/verify-migration.sh [COMPONENTE]"
  echo "Ejemplo: ./scripts/verify-migration.sh button"
  exit 1
fi

CSS_FILE="packages/components/${COMPONENTE}/src/styles/${COMPONENTE}.css"

if [ ! -f "$CSS_FILE" ]; then
  echo "❌ Error: No se encontró el archivo CSS: $CSS_FILE"
  exit 1
fi

echo "✅ VERIFICACIÓN POST-MIGRACIÓN: ${COMPONENTE}"
echo "Archivo: $CSS_FILE"
echo ""

ERRORS=0

echo "1. Tokens antiguos sin migrar (--ubits-*):"
# Buscar tokens antiguos de COLOR que NO estén dentro de fallbacks
# Ignorar tokens documentados sin equivalente: spacing, border-radius, effects, btn-primary-fg, button-focus-ring
OLD_COLOR_TOKENS=$(grep -E "^\s*(background|color|border):\s*var\(--ubits-" "$CSS_FILE" | grep -v "backup" | grep -v "var(--modifiers-normal-" | grep -v "spacing" | grep -v "border-radius" | grep -v "elevation" | grep -v "focus-ring" | grep -v "btn-primary-fg" | head -10)
if [ -z "$OLD_COLOR_TOKENS" ]; then
  echo "   ✅ No se encontraron tokens antiguos de COLOR sin migrar"
  echo "   (Nota: tokens sin equivalente en Figma se mantienen en sistema antiguo, lo cual es correcto)"
else
  echo "   ⚠️  Tokens antiguos de COLOR encontrados (NO están en fallbacks):"
  echo "$OLD_COLOR_TOKENS" | sed 's/^/      /' | head -10
  echo "   (Si estos tokens no tienen equivalente en Figma, documentarlos en token-mapping.ts)"
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "2. Tokens antiguos de Typography sin migrar (--font-*, --weight-*):"
OLD_TYPO_TOKENS=$(grep -E "^\s*(font-size|font-weight|font-family|line-height|letter-spacing):\s*var\(--(font|weight|line-height)" "$CSS_FILE" | grep -v "backup" | grep -v "var(--modifiers-normal-" | head -10)
if [ -z "$OLD_TYPO_TOKENS" ]; then
  echo "   ✅ No se encontraron tokens antiguos de TYPOGRAPHY sin migrar"
  echo "   (Nota: tokens sin equivalente en Figma se mantienen en sistema antiguo, lo cual es correcto)"
else
  echo "   ⚠️  Tokens antiguos de TYPOGRAPHY encontrados (NO están en fallbacks):"
  echo "$OLD_TYPO_TOKENS" | sed 's/^/      /' | head -10
  echo "   (Si estos tokens no tienen equivalente en Figma, documentarlos en token-mapping.ts)"
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "3. Tokens antiguos de Effects sin migrar (--ubits-*elevation*, --ubits-*shadow*, --ubits-*focus*):"
OLD_EFFECTS_TOKENS=$(grep -E "^\s*(box-shadow|outline):\s*var\(--ubits-(elevation|shadow|focus)" "$CSS_FILE" | grep -v "backup" | grep -v "var(--modifiers-normal-" | head -10)
if [ -z "$OLD_EFFECTS_TOKENS" ]; then
  echo "   ✅ No se encontraron tokens antiguos de EFFECTS sin migrar"
  echo "   (Nota: tokens sin equivalente en Figma se mantienen en sistema antiguo, lo cual es correcto)"
else
  echo "   ⚠️  Tokens antiguos de EFFECTS encontrados (NO están en fallbacks):"
  echo "$OLD_EFFECTS_TOKENS" | sed 's/^/      /' | head -10
  echo "   (Si estos tokens no tienen equivalente en Figma, documentarlos en token-mapping.ts)"
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "4. Valores hardcodeados de spacing:"
HARDCODED_SPACING=$(grep -E "(gap|padding|margin):\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | grep -v "0px" | grep -v "backup")
if [ -z "$HARDCODED_SPACING" ]; then
  echo "   ✅ No se encontraron valores hardcodeados de spacing"
else
  echo "   ⚠️  Valores hardcodeados encontrados:"
  echo "$HARDCODED_SPACING" | sed 's/^/      /' | head -10
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "5. Valores hardcodeados de border-radius:"
HARDCODED_RADIUS=$(grep -E "border-radius:\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | grep -v "backup")
if [ -z "$HARDCODED_RADIUS" ]; then
  echo "   ✅ No se encontraron valores hardcodeados de border-radius"
else
  echo "   ⚠️  Valores hardcodeados encontrados:"
  echo "$HARDCODED_RADIUS" | sed 's/^/      /' | head -10
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "6. Valores hardcodeados de typography:"
HARDCODED_TYPO=$(grep -E "(font-size|font-weight|line-height|letter-spacing):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | grep -v "line-height:\s*1" | grep -v "font-size:\s*1[2-9]px" | grep -v "backup" | head -10)
if [ -z "$HARDCODED_TYPO" ]; then
  echo "   ✅ No se encontraron valores hardcodeados de typography"
else
  echo "   ⚠️  Valores hardcodeados encontrados:"
  echo "$HARDCODED_TYPO" | sed 's/^/      /' | head -10
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "7. Valores hardcodeados de effects:"
HARDCODED_EFFECTS=$(grep -E "(box-shadow|outline):\s*[0-9]" "$CSS_FILE" | grep -v "var(--" | grep -v "backup" | head -10)
if [ -z "$HARDCODED_EFFECTS" ]; then
  echo "   ✅ No se encontraron valores hardcodeados de effects"
else
  echo "   ⚠️  Valores hardcodeados encontrados:"
  echo "$HARDCODED_EFFECTS" | sed 's/^/      /' | head -10
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "8. Tokens nuevos sin fallback de 3 niveles:"
# Buscar tokens nuevos que no tengan fallback antiguo
NO_FALLBACK=$(grep -E "var\(--modifiers-normal-[^,)]+\)" "$CSS_FILE" | grep -v "var(--ubits-" | head -10)
if [ -z "$NO_FALLBACK" ]; then
  echo "   ✅ Todos los tokens tienen fallbacks"
else
  echo "   ⚠️  Tokens sin fallback encontrados:"
  echo "$NO_FALLBACK" | sed 's/^/      /' | head -10
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "9. Verificar uso de !important en propiedades críticas:"
# Solo verificar en reglas de estados y variantes, no en reglas base
CRITICAL_PROPS=$(grep -E "(hover|active|pressed|disabled|focus|:not\(:disabled\)):.*(background|color|border):\s*var\(--modifiers-normal-" "$CSS_FILE" | grep -v "!important" | head -5)
if [ -z "$CRITICAL_PROPS" ]; then
  echo "   ✅ Todas las propiedades críticas en estados tienen !important"
else
  echo "   ⚠️  Propiedades críticas sin !important encontradas (en estados):"
  echo "$CRITICAL_PROPS" | sed 's/^/      /' | head -5
  # No incrementar ERRORS porque esto es opcional pero recomendado
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo "✅ VERIFICACIÓN COMPLETA: No se encontraron errores"
  exit 0
else
  echo "⚠️  VERIFICACIÓN COMPLETA: Se encontraron $ERRORS tipo(s) de error(es)"
  echo ""
  echo "Revisa los errores arriba y corrige antes de hacer commit."
  exit 1
fi

