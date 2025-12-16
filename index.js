const book = document.getElementById('book');

// --- Управление состоянием ---

function openBook() {
    book.classList.add('is-open');
}

function closeBook() {
    book.classList.remove('is-open');
}

// --- Обработчик кликов ---

book.addEventListener('click', (e) => {
    // Определяем, на какой части книги произошел клик
    const isCoverFront = e.target.closest('.cover-front'); // Лицевая сторона (красная)
    const isCoverBack = e.target.closest('.cover-back');   // Обратная сторона (левая белая страница)
    const isRightPage = e.target.closest('.right-page');   // Правая страница (письмо)

    // Проверяем, это мобильное устройство или нет (используем медиа-запрос из CSS)
    const isMobile = window.innerWidth <= 768; 

    // 1. ОТКРЫТИЕ: Всегда по лицевой стороне, если книга закрыта
    if (!book.classList.contains('is-open') && isCoverFront) {
        openBook();
        e.stopPropagation(); 
        return;
    } 
    
    // --- ЛОГИКА ЗАКРЫТИЯ ---
    
    // Если книга ОТКРЫТА:
    if (book.classList.contains('is-open')) {
        
        let shouldClose = false;

        if (isMobile) {
            // НА МОБИЛЬНОМ: Закрытие по правой стороне (письмо).
            // Добавляем проверку, что клик был не на скроллбаре или мелком интерактивном элементе.
            if (isRightPage) {
                // Если клик был внутри правой страницы, закрываем.
                shouldClose = true; 
            }
        } else {
            // НА ДЕСКТОПЕ: Закрытие по левой стороне (изнанка обложки).
            if (isCoverBack) {
                shouldClose = true;
            }
        }
        
        if (shouldClose) {
            closeBook();
            e.stopPropagation(); 
            return;
        }
        
        // Предотвращаем всплытие (чтобы не закрылось по фону), если клик был внутри книги
        // и не вызвал закрытие (например, если кликнули по письму на десктопе, 
        // или по левой странице на мобильном).
        e.stopPropagation();
    }
});


// 2. Клик снаружи (по фону) - ОСТАВЛЯЕМ БЕЗ ИЗМЕНЕНИЙ
document.addEventListener('click', (e) => {
    // Если клик был НЕ по книге и книга сейчас открыта
    if (!e.target.closest('.card') && book.classList.contains('is-open')) {
        closeBook();
    }
});

// 3. Нажатие клавишей Esc - ОСТАВЛЯЕМ БЕЗ ИЗМЕНЕНИЙ
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && book.classList.contains('is-open')) {
        closeBook();
    }
});

// Генератор снега
function createSnow() {
    // ВАЖНО: Получаем контейнер
    const container = document.getElementById('snow-container'); 
    const symbols = ['❄', '❅', '❆', '•'];
    
    // Интервал для создания новых снежинок
    setInterval(() => {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Рандомизация стилей (позиция, размер, прозрачность)
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = (Math.random() * 15 + 10) + 'px';
        flake.style.opacity = Math.random();
        
        // Настройка анимации
        const duration = Math.random() * 3 + 4; 
        flake.style.transition = `top ${duration}s linear, transform ${duration}s ease-in-out`;
        
        // КЛЮЧЕВОЙ ШАГ: Добавление снежинки в контейнер
        container.appendChild(flake); 
        
        // Запуск анимации (меняем позицию TOP)
        requestAnimationFrame(() => {
            flake.style.top = '105vh';
            flake.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
        });
        
        // Удаление снежинки после завершения анимации
        setTimeout(() => { flake.remove(); }, duration * 1000);
    }, 200);
}
createSnow();