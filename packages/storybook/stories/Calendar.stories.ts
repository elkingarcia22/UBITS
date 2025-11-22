import type { Meta, StoryObj } from '@storybook/html';

// Importar estilos
import '../../addons/calendar/src/styles/calendar.css';
import '../../addons/button/src/styles/button.css';
import '../../addons/input/src/styles/input.css';
import '../../addons/list/src/styles/list.css';

// Importar funciones
import { createCalendar } from '../../addons/calendar/src/index';
import type { CalendarOptions } from '../../addons/calendar/src/index';

const meta: Meta<CalendarOptions> = {
  title: 'Components/Calendar',
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
        console.log('📅 Fecha seleccionada:', date);
      },
      onRangeSelect: (startDate: Date, endDate: Date) => {
        console.log('📅 Rango seleccionado:', startDate, 'a', endDate);
      },
    };
    
    // Crear el calendario usando createCalendar y devolver directamente el elemento
    let calendarInstance: ReturnType<typeof createCalendar> | null = null;
    
    try {
      calendarInstance = createCalendar(calendarOptions);
      
      // Logs para diagnosticar qué hay detrás del calendario
      setTimeout(() => {
        const calendarEl = calendarInstance?.element as HTMLElement;
        if (calendarEl) {
          console.log('🔍 [Calendar Element] ========== DIAGNÓSTICO CONTENEDOR ==========');
          console.log('📐 Calendar element:', calendarEl);
          console.log('📐 Calendar tagName:', calendarEl.tagName);
          console.log('📐 Calendar className:', calendarEl.className);
          console.log('📐 Calendar id:', calendarEl.id);
          console.log('📐 Calendar styles:', window.getComputedStyle(calendarEl));
          console.log('📐 Calendar getBoundingClientRect:', calendarEl.getBoundingClientRect());
          
          // 🔍 DIAGNÓSTICO DE COLORES PÚRPURA
          console.log('\n🔍 [DIAGNÓSTICO COLORES PÚRPURA] ==========');
          const root = document.documentElement;
          const getTokenValue = (token: string) => getComputedStyle(root).getPropertyValue(token).trim();
          
          const purpleToken = '--modifiers-static-inverted-color-light-accent-brand';
          const blueToken = '--modifiers-normal-color-light-accent-brand';
          
          console.log(`\n📊 TOKEN PÚRPURA (static-inverted):`);
          console.log(`   Token: ${purpleToken}`);
          console.log(`   Valor: ${getTokenValue(purpleToken)}`);
          
          console.log(`\n📊 TOKEN AZUL (normal):`);
          console.log(`   Token: ${blueToken}`);
          console.log(`   Valor: ${getTokenValue(blueToken)}`);
          
          // Verificar todos los días del calendario
          const allDays = calendarEl.querySelectorAll('.ubits-calendar__day');
          console.log(`\n📅 DÍAS ENCONTRADOS: ${allDays.length}`);
          
          let daysWithPurple = 0;
          const purpleDays: Array<{index: number; classes: string; border: string; bg: string; color: string; text: string}> = [];
          
          allDays.forEach((day, index) => {
            const dayEl = day as HTMLElement;
            const computedStyle = window.getComputedStyle(dayEl);
            const classes = dayEl.className;
            const borderColor = computedStyle.borderColor;
            const backgroundColor = computedStyle.backgroundColor;
            const color = computedStyle.color;
            const text = dayEl.textContent?.trim() || '';
            
            // Convertir colores a RGB para verificar púrpura
            const getRGB = (colorStr: string) => {
              if (colorStr.startsWith('rgb')) {
                const match = colorStr.match(/(\d+),\s*(\d+),\s*(\d+)/);
                if (match) return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
              }
              return null;
            };
            
            const borderRGB = getRGB(borderColor);
            const bgRGB = getRGB(backgroundColor);
            const textRGB = getRGB(color);
            
            // Verificar si tiene púrpura (#b6b5fc = rgb(182, 181, 252))
            // Púrpura tiene valores altos en R y G (182, 181) y muy alto en B (252)
            const hasPurpleBorder = borderRGB && borderRGB.r >= 170 && borderRGB.r <= 190 && borderRGB.g >= 170 && borderRGB.g <= 190 && borderRGB.b >= 240;
            const hasPurpleBg = bgRGB && bgRGB.r >= 170 && bgRGB.r <= 190 && bgRGB.g >= 170 && bgRGB.g <= 190 && bgRGB.b >= 240;
            const hasPurpleText = textRGB && textRGB.r >= 170 && textRGB.r <= 190 && textRGB.g >= 170 && textRGB.g <= 190 && textRGB.b >= 240;
            const hasPurple = hasPurpleBorder || hasPurpleBg || hasPurpleText;
            
            // También verificar si tiene clases que deberían tener púrpura
            const hasRelevantClass = classes.includes('today') || classes.includes('selected') || 
                                    classes.includes('in-range') || classes.includes('range-start') || 
                                    classes.includes('range-end') || classes.includes('disabled');
            
            if (hasPurple || hasRelevantClass) {
              daysWithPurple += hasPurple ? 1 : 0;
              
              if (hasPurple) {
                purpleDays.push({
                  index: index + 1,
                  classes,
                  border: borderColor,
                  bg: backgroundColor,
                  color: color,
                  text
                });
              }
              
              console.log(`\n   📅 Día ${index + 1} (${text}):`);
              console.log(`      Clases: ${classes}`);
              console.log(`      Border color: ${borderColor} ${borderRGB ? `[RGB(${borderRGB.r}, ${borderRGB.g}, ${borderRGB.b})]` : ''}`);
              console.log(`      Background color: ${backgroundColor} ${bgRGB ? `[RGB(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b})]` : ''}`);
              console.log(`      Color (texto): ${color} ${textRGB ? `[RGB(${textRGB.r}, ${textRGB.g}, ${textRGB.b})]` : ''}`);
              console.log(`      ¿Tiene púrpura?: ${hasPurple ? '⚠️⚠️⚠️ SÍ - PÚRPURA DETECTADO' : '✅ NO'}`);
              if (hasPurple) {
                console.log(`      ⚠️⚠️⚠️ PROBLEMA: Este día tiene púrpura pero no debería (excepto si es selected/range-start/range-end)`);
              }
              
              // Verificar qué reglas CSS se están aplicando
              const rules = [];
              if (classes.includes('today')) rules.push('today');
              if (classes.includes('selected')) rules.push('selected');
              if (classes.includes('in-range')) rules.push('in-range');
              if (classes.includes('range-start')) rules.push('range-start');
              if (classes.includes('range-end')) rules.push('range-end');
              if (classes.includes('disabled')) rules.push('disabled');
              console.log(`      Reglas aplicadas: ${rules.join(', ') || 'ninguna'}`);
            }
          });
          
          console.log(`\n🔍 RESUMEN DE PÚRPURA:`);
          console.log(`   Total días con púrpura detectado: ${daysWithPurple}`);
          if (purpleDays.length > 0) {
            console.log(`\n   ⚠️⚠️⚠️ DÍAS CON PÚRPURA (que no deberían tenerlo):`);
            purpleDays.forEach(day => {
              console.log(`      Día ${day.index} (${day.text}):`);
              console.log(`         Clases: ${day.classes}`);
              console.log(`         Border: ${day.border}`);
              console.log(`         Background: ${day.bg}`);
              console.log(`         Color: ${day.color}`);
            });
          } else {
            console.log(`   ✅ No se detectó púrpura en días que no deberían tenerlo`);
          }
          
          // Verificar reglas CSS específicas
          console.log('\n🔍 [VERIFICACIÓN DE REGLAS CSS] ==========');
          const styleSheets = Array.from(document.styleSheets);
          let foundCalendarRules = false;
          
          styleSheets.forEach((sheet, sheetIdx) => {
            try {
              const rules = Array.from(sheet.cssRules || []);
              rules.forEach((rule, ruleIdx) => {
                if (rule instanceof CSSStyleRule) {
                  const selector = rule.selectorText;
                  if (selector && selector.includes('calendar__day')) {
                    if (selector.includes('today') || selector.includes('selected') || selector.includes('in-range')) {
                      console.log(`\n   📋 Regla encontrada en stylesheet ${sheetIdx}:`);
                      console.log(`      Selector: ${selector}`);
                      console.log(`      CSS: ${rule.cssText}`);
                      foundCalendarRules = true;
                    }
                  }
                }
              });
            } catch (e) {
              // Ignorar errores de CORS
            }
          });
          
          if (!foundCalendarRules) {
            console.log('   ⚠️ No se encontraron reglas CSS específicas (puede ser por CORS)');
          }
          
          console.log('\n🔍 [FIN DIAGNÓSTICO COLORES PÚRPURA] ==========\n');
          
          // Revisar el padre
          const parent = calendarEl.parentElement;
          if (parent) {
            console.log('🔍 [Parent Element] ==========');
            console.log('📐 Parent tagName:', parent.tagName);
            console.log('📐 Parent className:', parent.className);
            console.log('📐 Parent id:', parent.id);
            console.log('📐 Parent styles:', window.getComputedStyle(parent));
            console.log('📐 Parent getBoundingClientRect:', parent.getBoundingClientRect());
            console.log('📐 Parent background:', window.getComputedStyle(parent).background);
            console.log('📐 Parent backgroundColor:', window.getComputedStyle(parent).backgroundColor);
            console.log('📐 Parent border:', window.getComputedStyle(parent).border);
            
            // Revisar todos los ancestros
            let current = parent;
            let level = 1;
            while (current && current !== document.body) {
              const styles = window.getComputedStyle(current);
              console.log(`🔍 [Ancestor Level ${level}] ==========`);
              console.log('📐 TagName:', current.tagName);
              console.log('📐 ClassName:', current.className);
              console.log('📐 ID:', current.id);
              console.log('📐 Background:', styles.background);
              console.log('📐 BackgroundColor:', styles.backgroundColor);
              console.log('📐 Border:', styles.border);
              console.log('📐 Padding:', styles.padding);
              console.log('📐 Margin:', styles.margin);
              console.log('📐 getBoundingClientRect:', current.getBoundingClientRect());
              current = current.parentElement;
              level++;
            }
          }
          
          // Buscar elementos con fondo blanco cerca del calendario
          const allElements = document.querySelectorAll('*');
          const whiteBackgroundElements: HTMLElement[] = [];
          allElements.forEach((el) => {
            const styles = window.getComputedStyle(el);
            const bg = styles.backgroundColor;
            const rect = el.getBoundingClientRect();
            const calendarRect = calendarEl.getBoundingClientRect();
            
            // Verificar si el elemento tiene fondo blanco y está cerca del calendario
            if (bg && (bg.includes('255') || bg.includes('rgb(255') || bg.includes('#fff') || bg.includes('#ffffff'))) {
              // Verificar si está cerca del calendario (dentro de 100px)
              if (
                rect.left < calendarRect.right + 100 &&
                rect.right > calendarRect.left - 100 &&
                rect.top < calendarRect.bottom + 100 &&
                rect.bottom > calendarRect.top - 100
              ) {
                whiteBackgroundElements.push(el as HTMLElement);
              }
            }
          });
          
          if (whiteBackgroundElements.length > 0) {
            console.log('🔍 [Elementos con fondo blanco cerca del calendario] ==========');
            whiteBackgroundElements.forEach((el, idx) => {
              console.log(`📐 Elemento ${idx + 1}:`, {
                tagName: el.tagName,
                className: el.className,
                id: el.id,
                background: window.getComputedStyle(el).background,
                getBoundingClientRect: el.getBoundingClientRect(),
              });
            });
          }
          
          console.log('🔍 [Calendar Element] ========== FIN DIAGNÓSTICO ==========');
        }
      }, 100);
      
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
