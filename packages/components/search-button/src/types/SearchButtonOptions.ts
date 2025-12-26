/**
 * Opciones para crear un Search Button
 */
export interface SearchButtonOptions {
  /**
   * Si el botón está en modo activo (muestra input)
   */
  active?: boolean;
  
  /**
   * Tamaño del botón
   */
  size?: 'sm' | 'md';
  
  /**
   * Estado del botón
   */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  
  /**
   * Si el botón está deshabilitado
   */
  disabled?: boolean;
  
  /**
   * Placeholder del input cuando está activo
   */
  placeholder?: string;
  
  /**
   * Valor del input cuando está activo
   */
  value?: string;
  
  /**
   * Ancho del input cuando está activo (en px)
   */
  width?: number;
  
  /**
   * Callback cuando cambia el valor del input
   */
  onChange?: (event: Event) => void;
  
  /**
   * Callback cuando se hace click en el botón
   */
  onClick?: (event: MouseEvent) => void;
  
  /**
   * Callback cuando el input recibe focus
   */
  onFocus?: (event: FocusEvent) => void;
  
  /**
   * Callback cuando el input pierde focus
   */
  onBlur?: (event: FocusEvent) => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * ID del contenedor donde se renderizará el botón
   */
  containerId?: string;
  
  /**
   * Contenedor directo (HTMLElement) donde se renderizar? el bot?n
   * Tiene prioridad sobre containerId
   */
  container?: HTMLElement;

  /**
   * Mostrar bot?n de filtro al lado derecho del SearchButton
   */
  showFilterButton?: boolean;

  /**
   * Callback cuando se hace click en el bot?n de filtro
   */
  onFilterClick?: (event: MouseEvent) => void;

  /**
   * Mostrar bot?n de crear al lado derecho del SearchButton
   */
  showCreateButton?: boolean;

  /**
   * Callback cuando se hace click en el bot?n de crear
   */
  onCreateClick?: (event: MouseEvent) => void;
}

