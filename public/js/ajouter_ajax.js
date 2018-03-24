let oBtnAjouter = document.getElementById('ajouter')
oBtnAjouter.addEventListener('click', ()=>{
	console.log('click')
	xhr = new XMLHttpRequest();
	xhr.open('POST', "ajouter_ajax", true);

	data = {
		"nom" : "",
		"prenom" : "",
		"telephone" : "",
		"courriel" : ""
	}

	console.log(data)
	sData = JSON.stringify(data);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(sData);
	xhr.addEventListener("readystatechange", traitementRequest, false);
})


function traitementRequest(e) {
	console.log("xhr.readyState = " + xhr.readyState)
	console.log("xhr.status = " + xhr.status)
	if(xhr.readyState == 4 && xhr.status == 200) {
		console.log('ajax fonctionne')
		
		let oNouvMembre = JSON.parse(xhr.responseText);
		console.log(xhr.responseText);
		console.log('_id oNouv = ' + oNouvMembre._id)


		let aMembre = [oNouvMembre['_id'], oNouvMembre['prenom'], oNouvMembre['nom'], oNouvMembre['telephone'], oNouvMembre['courriel']];
		let oTab = document.getElementsByClassName('tableau')[0];


		let oTr = document.createElement("tr");

		for(elm of aMembre) {
			let oTd = document.createElement("td");
			oTd.innerHTML = elm;
			if(aMembre.indexOf(elm) != 0) {
				oTd.setAttribute('contenteditable', true);
			}
			oTr.appendChild(oTd);
		}
        
		oTr.innerHTML += 
            "<td><a href='#'' class='modifier'> <%= __('modifier') %></a></td><td><a class='supprimer' ><%= __('supprimer') %></a></td>";

		oTr.style.backgroundColor = '#42b9f4';


		oTab.children[0].appendChild(oTr);

		modifier();
		supprimer();


	}
}