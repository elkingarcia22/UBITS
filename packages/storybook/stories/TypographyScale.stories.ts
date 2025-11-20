import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = { title: 'Tokens/Typography/Scale', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

function line(tokenSize: string, tokenLine: string, weight: string, label: string){
  const wrap = document.createElement('div');
  wrap.className = 'typo-sample';
  const box = document.createElement('div');
  box.className = 'typo-box';
  box.textContent = label;
  const t = document.createElement('div');
  t.textContent = 'Grumpy wizards make toxic brew for the jovial queen.';
  t.style.fontFamily = 'var(--font-sans)';
  t.style.fontSize = `var(${tokenSize})`;
  t.style.lineHeight = `var(${tokenLine})`;
  t.style.fontWeight = weight;
  wrap.appendChild(box); wrap.appendChild(t);
  return wrap;
}

export const Tokens: Story = {
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    c.appendChild(line('--font-d1-size','--font-d1-line','700','Display D1 / Bold'));
    c.appendChild(line('--font-d2-size','--font-d2-line','700','Display D2 / Bold'));
    c.appendChild(line('--font-d3-size','--font-d3-line','600','Display D3 / Semibold'));
    c.appendChild(line('--font-d4-size','--font-d4-line','400','Display D4 / Regular'));
    c.appendChild(line('--font-h1-size','--font-h1-line','700','H1 / Bold'));
    c.appendChild(line('--font-h2-size','--font-h2-line','700','H2 / Bold'));
    c.appendChild(line('--font-body-lg-size','--font-body-lg-line','600','Body LG / Semibold'));
    c.appendChild(line('--font-body-md-size','--font-body-md-line','400','Body MD / Regular'));
    c.appendChild(line('--font-body-sm-size','--font-body-sm-line','400','Body SM / Regular'));
    c.appendChild(line('--font-body-xs-size','--font-body-xs-line','600','Body XS / Semibold'));
    return c;
  },
};


