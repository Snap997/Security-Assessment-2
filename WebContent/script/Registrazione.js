/**
 * 
 */
function checkNomeCognome(inputtxt) {
	var nome = /^[A-Za-z]+$/;
	if(inputtxt.value.match(nome)) 
		return true

	return false;	
}


function isValidEmail(email) {
	// Controlla se la stringa è null o vuota
	if (!email || typeof email !== 'string') return false;

	// Controlla se l'email è troppo corta o troppo lunga
	if (email.length < 5 || email.length > 254) return false;

	// Controlla se l'email contiene solo un '@' e non ha caratteri proibiti
	let atIndex = -1;
	for (let i = 0; i < email.length; i++) {
		const char = email[i];
		if (char === '@') {
			if (atIndex !== -1) return false; // più di un '@'
			atIndex = i;
		} else if (char === ' ' || char === '(' || char === ')' || char === ',' || char === ':' || char === ';' || char === '<' || char === '>' || char === '[' || char === ']' || char === '\\') {
			return false; // caratteri non validi
		}
	}

	// Se non c'è un '@', l'email non è valida
	if (atIndex === -1) return false;

	// Separazione locale e dominio
	const localPart = email.slice(0, atIndex);
	const domainPart = email.slice(atIndex + 1);

	// Controlla se le parti locale e dominio non sono vuote e hanno lunghezza corretta
	if (!localPart || !domainPart || localPart.length > 64 || domainPart.length > 253) return false;

	// Controlla se il dominio contiene almeno un punto e non inizia o finisce con un punto
	const domainParts = domainPart.split('.');
	if (domainParts.length < 2 || domainParts[0] === '' || domainParts[domainParts.length - 1] === '') return false;

	// Controlla se ciascuna parte del dominio contiene solo caratteri validi
	const domainPartRegex = /^[A-Za-z0-9-]+$/;
	for (let part of domainParts) {
		if (!domainPartRegex.test(part) || part.startsWith('-') || part.endsWith('-')) {
			return false;
		}
	}

	// Controlla se la parte locale contiene solo caratteri validi
	const localPartRegex = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
	if (!localPartRegex.test(localPart) || localPart.startsWith('.') || localPart.endsWith('.')) {
		return false;
	}

	return true;
}





function checkData(inputtxt) {
	var data =  /^\d{1,2}-\d{1,2}-\d{4}$/;
	if(inputtxt.value.match(data)) 
		return true;
	
	return false;	
}


function checkUserName(inputtxt) {
	var userName = /^[A-Za-z0-9]+$/;
	if(inputtxt.value.match(userName)) 
		return true;
	
	return false;	
}


function checkPassword(inputtxt) {
	var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	if(inputtxt.value.match(password)) 
		return true;
	
	return false;	
}


function validate(obj) {	
	var valid = true;	
	
	var nome = document.getElementsByName("nome")[0];
	if(!checkNomeCognome(nome)) {
		valid = false;
		document.getElementById("errNome").innerHTML = "nome non valido" ;
		errNome.style.color = "red";
	} else {
		document.getElementById("errNome").innerHTML = "" ;
	}
	
	var cognome = document.getElementsByName("cognome")[0];
	if(!checkNomeCognome(cognome)) {
		valid = false;
		document.getElementById("errCognome").innerHTML = "cognome non valido";
		errCognome.style.color = "red";

		} else {
			document.getElementById("errCognome").innerHTML = "";
	}
	
	var email = document.getElementsByName("email")[0];
	if(!checkEmail(email)) {
		valid = false;
		document.getElementById("errEmail").innerHTML = "email non valida";
		errEmail.style.color = "red";
		}
		else {
			document.getElementById("errEmail").innerHTML = "";	
		}		
	
	var data = document.getElementsByName("nascita")[0];
	if(!checkData(data)) {
		valid = false;
		document.getElementById("errNascita").innerHTML = "data non valida";
		errNascita.style.color = "red";
		} else {
			document.getElementById("errNascita").innerHTML = "";
		}		
	
	var user = document.getElementsByName("us")[0];
	if(!checkUserName(user)) {
		valid = false;
		document.getElementById("errUser").innerHTML = "username non valida";
		errUser.style.color = "red";
		}
		else {
		document.getElementById("errUser").innerHTML = "";
		}		
	
	var pw = document.getElementsByName("pw")[0];
	if(!checkPassword(pw)) {
		valid = false;
		document.getElementById("errPass").innerHTML = "password non valida";
		errPass.style.color = "red";
		}
		else {
			document.getElementById("errPass").innerHTML = "";
		}			
	
	
	if(valid)
		obj.submit();	
}


function myFunction(x) {
  		x.style.background = "yellow";
		}
		