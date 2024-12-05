from PIL import Image

    def count_pixels(image_path):
      # Charger l'image
      image = Image.open(image_path)

      # Convertir l'image en niveaux de gris
      grayscale_image = image.convert('L')

      # Obtenir les dimensions de l'image
      width, height = grayscale_image.size

      # Calculer le nombre total de pixels
      total_pixels = width * height

      return total_pixels

    if __name__ == "__main__":
      image_path = "path/to/your/image.png"  # Remplacez par le chemin de votre image
      total_pixels = count_pixels(image_path)
      print(f"Le nombre total de pixels dans l'image est : {total_pixels}")
