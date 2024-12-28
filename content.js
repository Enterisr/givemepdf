console.log("letmepdf is running on this page!");

(function () {
    "use strict";
    window.onload = () => {
        document.querySelectorAll(".activityname .aalink").forEach((elm) => {
            elm.addEventListener("click", (eve) => {
                if (!eve.target.getAttribute("data-letmepdf")) {
                    eve.preventDefault();

                    fetch(elm.href)
                        .then((d) => {
                            return d.text();
                        })
                        .then((text) => {
                            const regex =
                                /object id="resourceobject"\s+data="([^"]+)"/;
                            const match = text.match(regex);
                            const dataUrl = match ? match[1] : null;

                            if (dataUrl) {
                                console.log("changeing link...");
                                elm.href = dataUrl;
                                elm.setAttribute("data-letmepdf", "true");
                                elm.setAttribute("target", "_blank");
                                elm.setAttribute("rel", "noopener noreferrer");
                                eve.target.click();
                                window.focus();
                            }
                        });
                }
                window.focus();
            });
        });
    };
})();
/*if (dataUrl) {
                            window.open(dataUrl, "_blank");
                            window.focus();
                        } */
