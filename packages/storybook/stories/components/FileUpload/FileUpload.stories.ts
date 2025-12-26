/**
 * FileUpload Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
  createFileUpload,
  renderFileUpload,
} from '../../../components/file-upload/src/FileUploadProvider';
import type {
  FileUploadOptions,
  FileInfo,
} from '../../../components/file-upload/src/types/FileUploadOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/file-upload/src/styles/file-upload.css';
import '../../../components/button/src/styles/button.css';
import '../../../components/progress/src/styles/progress.css';

const meta: Meta<FileUploadOptions> = {
  title: 'Formularios/File Upload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso).

\`\`\`html
// 1. Crear contenedor HTML
<div id="fileupload-implementation-container"></div>

// 2. Crear file upload
window.UBITS.FileUpload.create({
  containerId: 'fileupload-implementation-container',
  state: 'default',
  files: [],
  maxFiles: 6,
  maxSize: 5242880,
  dropText: 'Arrastra tus archivos aquí',
  selectButtonText: 'Seleccionar archivos',
  showIcon: false,
  showFileSize: true,
  showProgress: true,
  showActions: true
});
\`\`\`',
      },
    },
    layout: 'fullscreen',
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-file-upload',
      api: {
        create: 'window.UBITS.FileUpload.create',
        tag: '<ubits-file-upload>',
      },
      dependsOn: {
        required: ['🧩-ux-button'], // Botón de selección es requerido
        optional: ['🧩-ux-progress'], // Barra de progreso es opcional
      },
      internals: [], // FileUpload no tiene componentes internos privados
      slots: {}, // FileUpload no tiene slots públicos
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-border-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--ubits-border-radius-sm',
        '--ubits-spacing-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: [],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: "window.UBITS.FileUpload.create(document.getElementById('file-upload-container'), {\n  containerId: 'file-upload-container',\n  state: 'default',\n  dropText: 'Arrastra tus archivos aquí',\n  selectButtonText: 'Seleccionar archivos',\n  onFileSelect: (files) => {}\n});",
        basic: "window.UBITS.FileUpload.create(document.getElementById('file-upload-container'), {\n  containerId: 'file-upload-container',\n  state: 'default',\n  dropText: 'Arrastra tus archivos aquí',\n  selectButtonText: 'Seleccionar archivos'\n});",
        withFiles: "window.UBITS.FileUpload.create(document.getElementById('file-upload-container'), {\n  containerId: 'file-upload-container',\n  state: 'files-list',\n  files: [{ name: 'documento.pdf', size: 1024000 }],\n  showProgress: true\n});",
        withMaxFiles: "window.UBITS.FileUpload.create(document.getElementById('file-upload-container'), {\n  containerId: 'file-upload-container',\n  state: 'default',\n  maxFiles: 5,\n  maxSize: 5242880\n});",
      },
      variants: {
        state: ['default', 'files-list'],
        showIcon: [true, false],
        showFileSize: [true, false],
        showProgress: [true, false],
        showActions: [true, false],
      },
      events: {
        onFileSelect: {
          type: 'Event',
          description: 'Emitted when files are selected',
        },
        onFileRemove: {
          type: 'Event',
          description: 'Emitted when a file is removed',
        },
        onUpload: {
          type: 'Event',
          description: 'Emitted when upload starts',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'formularios-file-upload--implementation',
        storiesByExample: {
          canonical: 'formularios-file-upload--implementation',
          basic: 'formularios-file-upload--default',
          withFiles: 'formularios-file-upload--files-list',
          withMaxFiles: 'formularios-file-upload--with-max-files',
        },
      },
      intents: {
        'fileupload.upload': 'canonical',
        'fileupload.form': 'canonical',
        'fileupload.basic': 'canonical',
        'fileupload.with-files': 'withFiles',
        'fileupload.with-limits': 'withMaxFiles',
      },
    }),
  },
  args: {
    state: 'default',
    files: [],
    maxFiles: 6,
    maxSize: 5242880,
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos',
    showIcon: false,
    showFileSize: true,
    showProgress: true,
    showActions: true,
    className: '',
  },
  // Decorator para agregar archivos automáticamente cuando el estado es files-list
  decorators: [
    (Story, context) => {
      // Si el estado es files-list y no hay archivos, agregar archivos de ejemplo
      if (context.args.state === 'files-list' && (!context.args.files || context.args.files.length === 0)) {
        context.args.files = [
          {
            id: 'file-1',
            name: 'documento-ejemplo.pdf',
            size: 2048000, // 1.95 MB
            progress: 45,
            status: 'uploading'
          },
          {
            id: 'file-2',
            name: 'imagen-ejemplo.jpg',
            size: 1024000, // 1000 KB
            progress: 0,
            status: 'completed'
          },
          {
            id: 'file-3',
            name: 'archivo-ejemplo.docx',
            size: 512000, // 500 KB
            progress: 0,
            status: 'completed'
          }
        ];
      }
      return Story();
    }
  ],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'dragging', 'error', 'disabled', 'files-list'],
      description: 'Estado del componente.',
      table: {
        type: { summary: 'default | dragging | error | disabled | files-list' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia',
      },
    },
    files: {
      control: { type: 'object' },
      description: 'Array de archivos a mostrar (para vista files-list).',
      table: {
        type: { summary: 'FileInfo[]' },
        category: 'Contenido',
      },
    },
    maxFiles: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Número máximo de archivos permitidos.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
        category: 'Comportamiento',
      },
    },
    maxSize: {
      control: { type: 'number', min: 1024, step: 1024 },
      description: 'Tamaño máximo por archivo en bytes.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5242880 (5MB)' },
        category: 'Comportamiento',
      },
    },
    dropText: {
      control: { type: 'text' },
      description: 'Texto para el área de drop.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Arrastra tus archivos aquí' },
        category: 'Contenido',
      },
    },
    selectButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón de selección.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Seleccionar archivos' },
        category: 'Contenido',
      },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Si se muestra el icono en el drop zone.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Apariencia',
      },
    },
    showFileSize: {
      control: { type: 'boolean' },
      description: 'Si se muestra el tamaño del archivo.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    showProgress: {
      control: { type: 'boolean' },
      description: 'Si se muestra la barra de progreso.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Si se muestran los botones de acción (re-subir y eliminar).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    onFileSelect: {
      action: 'file-selected',
      description: 'Callback cuando se seleccionan archivos',
      table: {
        disable: true,
      },
    },
    onFileRemove: {
      action: 'file-removed',
      description: 'Callback cuando se elimina un archivo',
      table: {
        disable: true,
      },
    },
    onRemove: {
      action: 'file-removed',
      description: 'Callback cuando se elimina un archivo individual',
      table: {
        disable: true,
      },
    },
    onRemoveAll: {
      action: 'all-files-removed',
      description: 'Callback cuando se eliminan todos los archivos',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        category: 'Avanzado',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    state: 'default',
    files: [],
    maxFiles: 6,
    maxSize: 5242880,
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos',
    showIcon: false,
    showFileSize: true,
    showProgress: true,
    showActions: true,
    className: '',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="fileupload-implementation-container"></div>

// 2. Crear file upload
window.UBITS.FileUpload.create({
  containerId: 'fileupload-implementation-container',
  state: 'default',
  files: [],
  maxFiles: 6,
  maxSize: 5242880,
  dropText: 'Arrastra tus archivos aquí',
  selectButtonText: 'Seleccionar archivos',
  showIcon: false,
  showFileSize: true,
  showProgress: true,
  showActions: true
});`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-file-upload');
    container.setAttribute('data-ubits-component', 'FileUpload');
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';

    // Crear contenedor para el file upload
    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = 'fileupload-implementation-container';
    fileUploadContainer.style.width = '100%';
    container.appendChild(fileUploadContainer);

    // Limpiar cualquier instancia previa
    const existing = fileUploadContainer.querySelector('.ubits-file-upload');
    if (existing) {
      existing.remove();
    }

    // Mantener referencia a los archivos para poder actualizarlos
    let currentFiles = args.files && args.files.length > 0 ? [...args.files] : [];
    
    // Si el estado es 'files-list' y no hay archivos, agregar archivos de ejemplo
    if (args.state === 'files-list' && currentFiles.length === 0) {
      currentFiles = [
        {
          id: 'file-1',
          name: 'documento-ejemplo.pdf',
          size: 2048000,
          progress: 45,
          status: 'uploading' as const
        },
        {
          id: 'file-2',
          name: 'imagen-ejemplo.jpg',
          size: 1024000,
          progress: 0,
          status: 'completed' as const
        },
        {
          id: 'file-3',
          name: 'archivo-ejemplo.docx',
          size: 512000,
          progress: 0,
          status: 'completed' as const
        }
      ];
    }

    console.log('[Story] Implementation render - args:', {
      state: args.state,
      files: currentFiles,
      filesLength: currentFiles.length
    });

    // Crear file upload
    const fileUploadInstance = createFileUpload({
      ...args,
      files: currentFiles,
      container: fileUploadContainer,
      // Callback para eliminar un archivo individual
      onRemove: (fileId) => {
        console.log('[Story] Implementation - Removing file:', fileId);
        currentFiles = currentFiles.filter(file => file.id !== fileId);
        console.log('[Story] Implementation - Remaining files:', currentFiles);
        fileUploadInstance.update({
          files: currentFiles,
          state: currentFiles.length === 0 ? 'default' : 'files-list'
        });
      },
      // Callback para eliminar todos los archivos
      onRemoveAll: () => {
        console.log('[Story] Implementation - Removing all files');
        currentFiles = [];
        fileUploadInstance.update({
          files: [],
          state: 'default'
        });
      }
    });

    return container;
  },
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
  args: {
    state: 'default',
    files: [],
    maxFiles: 6,
    maxSize: 5242880,
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos',
    showIcon: false,
    showFileSize: true,
    showProgress: true,
    showActions: true,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';

    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = 'fileupload-container';
    fileUploadContainer.style.width = '100%';
    container.appendChild(fileUploadContainer);

    // Limpiar cualquier instancia previa
    const existing = fileUploadContainer.querySelector('.ubits-file-upload');
    if (existing) {
      existing.remove();
    }

    // Si el estado es 'files-list' y no hay archivos, agregar archivos de ejemplo
    const finalArgs = { ...args };
    console.log('[Story] Default render - args:', {
      state: args.state,
      files: args.files,
      filesLength: args.files?.length || 0
    });
    
    // Mantener referencia a los archivos para poder actualizarlos
    let currentFiles = args.files && args.files.length > 0 ? [...args.files] : [];
    
    if (args.state === 'files-list' && currentFiles.length === 0) {
      console.log('[Story] Adding example files for files-list state');
      currentFiles = [
        {
          id: 'file-1',
          name: 'documento-ejemplo.pdf',
          size: 2048000, // 1.95 MB
          progress: 45,
          status: 'uploading' as const
        },
        {
          id: 'file-2',
          name: 'imagen-ejemplo.jpg',
          size: 1024000, // 1000 KB
          progress: 0,
          status: 'completed' as const
        },
        {
          id: 'file-3',
          name: 'archivo-ejemplo.docx',
          size: 512000, // 500 KB
          progress: 0,
          status: 'completed' as const
        }
      ];
      finalArgs.files = currentFiles;
      console.log('[Story] Final args with files:', finalArgs);
    }

    const fileUploadInstance = createFileUpload({
      ...finalArgs,
      container: fileUploadContainer,
      // Callback para eliminar un archivo individual
      onRemove: (fileId) => {
        console.log('[Story] Removing file:', fileId);
        currentFiles = currentFiles.filter(file => file.id !== fileId);
        fileUploadInstance.update({
          files: currentFiles,
          state: currentFiles.length === 0 ? 'default' : 'files-list'
        });
        args.onFileRemove?.(fileId);
      },
      // Callback para eliminar todos los archivos
      onRemoveAll: () => {
        console.log('[Story] Removing all files');
        currentFiles = [];
        fileUploadInstance.update({
          files: [],
          state: 'default'
        });
        args.onRemoveAll?.();
      }
    });

    return container;
  },
};

// Story específica para files-list con archivos de ejemplo
export const FilesList: Story = {
  name: 'Files List',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-ejemplo.pdf',
        size: 2048000, // 1.95 MB
        progress: 45,
        status: 'uploading' as const
      },
      {
        id: 'file-2',
        name: 'imagen-ejemplo.jpg',
        size: 1024000, // 1000 KB
        progress: 0,
        status: 'completed' as const
      },
      {
        id: 'file-3',
        name: 'archivo-ejemplo.docx',
        size: 512000, // 500 KB
        progress: 0,
        status: 'completed' as const
      }
    ],
    maxFiles: 6,
    maxSize: 5242880,
    showFileSize: true,
    showProgress: true,
    showActions: true,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';

    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = 'fileupload-files-list-container';
    fileUploadContainer.style.width = '100%';
    container.appendChild(fileUploadContainer);

    // Limpiar cualquier instancia previa
    const existing = fileUploadContainer.querySelector('.ubits-file-upload');
    if (existing) {
      existing.remove();
    }

    // Mantener referencia a los archivos para poder actualizarlos
    let currentFiles = args.files && args.files.length > 0 ? [...args.files] : [];

    const fileUploadInstance = createFileUpload({
      ...args,
      container: fileUploadContainer,
      // Callback para eliminar un archivo individual
      onRemove: (fileId) => {
        console.log('[Story] FilesList - Removing file:', fileId);
        currentFiles = currentFiles.filter(file => file.id !== fileId);
        fileUploadInstance.update({
          files: currentFiles,
          state: currentFiles.length === 0 ? 'default' : 'files-list'
        });
      },
      // Callback para eliminar todos los archivos
      onRemoveAll: () => {
        console.log('[Story] FilesList - Removing all files');
        currentFiles = [];
        fileUploadInstance.update({
          files: [],
          state: 'default'
        });
      }
    });

    return container;
  },
};
