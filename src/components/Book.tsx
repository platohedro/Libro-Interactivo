import React, { useState, useRef } from 'react';
import HTMLFlipBook, { PageFlip } from 'react-pageflip';
import Page from './Page';

type BookProps = {
  width?: number;
  height?: number;
};

const Book: React.FC<BookProps> = ({ width = 1000, height = 600 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlayingPuzzle, setIsPlayingPuzzle] = useState(false);
  const flipBook = useRef<PageFlip>(null);

  const handleFlip = (e: { data: number }) => {
    const newPage = e.data;
    // Si estamos entrando o saliendo de la página del puzzle
    if (newPage === 6 || currentPage === 6) {
      setIsPlayingPuzzle(newPage === 6);
    }
    setCurrentPage(newPage);
  };

  // const shouldFlip = (_forward: boolean) => {
  //   // Si estamos en la página del puzzle, no permitir cambio
  //   if (currentPage === 6) {
  //     return false;
  //   }
  //   return true;
  // };


  return (
    <div className="flex flex-col items-center p-4 w-full h-full">
      <div className="relative shadow-2xl w-full max-w-6xl h-full max-h-[90vh]">
        <HTMLFlipBook
          width={width}
          height={height}
          size="stretch"
          minWidth={300}
          maxWidth={1500}
          minHeight={400}
          maxHeight={1800}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={!isPlayingPuzzle}
          onFlip={handleFlip}
          swipeDistance={isPlayingPuzzle ? 0 : 50}
          flippingTime={1000}
          usePortrait={true}
          autoSize={true}
          ref={flipBook}
          startPage={0}
          clickEventForward={!isPlayingPuzzle}
          disableFlipByClick={isPlayingPuzzle}
        >
          {/* Portada: Primera página visible */}
          <Page number={1} className="page bg-black">
            <div className="h-full w-full">
              <video autoPlay muted loop className="h-full w-full object-cover">
                <source src="/videos/aprender.mp4" type="video/mp4" />
              </video>
            </div>
          </Page>

{/*      
          <Page number={2} className="page relative p-0 overflow-hidden">
       
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/fondo1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.7,
                WebkitBackfaceVisibility: 'hidden'
              }}
            />
            
       
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col bg-white/60">
              <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">¡Hola, amiguito!</h2>
              <p className="text-xl text-center mb-8">¡Bienvenido a una aventura llena de diversión!</p>
              <div className="flex justify-center h-3/4">
                <img 
                  src="/images/friends.svg" 
                  alt="Niños saludando" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </Page> */}

          {/* Page 3 */}


          <Page number={3} className="page relative p-0 overflow-hidden">
            {/* Fondo con imagen y opacidad reducida */}
            <video autoPlay  loop className="h-full w-full object-cover">
              <source src="/videos/page2.mp4" type="video/mp4" />
            </video>
          </Page>

          {/* Page 4 - Video Page */}
          <Page number={4} className="page relative p-0 overflow-hidden">
            {/* Fondo con imagen y opacidad reducida */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/aprender.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // opacity: 0.1,
                WebkitBackfaceVisibility: 'hidden'  // Mejora el rendimiento en iOS
              }}
            />
            
            {/* Contenido principal con fondo semitransparente */}
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col bg-white/60">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-red-600">
              
              </h2>
              
              {/* Contenedor del video */}
              <div className="flex-1 flex justify-center items-center p-2">
                <div className="w-full max-w-sm bg-white/90 rounded-lg overflow-hidden shadow-xl">
                  <video 
                    autoPlay           // Reproduce automáticamente
                    controls           // Muestra controles de reproducción
                                // Silencia el video por defecto
                    playsInline        // Evita el modo pantalla completa en iOS
                   
                    disablePictureInPicture  // Desactiva el modo picture-in-picture
                    controlsList="nodownload"  // Oculta la opción de descarga
                    style={{height: 'auto', width: '100vw'}}
                  >
                    <source src="/videos/Eimy.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                  </video>
                </div>
              </div>
            </div>
          </Page>

          {/* Page 5 */}
          {/* <Page number={5} className="page bg-white p-8">
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
          </Page> */}

      
          {/* <Page number={6} className="page relative p-0 overflow-hidden">
           
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/fondo1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.7,
                WebkitBackfaceVisibility: 'hidden'
              }}
            />
            
       
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col bg-white/60">
              <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">¡Arma el Puzle!</h2>
              
              <div className="bg-white/90 rounded-xl p-6 shadow-lg mb-8 max-w-md mx-auto border border-indigo-200">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">Instrucciones:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-800">
                  <li>En la siguiente página encontrarás los elementos para armar una lámpara mágica.</li>
                  <li>Debes arrastrar cada elemento en el orden correcto.</li>
                  <li>El orden es: Jarra → Agua → Aceite → Pastilla → Tapa</li>
                  <li>¡Completa el puzle para ver la magia!</li>
                </ol>
              </div>
              
              <div className="w-40 h-40 mx-auto bg-gradient-to-b from-indigo-200 to-blue-300 rounded-lg flex items-center justify-center shadow-inner border-4 border-white">
                <span className="text-6xl">🧩</span>
              </div>
              
              <p className="mt-6 text-center text-indigo-700 font-medium text-lg">
                ¡Pasa la página para comenzar el puzle!
              </p>
            </div>
          </Page> */}

          {/* Página 7 - Juego del Puzle */}
          {/* <Page 
            number={7} 
            className="page relative p-0 overflow-hidden"
          >

            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/fondo1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.7,
                WebkitBackfaceVisibility: 'hidden'
              }}
            />
            

            <div 
              className="absolute inset-0 p-4 md:p-8 flex flex-col bg-white/60"
              style={{ pointerEvents: 'none' }}
            >
              <div 
                className="relative w-full h-full"
                style={{ pointerEvents: 'auto' }}
              >
                <h2 className="text-2xl font-bold text-center mb-4 text-indigo-800">¡Arma la Lámpara Mágica!</h2>
                <div 
                  className="w-full h-[calc(100%-4rem)] bg-white/90 rounded-lg shadow-lg overflow-hidden puzzle-game-container"
                  style={{
                    touchAction: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  <PuzzleGame />
                </div>
              </div>
            </div>
          </Page> */}

          {/* Page 6 - Back Cover */}
          <Page number={5}className="page relative p-0 overflow-hidden">
            {/* Fondo con imagen y opacidad reducida */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/aprender.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // opacity: 0.1,
                WebkitBackfaceVisibility: 'hidden'  // Mejora el rendimiento en iOS
              }}
                
            />
            </Page>
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      {/* <div className="mt-8 flex justify-center space-x-8">
        <button 
          onClick={prevButtonClick}
          className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 0}
        >
          ← Anterior
        </button>
        <button 
          onClick={nextButtonClick}
          className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 6}
        >
          Siguiente →
        </button>
      </div> */}
    </div>
  );
};

export default Book;
