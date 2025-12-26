/**
 * FileUploadProvider
 * Lógica de renderizado del componente File Upload
 * Genera HTML según las opciones proporcionadas
 */

import type { FileUploadOptions, FileUploadState } from './types/FileUploadOptions';
import { renderProgressBar } from '../../progress/src/ProgressProvider';
import { renderButton } from '../../button/src/ButtonProvider';

/**
 * Formatea el tamaño del archivo en formato legible (KB, MB, GB)
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Renderiza el HTML de un Status Tag inline (sin importar el componente completo)
 */
function renderStatusTagInline(label: string, status: 'pending' | 'completed' | 'error' | 'uploading' = 'pending'): string {
  const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    pending: {
      bg: 'var(--modifiers-normal-color-light-feedback-accent-warning)',
      text: 'var(--modifiers-normal-color-light-fg-bold)',
      border: 'var(--modifiers-normal-color-light-feedback-accent-warning)'
    },
    completed: {
      bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
      text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
      border: 'var(--modifiers-normal-color-light-feedback-border-success)'
    },
    error: {
      bg: 'var(--modifiers-normal-color-light-feedback-bg-error-subtle-default)',
      text: 'var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)',
      border: 'var(--modifiers-normal-color-light-feedback-border-error)'
    },
    uploading: {
      bg: 'var(--modifiers-normal-color-light-bg-active)',
      text: 'var(--modifiers-normal-color-light-fg-2-high)',
      border: 'var(--modifiers-normal-color-light-accent-brand)'
    }
  };

  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    completed: 'Completado',
    error: 'Error',
    uploading: 'Subiendo'
  };

  return `
    <span class="ubits-file-upload__status-tag" style="background-color: ${colors.bg}; color: ${colors.text}; border-color: ${colors.border};">
      ${statusLabels[status] || label}
    </span>
  `.trim();
}

/**
 * Renderiza un File Upload UBITS como HTML string
 */
export function renderFileUpload(options: FileUploadOptions = {}): string {
  const {
    state = 'default',
    files = [],
    maxFiles = 6,
    maxSize = 5242880, // 5MB
    showFileSize = true,
    showActions = true,
    showProgress = true,
    showIcon = false,
    dropText = 'Arrastra tus archivos aquí',
    constraintsText,
    selectButtonText = 'Seleccionar archivos',
    // Legacy support
    fileName,
    fileExtension,
    fileSize,
    uploadText = 'Haz clic para subir archivo',
    fileStatus = 'pending',
    className = ''
  } = options;

  // Determinar si mostrar vista de lista o drop zone
  const hasFiles = files && files.length > 0;
  
  // Determinar el estado actual:
  // - Si el estado es 'files-list', mantener 'files-list' (incluso sin archivos)
  // - Si hay archivos en el array y el estado no es explícitamente 'files-list', cambiar a 'files-list'
  // - De lo contrario, usar el estado solicitado
  let actualState = state;
  if (state === 'files-list') {
    actualState = 'files-list';
  } else if (hasFiles && state !== 'files-list') {
    actualState = 'files-list';
  }
  
  console.log('[FileUpload] Rendering with state:', {
    requestedState: state,
    actualState,
    hasFiles,
    filesCount: files?.length || 0
  });
  
  // Generar texto de restricciones si no se proporciona
  const finalConstraintsText = constraintsText || `Máx. ${maxFiles} archivos · Hasta ${formatFileSize(maxSize)}`;

  // Vista de lista de archivos
  if (actualState === 'files-list') {
    // Mostrar lista incluso si está vacía (para que el usuario vea la estructura)
    const filesToShow = hasFiles ? (maxFiles === 1 ? files.slice(0, 1) : files) : [];
    const isSingleMode = maxFiles === 1;
    
    const filesListHtml = filesToShow.length > 0 ? filesToShow.map((file, index) => {
      const fileId = file.id || `file-${index}`;
      const fileProgress = file.progress !== undefined ? file.progress : 0;
      const fileStatus = file.status || 'pending';
      // Mostrar progreso solo si está en estado 'uploading' y tiene progreso > 0
      const shouldShowProgress = showProgress && fileStatus === 'uploading' && fileProgress > 0;
      
      // Evaluar condiciones explícitamente para asegurar que funcionen correctamente
      const shouldShowFileSize = showFileSize === true;
      return `
        <div class="ubits-file-upload__file-item" data-file-id="${fileId}">
          <div class="ubits-file-upload__file-icon">
            <i class="far fa-file"></i>
          </div>
          <div class="ubits-file-upload__file-info">
            <div class="ubits-file-upload__file-name">${file.name}</div>
            ${shouldShowFileSize ? `<div class="ubits-file-upload__file-size">${formatFileSize(file.size)}</div>` : ''}
            ${shouldShowProgress ? `
              <div class="ubits-file-upload__progress-container">
                ${(() => {
                  try {
                    return renderProgressBar({
                      size: 'xs',
                      value: fileProgress,
                      variant: 'default',
                      indicator: `${fileProgress}%`
                    });
                  } catch (error) {
                    console.error('Error rendering progress bar:', error);
                    return `<div class="ubits-progress-bar ubits-progress-bar--xs" style="height: 4px;">
                      <div class="ubits-progress-bar__container">
                        <div class="ubits-progress-bar__indicator-wrapper" style="width: ${fileProgress}%;"></div>
                      </div>
                      <span class="ubits-progress-bar__indicator">${fileProgress}%</span>
                    </div>`;
                  }
                })()}
              </div>
            ` : ''}
          </div>
          <button class="ubits-file-upload__file-remove" data-file-id="${fileId}" aria-label="Eliminar archivo">
            <i class="far fa-times"></i>
          </button>
        </div>
      `;
    }).join('') : `
      <div class="ubits-file-upload__empty-state">
        <div class="ubits-file-upload__empty-text">No hay archivos seleccionados</div>
      </div>
    `;

    // En modo single, no mostrar título con contador ni botones Add/Remove all
    const headerHtml = isSingleMode ? '' : `
      <div class="ubits-file-upload__header">
        <h3 class="ubits-file-upload__title">Files (${filesToShow.length})</h3>
        <div class="ubits-file-upload__header-actions">
            ${renderButton({
              variant: 'secondary',
              size: 'sm',
              text: 'Agregar archivos',
              icon: 'arrow-up-from-bracket',
              className: 'ubits-file-upload__add-button',
              attributes: {
                'aria-label': 'Agregar archivos'
              }
            })}
            ${filesToShow.length > 0 ? renderButton({
              variant: 'error',
              size: 'sm',
              text: 'Eliminar todos',
              icon: 'trash',
              className: 'ubits-file-upload__remove-all-button',
              attributes: {
                'aria-label': 'Eliminar todos'
              }
            }) : ''}
        </div>
      </div>
    `;

    return `
      <div class="ubits-file-upload ubits-file-upload--files-list ${isSingleMode ? 'ubits-file-upload--single-mode' : ''} ${className}" data-ubits-id="🧩-ux-file-upload">
        ${headerHtml}
        <div class="ubits-file-upload__files-list">
          ${filesListHtml}
        </div>
      </div>
    `.trim();
  }

  // Vista de drop zone (default)
  const classes = [
    'ubits-file-upload',
    `ubits-file-upload--${actualState}`,
    className
  ].filter(Boolean).join(' ');

  // Determinar estilos del borde según el estado
  let borderColor = 'var(--modifiers-normal-color-light-border-1)';
  let backgroundColor = 'var(--modifiers-normal-color-light-bg-1)';

  if (actualState === 'dragging') {
    borderColor = 'var(--modifiers-normal-color-light-accent-brand)';
  } else if (actualState === 'error') {
    borderColor = 'var(--modifiers-normal-color-light-feedback-accent-error)';
  } else if (actualState === 'disabled') {
    backgroundColor = 'var(--modifiers-normal-color-light-bg-disabled)';
    borderColor = 'var(--modifiers-normal-color-light-border-disabled)';
  }

  // Icono circular con icono de archivo (opcional)
  const iconHtml = showIcon ? `
    <div class="ubits-file-upload__drop-icon">
      <i class="far fa-file"></i>
    </div>
  ` : '';

  // Botón de selección usando componente Button UBITS
  const isDisabled = actualState === 'disabled';
  const selectButtonHtml = renderButton({
    variant: 'secondary',
    size: 'sm',
    text: selectButtonText,
    icon: 'arrow-up-from-bracket',
    disabled: isDisabled,
    className: 'ubits-file-upload__select-button',
    attributes: isDisabled ? {
      'aria-disabled': 'true'
    } : {}
  });

  return `
    <div class="${classes}" 
         style="background-color: ${backgroundColor}; border-color: ${borderColor};"
         tabindex="${actualState === 'disabled' ? '-1' : '0'}"
         role="button"
         aria-disabled="${actualState === 'disabled' ? 'true' : 'false'}"
         data-ubits-id="🧩-ux-file-upload">
      <div class="ubits-file-upload__drop-zone">
        ${iconHtml}
        <div class="ubits-file-upload__drop-content">
          <div class="ubits-file-upload__drop-text">${dropText}</div>
          <div class="ubits-file-upload__constraints">${finalConstraintsText}</div>
        </div>
        ${selectButtonHtml}
      </div>
    </div>
  `.trim();
}

/**
 * Crea un elemento File Upload programáticamente
 */
export function createFileUpload(options: FileUploadOptions = {}): {
  element: HTMLElement;
  update: (newOptions: Partial<FileUploadOptions>) => void;
  destroy: () => void;
} {
  console.log('[FileUpload] createFileUpload called with options:', {
    state: options.state,
    files: options.files,
    filesLength: options.files?.length || 0,
    containerId: options.containerId,
    hasContainer: !!options.container
  });
  
  const {
    containerId,
    onClick,
    onAddFiles,
    onRemoveAll,
    onReupload,
    onRemove,
    onDragOver,
    onDrop,
    ...restOptions
  } = options;
  
  // Preservar callbacks para que estén disponibles en update
  const callbacks = {
    onClick,
    onAddFiles,
    onRemoveAll,
    onReupload,
    onRemove,
    onDragOver,
    onDrop
  };
  
  console.log('[FileUpload] restOptions after destructuring:', {
    state: restOptions.state,
    files: restOptions.files,
    filesLength: restOptions.files?.length || 0
  });

  /**
   * Función helper para agregar todos los event listeners
   */
  const attachEventListeners = (element: HTMLElement, opts: FileUploadOptions) => {
    // Limpiar listeners previos si existen (aunque no es necesario si reemplazamos el elemento)
    console.log('[FileUpload] Attaching event listeners to:', element);
    
    // Click handler en el área principal
    if (opts.onClick && opts.state !== 'disabled' && opts.state !== 'files-list') {
      element.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        // No ejecutar si se hizo clic en los botones de acción
        if (!target.closest('.ubits-file-upload__actions') && 
            !target.closest('.ubits-file-upload__select-button') &&
            !target.closest('.ubits-file-upload__add-button') &&
            !target.closest('.ubits-file-upload__remove-all-button') &&
            !target.closest('.ubits-file-upload__file-remove')) {
          opts.onClick?.();
        }
      });
    }

    // Drag & drop handlers
    if (opts.state !== 'disabled' && opts.state !== 'files-list') {
      element.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (opts.onDragOver) {
          opts.onDragOver(e as DragEvent);
        } else {
          element.classList.add('ubits-file-upload--dragging');
        }
      });

      element.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('ubits-file-upload--dragging');
      });

      element.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('ubits-file-upload--dragging');
        if (opts.onDrop) {
          opts.onDrop(e as DragEvent);
        }
      });
    }

    // Botón de re-subir (legacy)
    const reuploadButton = element.querySelector('.ubits-file-upload__action--reupload');
    if (reuploadButton && opts.onReupload) {
      reuploadButton.addEventListener('click', (e) => {
        e.stopPropagation();
        opts.onReupload?.();
      });
    }

    // Botón de eliminar (legacy)
    const removeButton = element.querySelector('.ubits-file-upload__action--remove');
    if (removeButton && opts.onRemove) {
      removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        opts.onRemove?.();
      });
    }

    // Botón de agregar archivos (nuevo diseño)
    const addFilesButton = element.querySelector('.ubits-file-upload__add-button');
    if (addFilesButton && opts.onAddFiles) {
      addFilesButton.addEventListener('click', (e) => {
        e.stopPropagation();
        opts.onAddFiles?.();
      });
    } else if (addFilesButton && opts.onClick) {
      // Fallback a onClick si no hay onAddFiles
      addFilesButton.addEventListener('click', (e) => {
        e.stopPropagation();
        opts.onClick?.();
      });
    }

    // Botón de eliminar todos (nuevo diseño)
    const removeAllButton = element.querySelector('.ubits-file-upload__remove-all-button');
    console.log('[FileUpload] Remove all button found:', !!removeAllButton, 'onRemoveAll callback:', !!opts.onRemoveAll);
    if (removeAllButton) {
      removeAllButton.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('[FileUpload] Remove all button clicked');
        if (opts.onRemoveAll) {
          console.log('[FileUpload] Calling onRemoveAll callback');
          opts.onRemoveAll();
        } else {
          console.warn('[FileUpload] onRemoveAll callback not provided');
        }
      });
    }

    // Botones de eliminar archivos individuales (nuevo diseño)
    const fileRemoveButtons = element.querySelectorAll('.ubits-file-upload__file-remove');
    console.log('[FileUpload] Found file remove buttons:', fileRemoveButtons.length);
    fileRemoveButtons.forEach((button, index) => {
      const fileId = button.getAttribute('data-file-id');
      console.log(`[FileUpload] Attaching remove listener to button ${index}, fileId: ${fileId}`);
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('[FileUpload] File remove button clicked, fileId:', fileId);
        if (opts.onRemove) {
          console.log('[FileUpload] Calling onRemove callback with fileId:', fileId);
          opts.onRemove(fileId);
        } else {
          console.warn('[FileUpload] onRemove callback not provided');
        }
      });
    });

    // Botón de selección en drop zone
    const selectButton = element.querySelector('.ubits-file-upload__select-button');
    if (selectButton && opts.onClick) {
      selectButton.addEventListener('click', (e) => {
        e.stopPropagation();
        opts.onClick?.();
      });
    }
  };

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderFileUpload(restOptions);
  let fileUploadElement = wrapper.firstElementChild as HTMLElement;

  if (!fileUploadElement) {
    throw new Error('No se pudo crear el file upload');
  }

  // Agregar data-ubits-id si no está presente
  if (!fileUploadElement.hasAttribute('data-ubits-id')) {
    fileUploadElement.setAttribute('data-ubits-id', '🧩-ux-file-upload');
  }

  console.log('[FileUpload] Creating file upload element:', fileUploadElement);

  // Determinar contenedor - priorizar container directo, luego containerId, luego document.body
  let container: HTMLElement;
  if (options.container) {
    container = options.container;
  } else if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  // Verificar si ya existe un file upload en el contenedor
  const existingUpload = container.querySelector('.ubits-file-upload');
  if (existingUpload) {
    console.warn('[FileUpload] Warning: Found existing file upload in container, removing it');
    existingUpload.remove();
  }

  container.appendChild(fileUploadElement);

  // Agregar todos los event listeners usando la función helper
  attachEventListeners(fileUploadElement, options);

  /**
   * Actualiza el file upload con nuevas opciones
   */
  const update = (newOptions: Partial<FileUploadOptions>) => {
    console.log('[FileUpload] Updating with options:', newOptions);
    
    // Extraer callbacks de newOptions si existen (para permitir actualizarlos)
    const {
      onClick: newOnClick,
      onAddFiles: newOnAddFiles,
      onRemoveAll: newOnRemoveAll,
      onReupload: newOnReupload,
      onRemove: newOnRemove,
      onDragOver: newOnDragOver,
      onDrop: newOnDrop,
      ...restNewOptions
    } = newOptions;
    
    // Actualizar callbacks si se proporcionan nuevos
    if (newOnClick !== undefined) callbacks.onClick = newOnClick;
    if (newOnAddFiles !== undefined) callbacks.onAddFiles = newOnAddFiles;
    if (newOnRemoveAll !== undefined) callbacks.onRemoveAll = newOnRemoveAll;
    if (newOnReupload !== undefined) callbacks.onReupload = newOnReupload;
    if (newOnRemove !== undefined) callbacks.onRemove = newOnRemove;
    if (newOnDragOver !== undefined) callbacks.onDragOver = newOnDragOver;
    if (newOnDrop !== undefined) callbacks.onDrop = newOnDrop;
    
    // Combinar opciones con callbacks actualizados
    const updatedOptions = { 
      ...restOptions, 
      ...restNewOptions,
      ...callbacks
    };
    
    const newHtml = renderFileUpload(updatedOptions);
    const newWrapper = document.createElement('div');
    newWrapper.innerHTML = newHtml;
    const newElement = newWrapper.firstElementChild as HTMLElement;
    
    if (newElement && fileUploadElement.parentNode) {
      // Guardar referencia al parent antes de reemplazar
      const parentNode = fileUploadElement.parentNode;
      
      // Reemplazar elemento
      parentNode.replaceChild(newElement, fileUploadElement);
      
      // ⚠️ CRÍTICO: Actualizar la referencia del elemento
      // Esto es necesario para que destroy() y otras funciones funcionen
      fileUploadElement = newElement;
      
      // Agregar data-ubits-id si no está presente
      if (!fileUploadElement.hasAttribute('data-ubits-id')) {
        fileUploadElement.setAttribute('data-ubits-id', '🧩-ux-file-upload');
      }
      
      // Actualizar restOptions para futuras actualizaciones
      Object.assign(restOptions, restNewOptions);
      
      // Recrear todos los event listeners en el nuevo elemento con callbacks actualizados
      attachEventListeners(newElement, updatedOptions);
      
      console.log('[FileUpload] Update completed. New element:', newElement);
    } else {
      console.error('[FileUpload] Failed to update - element or parent not found');
    }
  };

  /**
   * Destruye el file upload removiéndolo del DOM
   */
  const destroy = () => {
    console.log('[FileUpload] Destroying file upload:', fileUploadElement);
    if (fileUploadElement && fileUploadElement.parentNode) {
      fileUploadElement.parentNode.removeChild(fileUploadElement);
    }
  };

  // Retornar objeto con getter para que siempre devuelva la referencia actualizada
  const returnObject = {
    get element() {
      return fileUploadElement;
    },
    update,
    destroy
  };

  return returnObject;
}

