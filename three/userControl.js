const inputs = Array.from(document.querySelectorAll('input'))
inputs.forEach(item => {
  item.addEventListener('change', (e) => {
    console.log(e.target.value)
    if(e.target.id === 'x') {
      mask.position.x = e.target.value;
    }
    if(e.target.id === 'y') {
      mask.position.y = e.target.value;
    }
    if(e.target.id === 'z') {
      mask.position.z  = e.target.value;
    }
  })
})