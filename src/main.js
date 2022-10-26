const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["#", "&", "*", "$", "^", "@", "&", "!", "%"];

const nbLength = document.getElementById("nb-length");
const rgLength = document.getElementById("rg-length");

const chkUppercase = document.getElementById("chk-uppercase");
const chkLowercase = document.getElementById("chk-lowercase");
const chkNumbers = document.getElementById("chk-numbers");
const chkSymbols = document.getElementById("chk-symbols");

const passwordText = document.getElementById("password-text");
const btnCopy = document.getElementById("btn-copy");
const btnReload = document.getElementById("btn-reload");

nbLength.onchange = () => rgLength.value = nbLength.value;
rgLength.oninput = () => nbLength.value = rgLength.value;

const min = 1;
const max = 30;
let message;

function validate() {
    message = "";
    let counter = 0
    if(nbLength < min && nbLength > max) {
        message += "La longitud es incorrecta. \n";
        counter ++;
    }

    if (!chkUppercase.checked &&
        !chkLowercase.checked &&
        !chkNumbers.checked &&
        !chkSymbols.checked) {
        message += "Seleccione una de las opciones para generar la contraseña. \n";
        counter ++;
    }
    return counter == 0;
}

function generatePassword() {
    if(validate()) {
        const limit = nbLength.value;
        let myArray = [];
    
        if(chkUppercase.checked) {
            myArray = myArray.concat(uppercase);
        }
        if(chkLowercase.checked) {
            myArray = myArray.concat(lowercase);
        }
        if (chkNumbers.checked) {
            myArray = myArray.concat(numbers);
        }
        if (chkSymbols.checked) {
            myArray = myArray.concat(symbols);
        }
    
        let pass = "";
    
        for (let i = 0; i < limit; i++) {
            let indice = Math.floor(Math.random()*(myArray.length));
            pass += myArray[indice];
        }
    
        passwordText.value = pass;
    } else {
        console.log (message);
    }    
}
generatePassword()

btnReload.onclick = generatePassword;

btnCopy.onclick = async() => {
    await navigator.clipboard.writeText(passwordText.value);
}
