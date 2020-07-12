(function(){
    var $body = document.querySelector('body');
    $body.classList.remove('no-js')
    $body.classList.add('js')
    
        
    let menu = new Menu({
        container: '.nav_menu',
        toggleBtn: '.menu-btn',
        widthEnabled: 1000
    })
    
})()