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
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
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

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    
    boxes.forEach((box, index) => {
        const isLocked = box.querySelector('i').classList.contains('fa-lock')
        const boxLabel = box.querySelector('h2')
        const button = box.querySelector('button')

        if (isLocked) {
            colors.push(boxLabel.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
            ? colors[index]
            : generateRandomColor()
            : generateRandomColor();

        if (!isInitial) {
            colors.push(color)
        }
        

        boxLabel.textContent = color;
        box.style.background = color;

        setTextColor(boxLabel, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map((col) => {
        return col.toString().substring(1)
        })
    .join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        document.location.hash.substring(1).split('-').map((color) => '# + color')
    }
    return []
}

setRandomColors(true)