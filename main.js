function createSlider() {
    let images = [
        'images/slider5.jpg',
        'images/slider1.jpg',
        'images/slider2.jpg',
        'images/slider4.jpg',
        'images/slider1.jpg',
    ]
    let slider = document.getElementById('slider');
    let rail = document.getElementById('rail');
    let currentPosition = 0;
    let pageWidth = 650;
    
    
    createNavigation();
    createSlides();
    
    
    function createSlide(url) {
        let slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = 'url(' + url + ')';
        return slide;
    }
    
    function createSlides() {
        for (let i = 0; i < images.length; i++) {
            rail.appendChild(createSlide(images[i]))
        }
    }
    
    function next() {
        let totalWidth = document.getElementById('rail').scrollWidth;
        let lastPosition = totalWidth - window.innerWidth;
    
        if(currentPosition === lastPosition) {
            currentPosition = 0;
        } else {
            currentPosition = Math.min(currentPosition + pageWidth, lastPosition)
        }
    
        rail.style.transform = 'translateX(-' + currentPosition + 'px)';
    }
    
    function prev() {
        let totalWidth = document.getElementById('rail').scrollWidth;
        let lastPosition = totalWidth - window.innerWidth;
        if (currentPosition === 0) {
            currentPosition = lastPosition
        } else {
            currentPosition = Math.max(currentPosition - pageWidth, 0)
        }

        rail.style.transform = 'translateX(-' + currentPosition + 'px)';
    }
    
    function createNavigation() {
        let nextButton = document.createElement('button');
        nextButton.className = 'next';
        nextButton.classList.add('btn');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', next);
        slider.appendChild(nextButton);
    
        let prevButton = document.createElement('button');
        prevButton.className = 'prev';
        prevButton.classList.add('btn')
        prevButton.innerText = 'Prev';
        prevButton.addEventListener('click', prev);
        slider.appendChild(prevButton);
    }
    
    return {
        next,
        prev
    }
}
createSlider();
movingSlider();

function movingSlider() {
    let moving = false;
    let startPosition = null;
    let movingElement = null;
    let rail = document.getElementById('rail');

    rail.addEventListener('mousedown', function (e) {
        moving = true;
        movingElement = this;
        rail.classList.add('no-transition');
        startPosition = {x: e.pageX, y: e.pageY};
    });

    rail.addEventListener('mousemove', function (e) {
        if(moving) {
            let diffX = e.pageX - startPosition.x;
            movingElement.style.transform = 'translateX(' + diffX + 'px)';
            if (diffX >= 0 || -(diffX) >= (rail.scrollWidth - rail.offsetWidth)) {
                moving = false;
                movingElement = null;
            };
        };

    });

    document.addEventListener('mouseup', function(e) {
        moving = false;
        rail.classList.remove('no-transition');
        movingElement = null;
    });
}