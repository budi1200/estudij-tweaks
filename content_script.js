browser.storage.onChanged.addListener((changes, area) => {
	location.reload();
})

removeCourses = () => {
	var filter = ["ORGANIZACIJA IN ARHITEKTURA RAČUNALNIKOV", "OSNOVE ALGORITMOV", "PODATKOVNE STRUKTURE", "PROGRAMIRANJE I VS", "PROGRAMIRANJE II", "SODOBNA PROGRAMSKA ORODJA", "STROKOVNA ANGLEŠČINA", "UVOD V OPERACIJSKE SISTEME", "UVOD V RAČUNALNIŠTVO", "UVOD V SVETOVNI SPLET", "0 OSNOVE STATISTIKE", "PODATKOVNE BAZE - VS", "RAČUNALNIŠKA OMREŽJA", "RAZVOJ PROGRAMSKIH SISTEMOV", "UPORABNIŠKI VMESNIKI", "UVOD V PLATFORMNO ODVISEN RAZVOJ APLIKACIJ", "SISTEMSKA ADMINISTRACIJA", "RAZVOJ APLIKACIJ ZA INTERNET", "PROGRAMSKI JEZIKI", "OSNOVE RAČUNALNIŠKEGA VIDA"]

	var list = document.getElementById("frontpage-course-list")

	var objects = Array.from(list.getElementsByClassName("aalink"))


	var notPresentInData = objects.filter(el => filter.includes(el.innerText))

	notPresentInData.forEach(el => {
		console.log("[Estudij Tweaks]", "Removed " + el.innerText)
		el.closest(".coursebox").remove()
	})
}

init = async () => {
	let { estudijTweaksStatus } = await browser.storage.local.get('estudijTweaksStatus')

	if (estudijTweaksStatus == true) {
		removeCourses();
	}

	browser.runtime.sendMessage({ icon: !estudijTweaksStatus })
}

init();
