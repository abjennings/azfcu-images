var data = require("sdk/self").data;
var base64 = require("sdk/base64");
var fileIO = require("sdk/io/file");
var widget = require("sdk/widget");
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var simplePrefs = require("sdk/simple-prefs");
var notifications = require("sdk/notifications");

function SaveImage(msg) {
	var fname = msg[0];
	var imgdata = msg[1];

	if (imgdata.substring(0, 22) != "data:image/PNG;base64,") {
		notifications.notify({"text":"Image data not in png/base64 format."});
	} else {
		var decodedData = base64.decode(imgdata.substring(22));
		var dir = simplePrefs.prefs['directory'];
		if (!dir) {
			notifications.notify({"text":"Please specify a directory in preferences"});
		} else {
			var ByteWriter = fileIO.open(fileIO.join(dir, fname + ".png"), "wb");
			if (ByteWriter.closed) {
				notifications.notify({"text":"Can't open file"});
			} else {
				ByteWriter.write(decodedData);
				ByteWriter.close();
			}
		}
	}
}

pageMod.PageMod({
	include: "https://www.azfcu.org/tob/live/usp-core/sdp/com.diginsite.product.sdp.SDP/historypage?*",
	contentScriptFile: data.url("get-images.js"),
	attachTo: ["frame", "existing"],
	onAttach: function(worker) {
		worker.port.on('Register', function() {
			worker.tab.azfcu_worker = worker;
			worker.port.on('SaveImage', SaveImage);
		});
	}
});

widget.Widget({
	id: "azfcu-images",
	label: "Download all images",
	content: "AZFCU",
	width: 40,
	onClick: function() {
		if (tabs.activeTab.azfcu_worker) {
			tabs.activeTab.azfcu_worker.port.emit('GetImages');
		}
		console.error(tabs.activeTab.url);
	}
});
