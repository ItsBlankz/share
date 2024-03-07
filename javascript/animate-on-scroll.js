//Credit to FireShip for the Code

const hiddenElements = document.querySelectorAll(".hidden");

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach((el) => intersectionObserver.observe(el));
