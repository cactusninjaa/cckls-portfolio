const items = document.querySelectorAll(".gallery__item");
const gallery = document.querySelector(".gallery");
const numberOfItems = items.length;
const angleIncrement = (2 * Math.PI) / numberOfItems;

let radius = 300;

let isGalleryOpen = false;

const centerX = gallery.offsetWidth / 2;
const centerY = gallery.offsetHeight / 2;
const tl = gsap.timeline();

if (window.innerWidth < 500) {
    radius = 150;
} else if (window.innerWidth < 800) {
    radius = 200;
}


items.forEach((item, index) => {
    const img = document.createElement("img");
    img.src= '../assets/img/gallery/gallery' + (index + 1) + '.jpg';
    item.appendChild(img);

    const angle = angleIncrement * index;
    const initialRotation = (angle * 180 / Math.PI) - 90;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    gsap.set(item, {scale : 0});

    tl.to(item, {
        left : x + "px",
        top : y + "px",
        rotation : initialRotation,
        scale : 1,
        duration : 1,
        ease : "power2.out",
        delay: 1
    }, index * 0.1);

    item.addEventListener("click", function() {
        if (!isGalleryOpen) {
            isGalleryOpen = true;

            const duplicate = item.cloneNode(true);
            duplicate.style.position = "absolute";
            gallery.appendChild(duplicate);

            gsap.to(Array.from(items).filter(i => i !== item), {
                scale : 0,
                duration : 0.5,
                ease : "power2.inOut",
                stagger: 0.05
            });

            const endRotation = initialRotation > 180 ? initialRotation - 360 : initialRotation;

            gsap.to([item, duplicate], {
                rotation : endRotation,
                duration : 0.0001,
                onComplete : function() {
                    gsap.to([item, duplicate], {
                        left : "50%",
                        top : "50%",
                        transform : "translate(-50%, -50%) scale(5)",
                        duration : 1,
                        ease : "power2.out",
                        delay: 1.25
                    })
                }
            });

            const closeGallery = function() {
                if (isGalleryOpen){
                    gsap.to([item, duplicate], {
                        left : x + "px",
                        top : y + "px",
                        scale : 1,
                        rotation : initialRotation,
                        duration : 1,
                        ease : "power2.out",
                        onComplete : function() {
                            duplicate.remove();
                            gsap.to(items, {
                                scale : 1,
                                duration : 1,
                                stagger: 0.05,
                                ease : "power2.out"
                            });

                            isGalleryOpen = false;
                        }
                    })
                }
            };

            item.addEventListener("click", closeGallery);
            duplicate.addEventListener("click", closeGallery);
        }
    });
});