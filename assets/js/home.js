/*=============== HOME CURSOR ===============*/

document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor__home');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

const cursorHome = document.querySelector('.cursor__home');

const positionElement = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
   
}

window.addEventListener('mousemove', positionElement)

/*=============== SWITCH PAGE ===============*/
const homePage = document.querySelector('.home');

homePage.addEventListener('click', function() {
    window.location.href = 'pages/gallery.php'; 
});