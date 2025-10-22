document.addEventListener('DOMContentLoaded', () => {
    const packs = document.querySelectorAll('.pack');
    const prevButton = document.getElementById('bk');
    const nextButton = document.getElementById('fw');
    let currentPack = 0;
    let autoSlide = setInterval(nextPack, 2000);

    function showPack(index) {
        packs.forEach((pack, i) => {
            pack.classList.remove('active');
            if (i === index) {
                pack.classList.add('active');
            }
        });
    }

    function nextPack() {
        currentPack = (currentPack + 1) % packs.length;
        showPack(currentPack);
    }

    function prevPack() {
        currentPack = (currentPack - 1 + packs.length) % packs.length;
        showPack(currentPack);
    }

    nextButton.addEventListener('click', () => {
        nextPack();
        clearInterval(autoSlide);
        autoSlide = setInterval(nextPack, 2000);
    });

    prevButton.addEventListener('click', () => {
        prevPack();
        clearInterval(autoSlide);
        autoSlide = setInterval(nextPack, 2000);
    });

    showPack(currentPack);
});