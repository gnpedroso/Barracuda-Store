const formLogin = document.querySelector('.form_login');
const formCreateAcc = document.querySelector('.form_createAcc');
const chooseLogin = document.querySelector('#loginBtn');
const chooseCreateAcc = document.querySelector('#createAccBtn');

if (window.location.hash = "#loginAcc"){
    chooseLogin.classList.add('active')
    chooseCreateAcc.classList.remove('active')
    formCreateAcc.style.display = 'none'
    formLogin.style.display = 'block'   
}

window.addEventListener('hashchange', function(){
    chooseCreateAcc.classList.add('active')
    chooseLogin.classList.remove('active')
    formLogin.style.display = 'none'
    formCreateAcc.style.display = 'block'
})

chooseCreateAcc.addEventListener('click', function(){
    chooseCreateAcc.classList.add('active')
    chooseLogin.classList.remove('active')
    formLogin.style.display = 'none'
    formCreateAcc.style.display = 'block'
})

chooseLogin.addEventListener('click', function(){
    chooseLogin.classList.add('active')
    chooseCreateAcc.classList.remove('active')
    formCreateAcc.style.display = 'none'
    formLogin.style.display = 'block'
})

    let $emailInput = document.getElementById('createEmail');
    let $passInput = document.getElementById('createPass');
    let $messagePass = document.getElementById('messagePass');
    let $checkBox = document.getElementById('checkBtn');
    let $submitBtn = document.getElementById('submitBtn');
    let $confirmPass = document.getElementById('confirmPass')

    let $letter = document.getElementById('letter');
    let $capital = document.getElementById('capital');
    let $number = document.getElementById('number');
    let $length = document.getElementById('length');
    
    $submitBtn.disabled = true;

    (function showMessage(){
        $passInput.addEventListener('focus', function(){
            $messagePass.style.display = "block"

        })
    })();

    function removeMessage(){
        $passInput.addEventListener('blur', function(){
            $messagePass.style.display = "none"
        })
    };


    $passInput.addEventListener('keyup', function(){
        
        let lowerCaseLetters = /[a-z]/g;
        if($passInput.value.match(lowerCaseLetters)) {
            $letter.classList.remove("invalid");
            $letter.classList.add("valid");
        } else {
            $letter.classList.remove("valid");
            $letter.classList.add("invalid");
        }

        let upperCaseLetters = /[A-Z]/g;
        if($passInput.value.match(upperCaseLetters)){
            $capital.classList.remove('invalid');
            $capital.classList.add('valid')
        } else {
            $capital.classList.remove('valid');
            $capital.classList.add('invalid');
        }
        
        let numbers = /[0-9]/g;
        if($passInput.value.match(numbers)){
            $number.classList.remove('invalid');
            $number.classList.add('valid');
        } else {
            $number.classList.remove('valid');
            $number.classList.add('invalid');
        }

        if($passInput.value.length >= 8){
            $length.classList.remove('invalid');
            $length.classList.add('valid');
        } else {
            $length.classList.remove('valid');
            $length.classList.add('invalid')
        }
        
    })

    document.addEventListener('keyup', function(){
        activateBtn()
    })

    document.addEventListener('click', function(){
        activateBtn()
    })


    function activateBtn(){
        if($letter.classList.contains('valid') && $checkBox.checked && $capital.classList.contains('valid') && $number.classList.contains('valid') && $length.classList.contains('valid')){
            $submitBtn.disabled = false
        } else {
            return $submitBtn.disabled = true;
        }      
        
    }

 






