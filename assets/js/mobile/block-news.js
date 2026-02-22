document.addEventListener("DOMContentLoaded", () => {
    const $slider = $('.blockNews__cards');
    if (!$slider.length) return;

    const init = () => {
        if (window.innerWidth < 1024) {
            if (!$slider.hasClass('slick-initialized')) {
                $slider.slick({
                    slidesToShow: 2,
                    variableWidth: true,
                    infinite: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: { slidesToShow: 1 }
                        }
                    ]
                });
            }
        } else {
            if ($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }
        }
    };

    init();
    window.addEventListener('resize', init, { passive: true });
});