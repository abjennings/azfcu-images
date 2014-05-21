self.port.emit('Register');

self.port.on("GetImages", function() {
	var transTable = document.getElementById('gridTransactions');
	if (transTable) {

		function checkForImage(ckno, date) {
			var images = transTable.getElementsByTagName('img');
			for (var i = images.length - 1; i >= 0; --i) {
				var image = images[i];
				if (image.complete && image.alt == "Front image of check" + ckno) {
					var fname = date + '_check_' + ckno;
					self.port.emit("SaveImage", [fname, image.src]);
					setTimeout(clickNextLink, 200);
					return;
				}
			}
			setTimeout(function() { checkForImage(ckno, date); }, 100);
		}

		function getParentTR(elt) {
			while (elt && elt.tagName.toLowerCase() != 'tr') {
				elt = elt.parentNode;
			}
			return elt;
		}

		var clickedLinks = {};
		var checkNoRe = /^\s*Check #(\d+)\s*$/;
		var dateRe = /^\s*(\d\d)\/(\d\d)\/(\d\d\d\d)\s*$/;
		function clickNextLink() {
			var links = transTable.getElementsByTagName('a');
			for (var i = links.length - 1; i >= 0; --i) {
				var link = links[i];
				var checkNoMatch = checkNoRe.exec(link.innerHTML);
				if (checkNoMatch) {
					var checkNo = checkNoMatch[1];
					if (!clickedLinks[checkNo]) {
						var parentTR = getParentTR(link);
						if (parentTR) {
							var dateDiv = parentTR.getElementsByClassName('x-grid3-col-transactionDate');
							if (dateDiv[0]) {
								var dateMatch = dateRe.exec(dateDiv[0].innerHTML);
								if (dateMatch) {
									var date = dateMatch[3] + dateMatch[1] + dateMatch[2];
									clickedLinks[checkNo] = 1;
									link.click();
									setTimeout(function() { checkForImage(checkNo, date); }, 100);
									return;
								}
							}
						}
					}
				}
			}
			alert("All images downloaded");
		}

		clickNextLink();
	}
});
