import React, { useRef, useState } from 'react';
import HTMLFlipBook, { PageFlip } from 'react-pageflip';
import Page from './Page';

type BookProps = {
  width: number;
  height: number;
};

const Book: React.FC<BookProps> = ({ width, height }) => {
  const flipBook = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFlip = (e: { data: number; object: PageFlip }) => {
    setCurrentPage(e.data);
  };

  const nextButtonClick = () => {
    if (flipBook.current) {
      const pageFlip = flipBook.current.getPageFlip();
      pageFlip.flipNext();
    }
  };

  const prevButtonClick = () => {
    if (flipBook.current) {
      const pageFlip = flipBook.current.getPageFlip();
      pageFlip.flipPrev();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full h-full">
      <div className="relative shadow-2xl w-full max-w-6xl h-full max-h-[90vh]">
        <HTMLFlipBook
          width={width}
          height={height}
          size="stretch"
          minWidth={280}
          maxWidth={1500}
          minHeight={500}
          maxHeight={1800}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="book-container w-full h-full touch-pan-y"
          ref={flipBook}
          startPage={0}
          useMouseEvents={true}
          useTouchEvents={true}
          swipeDistance={30}
          showPageCorners={false}
          clickTouchForwarder={true}
        >
          {/* Portada: Primera página visible */}
          <Page number={1} className="page bg-gradient-to-r from-blue-500 to-purple-500 p-8">
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-8">YO QUIERO APRENDER</h1>
            </div>
          </Page>

          {/* Page 2 */}
          <Page number={2} className="page bg-white p-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">¡Hola, amiguito!</h2>
            <p className="text-xl text-center mb-8">¡Bienvenido a una aventura llena de diversión!</p>
            <div className="flex justify-center h-3/4">
              <img 
                src="/images/friends.svg" 
                alt="Niños saludando" 
                className="h-full w-auto object-contain"
              />
            </div>
          </Page>

          {/* Page 3 */}
          <Page number={3} className="page relative p-0 overflow-hidden">
            {/* Fondo de la página */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/fondo1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 1
              }}
            />
            {/* Contenido con fondo semitransparente más claro */}
            <div className="absolute inset-0 p-8 flex flex-col bg-white/70">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">El bosque encantado</h2>
              <p className="text-lg mb-6 text-center text-gray-700">
                Había una vez un bosque lleno de árboles mágicos y criaturas fantásticas. 
                Los niños adoraban jugar entre sus árboles coloridos.
              </p>
              <div className="flex-1 flex justify-center items-center">
                {/* <img 
                  src="/images/forest.svg" 
                  alt="Bosque encantado" 
                  className="h-3/4 w-auto object-contain"
                /> */}
              </div>
            </div>
          </Page>

          {/* 
            Página 4 - Video Interactivo
            Esta página muestra un video dentro del libro.
            Incluye un fondo con opacidad reducida y un reproductor de video centrado.
          */}
          <Page number={4} className="page relative p-0 overflow-hidden">
            {/* Fondo con imagen y opacidad reducida */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/fondo1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.7,
                WebkitBackfaceVisibility: 'hidden'  // Mejora el rendimiento en iOS
              }}
            />
            
            {/* Contenido principal con fondo semitransparente */}
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col bg-white/60">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-red-600">
                ¡Mira nuestra aventura!
              </h2>
              
              {/* Contenedor del video */}
              <div className="flex-1 flex justify-center items-center p-2">
                <div className="w-full max-w-sm bg-white/90 rounded-lg overflow-hidden shadow-xl">
                  <video 
                    autoPlay           // Reproduce automáticamente
                    controls           // Muestra controles de reproducción
                    muted              // Silencia el video por defecto
                    playsInline        // Evita el modo pantalla completa en iOS
                    className="w-full h-auto aspect-video object-cover"
                    poster="/images/video-poster.jpg"  // Imagen de portada
                    disablePictureInPicture  // Desactiva el modo picture-in-picture
                    controlsList="nodownload"  // Oculta la opción de descarga
                  >
                    <source src="/videos/Eimy.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                  </video>
                </div>
              </div>
            </div>
          </Page>

          {/* 
            Página 5
            Esta página muestra un título y un texto descriptivo.
          */}
          <Page number={5} className="page bg-white p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">El tesoro escondido</h2>
            <p className="text-lg mb-6 text-center">
              Los niños encontraron un mapa que los llevó hasta un cofre lleno de sorpresas.
              ¿Quieres saber qué encontraron dentro?
            </p>
            <div className="flex justify-center h-3/4">
              <img 
                src="/images/treasure.svg" 
                alt="Cofre del tesoro" 
                className="h-full w-auto object-contain"
              />
            </div>
          </Page>

          {/* Page 6 - Back Cover */}
          <Page number={6} className="page bg-gradient-to-r from-purple-500 to-blue-400 p-4 md:p-8">
            <div className="flex flex-col justify-center items-center h-full p-4 md:p-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
                ¡Fin de la aventura!
              </h2>
              <p className="text-xl sm:text-2xl text-white text-center mb-4">
                ¡Esperamos que hayas disfrutado este libro!
              </p>
              <p className="text-xl sm:text-2xl text-white text-center">
                Vuelve pronto para más aventuras
              </p>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Book;
