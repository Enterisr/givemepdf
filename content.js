console.log("letmepdf is running on this page!");

(function () {
    "use strict";
    window.onload = () => {
        document
            .querySelectorAll(
                ".activityname .aalink[href*='/mod/resource/view.php']"
            )
            .forEach((elm) => {
                elm.addEventListener("click", (eve) => {
                    if (!eve.target.getAttribute("data-letmepdf")) {
                        eve.preventDefault();

                        fetch(elm.href)
                            .then((d) => {
                                return d.text();
                            })
                            .then((text) => {
                                const regex =
                                   /(?:object|iframe) id="resourceobject"\s+(?:data|src)="([^"]+)"/;
                                const match = text.match(regex);
                                const dataUrl = match ? match[1] : null;

                                if (dataUrl) {
                                    console.log("changeing link...");
                                    elm.href = dataUrl;
                                }
                                elm?.setAttribute("target", "_blank");
                                elm?.setAttribute("rel", "noopener noreferrer");
                                elm?.setAttribute("data-letmepdf", "true");
                                if (eve?.target?.click) eve.target.click();
                            });
                    }
                });
            });
    };
})();
/*if (dataUrl) {
                            window.open(dataUrl, "_blank");
                            window.focus();
                        } */
