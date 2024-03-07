window.addEventListener("beforeunload", function () {
    window.scroll(0, 0);
});

// Some Constant ELements which need to be used in various functions
const scrollDownCapsule = document.getElementById("scroll-down-capsule");
const mainContent = document.getElementById("main-content");
const preLoader = document.getElementById("preloader");
const commonPreLoader = document.getElementById("common-preloader");
const homeIntroText = Array.from(document.getElementsByClassName("line"));

// Clears the local storage on reload
const navigationType = performance.getEntriesByType("navigation")[0].type;
if (
    navigationType === "reload" &&
    window.location.pathname.endsWith("index.html")
) {
    localStorage.clear();
}

// Storing a "visited" value in sessionStorage to know when to run the
// preloader and when not to
if (localStorage.getItem("visited") === null) {
    localStorage.setItem("visited", "1");

    // Pre-Loader Removal and Change Main-Content Visibility Code
    document.addEventListener("DOMContentLoaded", function () {
        window.addEventListener("load", function () {
            const loadingBar = document.getElementById("loading-bar");
            let loadingBarFill = document.getElementById("loading-bar-fill");
            const loadingText = document.querySelector("#loading-text span");

            const targetProgress = 100;
            let currentProgress = 0;

            function updateProgressText() {
                let fillWidth = loadingBarFill.offsetWidth;
                const parentWidth = loadingBar.offsetWidth;

                currentProgress = parseInt((fillWidth / parentWidth) * 100) + 1;
                loadingText.textContent = currentProgress;

                if (currentProgress < targetProgress) {
                    setTimeout(updateProgressText, 10);
                } else {
                    preLoader.classList.add("preloader-drop");
                    setTimeout(function () {
                        preLoader.remove();
                        document.body.style.overflow = "visible";
                        mainContent.style.opacity = "1";
                        for (i = 0; i <= 2; i++) {
                            homeIntroText[i].classList.add("anim-" + String(i));
                        }
                        scrollDownCapsule.style.display = "flex";
                        scrollDownCapsule.classList.add("scroll-down-add");
                    }, 450);
                }
            }

            updateProgressText();
        });
    });
} else {
    try {
        preLoader.remove();
    } catch {}
    commonPreLoader.style.opacity = "1";
    commonPreLoader.style.zIndex = "1000";
    setInterval(function () {
        commonPreLoader.classList.add("preloader-drop");
        setTimeout(function () {
            commonPreLoader.remove();
            document.body.style.overflow = "visible";
            mainContent.style.opacity = "1";
            for (i = 0; i <= 2; i++) {
                homeIntroText[i].classList.add("anim-" + String(i));
            }
            scrollDownCapsule.style.display = "flex";
            scrollDownCapsule.classList.add("scroll-down-add");
        }, 450);
    }, 1000);
}

// Remove the Scroll Down text capsule on scroll
window.addEventListener("scroll", function () {
    scrollDownCapsule.remove();
});
