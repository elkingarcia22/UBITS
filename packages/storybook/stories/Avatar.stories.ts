import type { Meta, StoryObj } from '@storybook/html';
import { renderAvatar } from '../../components/avatar/src/AvatarProvider';
import type { AvatarOptions } from '../../components/avatar/src/types/AvatarOptions';
import '../../components/avatar/src/styles/avatar.css';
import '../../components/badge/src/styles/badge.css';

const meta: Meta<AvatarOptions> = {
  title: 'Básicos/Avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Avatar UBITS con soporte para imagen, iniciales e icono. Múltiples tamaños y badge opcional con contenido (texto/números). Usa tokens UBITS exclusivamente.`,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    imageUrl: {
      control: { type: 'text' },
      description: 'URL de la imagen del avatar (para variante Photo). Si se proporciona, se usa la variante Photo.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/images/Profile-image.jpg' },
        category: 'Contenido',
      },
    },
    initials: {
      control: { type: 'text' },
      description: 'Texto para mostrar como iniciales (para variante Initials). Ej: "John Doe" genera "JD". Si se proporciona sin imageUrl, se usa la variante Initials.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'JD' },
        category: 'Contenido',
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (para variante Icon). Ej: "user", "robot". Se usa si no hay imageUrl ni initials.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'user' },
        category: 'Contenido',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del avatar (XS: 20px, SM: 28px, MD: 36px, LG: 40px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
        category: 'Apariencia',
      },
    },
    badgeColor: {
      control: { type: 'select' },
      options: ['', 'green', 'red', 'blue', 'orange', 'gray'],
      description: 'Color del badge. Si se proporciona, se muestra el badge. Dejar vacío para ocultar el badge.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: '' },
        category: 'Badge',
      },
    },
    badgeContent: {
      control: { type: 'text' },
      description: 'Contenido del badge (número o texto). Si no se proporciona o está vacío, se muestra solo el punto (dot). Ej: "5", "99+", "Nuevo"',
      table: {
        type: { summary: 'string | number | null' },
        defaultValue: { summary: '' },
        category: 'Badge',
      },
    },
    alt: {
      control: { type: 'text' },
      description: 'Texto alternativo para accesibilidad (solo para variante Photo)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Avatar' },
        category: 'Accesibilidad',
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace clic en el avatar',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Avanzado',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AvatarOptions>;

export const Default: Story = {
  args: {
    imageUrl: '/images/Profile-image.jpg',
    size: 'md',
    badgeColor: '',
    badgeContent: '',
    alt: 'Avatar',
    icon: 'user',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const avatarContainer = document.createElement('div');
    
    // Preparar opciones para renderAvatar
    const avatarOptions: AvatarOptions = {
      size: args.size || 'md',
      badgeColor: args.badgeColor && args.badgeColor.trim() !== '' ? args.badgeColor : undefined,
      badgeContent: args.badgeContent && args.badgeContent.toString().trim() !== '' ? args.badgeContent : undefined,
      alt: args.alt || 'Avatar',
      className: args.className || '',
      onClick: args.onClick,
    };
    
    // Determinar variante basada en qué campos están presentes
    if (args.imageUrl && args.imageUrl.trim() !== '') {
      avatarOptions.imageUrl = args.imageUrl;
    } else if (args.initials && args.initials.trim() !== '') {
      avatarOptions.initials = args.initials;
    } else {
      avatarOptions.icon = args.icon || 'user';
    }
    
    avatarContainer.innerHTML = renderAvatar(avatarOptions);
    
    // Agregar event listener si hay onClick
    if (args.onClick) {
      const avatar = avatarContainer.querySelector('.ubits-avatar') as HTMLElement;
      if (avatar) {
        avatar.addEventListener('click', (e) => {
          e.preventDefault();
          if (args.onClick) {
            args.onClick(e as any);
          }
        });
        avatar.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (args.onClick) {
              args.onClick(e as any);
            }
          }
        });
      }
    }
    
    preview.appendChild(avatarContainer);
    container.appendChild(preview);
    
    return container;
  },
};

// Helper para renderizar Avatar de manera consistente
function renderAvatarStory(options: Partial<AvatarOptions>) {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';
  
  const preview = document.createElement('div');
  preview.style.display = 'flex';
  preview.style.justifyContent = 'center';
  preview.style.alignItems = 'center';
  preview.style.padding = '48px';
  preview.style.minHeight = '120px';
  preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  preview.style.borderRadius = '8px';
  preview.style.marginBottom = '20px';
  
  const avatarContainer = document.createElement('div');
  
  const avatarOptions: AvatarOptions = {
    size: options.size || 'md',
    badgeColor: options.badgeColor && options.badgeColor.trim() !== '' ? options.badgeColor : undefined,
    badgeContent: options.badgeContent && options.badgeContent.toString().trim() !== '' ? options.badgeContent : undefined,
    alt: options.alt || 'Avatar',
    className: options.className || '',
    onClick: options.onClick,
  };
  
  if (options.imageUrl && options.imageUrl.trim() !== '') {
    avatarOptions.imageUrl = options.imageUrl;
  } else if (options.initials && options.initials.trim() !== '') {
    avatarOptions.initials = options.initials;
  } else {
    avatarOptions.icon = options.icon || 'user';
  }
  
  avatarContainer.innerHTML = renderAvatar(avatarOptions);
  
  if (options.onClick) {
    const avatar = avatarContainer.querySelector('.ubits-avatar') as HTMLElement;
    if (avatar) {
      avatar.addEventListener('click', (e) => {
        e.preventDefault();
        if (options.onClick) {
          options.onClick(e as any);
        }
      });
      avatar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (options.onClick) {
            options.onClick(e as any);
          }
        }
      });
    }
  }
  
  preview.appendChild(avatarContainer);
  container.appendChild(preview);
  
  return container;
}

/**
 * VariantPhoto
 * Avatar con imagen (variante Photo)
 */
export const VariantPhoto: Story = {
  name: 'Variant - Photo',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=1',
    size: 'md',
    alt: 'Foto de perfil',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con imagen (variante Photo).',
      },
    },
  },
};

/**
 * VariantInitials
 * Avatar con iniciales (variante Initials)
 */
export const VariantInitials: Story = {
  name: 'Variant - Initials',
  args: {
    initials: 'JD',
    size: 'md',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con iniciales (variante Initials).',
      },
    },
  },
};

/**
 * VariantIcon
 * Avatar con icono (variante Icon)
 */
export const VariantIcon: Story = {
  name: 'Variant - Icon',
  args: {
    icon: 'user',
    size: 'md',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con icono (variante Icon).',
      },
    },
  },
};

/**
 * SizeXS
 * Avatar tamaño extra small
 */
export const SizeXS: Story = {
  name: 'Size - XS (20px)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=2',
    size: 'xs',
    alt: 'Avatar XS',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar tamaño extra small (20px).',
      },
    },
  },
};

/**
 * SizeSM
 * Avatar tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM (28px)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=3',
    size: 'sm',
    alt: 'Avatar SM',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar tamaño small (28px).',
      },
    },
  },
};

/**
 * SizeMD
 * Avatar tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (36px, Default)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=4',
    size: 'md',
    alt: 'Avatar MD',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar tamaño medium (36px, valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Avatar tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG (40px)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=5',
    size: 'lg',
    alt: 'Avatar LG',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar tamaño large (40px).',
      },
    },
  },
};

/**
 * WithBadgeDot
 * Avatar con badge tipo dot (sin contenido)
 */
export const WithBadgeDot: Story = {
  name: 'With Badge - Dot',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=6',
    size: 'md',
    badgeColor: 'green',
    alt: 'Avatar con badge dot',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge tipo dot (sin contenido, solo punto indicador).',
      },
    },
  },
};

/**
 * WithBadgeNumber
 * Avatar con badge tipo number (con número)
 */
export const WithBadgeNumber: Story = {
  name: 'With Badge - Number',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=7',
    size: 'md',
    badgeColor: 'red',
    badgeContent: 5,
    alt: 'Avatar con badge número',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge tipo number (con número).',
      },
    },
  },
};

/**
 * WithBadgeText
 * Avatar con badge tipo text (con texto)
 */
export const WithBadgeText: Story = {
  name: 'With Badge - Text',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=8',
    size: 'md',
    badgeColor: 'blue',
    badgeContent: 'Nuevo',
    alt: 'Avatar con badge texto',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge tipo text (con texto).',
      },
    },
  },
};

/**
 * BadgeColorGreen
 * Badge color verde (success)
 */
export const BadgeColorGreen: Story = {
  name: 'Badge Color - Green (Success)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=9',
    size: 'md',
    badgeColor: 'green',
    badgeContent: 3,
    alt: 'Avatar con badge verde',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge color verde (success).',
      },
    },
  },
};

/**
 * BadgeColorRed
 * Badge color rojo (error)
 */
export const BadgeColorRed: Story = {
  name: 'Badge Color - Red (Error)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=10',
    size: 'md',
    badgeColor: 'red',
    badgeContent: 5,
    alt: 'Avatar con badge rojo',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge color rojo (error).',
      },
    },
  },
};

/**
 * BadgeColorBlue
 * Badge color azul (info)
 */
export const BadgeColorBlue: Story = {
  name: 'Badge Color - Blue (Info)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=11',
    size: 'md',
    badgeColor: 'blue',
    badgeContent: 2,
    alt: 'Avatar con badge azul',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge color azul (info).',
      },
    },
  },
};

/**
 * BadgeColorOrange
 * Badge color naranja (warning)
 */
export const BadgeColorOrange: Story = {
  name: 'Badge Color - Orange (Warning)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=12',
    size: 'md',
    badgeColor: 'orange',
    badgeContent: 1,
    alt: 'Avatar con badge naranja',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge color naranja (warning).',
      },
    },
  },
};

/**
 * BadgeColorGray
 * Badge color gris (primary)
 */
export const BadgeColorGray: Story = {
  name: 'Badge Color - Gray (Primary)',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=13',
    size: 'md',
    badgeColor: 'gray',
    badgeContent: 7,
    alt: 'Avatar con badge gris',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con badge color gris (primary).',
      },
    },
  },
};

/**
 * WithoutBadge
 * Avatar sin badge
 */
export const WithoutBadge: Story = {
  name: 'Without Badge',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=14',
    size: 'md',
    alt: 'Avatar sin badge',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar sin badge.',
      },
    },
  },
};

/**
 * PhotoWithBadge
 * Avatar con imagen y badge
 */
export const PhotoWithBadge: Story = {
  name: 'Photo With Badge',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=15',
    size: 'md',
    badgeColor: 'green',
    badgeContent: 3,
    alt: 'Avatar con foto y badge',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con imagen y badge.',
      },
    },
  },
};

/**
 * InitialsWithBadge
 * Avatar con iniciales y badge
 */
export const InitialsWithBadge: Story = {
  name: 'Initials With Badge',
  args: {
    initials: 'JD',
    size: 'md',
    badgeColor: 'red',
    badgeContent: 5,
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con iniciales y badge.',
      },
    },
  },
};

/**
 * IconWithBadge
 * Avatar con icono y badge
 */
export const IconWithBadge: Story = {
  name: 'Icon With Badge',
  args: {
    icon: 'user',
    size: 'md',
    badgeColor: 'blue',
    badgeContent: 2,
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con icono y badge.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Avatar con callback onClick
 */
export const OnClickCallback: Story = {
  name: 'OnClick Callback',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=16',
    size: 'md',
    alt: 'Avatar clickeable',
  },
  render: (args) => {
    const options: Partial<AvatarOptions> = {
      ...args,
      onClick: () => {
        alert('Avatar clickeado');
        console.log('Avatar clicked');
      }
    };
    return renderAvatarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar con callback onClick que se ejecuta cuando se hace clic.',
      },
    },
  },
};

/**
 * CustomIcon
 * Avatar con icono personalizado
 */
export const CustomIcon: Story = {
  name: 'Custom Icon',
  args: {
    icon: 'robot',
    size: 'md',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con icono personalizado (robot).',
      },
    },
  },
};

/**
 * LongInitials
 * Avatar con iniciales largas
 */
export const LongInitials: Story = {
  name: 'Long Initials',
  args: {
    initials: 'ABCD',
    size: 'md',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con iniciales largas (más de 2 caracteres).',
      },
    },
  },
};

/**
 * ShortInitials
 * Avatar con iniciales cortas
 */
export const ShortInitials: Story = {
  name: 'Short Initials',
  args: {
    initials: 'A',
    size: 'md',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar con iniciales cortas (1 carácter).',
      },
    },
  },
};

/**
 * AllSizesPhoto
 * Todos los tamaños con imagen
 */
export const AllSizesPhoto: Story = {
  name: 'All Sizes - Photo',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=17',
    size: 'md',
    alt: 'Avatar',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '24px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];
    sizes.forEach(size => {
      const avatarContainer = document.createElement('div');
      avatarContainer.style.display = 'flex';
      avatarContainer.style.flexDirection = 'column';
      avatarContainer.style.alignItems = 'center';
      avatarContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size.toUpperCase();
      
      avatarContainer.innerHTML = renderAvatar({
        imageUrl: args.imageUrl,
        size: size,
        alt: 'Avatar ${size}',
      });
      
      avatarContainer.insertBefore(label, avatarContainer.firstChild);
      preview.appendChild(avatarContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños de avatar con imagen (xs, sm, md, lg).',
      },
    },
  },
};

/**
 * AllSizesInitials
 * Todos los tamaños con iniciales
 */
export const AllSizesInitials: Story = {
  name: 'All Sizes - Initials',
  args: {
    initials: 'JD',
    size: 'md',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '24px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];
    sizes.forEach(size => {
      const avatarContainer = document.createElement('div');
      avatarContainer.style.display = 'flex';
      avatarContainer.style.flexDirection = 'column';
      avatarContainer.style.alignItems = 'center';
      avatarContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size.toUpperCase();
      
      avatarContainer.innerHTML = renderAvatar({
        initials: args.initials,
        size: size,
      });
      
      avatarContainer.insertBefore(label, avatarContainer.firstChild);
      preview.appendChild(avatarContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños de avatar con iniciales (xs, sm, md, lg).',
      },
    },
  },
};

/**
 * AllSizesIcon
 * Todos los tamaños con icono
 */
export const AllSizesIcon: Story = {
  name: 'All Sizes - Icon',
  args: {
    icon: 'user',
    size: 'md',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '24px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];
    sizes.forEach(size => {
      const avatarContainer = document.createElement('div');
      avatarContainer.style.display = 'flex';
      avatarContainer.style.flexDirection = 'column';
      avatarContainer.style.alignItems = 'center';
      avatarContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size.toUpperCase();
      
      avatarContainer.innerHTML = renderAvatar({
        icon: args.icon,
        size: size,
      });
      
      avatarContainer.insertBefore(label, avatarContainer.firstChild);
      preview.appendChild(avatarContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños de avatar con icono (xs, sm, md, lg).',
      },
    },
  },
};

/**
 * AllBadgeColors
 * Todos los colores de badge
 */
export const AllBadgeColors: Story = {
  name: 'All Badge Colors',
  args: {
    imageUrl: 'https://i.pravatar.cc/150?img=18',
    size: 'md',
    badgeColor: 'green',
    badgeContent: 3,
    alt: 'Avatar',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '24px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const colors: Array<{ color: string; label: string }> = [
      { color: 'green', label: 'Green (Success)' },
      { color: 'red', label: 'Red (Error)' },
      { color: 'blue', label: 'Blue (Info)' },
      { color: 'orange', label: 'Orange (Warning)' },
      { color: 'gray', label: 'Gray (Primary)' },
    ];
    
    colors.forEach(({ color, label }) => {
      const avatarContainer = document.createElement('div');
      avatarContainer.style.display = 'flex';
      avatarContainer.style.flexDirection = 'column';
      avatarContainer.style.alignItems = 'center';
      avatarContainer.style.gap = '8px';
      
      const labelEl = document.createElement('div');
      labelEl.style.fontSize = '12px';
      labelEl.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      labelEl.textContent = label;
      
      avatarContainer.innerHTML = renderAvatar({
        imageUrl: args.imageUrl,
        size: args.size || 'md',
        badgeColor: color,
        badgeContent: 3,
        alt: `Avatar con badge ${color}`,
      });
      
      avatarContainer.insertBefore(labelEl, avatarContainer.firstChild);
      preview.appendChild(avatarContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los colores de badge disponibles (green, red, blue, orange, gray).',
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
    imageUrl: 'https://i.pravatar.cc/150?img=19',
    size: 'md',
    badgeColor: 'green',
    badgeContent: 5,
    alt: 'Avatar completo',
  },
  render: (args) => {
    const options: Partial<AvatarOptions> = {
      ...args,
      onClick: () => {
        console.log('Avatar clicked');
      }
    };
    return renderAvatarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar completo con todas las opciones: imagen, tamaño, badge con color y contenido, alt text y callback onClick.',
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
    icon: 'user',
    size: 'md',
  },
  render: (args) => renderAvatarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar mínimo con solo icono y tamaño.',
      },
    },
  },
};

