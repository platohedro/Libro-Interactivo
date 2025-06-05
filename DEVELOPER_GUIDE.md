# Guía del Desarrollador

Bienvenido al proyecto del Libro Interactivo. Esta guía te proporcionará toda la información necesaria para entender y trabajar eficientemente en este proyecto.

## 🏗️ Estructura del Proyecto

```
.
├── public/                 # Archivos estáticos
│   ├── images/             # Imágenes del libro
│   └── videos/             # Videos del libro
├── src/
│   ├── app/               # Rutas y layouts de Next.js
│   ├── components/         # Componentes reutilizables
│   │   ├── Book.tsx        # Componente principal del libro
│   │   └── Page.tsx        # Componente de página individual
│   └── types/              # Definiciones de tipos TypeScript
├── .gitignore
├── README.md               # Documentación principal
├── DEVELOPER_GUIDE.md      # Esta guía
└── package.json            # Dependencias y scripts
```

## 📚 Componentes Principales

### Book.tsx

El componente principal que gestiona la lógica del libro interactivo.

**Características principales:**
- Gestión del estado de la página actual
- Configuración de animaciones y efectos de página
- Manejo de eventos táctiles y de ratón
- Responsividad para diferentes tamaños de pantalla

### Page.tsx

Componente base para las páginas del libro.

**Props principales:**
- `number`: Número de página
- `className`: Clases CSS adicionales
- `children`: Contenido de la página

## 🎨 Estilos y Diseño

- **Tailwind CSS**: Utilizamos clases de utilidad de Tailwind para los estilos.
- **Responsive Design**: El diseño se adapta a móviles, tablets y escritorio.
- **Variables CSS**: Usamos variables CSS para colores y dimensiones comunes.

## 🛠️ Convenciones de Código

### Nombrado de Archivos
- Componentes: `PascalCase.tsx` (ej: `MiComponente.tsx`)
- Utilidades: `camelCase.ts` (ej: `formatDate.ts`)
- Tipos: `kebab-case.d.ts` (ej: `custom-types.d.ts`)

### Estructura de Componentes

```tsx
/**
 * Descripción del componente
 * @component
 * @example
 * // Ejemplo de uso
 * <MiComponente prop1="valor" />
 */
import React from 'react';

interface MiComponenteProps {
  /** Descripción de la prop */
  prop1: string;
}

const MiComponente: React.FC<MiComponenteProps> = ({ prop1 }) => {
  // Lógica del componente
  return <div>{prop1}</div>;
};

export default MiComponente;
```

## 🚀 Despliegue

El proyecto está configurado para desplegarse en Vercel. Cualquier push a la rama `main` desencadenará un despliegue automático.

## 🔍 Pruebas

Para ejecutar las pruebas:

```bash
bun test
# o
npm test
```

## 🤝 Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Notas Adicionales

- Siempre documenta los nuevos componentes y funciones
- Mantén el código limpio y organizado
- Sigue las convenciones de código establecidas
- Prueba tus cambios en diferentes dispositivos y navegadores

## 📞 Soporte

Para problemas o preguntas, por favor abre un issue en el repositorio.
