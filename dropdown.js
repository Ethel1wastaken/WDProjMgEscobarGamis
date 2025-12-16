const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    })

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            // Navigate to the href if the link exists and is not a placeholder
            if (link && link.href && link.href !== '#' && !link.href.endsWith('#')) {
                window.location.href = link.href;
            }
            e.preventDefault();
            const link = option.querySelector('a');
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active'); 
        });     
    });
});