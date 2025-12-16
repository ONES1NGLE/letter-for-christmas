const book = document.getElementById('book');
        const cover = document.getElementById('cover');

        // Функция открытия
        function openBook() {
            book.classList.add('is-open');
        }

        // Функция закрытия
        function closeBook() {
            book.classList.remove('is-open');
        }

        // 1. Клик по обложке (открытие и закрытие)
        cover.addEventListener('click', () => {
            // Если книга закрыта - открываем
            if (!book.classList.contains('is-open')) {
                openBook();
            } else {
                // Если открыта и кликнули по левой части (изнанка обложки) - закрываем
                closeBook();
            }
        });

        // 2. Клик снаружи (по фону)
        document.addEventListener('click', (e) => {
            // Если клик был НЕ по книге и книга сейчас открыта
            if (!e.target.closest('.card') && book.classList.contains('is-open')) {
                closeBook();
            }
        });

        // 3. Нажатие клавишей Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && book.classList.contains('is-open')) {
                closeBook();
            }
        });

        // Генератор снега
        function createSnow() {
            const container = document.getElementById('snow-container');
            const symbols = ['❄', '❅', '❆', '•'];
            setInterval(() => {
                const flake = document.createElement('div');
                flake.classList.add('snowflake');
                flake.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                flake.style.left = Math.random() * 100 + 'vw';
                flake.style.fontSize = (Math.random() * 15 + 10) + 'px';
                flake.style.opacity = Math.random();
                const duration = Math.random() * 3 + 4; 
                flake.style.transition = `top ${duration}s linear, transform ${duration}s ease-in-out`;
                container.appendChild(flake);
                requestAnimationFrame(() => {
                    flake.style.top = '105vh';
                    flake.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
                });
                setTimeout(() => { flake.remove(); }, duration * 1000);
            }, 200);
        }
        createSnow();