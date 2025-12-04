import type { Meta, StoryObj } from '@storybook/html';

// Importar estilos
import '../../components/calendar/src/styles/calendar.css';
import '../../components/button/src/styles/button.css';
import '../../components/input/src/styles/input.css';
import '../../components/list/src/styles/list.css';

// Importar funciones
import { createCalendar } from '../../components/calendar/src/index';
import type { CalendarOptions } from '../../components/calendar/src/index';

const meta: Meta<CalendarOptions> = {
  title: 'Formularios/Calendar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'transparent',
      disable: true,
    },
    docs: {
      description: {
        component: 'Componente Calendar UBITS con selección única y por rango de fechas. Usa tokens UBITS, componentes Button, Input y List para una experiencia consistente.',
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      description: 'Modo de selección: single para fecha única, range para rango de fechas',
      table: {
        defaultValue: { summary: 'single' },
        type: { summary: 'single | range' },
      },
    },
    selectedDate: {
      control: { type: 'date' },
      description: 'Fecha seleccionada (modo single) o fecha de inicio (modo range)',
      table: {
        type: { summary: 'Date | null' },
      },
    },
    endDate: {
      control: { type: 'date' },
      description: 'Fecha de fin (solo para modo range)',
      table: {
        type: { summary: 'Date | null' },
      },
    },
    minDate: {
      control: { type: 'date' },
      description: 'Fecha mínima permitida',
      table: {
        type: { summary: 'Date | null' },
      },
    },
    maxDate: {
      control: { type: 'date' },
      description: 'Fecha máxima permitida',
      table: {
        type: { summary: 'Date | null' },
      },
    },
    initialDate: {
      control: { type: 'date' },
      description: 'Fecha inicial a mostrar (por defecto: fecha actual)',
      table: {
        type: { summary: 'Date' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clase CSS adicional para el contenedor',
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: { type: 'text' },
      description: 'Estilos inline adicionales',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CalendarOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date(),
    className: '',
    style: '',
  },
  render: (args) => {
    // Helper para convertir fecha de control a Date
    const toDate = (value: any): Date | null => {
      if (!value) return null;
      if (value instanceof Date) return value;
      if (typeof value === 'string' || typeof value === 'number') {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
      }
      return null;
    };
    
    // Convertir fechas de string a Date si vienen de los controles
    const calendarOptions: CalendarOptions = {
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date(),
      className: args.className || '',
      style: args.style || '',
      onDateSelect: (date: Date) => {
        // Callback de fecha seleccionada
      },
      onRangeSelect: (startDate: Date, endDate: Date) => {
        // Callback de rango seleccionado
      },
    };
    
    // Crear el calendario usando createCalendar y devolver directamente el elemento
    let calendarInstance: ReturnType<typeof createCalendar> | null = null;
    
    try {
      calendarInstance = createCalendar(calendarOptions);
      
      
      // Devolver directamente el elemento del calendario sin contenedor
      return calendarInstance.element;
    } catch (error) {
      console.error('Error al crear calendario:', error);
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'color: var(--modifiers-normal-color-light-fg-1-high); padding: 20px; text-align: center;';
      errorDiv.textContent = `Error al cargar el calendario: ${error}`;
      return errorDiv;
    }
  },
};

// Helper para convertir fecha de control a Date
const toDate = (value: any): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
};

// Helper para renderizar Calendar de manera consistente
function renderCalendarStory(options: CalendarOptions) {
  try {
    const calendarInstance = createCalendar(options);
    return calendarInstance.element;
  } catch (error) {
    console.error('Error al crear calendario:', error);
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'color: var(--modifiers-normal-color-light-fg-1-high); padding: 20px; text-align: center;';
    errorDiv.textContent = `Error al cargar el calendario: ${error}`;
    return errorDiv;
  }
}

/**
 * ModeSingle
 * Modo single (fecha única)
 */
export const ModeSingle: Story = {
  name: 'Mode - Single',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar en modo single (selección de fecha única).',
      },
    },
  },
};

/**
 * ModeRange
 * Modo range (rango de fechas)
 */
export const ModeRange: Story = {
  name: 'Mode - Range',
  args: {
    mode: 'range',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'range',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar en modo range (selección de rango de fechas).',
      },
    },
  },
};

/**
 * WithSelectedDate
 * Con fecha seleccionada
 */
export const WithSelectedDate: Story = {
  name: 'With Selected Date',
  args: {
    mode: 'single',
    selectedDate: new Date(),
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con fecha seleccionada (hoy).',
      },
    },
  },
};

/**
 * WithoutSelectedDate
 * Sin fecha seleccionada
 */
export const WithoutSelectedDate: Story = {
  name: 'Without Selected Date',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar sin fecha seleccionada.',
      },
    },
  },
};

/**
 * WithEndDate
 * Con fecha de fin (modo range)
 */
export const WithEndDate: Story = {
  name: 'With End Date',
  args: {
    mode: 'range',
    selectedDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días después
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'range',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar en modo range con fecha de inicio y fin seleccionadas.',
      },
    },
  },
};

/**
 * WithMinDate
 * Con fecha mínima
 */
export const WithMinDate: Story = {
  name: 'With Min Date',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: new Date(),
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con fecha mínima (hoy).',
      },
    },
  },
};

/**
 * WithMaxDate
 * Con fecha máxima
 */
export const WithMaxDate: Story = {
  name: 'With Max Date',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con fecha máxima (30 días desde hoy).',
      },
    },
  },
};

/**
 * WithMinAndMaxDate
 * Con fecha mínima y máxima
 */
export const WithMinAndMaxDate: Story = {
  name: 'With Min And Max Date',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con fecha mínima (hoy) y máxima (30 días desde hoy).',
      },
    },
  },
};

/**
 * WithInitialDate
 * Con fecha inicial personalizada
 */
export const WithInitialDate: Story = {
  name: 'With Initial Date',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date(2024, 5, 15) // 15 de junio de 2024
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con fecha inicial personalizada (15 de junio de 2024).',
      },
    },
  },
};

/**
 * OnDateSelectCallback
 * Callback cuando se selecciona una fecha
 */
export const OnDateSelectCallback: Story = {
  name: 'On Date Select Callback',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date(),
      onDateSelect: (date: Date) => {
        alert(`Fecha seleccionada: ${date.toLocaleDateString('es-ES')}`);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con callback onDateSelect cuando se selecciona una fecha.',
      },
    },
  },
};

/**
 * OnRangeSelectCallback
 * Callback cuando se selecciona un rango
 */
export const OnRangeSelectCallback: Story = {
  name: 'On Range Select Callback',
  args: {
    mode: 'range',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'range',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date(),
      onRangeSelect: (startDate: Date, endDate: Date) => {
        alert(`Rango seleccionado: ${startDate.toLocaleDateString('es-ES')} - ${endDate.toLocaleDateString('es-ES')}`);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con callback onRangeSelect cuando se selecciona un rango.',
      },
    },
  },
};

/**
 * SingleWithSelectedDate
 * Modo single con fecha seleccionada
 */
export const SingleWithSelectedDate: Story = {
  name: 'Single - With Selected Date',
  args: {
    mode: 'single',
    selectedDate: new Date(),
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar en modo single con fecha seleccionada (hoy).',
      },
    },
  },
};

/**
 * RangeWithSelectedAndEndDate
 * Modo range con fecha de inicio y fin
 */
export const RangeWithSelectedAndEndDate: Story = {
  name: 'Range - With Selected And End Date',
  args: {
    mode: 'range',
    selectedDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días después
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'range',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar en modo range con fecha de inicio y fin seleccionadas.',
      },
    },
  },
};

/**
 * RangeWithOnlyStartDate
 * Modo range con solo fecha de inicio
 */
export const RangeWithOnlyStartDate: Story = {
  name: 'Range - With Only Start Date',
  args: {
    mode: 'range',
    selectedDate: new Date(),
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'range',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar en modo range con solo fecha de inicio seleccionada.',
      },
    },
  },
};

/**
 * WithDateRestrictions
 * Con restricciones de fecha (minDate y maxDate)
 */
export const WithDateRestrictions: Story = {
  name: 'With Date Restrictions',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con restricciones de fecha (minDate y maxDate).',
      },
    },
  },
};

/**
 * CustomClassName
 * Con clase CSS personalizada
 */
export const CustomClassName: Story = {
  name: 'Custom Class Name',
  args: {
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date(),
    className: 'custom-calendar-class'
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date(),
      className: args.className || ''
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar con clase CSS personalizada.',
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
    mode: 'range',
    selectedDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días después
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'range',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date(),
      onDateSelect: (date: Date) => {
        console.log('Fecha seleccionada:', date);
      },
      onRangeSelect: (startDate: Date, endDate: Date) => {
        console.log('Rango seleccionado:', startDate, endDate);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar completo con todas las opciones habilitadas: modo range, fechas seleccionadas, restricciones de fecha, y callbacks.',
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
    mode: 'single',
    selectedDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,
    initialDate: new Date()
  },
  render: (args) => {
    return renderCalendarStory({
      mode: args.mode || 'single',
      selectedDate: toDate(args.selectedDate),
      endDate: toDate(args.endDate),
      minDate: toDate(args.minDate),
      maxDate: toDate(args.maxDate),
      initialDate: toDate(args.initialDate) || new Date()
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar mínimo con solo las opciones esenciales (modo single, sin restricciones).',
      },
    },
  },
};
