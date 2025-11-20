import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = { title: 'Tokens/Typography/Stacks', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

function row(label: string, style: Partial<CSSStyleDeclaration>) {
  const wrap = document.createElement('div');
  wrap.className = 'typo-sample';
  const box = document.createElement('div');
  box.className = 'typo-box';
  box.textContent = label;
  const text = document.createElement('div');
  text.textContent = 'The quick brown fox jumps over the lazy dog — 1234567890';
  Object.assign(text.style, style);
  wrap.appendChild(box);
  wrap.appendChild(text);
  return wrap;
}

export const FamiliesAndWeights: Story = {
  render: () => {
    const c = document.createElement('div');
    c.style.display = 'grid';
    c.style.gap = '10px';
    c.appendChild(row('Sans · Regular 400', { fontFamily: 'var(--font-sans)', fontWeight: '400' }));
    c.appendChild(row('Sans · Semibold 600', { fontFamily: 'var(--font-sans)', fontWeight: '600' }));
    c.appendChild(row('Sans · Bold 700', { fontFamily: 'var(--font-sans)', fontWeight: '700' }));
    return c;
  },
};


