
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const userId = document.getElementById("userId");
const userPassword = document.getElementById("password");
const confirmPass = document.getElementById("password2");


form.addEventListener('submit',(e) => {
    e.preventDefault();
    // alert("Submit Click !")
    checkInputs();
}
)

function checkInputs(){
    const userNameVal = username.value;
    const emailValue = email.value.trim();
    const userIdValue = userId.value;
    const passwordValue = password.value;
    const password2Value = confirmPass.value;

    //check username
    if(userNameVal === ""){
        setError(username,"User name canot be blank.")
    }
    else if(userNameVal.length < 3){
        setError(username,"User name must have 3 chars or more.")
    }
    else{
        setSuccess(username);
    }

    //check email
    if(emailValue === ""){
        setError(email,"Email canot be blank.")
    }
    else if(!isEmail(emailValue)){
        setError(email,"Invalid email!");
    }
    else{
        setSuccess(email)
    }

    //check ID
    if(userIdValue === ""){
        setError(userId,"UserID canot be blank.")
    }
    else if(!is_israeli_id_number(userIdValue)){
        setError(userId,"Invalid ID !")
    }
    else{
        setSuccess(userId)
    }

    //check password
    if(passwordValue === ""){
        setError(password,"Password canot be blank.")
    }
    else if(!validatePass(passwordValue)){
        setError(password,"Password not strong enough");

    }
    else {
        setSuccess(password)
    }
    //confirm password
    if(password2Value === ""){
        setError(confirmPass,"Password2 canot be blank.")
    }
    else if(password2Value !== passwordValue){
        setError(confirmPass,"Password not match !")
    }
    else{
        setSuccess(confirmPass)
    }

}

function setError(item,message){
    const formItem = item.parentElement;
    formItem.className = 'form-item error';

    const errorSpan = formItem.querySelector("span");

    errorSpan.innerText = message;
}
function setSuccess(item){
    const formItem = item.parentElement;
    formItem.className = 'form-item success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Validate Israel ID (from google)
function is_israeli_id_number(id) {
	id = String(id).trim();
	if (id.length > 9 || isNaN(id)) return false;
	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
		return Array.from(id, Number).reduce((counter, digit, i) => {
			const step = digit * ((i % 2) + 1);
			return counter + (step > 9 ? step - 9 : step);
		}) % 10 === 0;
}

// Validate strong password
function validatePass(password){
    let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    return regex.test(password);
}