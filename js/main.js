window.onload = function() {
    const footnotes = document.querySelectorAll(".title__wrapp");
    footnotes.forEach((footnote) => {
        footnote.addEventListener("click", (e) => {
            const parent = e.target.parentNode;
            const footnote = parent.querySelector('.title__card')
            if (footnote) {
                if (!footnote.classList.contains("title__card--open")) {
                    document.querySelectorAll('.title__card--open').forEach((item) => {
                        item.classList.remove('title__card--open')
                    })
                    footnote.classList.add('title__card--open')
                }
            }
        }, false);
    })
    const closeFootnotes = document.querySelectorAll('.title__close')
    closeFootnotes.forEach((closeElem) => {
        closeElem.addEventListener("click", (e) => {
            const parent = e.target.parentNode.parentNode;
            if (parent) {
                if (parent.classList.contains("title__card--open")) {
                    parent.classList.remove('title__card--open')
                }
            }
        }, false);
    })
};
  