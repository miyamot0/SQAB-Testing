function loadContent() 
{
	var isInDirectory = !checkParamsPresent();

	console.log('here');

	$.getJSON( "/json/tutorials.json", function( data ) {
		var relevantTutorial = data.Tutorials;

		if (isInDirectory)
		{
			for (var i = 0; i < relevantTutorial.length; i++)
			{
				var a = document.createElement("a");

				a.href = "Tutorial.html?index=" + relevantTutorial[i].Index;
				a.innerHTML = relevantTutorial[i].Title + "<br><br>";
				a.className += " lead";

				document.getElementById("tutorialDirectory").appendChild(a);
			}

			document.getElementById("tutorialDirectory").style.display = "block";
		}
		else
		{
			var paramString = document.location.toString().split("?")[1];
			var index = parseInt(paramString.split("=")[1]);

			var iframe = document.createElement('iframe');
			iframe.src = relevantTutorial[index].Video;

		  	document.getElementById("titleRef").innerHTML = relevantTutorial[index].Title;
		  	document.getElementById("descriptionRef").innerHTML = relevantTutorial[index].Summary;
			document.getElementById("tutorialIframeDiv").appendChild(iframe);

			document.getElementById("buttonPrev").href = "Tutorial.html?index=" + parseInt(index - 1);
			document.getElementById("buttonNext").href = "Tutorial.html?index=" + parseInt(index + 1);

			if (index == 0)
			{
				document.getElementById("buttonPrev").href = "#"
				document.getElementById("buttonPrev").className += " invisible";
			}
			else if (index >= relevantTutorial.length - 1)
			{
				document.getElementById("buttonNext").href = "#"
				document.getElementById("buttonNext").className += " invisible";
			}

			document.getElementById("tutorialChartDiv").style.display = "block";	
		}
	});
}

function checkParamsPresent()
{
	return document.location.toString().indexOf('?') !== -1;
}

window.addEventListener('load', loadContent(), true);