"use strict";
function alter_links() {
	var file_links = document.querySelectorAll("html body .repository-content table tr");
	var fns = [];
	[].forEach.call(file_links, (link) => {
		if (link.github_preview_images) return;
		if (!link.querySelector("a")) return;
		link.github_preview_images = true;
		var raw_link = "https://github.com" + link.querySelector("a").getAttribute("href");
		var fixed_link = raw_link.replace("blob", "raw");
		if (fixed_link.match(/(png|jpg|gif|tga)$/)) {
			var icon = link.querySelector(".icon");
			icon.innerHTML = '<img src="' + fixed_link + '" style="max-width: 128px" />';
		};
	});
};
var observer = new MutationObserver(function(mutations) {
	alter_links();
});
var config = { subtree: true, childList: true, characterData: true };
observer.observe(document.body, config);

alter_links();
