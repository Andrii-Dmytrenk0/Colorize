const boxes = document.querySelectorAll(".box")

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type === "lock") {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]
        
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }
})

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i += 1) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return '#' + color;
}

function setRandomColors() {
    boxes.forEach((box) => {
        const isLocked = box.querySelector('i').classList.contains('fa-lock')
        const boxLabel = box.querySelector('h2')
        const color = generateRandomColor();
        const button = box.querySelector('button')

        if (isLocked) {
            return
        }

        boxLabel.textContent = color;
        box.style.background = color;

        setTextColor(boxLabel, color)
        setTextColor(button, color)
    })
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors()