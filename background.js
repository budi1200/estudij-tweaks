browser.pageAction.onClicked.addListener(async (tab) => {
	let { estudijTweaksStatus } = await browser.storage.local.get('estudijTweaksStatus')
	setValue(!estudijTweaksStatus);
});

async function setValue(value) {
	let estudijTweaksStatus = value;
	await browser.storage.local.set({ estudijTweaksStatus });
}

async function init() {
	let { estudijTweaksStatus } = await browser.storage.local.get('estudijTweaksStatus');

	if (estudijTweaksStatus == null) {
		estudijTweaksStatus = true;
	}

	setValue(estudijTweaksStatus)
}

browser.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
	if (msg.icon) {
		let { estudijTweaksStatus } = await browser.storage.local.get('estudijTweaksStatus')
		browser.tabs.query({ active: true, windowType: "normal", currentWindow: true }, function (d) {
			var tabId = d[0].id;
			browser.pageAction.setIcon({ tabId: tabId, path: (estudijTweaksStatus == false ? "/iconDisabled.png" : "/icon.png") })
		})
	}
})

init().catch(e => console.error(e));
