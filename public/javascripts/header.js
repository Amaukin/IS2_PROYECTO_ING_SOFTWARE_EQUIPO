document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelectorAll('.dropdown-container');
    dropdown.forEach(item => {
        item.addEventListener('click', event => {
            item.classList.toggle('active');
            item.classList.toggle('show');
            let nextSibling = item.nextElementSibling;
            while (nextSibling) {
                if (nextSibling.classList.contains('active')) {
                    nextSibling.classList.remove('active');
                }
                if (nextSibling.classList.contains('show')) {
                    nextSibling.classList.remove('show');
                }
                nextSibling = nextSibling.nextElementSibling;
            }

            let prevSibling = item.previousElementSibling;
            while (prevSibling) {
                if (prevSibling.classList.contains('active')) {
                    prevSibling.classList.remove('active');
                }
                if (prevSibling.classList.contains('show')) {
                    prevSibling.classList.remove('show');
                }
                prevSibling = prevSibling.previousElementSibling;
            }
        })
    })
    document.querySelector('.container').addEventListener('click', () => {
        dropdown.forEach(item => {
            if (item.classList.contains('active')) item.classList.remove('active');
            if (item.classList.contains('show')) item.classList.remove('show');
        });
    });
});