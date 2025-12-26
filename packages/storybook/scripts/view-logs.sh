#!/bin/bash

# Script para ver los logs de Storybook
# Uso: ./scripts/view-logs.sh

echo "📋 Logs de Storybook"
echo "===================="
echo ""
echo "Para ver los logs en tiempo real:"
echo "1. Abre la consola del navegador (F12 → Console)"
echo "2. O revisa la terminal donde está corriendo 'npm run storybook'"
echo ""
echo "Para ver errores específicos, busca en la consola del navegador:"
echo "- Abre DevTools (F12)"
echo "- Ve a la pestaña 'Console'"
echo "- Filtra por 'Error' o 'Warning'"
echo ""
echo "Logs del proceso de Storybook:"
echo "=============================="

# Intentar encontrar el proceso de Storybook y mostrar sus logs
STORYBOOK_PID=$(lsof -ti:6006 2>/dev/null | head -1)

if [ -n "$STORYBOOK_PID" ]; then
  echo "✅ Storybook está corriendo en el puerto 6006 (PID: $STORYBOOK_PID)"
  echo ""
  echo "Para ver los logs en tiempo real, revisa la terminal donde ejecutaste 'npm run storybook'"
  echo ""
  echo "O ejecuta este comando para ver los últimos logs del sistema:"
  echo "  tail -f ~/.npm/_logs/*-debug.log 2>/dev/null || echo 'No hay logs de npm disponibles'"
else
  echo "❌ Storybook no está corriendo en el puerto 6006"
  echo "Ejecuta 'npm run storybook' primero"
fi
