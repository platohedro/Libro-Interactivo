# Libro Interactivo - Yo Quiero Aprender

![Portada del Libro](/public/images/fondo1.jpg)

Un libro interactivo desarrollado con Next.js y React Pageflip que ofrece una experiencia de lectura inmersiva y atractiva para los usuarios.

## 🚀 Características

- **Interfaz tipo libro** con animaciones de volteo de página
- **Diseño completamente responsivo** que funciona en móviles, tablets y escritorio
- **Contenido multimedia** que incluye imágenes y videos
- **Temas claros y accesibles** con tipografía legible
- **Navegación intuitiva** con gestos táctiles y controles de ratón

## 🛠️ Tecnologías Utilizadas

- [Next.js](https://nextjs.org) - Framework de React
- [React Pageflip](https://github.com/react-pageflip/react-pageflip) - Efecto de libro interactivo
- [TypeScript](https://www.typescriptlang.org) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com) - Estilos utilitarios
- [Bun](https://bun.sh) - Entorno de ejecución y gestor de paquetes

## 📁 Estructura del Proyecto

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
├── README.md               # Este archivo
└── package.json            # Dependencias y scripts
```

## 🚀 Comenzando

### Requisitos previos

- Node.js 16.8 o superior
- Bun (recomendado) o npm/yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Libro-Interactivo
   ```

2. Instala las dependencias:
   ```bash
   bun install
   # o
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   bun run dev
   # o
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🧑‍💻 Desarrollo

### Scripts disponibles

- `bun dev` - Inicia el servidor de desarrollo
- `bun build` - Construye la aplicación para producción
- `bun start` - Inicia el servidor de producción
- `bun lint` - Ejecuta el linter

### Convenciones de código

- **Componentes**: Usar PascalCase (ej. `MiComponente.tsx`)
- **Estilos**: Usar clases de Tailwind CSS
- **Tipos**: Definir interfaces para props de componentes
- **Comentarios**: Documentar funciones complejas y lógica de negocio

## 📝 Notas para desarrolladores

1. **Archivos de respaldo**: Los archivos con extensión `.backup` o `.temp` son copias de seguridad y pueden eliminarse.
2. **Imágenes**: Optimizar imágenes antes de subirlas al repositorio.
3. **Videos**: Mantener los videos en formato MP4 con compresión adecuada.
4. **Responsive**: Probar en dispositivos móviles, tablets y escritorio.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## ✨ Créditos

- [React Pageflip](https://github.com/react-pageflip/react-pageflip) - Por la increíble biblioteca de efectos de libro
- [Next.js](https://nextjs.org) - Por el framework de React
- [Tailwind CSS](https://tailwindcss.com) - Por los estilos utilitarios
