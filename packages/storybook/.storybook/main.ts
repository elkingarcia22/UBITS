import type { StorybookConfig } from '@storybook/html-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { ignoreTsconfigNodeJsonPlugin } from './plugins/ignore-tsconfig-node-json';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {}
  },
  staticDirs: [
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../stories/assets/images'), 
      to: '/images' 
    },
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../stories/assets/webfonts'), 
      to: '/webfonts' 
    },
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../../templates'), 
      to: '/templates' 
    }
  ],
  viteFinal: async (config) => {
    // Configurar alias para que 'addons' apunte a 'components'
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const rootDir = resolve(currentDir, '../..');
    const projectRoot = resolve(rootDir, '..');
    
    // Agregar directorios estáticos adicionales usando projectRoot
    const tokensDir = resolve(projectRoot, 'packages/tokens/dist');
    const typographyDir = resolve(projectRoot, 'packages/typography');
    const componentsDir = resolve(projectRoot, 'packages/components');
    const templatesDir = resolve(projectRoot, 'packages/templates');
    
    // Agregar a staticDirs dinámicamente (no se puede hacer en la configuración inicial)
    // En su lugar, usaremos middleware de Vite
    
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Mapear addons a components - esto permite que las stories usen '../../addons/...'
      '../../addons': resolve(projectRoot, 'packages/components'),
    };
    
    // Agregar plugin personalizado para ignorar tsconfig.node.json
    config.plugins = config.plugins || [];
    config.plugins.push(ignoreTsconfigNodeJsonPlugin());
    
    // Asegurar que Vite puede resolver módulos TypeScript correctamente
    config.resolve.conditions = config.resolve.conditions || [];
    if (!config.resolve.conditions.includes('import')) {
      config.resolve.conditions.push('import');
    }
    
    // Configurar server para manejar mejor las rutas con espacios
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = config.server.fs.allow || [];
    // Permitir acceso al directorio raíz completo
    config.server.fs.allow.push(projectRoot);
    // También permitir acceso a directorios padre por si acaso
    config.server.fs.allow.push(resolve(projectRoot, '..'));
    config.server.fs.allow.push(tokensDir);
    config.server.fs.allow.push(typographyDir);
    config.server.fs.allow.push(componentsDir);
    config.server.fs.allow.push(templatesDir);
    
    // Agregar middleware para servir recursos y modificar las rutas de los templates
    config.plugins.push({
      name: 'serve-template-resources',
      configureServer(server: any) {
        const fs = require('fs');
        const path = require('path');
        
        
        // Servir tokens
        // IMPORTANTE: tokensDir ya apunta a packages/tokens/dist
        // Las URLs vienen como /tokens/tokens.css (sin /dist/)
        server.middlewares.use('/tokens', (req: any, res: any, next: any) => {
          // req.url viene como "/tokens.css" o "/tokens.css" después del middleware
          const relativePath = req.url.replace(/^\//, '');
          const filePath = path.resolve(tokensDir, relativePath);
          console.log(`🔍 [Middleware] Serviendo token: ${req.url} -> ${filePath}`);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'text/plain');
            res.end(fs.readFileSync(filePath));
            console.log(`✅ [Middleware] Token servido: ${req.url}`);
          } else {
            console.error(`❌ [Middleware] Token NO encontrado: ${req.url} -> ${filePath}`);
            next();
          }
        });
        
        // Servir typography
        server.middlewares.use('/typography', (req: any, res: any, next: any) => {
          const filePath = path.resolve(typographyDir, req.url.replace(/^\//, ''));
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'text/plain');
            res.end(fs.readFileSync(filePath));
          } else {
            next();
          }
        });
        
        // Servir components
        server.middlewares.use('/components', (req: any, res: any, next: any) => {
          const filePath = path.resolve(componentsDir, req.url.replace(/^\//, ''));
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'text/plain');
            res.end(fs.readFileSync(filePath));
          } else {
            next();
          }
        });
        
        // Servir y modificar templates HTML
        server.middlewares.use('/templates', (req: any, res: any, next: any) => {
          const url = req.url || '';
          if (url.endsWith('.html')) {
            const filePath = path.resolve(templatesDir, url.replace(/^\//, ''));
            
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              let html = fs.readFileSync(filePath, 'utf-8');
              
              // Reemplazar rutas relativas por rutas absolutas desde Storybook
              // IMPORTANTE: Reemplazar primero las rutas más específicas (con /dist/)
              // Los tokens están en /tokens/dist/ pero el middleware los sirve desde /tokens/
              html = html.replace(/href="\.\.\/tokens\/dist\//g, 'href="/tokens/');
              html = html.replace(/href="\.\.\/tokens\//g, 'href="/tokens/');
              html = html.replace(/href="\.\.\/typography\//g, 'href="/typography/');
              html = html.replace(/href="\.\.\/components\//g, 'href="/components/');
              html = html.replace(/src="\.\.\/tokens\/dist\//g, 'src="/tokens/');
              html = html.replace(/src="\.\.\/tokens\//g, 'src="/tokens/');
              html = html.replace(/src="\.\.\/typography\//g, 'src="/typography/');
              html = html.replace(/src="\.\.\/components\//g, 'src="/components/');
              html = html.replace(/href="assets\//g, 'href="/templates/assets/');
              html = html.replace(/src="assets\//g, 'src="/templates/assets/');
              html = html.replace(/src="components-loader\.js/g, 'src="/templates/components-loader.js');
              html = html.replace(/src="config\//g, 'src="/templates/config/');
              html = html.replace(/src="engine\//g, 'src="/templates/engine/');
              
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(html);
              return;
            }
          }
          next();
        });
      }
    });
    
    // Deshabilitar overlay de errores completamente para evitar problemas intermitentes
    config.server.hmr = config.server.hmr || {};
    config.server.hmr.overlay = false;
    
    // También deshabilitar errores en la consola del servidor
    config.logLevel = 'warn';
    
    // Configurar esbuild para evitar buscar tsconfig.node.json
    config.esbuild = config.esbuild || {};
    config.esbuild.tsconfigRaw = {
      compilerOptions: {
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
      },
    };
    
    // Configurar optimización para mejorar la resolución de módulos
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    
    // Asegurar que Vite puede resolver extensiones .ts
    config.resolve.extensions = config.resolve.extensions || ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'];
    if (!config.resolve.extensions.includes('.ts')) {
      config.resolve.extensions.push('.ts');
    }
    
    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;

