function convert(fromSide, toSide){
    const fromAmount = document.getElementById(`${fromSide}-amount`).value
    const toAmountEl = document.getElementById(`${toSide}-amount`)

    const fromRate = document.getElementById(`${fromSide}-selector`).value
    const toRate = document.getElementById(`${toSide}-selector`).value

    toAmountEl.value = Math.round(fromAmount * toRate / fromRate * 100) / 100
}

function flip() {
    let temp;
    
    temp = document.getElementById('left-amount').value 
    document.getElementById('left-amount').value = document.getElementById('right-amount').value
    document.getElementById('right-amount').value = temp;

    temp = document.getElementById('left-selector').value 
    document.getElementById('left-selector').value = document.getElementById('right-selector').value
    document.getElementById('right-selector').value = temp;
}

document.getElementById('left-selector').onchange = (value) => {
    convert('left', 'right')
}

document.getElementById('left-selector').onchange = (value) => {
    convert('left', 'right')
}

document.getElementById('left-amount').onchange = (value) => {
    convert('left', 'right')
}

document.getElementById('right-amount').onchange = (value) => {
    convert('right', 'left')
}

document.getElementById('flip').onclick = flip