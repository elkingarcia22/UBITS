import type { Meta, StoryObj } from '@storybook/html';
import { createFileUpload, renderFileUpload } from '../../components/file-upload/src/FileUploadProvider';
import type { FileUploadOptions } from '../../components/file-upload/src/types/FileUploadOptions';
import '../../components/file-upload/src/styles/file-upload.css';
import '../../components/button/src/styles/button.css';
import '../../components/progress/src/styles/progress.css';

const meta: Meta<FileUploadOptions> = {
  title: 'Formularios/File Upload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente File Upload personalizado UBITS. Diseño moderno con dos vistas: Drop Zone (área de arrastrar y soltar con icono circular) y Files List (lista de archivos con progreso). Usa componentes UBITS (Button) y tokens UBITS exclusivamente.'
}
},
    layout: 'fullscreen'
},
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'dragging', 'error', 'disabled', 'files-list'],
      description: 'Estado del componente.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia'
}
},
    files: {
      control: { type: 'object' },
      description: 'Array de archivos a mostrar (para vista files-list).',
      table: {
        type: { summary: 'FileInfo[]' },
        defaultValue: { summary: '[]' },
        category: 'Contenido'
}
},
    maxFiles: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Número máximo de archivos permitidos.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
        category: 'Comportamiento'
}
},
    maxSize: {
      control: { type: 'number', min: 1024, step: 1024 },
      description: 'Tamaño máximo por archivo en bytes.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5242880 (5MB)' },
        category: 'Comportamiento'
}
},
    dropText: {
      control: { type: 'text' },
      description: 'Texto para el área de drop.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Arrastra tus archivos aquí' },
        category: 'Contenido'
}
},
    selectButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón de selección.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Seleccionar archivos' },
        category: 'Contenido'
}
},
    showIcon: {
      control: { type: 'boolean' },
      description: 'Si se muestra el icono en el drop zone.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Apariencia'
}
},
    showFileSize: {
      control: { type: 'boolean' },
      description: 'Si se muestra el tamaño del archivo.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento'
}
},
    showProgress: {
      control: { type: 'boolean' },
      description: 'Si se muestra la barra de progreso.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento'
}
}
}
};

export default meta;
type Story = StoryObj<FileUploadOptions>;

export const Default: Story = {
  args: {
    state: 'default',
    files: [],
    maxFiles: 6,
    maxSize: 5242880, // 5MB
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos',
    showIcon: false,
    showFileSize: true,
    showProgress: true
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = '
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md);
    `;

    const title = document.createElement('h2');
    title.textContent = 'File Upload';
    title.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: var(--modifiers-normal-heading-h2-fontsize);
      font-weight: var(--weight-semibold, 600);
    `;

    const description = document.createElement('p');
    description.textContent = 'Componente File Upload con diseño moderno. Soporta dos vistas: Drop Zone (área de arrastrar y soltar) y Files List (lista de archivos con progreso). Usa componentes UBITS y tokens UBITS exclusivamente.';
    description.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-md-regular-fontsize);
      line-height: var(--modifiers-normal-body-md-regular-lineheight);
    `;

    const fileUploadContainer = document.createElement('div');
    fileUploadContainer.id = `file-upload-container-${Date.now()}`;

    const createFileUploadContent = () => {
      fileUploadContainer.innerHTML = '';
      
      // Determinar si mostrar vista de lista o drop zone
      let filesToUse = args.files || [];
      
      // Si el estado es 'files-list' pero no hay archivos, agregar archivos de ejemplo para probar los controles
      if (args.state === 'files-list' && (!filesToUse || filesToUse.length === 0)) {
        filesToUse = [
          {
            id: 'file-1',
            name: 'documento-ejemplo.pdf',
            size: 2048576, // 2MB
            progress: 45,
            status: 'uploading' as const
},
          {
            id: 'file-2',
            name: 'imagen-ejemplo.jpg',
            size: 1024000, // 1MB
            progress: 100,
            status: 'completed' as const
},
          {
            id: 'file-3',
            name: 'archivo-ejemplo.docx',
            size: 512000, // 512KB
            progress: 0,
            status: 'pending' as const
}
];
      }
      
      const hasFiles = filesToUse && filesToUse.length > 0;
      const actualState = hasFiles ? 'files-list' : (args.state || 'default');
      
      const showFileSizeValue = args.showFileSize !== undefined ? args.showFileSize : true;
      const showProgressValue = args.showProgress !== undefined ? args.showProgress : true;
      
      const options: FileUploadOptions = {
        state: actualState,
        files: filesToUse,
        maxFiles: args.maxFiles || 6,
        maxSize: args.maxSize || 5242880,
        dropText: args.dropText || 'Arrastra tus archivos aquí',
        selectButtonText: args.selectButtonText || 'Seleccionar archivos',
        showIcon: args.showIcon !== undefined ? args.showIcon : false,
        showFileSize: showFileSizeValue,
        showProgress: showProgressValue
      };
      
      try {
        const html = renderFileUpload(options);
        fileUploadContainer.innerHTML = html;
      } catch (error) {
        console.error('[FileUpload Storybook] Error rendering file upload:', error);
      }
    };

    createFileUploadContent();

    // Usar un objeto para comparar cambios de forma más precisa
    let lastArgsSnapshot: any = null;
    const checkInterval = setInterval(() => {
      // Crear snapshot actual de los args relevantes
      const currentArgsSnapshot = {
        showFileSize: args.showFileSize,
        showProgress: args.showProgress,
        showIcon: args.showIcon,
        state: args.state,
        files: args.files,
        maxFiles: args.maxFiles,
        maxSize: args.maxSize
};
      
      // Comparar con el snapshot anterior
      const argsChanged = !lastArgsSnapshot || 
        JSON.stringify(currentArgsSnapshot) !== JSON.stringify(lastArgsSnapshot);
      
      if (argsChanged) {
        lastArgsSnapshot = JSON.parse(JSON.stringify(currentArgsSnapshot)); // Deep copy
        createFileUploadContent();
      }
    }, 100);

    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(fileUploadContainer);
    container.appendChild(wrapper);

    return container;
  }
};

// Helper para renderizar File Upload de manera consistente
function renderFileUploadStory(options: FileUploadOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
    background: var(--modifiers-normal-color-light-bg-1);
    border-radius: var(--ubits-border-radius-md);
  `;

  try {
    const html = renderFileUpload(options);
    container.innerHTML = html;
  } catch (error) {
    console.error('[FileUpload Storybook] Error rendering file upload:', error);
    container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-accent-error);">Error: ${error}</p>`;
  }

  return container;
}

/**
 * StateDefault
 * Estado default
 */
export const StateDefault: Story = {
  name: 'State - Default',
  args: {
    state: 'default',
    files: [],
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload en estado default (drop zone vacío).',
      },
    },
  },
};

/**
 * StateDragging
 * Estado dragging
 */
export const StateDragging: Story = {
  name: 'State - Dragging',
  args: {
    state: 'dragging',
    files: [],
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload en estado dragging (cuando se arrastra un archivo sobre el área).',
      },
    },
  },
};

/**
 * StateError
 * Estado error
 */
export const StateError: Story = {
  name: 'State - Error',
  args: {
    state: 'error',
    files: [],
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload en estado error.',
      },
    },
  },
};

/**
 * StateDisabled
 * Estado disabled
 */
export const StateDisabled: Story = {
  name: 'State - Disabled',
  args: {
    state: 'disabled',
    files: [],
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload en estado disabled.',
      },
    },
  },
};

/**
 * StateFilesList
 * Estado files-list (con archivos)
 */
export const StateFilesList: Story = {
  name: 'State - Files List',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-ejemplo.pdf',
        size: 2048576, // 2MB
        progress: 100,
        status: 'completed'
      },
      {
        id: 'file-2',
        name: 'imagen-ejemplo.jpg',
        size: 1024000, // 1MB
        progress: 45,
        status: 'uploading'
      },
      {
        id: 'file-3',
        name: 'archivo-ejemplo.docx',
        size: 512000, // 512KB
        progress: 0,
        status: 'pending'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload en estado files-list (vista de lista de archivos).',
      },
    },
  },
};

/**
 * WithFiles
 * Con archivos (vista files-list)
 */
export const WithFiles: Story = {
  name: 'With Files',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'file-2',
        name: 'imagen.jpg',
        size: 1024000,
        progress: 50,
        status: 'uploading'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con archivos (vista files-list).',
      },
    },
  },
};

/**
 * WithoutFiles
 * Sin archivos (vista drop zone)
 */
export const WithoutFiles: Story = {
  name: 'Without Files',
  args: {
    state: 'default',
    files: []
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload sin archivos (vista drop zone).',
      },
    },
  },
};

/**
 * SingleFile
 * Un solo archivo
 */
export const SingleFile: Story = {
  name: 'Single File',
  args: {
    state: 'files-list',
    maxFiles: 1,
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con un solo archivo (modo single).',
      },
    },
  },
};

/**
 * MultipleFiles
 * Múltiples archivos
 */
export const MultipleFiles: Story = {
  name: 'Multiple Files',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-1.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'file-2',
        name: 'documento-2.pdf',
        size: 1536000,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'file-3',
        name: 'imagen.jpg',
        size: 1024000,
        progress: 75,
        status: 'uploading'
      },
      {
        id: 'file-4',
        name: 'archivo.docx',
        size: 512000,
        progress: 0,
        status: 'pending'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con múltiples archivos.',
      },
    },
  },
};

/**
 * FileStatusPending
 * Archivo con estado pending
 */
export const FileStatusPending: Story = {
  name: 'File Status - Pending',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-pendiente.pdf',
        size: 2048576,
        progress: 0,
        status: 'pending'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con archivo en estado pending.',
      },
    },
  },
};

/**
 * FileStatusUploading
 * Archivo con estado uploading
 */
export const FileStatusUploading: Story = {
  name: 'File Status - Uploading',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-subiendo.pdf',
        size: 2048576,
        progress: 45,
        status: 'uploading'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con archivo en estado uploading (con barra de progreso).',
      },
    },
  },
};

/**
 * FileStatusCompleted
 * Archivo con estado completed
 */
export const FileStatusCompleted: Story = {
  name: 'File Status - Completed',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-completado.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con archivo en estado completed.',
      },
    },
  },
};

/**
 * FileStatusError
 * Archivo con estado error
 */
export const FileStatusError: Story = {
  name: 'File Status - Error',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-error.pdf',
        size: 2048576,
        progress: 0,
        status: 'error'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con archivo en estado error.',
      },
    },
  },
};

/**
 * FileWithProgress
 * Archivo con progreso
 */
export const FileWithProgress: Story = {
  name: 'File - With Progress',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-con-progreso.pdf',
        size: 2048576,
        progress: 65,
        status: 'uploading'
      }
    ],
    showProgress: true
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con archivo que muestra barra de progreso.',
      },
    },
  },
};

/**
 * ShowFileSize
 * Mostrar tamaño del archivo
 */
export const ShowFileSize: Story = {
  name: 'Show File Size',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ],
    showFileSize: true
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload mostrando el tamaño del archivo.',
      },
    },
  },
};

/**
 * HideFileSize
 * Ocultar tamaño del archivo
 */
export const HideFileSize: Story = {
  name: 'Hide File Size',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ],
    showFileSize: false
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload ocultando el tamaño del archivo.',
      },
    },
  },
};

/**
 * ShowProgress
 * Mostrar barra de progreso
 */
export const ShowProgress: Story = {
  name: 'Show Progress',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 50,
        status: 'uploading'
      }
    ],
    showProgress: true
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload mostrando la barra de progreso.',
      },
    },
  },
};

/**
 * HideProgress
 * Ocultar barra de progreso
 */
export const HideProgress: Story = {
  name: 'Hide Progress',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 50,
        status: 'uploading'
      }
    ],
    showProgress: false
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload ocultando la barra de progreso.',
      },
    },
  },
};

/**
 * ShowActions
 * Mostrar botones de acción
 */
export const ShowActions: Story = {
  name: 'Show Actions',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ],
    showActions: true
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload mostrando los botones de acción (Agregar archivos, Eliminar todos).',
      },
    },
  },
};

/**
 * HideActions
 * Ocultar botones de acción
 */
export const HideActions: Story = {
  name: 'Hide Actions',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ],
    showActions: false
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload ocultando los botones de acción.',
      },
    },
  },
};

/**
 * ShowIcon
 * Mostrar icono en drop zone
 */
export const ShowIcon: Story = {
  name: 'Show Icon',
  args: {
    state: 'default',
    files: [],
    showIcon: true,
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload mostrando el icono en el drop zone.',
      },
    },
  },
};

/**
 * HideIcon
 * Ocultar icono en drop zone
 */
export const HideIcon: Story = {
  name: 'Hide Icon',
  args: {
    state: 'default',
    files: [],
    showIcon: false,
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload ocultando el icono en el drop zone.',
      },
    },
  },
};

/**
 * CustomDropText
 * Texto personalizado para drop zone
 */
export const CustomDropText: Story = {
  name: 'Custom Drop Text',
  args: {
    state: 'default',
    files: [],
    dropText: 'Arrastra y suelta tus archivos aquí o haz clic para seleccionar',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con texto personalizado para el drop zone.',
      },
    },
  },
};

/**
 * CustomConstraintsText
 * Texto personalizado de restricciones
 */
export const CustomConstraintsText: Story = {
  name: 'Custom Constraints Text',
  args: {
    state: 'default',
    files: [],
    constraintsText: 'Máximo 10 archivos · Hasta 10MB por archivo',
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con texto personalizado de restricciones.',
      },
    },
  },
};

/**
 * CustomSelectButtonText
 * Texto personalizado del botón de selección
 */
export const CustomSelectButtonText: Story = {
  name: 'Custom Select Button Text',
  args: {
    state: 'default',
    files: [],
    selectButtonText: 'Elegir archivos',
    dropText: 'Arrastra tus archivos aquí'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con texto personalizado del botón de selección.',
      },
    },
  },
};

/**
 * MaxFiles1
 * Máximo 1 archivo (modo single)
 */
export const MaxFiles1: Story = {
  name: 'Max Files - 1',
  args: {
    state: 'files-list',
    maxFiles: 1,
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con máximo 1 archivo (modo single).',
      },
    },
  },
};

/**
 * MaxFilesMultiple
 * Máximo múltiples archivos
 */
export const MaxFilesMultiple: Story = {
  name: 'Max Files - Multiple',
  args: {
    state: 'files-list',
    maxFiles: 10,
    files: [
      {
        id: 'file-1',
        name: 'documento-1.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'file-2',
        name: 'documento-2.pdf',
        size: 1536000,
        progress: 100,
        status: 'completed'
      }
    ]
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con máximo múltiples archivos (10).',
      },
    },
  },
};

/**
 * CustomMaxSize
 * Tamaño máximo personalizado
 */
export const CustomMaxSize: Story = {
  name: 'Custom Max Size',
  args: {
    state: 'default',
    files: [],
    maxSize: 10485760, // 10MB
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con tamaño máximo personalizado (10MB).',
      },
    },
  },
};

/**
 * OnClickCallback
 * Callback cuando se hace clic
 */
export const OnClickCallback: Story = {
  name: 'On Click Callback',
  args: {
    state: 'default',
    files: [],
    onClick: () => {
      alert('Área de upload clickeada');
    }
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con callback onClick cuando se hace clic en el área de upload.',
      },
    },
  },
};

/**
 * OnAddFilesCallback
 * Callback cuando se agregan archivos
 */
export const OnAddFilesCallback: Story = {
  name: 'On Add Files Callback',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ],
    onAddFiles: () => {
      alert('Agregar archivos clickeado');
    }
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con callback onAddFiles cuando se hace clic en el botón de agregar archivos.',
      },
    },
  },
};

/**
 * OnRemoveAllCallback
 * Callback cuando se eliminan todos
 */
export const OnRemoveAllCallback: Story = {
  name: 'On Remove All Callback',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-1.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'file-2',
        name: 'documento-2.pdf',
        size: 1536000,
        progress: 100,
        status: 'completed'
      }
    ],
    onRemoveAll: () => {
      alert('Eliminar todos clickeado');
    }
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con callback onRemoveAll cuando se hace clic en el botón de eliminar todos.',
      },
    },
  },
};

/**
 * OnRemoveCallback
 * Callback cuando se elimina un archivo
 */
export const OnRemoveCallback: Story = {
  name: 'On Remove Callback',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      }
    ],
    onRemove: (fileId?: string) => {
      alert(`Eliminar archivo clickeado: ${fileId}`);
    }
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload con callback onRemove cuando se hace clic en el botón de eliminar un archivo específico.',
      },
    },
  },
};

/**
 * CompleteExample
 * Ejemplo completo
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    state: 'files-list',
    files: [
      {
        id: 'file-1',
        name: 'documento-completado.pdf',
        size: 2048576,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'file-2',
        name: 'imagen-subiendo.jpg',
        size: 1024000,
        progress: 65,
        status: 'uploading'
      },
      {
        id: 'file-3',
        name: 'archivo-pendiente.docx',
        size: 512000,
        progress: 0,
        status: 'pending'
      }
    ],
    maxFiles: 6,
    maxSize: 5242880,
    showFileSize: true,
    showProgress: true,
    showActions: true,
    showIcon: true,
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos',
    onClick: () => console.log('Click en área de upload'),
    onAddFiles: () => console.log('Agregar archivos'),
    onRemoveAll: () => console.log('Eliminar todos'),
    onRemove: (fileId) => console.log('Eliminar archivo:', fileId)
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload completo con todas las opciones habilitadas: múltiples archivos con diferentes estados, progreso, acciones, y callbacks.',
      },
    },
  },
};

/**
 * MinimalExample
 * Ejemplo mínimo
 */
export const MinimalExample: Story = {
  name: 'Minimal Example',
  args: {
    state: 'default',
    files: [],
    dropText: 'Arrastra tus archivos aquí',
    selectButtonText: 'Seleccionar archivos'
  },
  render: (args) => renderFileUploadStory(args),
  parameters: {
    docs: {
      description: {
        story: 'File Upload mínimo con solo las opciones esenciales (drop zone vacío).',
      },
    },
  },
};

