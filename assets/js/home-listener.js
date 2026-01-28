const contributeButton = document.getElementById('contribute');

if (contributeButton && contributeButton.addEventListener) {
    contributeButton.addEventListener('click', function(event) {
        window.open('https://github.com/igsl-group', '_blank');
    });
}
