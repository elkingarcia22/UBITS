import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = { title: 'Tokens/Typography/Body', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

function bodyRow(label: string, sizeVar: string, lineVar: string, weight: string){
  const wrap = document.createElement('div');
  wrap.className = 'typo-sample';
  const box = document.createElement('div');
  box.className = 'typo-box';
  box.textContent = label;
  const t = document.createElement('div');
  t.textContent = 'Texto ejemplo para validar legibilidad y tamaños en UI.';
  t.style.fontFamily = 'var(--font-sans)';
  t.style.fontSize = `var(${sizeVar})`;
  t.style.lineHeight = `var(${lineVar})`;
  t.style.fontWeight = weight;
  wrap.appendChild(box); wrap.appendChild(t);
  return wrap;
}

export const Variants: Story = {
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    // XS 11
    c.appendChild(bodyRow('Body XS · Regular 400','--font-body-xs-size','--font-body-xs-line','400'));
    c.appendChild(bodyRow('Body XS · Semibold 600','--font-body-xs-size','--font-body-xs-line','600'));
    c.appendChild(bodyRow('Body XS · Bold 700','--font-body-xs-size','--font-body-xs-line','700'));
    // SM 13
    c.appendChild(bodyRow('Body SM · Regular 400','--font-body-sm-size','--font-body-sm-line','400'));
    c.appendChild(bodyRow('Body SM · Semibold 600','--font-body-sm-size','--font-body-sm-line','600'));
    c.appendChild(bodyRow('Body SM · Bold 700','--font-body-sm-size','--font-body-sm-line','700'));
    // MD 16
    c.appendChild(bodyRow('Body MD · Regular 400','--font-body-md-size','--font-body-md-line','400'));
    c.appendChild(bodyRow('Body MD · Semibold 600','--font-body-md-size','--font-body-md-line','600'));
    c.appendChild(bodyRow('Body MD · Bold 700','--font-body-md-size','--font-body-md-line','700'));
    // LG 20 (solo semibold)
    c.appendChild(bodyRow('Body LG · Semibold 600 (solo botones)','--font-body-lg-size','--font-body-lg-line','600'));

    const note = document.createElement('div');
    note.style.marginTop = '8px';
    note.style.padding = '10px 12px';
    note.style.border = '1px solid #e5e7eb';
    note.style.borderRadius = '8px';
    note.style.fontSize = '13px';
    note.innerHTML = '📋 Uso recomendado: XS metadatos; SM descripciones/etiquetas; MD párrafos; LG exclusivo para botones grandes.'
    c.appendChild(note);
    return c;
  },
};


