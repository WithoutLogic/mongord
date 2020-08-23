module.exports = function gourd(mod) {
	let enabled = true,
		userName = "",
		region = mod.publisher;

	switch (region) {
		case "eme":
			region = "/";
			break;
		case "gf":
			region = "/eu/";
			break;
		default:
			mod.warn("This region is not supported.");
			break;
	}

	mod.command.add(['mongord', 'mg'], () => {
		enabled = !enabled;
		mod.command.message(`mongord enabled: ${enabled}`);
	})

	mod.game.on('enter_game', () => {
        userName = mod.game.me.name;
    });

	mod.hook('S_USER_PAPERDOLL_INFO', 11, async event => {
		if (enabled && event.name != userName) await Open(event.name);
	})

	function Open(name) {
		const uri = `https://kabedon.moongourd.com${region}search/${name}`;
		try {
			const encoded_uri = encodeURI(uri);
			mod.toClient('S_SHOW_AWESOMIUMWEB_SHOP', 1, {
				link: encoded_uri
			});
		} catch (e) {
			console.log(e);
		}
	}
}