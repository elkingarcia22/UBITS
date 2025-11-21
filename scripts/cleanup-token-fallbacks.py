#!/usr/bin/env python3
"""
Script para eliminar fallbacks antiguos y valores hardcodeados de tokens.
Deja SOLO los tokens nuevos de Figma.

Uso:
    python3 scripts/cleanup-token-fallbacks.py <componente>

Ejemplo:
    python3 scripts/cleanup-token-fallbacks.py button
"""

import re
import sys
import os
from pathlib import Path

def cleanup_fallbacks(css_file: str) -> tuple[int, int]:
    """
    Limpia fallbacks antiguos y valores hardcodeados del archivo CSS.
    
    Returns:
        tuple: (cambios_realizados, tokens_sin_equivalente_mantenidos)
    """
    if not os.path.exists(css_file):
        print(f"❌ Error: No se encontró el archivo {css_file}")
        sys.exit(1)
    
    # Leer archivo
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    tokens_sin_equivalente = 0
    
    # Tokens que NO tienen equivalente en Figma (mantener)
    tokens_sin_equivalente_list = [
        '--ubits-spacing-',
        '--ubits-border-radius-',
        '--ubits-button-focus-ring',
        '--ubits-btn-primary-fg',
        '--ubits-elevation-',
    ]
    
    # Patrón 1: var(--token-nuevo, var(--token-antiguo, #valor))
    # Resultado: var(--token-nuevo)
    # PERO: Si el token antiguo es uno sin equivalente, mantenerlo
    def replace_pattern1(match):
        nonlocal changes, tokens_sin_equivalente
        token_nuevo = match.group(1)
        token_antiguo = match.group(2)
        valor_hardcodeado = match.group(3)
        
        # Verificar si el token antiguo es uno sin equivalente
        if any(sin_equiv in token_antiguo for sin_equiv in tokens_sin_equivalente_list):
            tokens_sin_equivalente += 1
            # Mantener el fallback antiguo pero eliminar el hardcodeado
            return f'var({token_nuevo}, var({token_antiguo}))'
        
        changes += 1
        return f'var({token_nuevo})'
    
    pattern1 = r'var\((--modifiers-normal-[^,)]+),\s*var\((--ubits-[^,)]+),\s*([^)]+)\)\)'
    content = re.sub(pattern1, replace_pattern1, content)
    
    # Patrón 2: var(--token-nuevo, var(--token-antiguo))
    # Resultado: var(--token-nuevo)
    # PERO: Si el token antiguo es uno sin equivalente, mantenerlo
    def replace_pattern2(match):
        nonlocal changes, tokens_sin_equivalente
        token_nuevo = match.group(1)
        token_antiguo = match.group(2)
        
        # Verificar si el token antiguo es uno sin equivalente
        if any(sin_equiv in token_antiguo for sin_equiv in tokens_sin_equivalente_list):
            tokens_sin_equivalente += 1
            return match.group(0)  # Mantener original
        
        changes += 1
        return f'var({token_nuevo})'
    
    pattern2 = r'var\((--modifiers-normal-[^,)]+),\s*var\((--ubits-[^,)]+)\)\)'
    content = re.sub(pattern2, replace_pattern2, content)
    
    # Patrón 3: var(--token-nuevo, #valor) - eliminar valor hardcodeado
    # Resultado: var(--token-nuevo)
    pattern3 = r'var\((--modifiers-normal-[^,)]+),\s*#([0-9a-fA-F]{3,8})\)'
    def replace_pattern3(match):
        nonlocal changes
        changes += 1
        return f'var({match.group(1)})'
    
    content = re.sub(pattern3, replace_pattern3, content)
    
    # Patrón 4: var(--token-nuevo, rgba(...)) - eliminar valor hardcodeado
    # Resultado: var(--token-nuevo)
    pattern4 = r'var\((--modifiers-normal-[^,)]+),\s*rgba\(([^)]+)\)\)'
    def replace_pattern4(match):
        nonlocal changes
        changes += 1
        return f'var({match.group(1)})'
    
    content = re.sub(pattern4, replace_pattern4, content)
    
    # Escribir archivo si hubo cambios
    if content != original_content:
        with open(css_file, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes, tokens_sin_equivalente
    
    return 0, 0

def main():
    if len(sys.argv) < 2:
        print("❌ Error: Debes especificar el nombre del componente")
        print("Uso: python3 scripts/cleanup-token-fallbacks.py <componente>")
        sys.exit(1)
    
    component = sys.argv[1]
    css_file = f"packages/components/{component}/src/styles/{component}.css"
    
    if not os.path.exists(css_file):
        print(f"❌ Error: No se encontró el archivo {css_file}")
        sys.exit(1)
    
    print(f"🧹 LIMPIANDO FALLBACKS ANTIGUOS Y HARDCODEADOS: {component}")
    print(f"Archivo: {css_file}")
    print("")
    
    # Crear backup
    from datetime import datetime
    backup_file = f"{css_file}.backup.{int(datetime.now().timestamp())}"
    import shutil
    shutil.copy2(css_file, backup_file)
    print(f"✅ Backup creado: {backup_file}")
    print("")
    
    # Limpiar fallbacks
    changes, tokens_sin_equiv = cleanup_fallbacks(css_file)
    
    if changes > 0 or tokens_sin_equiv > 0:
        print(f"✅ Limpieza completada")
        print("")
        print("📊 Resumen:")
        print(f"   - Fallbacks antiguos eliminados: {changes}")
        print(f"   - Tokens sin equivalente mantenidos: {tokens_sin_equiv}")
        print("   - Solo quedan tokens nuevos de Figma")
        print("")
        print("⚠️  NOTA: Los tokens --ubits-spacing-* y --ubits-border-radius-* se mantienen")
        print("   porque NO tienen equivalentes en Figma")
    else:
        print("ℹ️  No se encontraron cambios necesarios")
        print("   El archivo ya está limpio o no tiene tokens para limpiar")

if __name__ == '__main__':
    main()

