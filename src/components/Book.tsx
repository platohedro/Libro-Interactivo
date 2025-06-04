import React, { useRef, useState } from 'react';
import HTMLFlipBook, { PageFlip } from 'react-pageflip';
import Page from './Page';

type BookProps = {
  width: number;
  height: number;
};

const Book: React.FC<BookProps> = ({ width, height }) => {
  const flipBook = useRef<any>(null); // Usamos any ya que el tipo exacto del componente es complicado
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
          minWidth={300}
          maxWidth={1500}
          minHeight={400}
          maxHeight={1800}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="book-container w-full h-full"
          ref={flipBook}
          startPage={0}
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
          <Page number={3} className="page bg-white p-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-green-600">El bosque encantado</h2>
            <p className="text-lg mb-6 text-center">
              Había una vez un bosque lleno de árboles mágicos y criaturas fantásticas. 
              Los niños adoraban jugar entre sus árboles coloridos.
            </p>
            <div className="flex justify-center h-3/4">
              <img 
                src="/images/forest.svg" 
                alt="Bosque encantado" 
                className="h-full w-auto object-contain"
              />
            </div>
          </Page>

          {/* Page 4 - Video Page */}
          <Page number={4} className="page bg-white p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-red-600">¡Mira nuestra aventura!</h2>
            <div className="flex justify-center items-center h-full">
              <div className="w-full max-w-sm bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <video 
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/images/video-poster.jpg"
                >
                  <source src="/videos/Eimy.mp4" type="video/mp4" />
                  Tu navegador no soporta videos HTML5.
                </video>
              </div>
            </div>
          </Page>

          {/* Page 5 */}
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
          <Page number={6} className="page bg-gradient-to-r from-purple-500 to-blue-400 p-8">
            <div className="flex flex-col justify-center items-center h-full p-8">
              <h2 className="text-4xl font-bold text-white text-center mb-8">¡Fin de la aventura!</h2>
              <p className="text-2xl text-white text-center mb-4">¡Esperamos que hayas disfrutado este libro!</p>
              <p className="text-2xl text-white text-center">Vuelve pronto para más aventuras</p>
            </div>
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
