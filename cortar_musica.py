#!/usr/bin/env python3
# Script para cortar 1 segundo do início do arquivo MP3

import subprocess
import os

arquivo_original = r"c:\Users\Geovanne\aulas\casamento\musica.mp3"
arquivo_temp = r"c:\Users\Geovanne\aulas\casamento\musica_temp.mp3"

# Tentar encontrar ffmpeg em locais comuns
ffmpeg_paths = [
    "ffmpeg",  # PATH
    r"C:\ffmpeg\bin\ffmpeg.exe",
    r"C:\Program Files\ffmpeg\bin\ffmpeg.exe",
    r"C:\Program Files (x86)\ffmpeg\bin\ffmpeg.exe",
]

ffmpeg_exe = None
for path in ffmpeg_paths:
    try:
        result = subprocess.run([path, "-version"], capture_output=True, timeout=5)
        if result.returncode == 0:
            ffmpeg_exe = path
            print(f"✅ FFmpeg encontrado: {path}")
            break
    except:
        pass

if not ffmpeg_exe:
    print("❌ FFmpeg não encontrado. Tentando com pipe...")
    # Tentar instalar ffmpeg-python
    try:
        import ffmpeg
        ffmpeg_exe = "ffmpeg"  # Usar a versão do pip
    except:
        print("❌ FFmpeg não disponível. Por favor, instale manualmente.")
        exit(1)

# Comando para cortar 1 segundo do início
# ffmpeg -i entrada.mp3 -ss 1 saida.mp3
comando = [
    ffmpeg_exe,
    "-i", arquivo_original,  # Entrada
    "-ss", "1",              # Pular 1 segundo
    "-c", "copy",            # Copiar sem recodificar (mais rápido)
    "-y",                    # Sobrescrever sem perguntar
    arquivo_temp
]

print("⏳ Cortando 1 segundo do início da música...")
try:
    result = subprocess.run(comando, capture_output=True, text=True, timeout=30)
    
    if result.returncode == 0:
        # Substituir arquivo original pela versão cortada
        os.remove(arquivo_original)
        os.rename(arquivo_temp, arquivo_original)
        print("✅ Sucesso! Arquivo cortado e salvo!")
        print(f"📁 Arquivo: {arquivo_original}")
    else:
        print(f"❌ Erro ao cortar: {result.stderr}")
except Exception as e:
    print(f"❌ Erro: {e}")
