const prompt 	= require("prompts");
const fs 		= require("fs");
const sha1 		= require("sha1");
const FormData 	= require("form-data");
const https 	= require("https");
const request	= require("request");

const url = "https://api.codenation.dev/v1/challenge/dev-ps";

let input;

const decipher = (str, key) => {
	let arr = str.split('');
	let start = "a".charCodeAt();
	let end = "z".charCodeAt();

	for (let i = 0; i < arr.length; i++) {

		if (/[a-z]/.test(arr[i])){
			charCode = arr[i].charCodeAt() - key;

			if (charCode < start){
				charCode = end + 1 - (start - charCode);
			}

			arr[i] = String.fromCharCode(charCode);
		}
	}
	return arr.join("");
};

let postAnswer = () => {
	let r = request.post({ url: url + "/submit-solution?token=" + input.token }, 
		(err, httpResponse, body) => {
			if (err) {
				return console.error(err);
			}
			console.log(httpResponse, body);
	});

	let form = r.form()
	form.append('answer', fs.createReadStream('./answer.json'));
};

(async () => {
	input = await prompt({
		type: 'text',
		name: 'token',
		message: 'Codenation User Token',
		validate: (token) => {
			return token ? true : 'The token is required'
		}
	});

	https.get(url + "/generate-data?token=" + input.token, (response) => {
		response.on('data', (d) => {
			data = JSON.parse(d.toString("utf8"));
			
	 		data['decifrado'] = decipher(data['cifrado'], data['numero_casas']);
	 		data['resumo_criptografico'] = sha1(data['decifrado']);

	 		fs.writeFile("./answer.json", JSON.stringify(data), (err) => {
				if(err) return reject(err);
				postAnswer();
			});
		});	
	}).on('error', (e) => {
	  	console.log(e);
	});

})();