#!/bin/bash
# Script para inventariar tokens de un componente
# Uso: ./scripts/inventory-tokens.sh [COMPONENTE]

COMPONENTE=$1

if [ -z "$COMPONENTE" ]; then
  echo "❌ Error: Debes especificar el nombre del componente"
  echo "Uso: ./scripts/inventory-tokens.sh [COMPONENTE]"
  echo "Ejemplo: ./scripts/inventory-tokens.sh button"
  exit 1
fi

CSS_FILE="packages/components/${COMPONENTE}/src/styles/${COMPONENTE}.css"

if [ ! -f "$CSS_FILE" ]; then
  echo "❌ Error: No se encontró el archivo CSS: $CSS_FILE"
  exit 1
fi

echo "📊 INVENTARIO DE TOKENS: ${COMPONENTE}"
echo "Archivo: $CSS_FILE"
echo ""

echo "🎨 Tokens de Color (--ubits-*):"
COLOR_TOKENS=$(grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -E "(bg|fg|border|accent|button|feedback|chart)" || echo "   (ninguno)")
if [ -n "$COLOR_TOKENS" ] && [ "$COLOR_TOKENS" != "   (ninguno)" ]; then
  echo "$COLOR_TOKENS" | sed 's/^/   /'
else
  echo "   (ninguno)"
fi

echo ""
echo "📏 Valores Hardcodeados de Spacing:"
SPACING=$(grep -E "(gap|padding|margin):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | head -20)
if [ -z "$SPACING" ]; then
  echo "   ✅ No se encontraron valores hardcodeados"
else
  echo "$SPACING" | sed 's/^/   /'
fi

echo ""
echo "🔲 Valores Hardcodeados de Border-radius:"
RADIUS=$(grep -E "border-radius:\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | head -20)
if [ -z "$RADIUS" ]; then
  echo "   ✅ No se encontraron valores hardcodeados"
else
  echo "$RADIUS" | sed 's/^/   /'
fi

echo ""
echo "📝 Valores Hardcodeados de Typography:"
# Excluir valores específicos válidos como line-height: 1, font-size para iconos, etc.
TYPO=$(grep -E "(font-size|font-weight|line-height|letter-spacing):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | grep -v "line-height:\s*1" | grep -v "font-size:\s*1[2-9]px" | head -20)
if [ -z "$TYPO" ]; then
  echo "   ✅ No se encontraron valores hardcodeados (o son valores específicos válidos como line-height: 1)"
else
  echo "$TYPO" | sed 's/^/   /'
  echo "   (Nota: line-height: 1 y font-size para iconos son valores específicos válidos)"
fi

echo ""
echo "✨ Valores Hardcodeados de Effects (box-shadow):"
EFFECTS=$(grep -E "box-shadow:\s*[0-9]" "$CSS_FILE" | grep -v "var(--" | head -10)
if [ -z "$EFFECTS" ]; then
  echo "   ✅ No se encontraron valores hardcodeados"
else
  echo "$EFFECTS" | sed 's/^/   /'
fi

echo ""
echo "📊 Resumen:"
COLOR_COUNT=$(grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -E "(bg|fg|border|accent|button|feedback|chart)" | wc -l | tr -d ' ')
SPACING_COUNT=$(grep -E "(gap|padding|margin):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | wc -l | tr -d ' ')
RADIUS_COUNT=$(grep -E "border-radius:\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | wc -l | tr -d ' ')
TYPO_COUNT=$(grep -E "(font-size|font-weight|line-height|letter-spacing):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | wc -l | tr -d ' ')

echo "   - Tokens de color: $COLOR_COUNT"
echo "   - Valores hardcodeados de spacing: $SPACING_COUNT"
echo "   - Valores hardcodeados de border-radius: $RADIUS_COUNT"
echo "   - Valores hardcodeados de typography: $TYPO_COUNT"

