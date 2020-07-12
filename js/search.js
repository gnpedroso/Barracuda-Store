const searchBtn = document.querySelector('.search')
const searchBar = document.querySelector('.searchBar')

let _opened = false


searchBtn.addEventListener('click', openOrClose )
    
    function openOrClose(){
        if(!_opened){
            openSearchBar()
        } else {
            closeSearchBar()
        }
        
    }
    
    function openSearchBar(){
        searchBar.style.opacity = '1';
        searchBar.style.pointerEvents = 'all';

        _opened = true;
    }
    
    
    function closeSearchBar(){
        searchBar.style.opacity = '0';
        searchBar.style.pointerEvents = 'none';
        
        _opened = false;
    }