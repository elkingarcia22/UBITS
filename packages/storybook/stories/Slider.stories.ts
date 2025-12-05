import type { Meta, StoryObj } from '@storybook/html';
import { renderSlider, createSlider } from '../../components/slider/src/SliderProvider';
import type { SliderOptions, SliderOrientation, SliderSize, SliderState, SliderMode } from '../../components/slider/src/types/SliderOptions';
import '../../components/slider/src/styles/slider.css';

const meta: Meta<SliderOptions & { 
  marksString?: string;
  valuesString?: string;
}> = {
  title: 'Formularios/Slider',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Slider UBITS con soporte para orientación horizontal/vertical, modo single/range, inputs opcionales, marcas, y todos los tamaños y estados.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label',
      table: {
        defaultValue: { summary: '' },
      },
    },
    helperText: {
      control: { type: 'text' },
      description: 'Texto de ayuda (helper text)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del slider',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'disabled'],
      description: 'Estado del slider',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | disabled' },
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientación del slider',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'horizontal | vertical' },
      },
    },
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      description: 'Modo del slider: single (un valor) o range (dos valores)',
      table: {
        defaultValue: { summary: 'single' },
        type: { summary: 'single | range' },
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Valor mínimo',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Valor máximo',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: { type: 'number', min: 0.1, step: 0.1 },
      description: 'Paso (step) del slider',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    value: {
      control: { type: 'number' },
      description: 'Valor inicial (para modo single)',
      table: {
        defaultValue: { summary: '50' },
      },
      if: { arg: 'mode', eq: 'single' },
    },
    valuesString: {
      control: { type: 'text' },
      description: 'Valores iniciales como JSON array [min, max] (para modo range)',
      table: {
        defaultValue: { summary: '[25, 75]' },
      },
      if: { arg: 'mode', eq: 'range' },
    },
    showInputs: {
      control: { type: 'boolean' },
      description: 'Mostrar inputs numéricos',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar label',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showHelper: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar helper text',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showMarks: {
      control: { type: 'boolean' },
      description: 'Mostrar marcas/ticks en el slider',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    marksString: {
      control: { type: 'text' },
      description: 'Valores donde mostrar marcas como JSON array (ej: [0, 25, 50, 75, 100])',
      table: {
        defaultValue: { summary: '[]' },
      },
      if: { arg: 'showMarks', eq: true },
    },
    showRangeGuide: {
      control: { type: 'boolean' },
      description: 'Mostrar guía visual del rango debajo del slider (ej: 0 - 100)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SliderOptions & { 
  marksString?: string;
  valuesString?: string;
}>;

/**
 * Story única con todos los controles
 */
export const Default: Story = {
  args: {
    containerId: 'slider-storybook-container',
    label: 'Volumen',
    helperText: 'Ajusta el volumen del reproductor',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    valuesString: '[25, 75]',
    showInputs: false,
    showLabel: true,
    showHelper: false,
    showMarks: false,
    marksString: '[0, 25, 50, 75, 100]',
    showRangeGuide: false,
  },
  render: (args) => {
    // Crear contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      max-width: ${args.orientation === 'vertical' ? '200px' : '800px'};
      margin: 20px auto;
      padding: 20px;
      min-height: ${args.orientation === 'vertical' ? '400px' : 'auto'};
    `;

    // Generar un ID único para el contenedor del slider
    const containerId = `slider-storybook-${Math.random().toString(36).substr(2, 9)}`;

    // Parsear valuesString si es range mode
    let values: [number, number] | undefined;
    if (args.mode === 'range') {
      try {
        const parsed = JSON.parse(args.valuesString || '[25, 75]');
        if (Array.isArray(parsed) && parsed.length === 2) {
          values = [parsed[0], parsed[1]];
        } else {
          values = [25, 75];
        }
      } catch (e) {
        values = [25, 75];
      }
    }

    // Parsear marksString si showMarks es true
    let marks: number[] | undefined;
    if (args.showMarks && args.marksString) {
      try {
        marks = JSON.parse(args.marksString);
        if (!Array.isArray(marks)) {
          marks = [];
        }
      } catch (e) {
        marks = [];
      }
    }

    // Preparar opciones del slider
    const sliderOptions: SliderOptions = {
      containerId,
      label: args.label,
      helperText: args.helperText,
      size: args.size,
      state: args.state,
      orientation: args.orientation,
      mode: args.mode,
      min: args.min,
      max: args.max,
      step: args.step,
      value: args.mode === 'single' ? args.value : undefined,
      values: args.mode === 'range' ? values : undefined,
      showInputs: args.showInputs,
      showLabel: args.showLabel,
      showHelper: args.showHelper,
      showMarks: args.showMarks,
      marks: marks,
      showRangeGuide: args.showRangeGuide,
      onChange: (value) => {
        // Callback cuando cambia el valor (modo single)
      },
      onRangeChange: (values) => {
        // Callback cuando cambian los valores (modo range)
      },
    };

    // Crear contenedor interno para el slider
    const sliderContainer = document.createElement('div');
    sliderContainer.id = containerId;
    
    // Ajustar estilos según orientación
    if (args.orientation === 'vertical') {
      sliderContainer.style.cssText = `
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    } else {
      sliderContainer.style.cssText = `
        width: 100%;
        margin-bottom: 20px;
      `;
    }

    wrapper.appendChild(sliderContainer);

    // Función para crear/actualizar el slider
    const createSliderInstance = () => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
      }

      // Limpiar contenedor antes de crear nuevo slider
      container.innerHTML = '';

      try {
        // Crear el slider
        const sliderInstance = createSlider(sliderOptions);
        
        if (sliderInstance) {
          // Guardar referencia para poder actualizar valores si es necesario
          (container as any).sliderInstance = sliderInstance;
        }
      } catch (err) {
        console.error('Error creating slider:', err);
        // Fallback: usar renderSlider si createSlider falla
        try {
          const sliderHTML = renderSlider(sliderOptions);
          container.innerHTML = sliderHTML;
        } catch (renderErr) {
          console.error('Error rendering slider:', renderErr);
          container.innerHTML = `<div style="color: red; padding: 16px;">Error: ${renderErr}</div>`;
        }
      }
    };

    // Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        createSliderInstance();
      });
    });

    // Retornar wrapper con método para actualizar cuando cambien los args
    (wrapper as any).updateSlider = createSliderInstance;

    return wrapper;
  },
};

// Helper para renderizar Slider de manera consistente
function renderSliderStory(options: SliderOptions) {
  const wrapper = document.createElement('div');
  const containerId = `slider-storybook-${Math.random().toString(36).substr(2, 9)}`;
  
  wrapper.style.cssText = `
    max-width: ${options.orientation === 'vertical' ? '200px' : '800px'};
    margin: 20px auto;
    padding: 20px;
    min-height: ${options.orientation === 'vertical' ? '400px' : 'auto'};
    background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
    border-radius: 8px;
  `;

  const sliderContainer = document.createElement('div');
  sliderContainer.id = containerId;
  
  if (options.orientation === 'vertical') {
    sliderContainer.style.cssText = `
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  } else {
    sliderContainer.style.cssText = `
      width: 100%;
      margin-bottom: 20px;
    `;
  }

  wrapper.appendChild(sliderContainer);

  const sliderOptions: SliderOptions = {
    ...options,
    containerId
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const container = document.getElementById(containerId);
      if (container) {
        try {
          createSlider(sliderOptions);
        } catch (err) {
          console.error('Error creating slider:', err);
          const sliderHTML = renderSlider(sliderOptions);
          container.innerHTML = sliderHTML;
        }
      }
    });
  });

  return wrapper;
}

/**
 * OrientationHorizontal
 * Orientación horizontal
 */
export const OrientationHorizontal: Story = {
  name: 'Orientation - Horizontal',
  args: {
    containerId: 'slider-horizontal-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con orientación horizontal.',
      },
    },
  },
};

/**
 * OrientationVertical
 * Orientación vertical
 */
export const OrientationVertical: Story = {
  name: 'Orientation - Vertical',
  args: {
    containerId: 'slider-vertical-container',
    label: 'Altura',
    size: 'md',
    state: 'default',
    orientation: 'vertical',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con orientación vertical.',
      },
    },
  },
};

/**
 * ModeSingle
 * Modo single (un valor)
 */
export const ModeSingle: Story = {
  name: 'Mode - Single',
  args: {
    containerId: 'slider-single-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider en modo single (un valor).',
      },
    },
  },
};

/**
 * ModeRange
 * Modo range (dos valores)
 */
export const ModeRange: Story = {
  name: 'Mode - Range',
  args: {
    containerId: 'slider-range-container',
    label: 'Rango de precios',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'range',
    min: 0,
    max: 1000,
    step: 10,
    valuesString: '[100, 500]',
    showInputs: false,
    showLabel: true
  },
  render: (args) => {
    const containerId = `slider-range-${Math.random().toString(36).substr(2, 9)}`;
    let values: [number, number] = [100, 500];
    if (args.valuesString) {
      try {
        const parsed = JSON.parse(args.valuesString);
        if (Array.isArray(parsed) && parsed.length === 2) {
          values = [parsed[0], parsed[1]];
        }
      } catch (e) {
        // Usar valores por defecto
      }
    }
    return renderSliderStory({
      ...args,
      containerId,
      values
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider en modo range (dos valores).',
      },
    },
  },
};

/**
 * SizeXS
 * Tamaño xs
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    containerId: 'slider-xs-container',
    label: 'Volumen',
    size: 'xs',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con tamaño xs.',
      },
    },
  },
};

/**
 * SizeSM
 * Tamaño sm
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    containerId: 'slider-sm-container',
    label: 'Volumen',
    size: 'sm',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con tamaño sm.',
      },
    },
  },
};

/**
 * SizeMD
 * Tamaño md (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD',
  args: {
    containerId: 'slider-md-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con tamaño md (default).',
      },
    },
  },
};

/**
 * SizeLG
 * Tamaño lg
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    containerId: 'slider-lg-container',
    label: 'Volumen',
    size: 'lg',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con tamaño lg.',
      },
    },
  },
};

/**
 * StateDefault
 * Estado default
 */
export const StateDefault: Story = {
  name: 'State - Default',
  args: {
    containerId: 'slider-default-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider en estado default.',
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
    containerId: 'slider-disabled-container',
    label: 'Volumen',
    size: 'md',
    state: 'disabled',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider en estado disabled.',
      },
    },
  },
};

/**
 * WithInputs
 * Con inputs numéricos
 */
export const WithInputs: Story = {
  name: 'With Inputs',
  args: {
    containerId: 'slider-inputs-container',
    label: 'Temperatura',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 25,
    showInputs: true,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con inputs numéricos visibles.',
      },
    },
  },
};

/**
 * WithoutInputs
 * Sin inputs numéricos
 */
export const WithoutInputs: Story = {
  name: 'Without Inputs',
  args: {
    containerId: 'slider-no-inputs-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider sin inputs numéricos.',
      },
    },
  },
};

/**
 * WithLabel
 * Con label
 */
export const WithLabel: Story = {
  name: 'With Label',
  args: {
    containerId: 'slider-label-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con label visible.',
      },
    },
  },
};

/**
 * WithoutLabel
 * Sin label
 */
export const WithoutLabel: Story = {
  name: 'Without Label',
  args: {
    containerId: 'slider-no-label-container',
    label: '',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: false
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider sin label.',
      },
    },
  },
};

/**
 * WithHelperText
 * Con helper text
 */
export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    containerId: 'slider-helper-container',
    label: 'Volumen',
    helperText: 'Ajusta el volumen del reproductor',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true,
    showHelper: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con helper text visible.',
      },
    },
  },
};

/**
 * WithMarks
 * Con marcas/ticks
 */
export const WithMarks: Story = {
  name: 'With Marks',
  args: {
    containerId: 'slider-marks-container',
    label: 'Nivel',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 10,
    value: 50,
    showInputs: false,
    showLabel: true,
    showMarks: true,
    marksString: '[0, 25, 50, 75, 100]'
  },
  render: (args) => {
    const containerId = `slider-marks-${Math.random().toString(36).substr(2, 9)}`;
    let marks: number[] = [0, 25, 50, 75, 100];
    if (args.marksString) {
      try {
        const parsed = JSON.parse(args.marksString);
        if (Array.isArray(parsed)) {
          marks = parsed;
        }
      } catch (e) {
        // Usar valores por defecto
      }
    }
    return renderSliderStory({
      ...args,
      containerId,
      marks
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider con marcas/ticks visibles.',
      },
    },
  },
};

/**
 * WithRangeGuide
 * Con guía visual del rango
 */
export const WithRangeGuide: Story = {
  name: 'With Range Guide',
  args: {
    containerId: 'slider-range-guide-container',
    label: 'Rango',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true,
    showRangeGuide: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con guía visual del rango (muestra min - max debajo del slider).',
      },
    },
  },
};

/**
 * CustomMinMax
 * Con min y max personalizados
 */
export const CustomMinMax: Story = {
  name: 'Custom Min Max',
  args: {
    containerId: 'slider-custom-minmax-container',
    label: 'Temperatura',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: -50,
    max: 50,
    step: 1,
    value: 0,
    showInputs: true,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con valores min y max personalizados.',
      },
    },
  },
};

/**
 * CustomStep
 * Con step personalizado
 */
export const CustomStep: Story = {
  name: 'Custom Step',
  args: {
    containerId: 'slider-custom-step-container',
    label: 'Porcentaje',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 5,
    value: 50,
    showInputs: true,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider con step personalizado (5 en lugar de 1).',
      },
    },
  },
};

/**
 * SingleWithValue
 * Modo single con valor inicial
 */
export const SingleWithValue: Story = {
  name: 'Single - With Value',
  args: {
    containerId: 'slider-single-value-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 75,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider en modo single con valor inicial (75).',
      },
    },
  },
};

/**
 * RangeWithValues
 * Modo range con valores iniciales
 */
export const RangeWithValues: Story = {
  name: 'Range - With Values',
  args: {
    containerId: 'slider-range-values-container',
    label: 'Rango de precios',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'range',
    min: 0,
    max: 1000,
    step: 10,
    valuesString: '[200, 800]',
    showInputs: true,
    showLabel: true
  },
  render: (args) => {
    const containerId = `slider-range-values-${Math.random().toString(36).substr(2, 9)}`;
    let values: [number, number] = [200, 800];
    if (args.valuesString) {
      try {
        const parsed = JSON.parse(args.valuesString);
        if (Array.isArray(parsed) && parsed.length === 2) {
          values = [parsed[0], parsed[1]];
        }
      } catch (e) {
        // Usar valores por defecto
      }
    }
    return renderSliderStory({
      ...args,
      containerId,
      values
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider en modo range con valores iniciales [200, 800].',
      },
    },
  },
};

/**
 * OnChangeCallback
 * Callback onChange (modo single)
 */
export const OnChangeCallback: Story = {
  name: 'On Change Callback',
  args: {
    containerId: 'slider-onchange-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true,
    onChange: (value: number) => {
      console.log('Valor cambiado:', value);
    }
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider en modo single con callback onChange cuando cambia el valor.',
      },
    },
  },
};

/**
 * OnRangeChangeCallback
 * Callback onRangeChange (modo range)
 */
export const OnRangeChangeCallback: Story = {
  name: 'On Range Change Callback',
  args: {
    containerId: 'slider-onrangechange-container',
    label: 'Rango de precios',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'range',
    min: 0,
    max: 1000,
    step: 10,
    valuesString: '[100, 500]',
    showInputs: false,
    showLabel: true,
    onRangeChange: (values: [number, number]) => {
      console.log('Valores cambiados:', values);
    }
  },
  render: (args) => {
    const containerId = `slider-onrangechange-${Math.random().toString(36).substr(2, 9)}`;
    let values: [number, number] = [100, 500];
    if (args.valuesString) {
      try {
        const parsed = JSON.parse(args.valuesString);
        if (Array.isArray(parsed) && parsed.length === 2) {
          values = [parsed[0], parsed[1]];
        }
      } catch (e) {
        // Usar valores por defecto
      }
    }
    return renderSliderStory({
      ...args,
      containerId,
      values,
      onRangeChange: args.onRangeChange
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider en modo range con callback onRangeChange cuando cambian los valores.',
      },
    },
  },
};

/**
 * AllSizes
 * Todos los tamaños
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  args: {
    containerId: 'slider-all-sizes-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 800px;
      margin: 0 auto;
    `;

    ['xs', 'sm', 'md', 'lg'].forEach((size) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%;';
      const sliderId = `slider-size-${size}-${Date.now()}`;
      const sliderOptions: SliderOptions = {
        ...args,
        containerId: sliderId,
        size: size as SliderSize,
        label: `Size ${size.toUpperCase()}`
      };
      const rendered = renderSliderStory(sliderOptions);
      wrapper.appendChild(rendered);
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Sliders en todos los tamaños disponibles (xs, sm, md, lg).',
      },
    },
  },
};

/**
 * AllOrientations
 * Todas las orientaciones
 */
export const AllOrientations: Story = {
  name: 'All Orientations',
  args: {
    containerId: 'slider-all-orientations-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: row;
      gap: 40px;
      align-items: center;
      justify-content: center;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 800px;
      margin: 0 auto;
    `;

    ['horizontal', 'vertical'].forEach((orientation) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = orientation === 'vertical' ? 'height: 300px; display: flex; align-items: center;' : 'width: 100%;';
      const sliderId = `slider-orientation-${orientation}-${Date.now()}`;
      const sliderOptions: SliderOptions = {
        ...args,
        containerId: sliderId,
        orientation: orientation as SliderOrientation,
        label: orientation === 'horizontal' ? 'Horizontal' : 'Vertical'
      };
      const rendered = renderSliderStory(sliderOptions);
      wrapper.appendChild(rendered);
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Sliders en todas las orientaciones disponibles (horizontal, vertical).',
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
    containerId: 'slider-complete-container',
    label: 'Rango de precios',
    helperText: 'Selecciona el rango de precios que deseas',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'range',
    min: 0,
    max: 1000,
    step: 10,
    valuesString: '[100, 500]',
    showInputs: true,
    showLabel: true,
    showHelper: true,
    showMarks: true,
    marksString: '[0, 250, 500, 750, 1000]',
    showRangeGuide: true,
    onChange: (value: number) => {
      console.log('Valor cambiado:', value);
    },
    onRangeChange: (values: [number, number]) => {
      console.log('Valores cambiados:', values);
    }
  },
  render: (args) => {
    const containerId = `slider-complete-${Math.random().toString(36).substr(2, 9)}`;
    let values: [number, number] = [100, 500];
    let marks: number[] = [0, 250, 500, 750, 1000];
    if (args.valuesString) {
      try {
        const parsed = JSON.parse(args.valuesString);
        if (Array.isArray(parsed) && parsed.length === 2) {
          values = [parsed[0], parsed[1]];
        }
      } catch (e) {
        // Usar valores por defecto
      }
    }
    if (args.marksString) {
      try {
        const parsed = JSON.parse(args.marksString);
        if (Array.isArray(parsed)) {
          marks = parsed;
        }
      } catch (e) {
        // Usar valores por defecto
      }
    }
    return renderSliderStory({
      ...args,
      containerId,
      values,
      marks,
      onChange: args.onChange,
      onRangeChange: args.onRangeChange
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider completo con todas las opciones habilitadas: modo range, inputs, label, helper text, marcas, guía de rango, y callbacks.',
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
    containerId: 'slider-minimal-container',
    label: 'Volumen',
    size: 'md',
    state: 'default',
    orientation: 'horizontal',
    mode: 'single',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: false,
    showLabel: true
  },
  render: (args) => renderSliderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Slider mínimo con solo las opciones esenciales (modo single, orientación horizontal, tamaño md).',
      },
    },
  },
};

