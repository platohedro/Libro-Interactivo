import React, { useState, useRef, useEffect, type ReactNode } from 'react';

type DraggableItem = {
  id: string;
  name: string;
  emoji: string;
};

const CORRECT_ORDER = ['jarra', 'agua', 'aceite', 'pastilla', 'tapa'] as const;

const DRAGGABLE_ITEMS: DraggableItem[] = [
  { id: 'jarra', name: 'Jarra', emoji: '🫖' },
  { id: 'agua', name: 'Agua', emoji: '💧' },
  { id: 'aceite', name: 'Aceite', emoji: '🛢️' },
  { id: 'pastilla', name: 'Pastilla', emoji: '💊' },
  { id: 'tapa', name: 'Tapa', emoji: '🔲' },
];

const PuzzleGame = (): ReactNode => {
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [isValidDrop, setIsValidDrop] = useState<boolean | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Prevenir el cambio de página durante el juego
  useEffect(() => {
    const preventPageFlip = (e: TouchEvent) => {
      if (gameAreaRef.current?.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };

    document.addEventListener('touchstart', preventPageFlip, { capture: true });
    document.addEventListener('touchmove', preventPageFlip, { capture: true });
    document.addEventListener('touchend', preventPageFlip, { capture: true });

    return () => {
      document.removeEventListener('touchstart', preventPageFlip, { capture: true });
      document.removeEventListener('touchmove', preventPageFlip, { capture: true });
      document.removeEventListener('touchend', preventPageFlip, { capture: true });
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent, itemId: string) => {
    if (!itemId || addedItems.includes(itemId)) return;

    e.stopPropagation();
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setDraggedItem(itemId);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isDragging || !draggedItem || !touchStartPos) {
      setIsDragging(false);
      setDraggedItem(null);
      setTouchStartPos(null);
      return;
    }

    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropArea = gameAreaRef.current?.querySelector('.drop-area');

    if (dropArea?.contains(dropTarget)) {
      const nextExpectedItem = CORRECT_ORDER[addedItems.length];
      if (draggedItem === nextExpectedItem) {
        const newItems = [...addedItems, draggedItem];
        setAddedItems(newItems);
        setIsValidDrop(true);
        
        if (newItems.length === CORRECT_ORDER.length) {
          setHasWon(true);
        }
      } else {
        setIsValidDrop(false);
        setTimeout(() => setIsValidDrop(null), 1000);
      }
    }

    setIsDragging(false);
    setDraggedItem(null);
    setTouchStartPos(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.setData('text/plain', itemId);
    setDraggedItem(itemId);
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const itemId = e.dataTransfer.getData('text/plain');
    const nextExpectedItem = CORRECT_ORDER[addedItems.length];
    
    if (itemId === nextExpectedItem) {
      const newItems = [...addedItems, itemId];
      setAddedItems(newItems);
      setIsValidDrop(true);
      
      if (newItems.length === CORRECT_ORDER.length) {
        setHasWon(true);
      }
    } else {
      setIsValidDrop(false);
      setTimeout(() => setIsValidDrop(null), 1000);
    }
    
    setIsDragging(false);
    setDraggedItem(null);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDraggedItem(null);
  };

  const resetGame = () => {
    setAddedItems([]);
    setHasWon(false);
    setIsValidDrop(null);
    setDraggedItem(null);
  };

  return (
    <div 
      ref={gameAreaRef}
      className="w-full h-full flex flex-col items-center justify-center gap-8 p-4"
      style={{ touchAction: 'none' }}
    >
      {/* Área de destino */}
      <div 
        className={`drop-area w-64 h-64 border-4 rounded-lg flex items-center justify-center transition-all ${
          isValidDrop === true ? 'border-green-500 bg-green-100' :
          isValidDrop === false ? 'border-red-500 bg-red-100' :
          'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {hasWon ? (
          <div className="text-center">
            <p className="text-4xl mb-2">🎉</p>
            <p className="text-xl font-bold text-green-600">¡Lo lograste!</p>
            <button 
              onClick={resetGame}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Jugar de nuevo
            </button>
          </div>
        ) : addedItems.length > 0 ? (
          <div className="flex flex-col items-center gap-2">
            {addedItems.map((item, index) => {
              const itemData = DRAGGABLE_ITEMS.find(i => i.id === item);
              return (
                <div key={index} className="text-2xl">
                  {itemData?.emoji}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Arrastra los elementos aquí<br/>
            en el orden correcto
          </p>
        )}
      </div>

      {/* Elementos arrastrables */}
      <div className="flex flex-wrap gap-4 justify-center">
        {DRAGGABLE_ITEMS.map((item) => {
          const isAdded = addedItems.includes(item.id);
          const isNext = !isAdded && item.id === CORRECT_ORDER[addedItems.length];
          const isDraggingThis = draggedItem === item.id;
          
          return (
            <div
              key={item.id}
              className={`
                w-16 h-16
                flex items-center justify-center
                text-2xl
                border-2 rounded-lg
                cursor-grab
                transition-all
                ${
                  isAdded
                    ? 'opacity-50 cursor-not-allowed'
                    : isDraggingThis
                    ? 'opacity-75 scale-110'
                    : isNext
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white'
                }
              `}
              draggable={!isAdded}
              onDragStart={(e) => !isAdded && handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => !isAdded && handleTouchStart(e, item.id)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {item.emoji}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleGame;
