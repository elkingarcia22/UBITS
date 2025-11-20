import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = { title: 'Tokens/Typography/Headings', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

function block(title: string, sizeVar: string, lineVar: string){
  const wrap = document.createElement('div');
  wrap.className = 'typo-sample';
  const box = document.createElement('div');
  box.className = 'typo-box';
  box.textContent = title;
  const h = document.createElement('div');
  h.textContent = title + ' — ejemplo';
  h.style.fontFamily = 'var(--font-sans)';
  h.style.fontSize = `var(${sizeVar})`;
  h.style.lineHeight = `var(${lineVar})`;
  h.style.fontWeight = '600';
  wrap.appendChild(box); wrap.appendChild(h);
  return wrap;
}

export const H1yH2: Story = {
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    c.appendChild(block('Heading H1','--font-h1-size','--font-h1-line'));
    c.appendChild(block('Heading H2','--font-h2-size','--font-h2-line'));

    const note = document.createElement('div');
    note.style.marginTop = '8px';
    note.style.padding = '10px 12px';
    note.style.border = '1px solid #e5e7eb';
    note.style.borderRadius = '8px';
    note.style.fontSize = '13px';
    note.innerHTML = '⚠️ Reglas: Solo existen H1 y H2. Para subtítulos menores usa <code>body-md-bold</code> o <code>body-sm-bold</code>. H1 para títulos principales; H2 para subtítulos/secciones.'
    c.appendChild(note);
    return c;
  },
};


