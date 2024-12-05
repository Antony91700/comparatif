function countPixels(file, elementId, imageDisplayId, fileNameId) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const totalPixels = imageData.data.length / 4;
        document.getElementById(elementId).textContent = `Nombre total de pixels : ${totalPixels}`;
        document.getElementById(imageDisplayId).src = img.src;
        document.getElementById(fileNameId).textContent = `Nom du fichier : ${file.name.split('\\').pop().replace(/\.[^/.]+$/, '')}`;
        comparePixels();
      };
      img.src = URL.createObjectURL(file);
    }

    function comparePixels() {
      const pixelCount1 = parseInt(document.getElementById('pixelCount1').textContent.match(/\d+/)[0]);
      const pixelCount2 = parseInt(document.getElementById('pixelCount2').textContent.match(/\d+/)[0]);
      if (pixelCount1 && pixelCount2) {
        const percentageDifference = Math.round(((pixelCount2 - pixelCount1) / pixelCount1) * 100);
        let comparisonMessage;
        if (percentageDifference > 0) {
          comparisonMessage = `La petite lèvre de gauche est ${Math.abs(percentageDifference)}% plus petite que la petite lèvre de droite.`;
        } else {
          comparisonMessage = `La petite lèvre de gauche est ${Math.abs(percentageDifference)}% plus grande que la petite lèvre de droite.`;
        }
        document.getElementById('comparisonResult').textContent = comparisonMessage;
      }
    }

    document.getElementById('imageInput1').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        countPixels(file, 'pixelCount1', 'imageDisplay1', 'fileName1');
      }
    });

    document.getElementById('imageInput2').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        countPixels(file, 'pixelCount2', 'imageDisplay2', 'fileName2');
      }
    });

    document.getElementById('imageInput3').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
          document.getElementById('errorMessage').textContent = 'Veuillez télécharger une image avec l\'extension .jpg ou .jpeg.';
          document.getElementById('fileName3').textContent = 'Aucun fichier choisi';
          document.getElementById('centeredImage').src = '';
        } else {
          document.getElementById('errorMessage').textContent = '';
          const img = new Image();
          img.onload = function() {
            document.getElementById('centeredImage').src = img.src;
            document.getElementById('fileName3').textContent = `Nom du fichier : ${file.name.split('\\').pop().replace(/\.[^/.]+$/, '')}`;
          };
          img.src = URL.createObjectURL(file);
        }
      }
    });

    document.getElementById('downloadButton').addEventListener('click', function() {
      const fileName = document.getElementById('fileName3').textContent.replace('Nom du fichier : ', '') + '.pdf';
      const element = document.body;
      const opt = {
        margin: 1,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save();
    });
