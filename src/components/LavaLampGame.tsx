import React, { useState, useEffect } from 'react';

type LavaLampItem = {
  id: string;
  emoji: string;
  label: string;
};

const LAVA_LAMP_ORDER = ['jarra', 'agua', 'aceite', 'pastilla'];
const LAVA_LAMP_ITEMS: LavaLampItem[] = [
  { id: 'jarra', emoji: '🏺', label: 'Jarra' },
  { id: 'agua', emoji: '💧', label: 'Agua' },
  { id: 'aceite', emoji: '🛢️', label: 'Aceite' },
  { id: 'pastilla', emoji: '💊', label: 'Pastilla' }
];

const LavaLampGame: React.FC = () => {
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lamparaContent, setLamparaContent] = useState<React.ReactNode[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Prevenir la propagación de eventos táctiles y de ratón solo para elementos interactivos
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation?.();
    return false;
  };
  
  // Manejar el inicio del arrastre
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    
    const target = e.currentTarget as HTMLElement;
    target.classList.add('opacity-50');
    
    // Crear un elemento de arrastre personalizado
    const dragImage = document.createElement('div');
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-9999px';
    dragImage.style.left = '-9999px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    
    // Limpiar después de un tiempo
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };
  
  // Manejar el final del arrastre
  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('opacity-50');
    setIsDragging(false);
  };
  
  // Efecto para verificar si el juego está completo
  useEffect(() => {
    if (addedItems.length === LAVA_LAMP_ORDER.length) {
      const isCorrect = LAVA_LAMP_ORDER.every((item, index) => item === addedItems[index]);
      if (isCorrect) {
        setGameCompleted(true);
        setShowSuccess(true);
        
        // Agregar animación de lámpara de lava exitosa
        const newContent = [
          <div key="lava-lamp" className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl animate-lava-flow">
              🌋
            </div>
          </div>
        ];
        setLamparaContent(newContent);
      } else {
        // Si el orden es incorrecto, reiniciar después de un breve retraso
        setTimeout(() => {
          resetLavaLampGame();
        }, 1000);
      }
    }
  }, [addedItems]);
  
  // Manejar cuando se suelta un elemento en la lámpara
  const handleLavaLampItemDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const itemId = e.dataTransfer.getData('text/plain');
    
    // Solo agregar si el ítem sigue el orden correcto
    const nextExpectedItem = LAVA_LAMP_ORDER[addedItems.length];
    if (itemId === nextExpectedItem) {
      const newItems = [...addedItems, itemId];
      setAddedItems(newItems);
      
      // Actualizar la vista con el nuevo elemento
      const item = LAVA_LAMP_ITEMS.find(i => i.id === itemId);
      if (item) {
        const newContent = [...lamparaContent];
        newContent.push(
          <div 
            key={`${itemId}-${Date.now()}`} 
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
          >
            <div className="text-6xl">
              {item.emoji}
            </div>
          </div>
        );
        setLamparaContent(newContent);
      }
    }
  };
  
  // Manejar el arrastre sobre la lámpara
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget as HTMLElement;
    target.classList.add('border-orange-500', 'bg-orange-50');
  };
  
  // Manejar cuando el arrastre sale de la lámpara
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('border-orange-500', 'bg-orange-50');
  };
  
  // Reiniciar el juego
  const resetLavaLampGame = () => {
    setAddedItems([]);
    setGameCompleted(false);
    setShowSuccess(false);
    setLamparaContent([]);
  };

  return (
    <div 
      className="h-full w-full flex flex-col game-area"
      onTouchStart={isDragging ? handleInteraction : undefined}
      onTouchMove={isDragging ? handleInteraction : undefined}
      onTouchEnd={isDragging ? handleInteraction : undefined}
      onMouseDown={isDragging ? handleInteraction : undefined}
      onMouseMove={isDragging ? handleInteraction : undefined}
      onMouseUp={isDragging ? handleInteraction : undefined}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-700">¡Arma tu Lámpara de Lava!</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6 mt-2">
        {LAVA_LAMP_ITEMS.map((item) => {
          const isUsed = addedItems.includes(item.id);
          return (
            <div 
              key={item.id}
              id={item.id}
              className={`p-4 bg-white rounded-lg shadow-md flex flex-col items-center cursor-grab active:cursor-grabbing select-none ${
                isUsed ? 'opacity-50' : ''
              }`}
              draggable={!gameCompleted && !isUsed}
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
              onClick={handleInteraction}
              onTouchStart={handleInteraction}
              onTouchMove={handleInteraction}
              onTouchEnd={handleInteraction}
              onTouchCancel={handleInteraction}
              style={{
                WebkitUserSelect: 'none',
                userSelect: 'none',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <span className="text-4xl mb-2 pointer-events-none">{item.emoji}</span>
              <span className="text-sm font-medium text-gray-700 pointer-events-none">{item.label}</span>
            </div>
          );
        })}
      </div>
      
      <div 
        id="lampara"
        className="relative flex-1 bg-gradient-to-b from-amber-50 to-orange-100 rounded-lg border-2 border-dashed border-orange-300 flex flex-col items-center justify-center overflow-hidden"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleLavaLampItemDrop}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
        onTouchEnd={handleInteraction}
        onMouseDown={handleInteraction}
        onMouseMove={handleInteraction}
        onMouseUp={handleInteraction}
      >
        <div id="lampara-contenido" className="w-full h-full relative overflow-hidden">
          {lamparaContent}
        </div>
        {!gameCompleted && (
          <p className="text-orange-400 font-medium text-center p-4">
            Arrastra los elementos aquí en el orden correcto
          </p>
        )}
      </div>
      
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-sm text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">¡Felicidades!</h3>
            <p className="text-gray-700 mb-4">¡Has creado una hermosa lámpara de lava!</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                resetLavaLampGame();
              }}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LavaLampGame;
