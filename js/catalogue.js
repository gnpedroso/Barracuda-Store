$(document).on("change", ".form-control", function() {

    let sortingMethod = $(this).val();

    if(sortingMethod == 'low-high')
    {
        sortProductsPriceAscending();
    }
    else if(sortingMethod == 'high-low')
    {
        sortProductsPriceDescending();
    }
    else if(sortingMethod == 'a-z')
    {
        sortProductsAtoZ();
    }
    else if(sortingMethod == 'z-a')
    {
        sortProductsZtoA();
    }

});

const products = $('.items');
    
function sortProductsPriceAscending()
{
    function Ascending_sort(a, b) { 
        return ($(b).data('price')) < ($(a).data('price')) ? 1 : -1;  
    }  
        return  $(".items").sort(Ascending_sort).appendTo('.products-grid');
}

function sortProductsPriceDescending()
{
    function Ascending_sort(a, b) { 
        return ($(b).data('price')) > ($(a).data('price')) ? 1 : -1;  
    }  
        return  $(".items").sort(Ascending_sort).appendTo('.products-grid');
}

function sortProductsAtoZ()
{
    function Ascending_sort(a, b) { 
        return ($(b).text().toUpperCase()) < ($(a).text().toUpperCase()) ? 1 : -1;  
    }  
        return  $(".items").sort(Ascending_sort).appendTo('.products-grid');
}

function sortProductsZtoA()
{
    function Ascending_sort(a, b) { 
        return ($(b).text().toUpperCase()) > ($(a).text().toUpperCase()) ? 1 : -1;  
    }  
        return  $(".items").sort(Ascending_sort).appendTo('.products-grid');
}




