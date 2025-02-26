'use client';

/**
 * Function to get pixel data from an image
 * @param imagePath Path to the image
 * @returns Promise<{data: Uint8ClampedArray, width: number, height: number}> Pixel data and image dimensions
 */
export async function getImageData(imagePath: string): Promise<{
  data: Uint8ClampedArray;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const width = img.width;
      const height = img.height;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, width, height);

      resolve({
        data: imageData.data,
        width,
        height,
      });
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imagePath}`));
    };

    img.src = imagePath;
  });
}

/**
 * Function to get color at a specific position in the image
 * @param imageData Image data
 * @param x X coordinate (0.0 to 1.0)
 * @param y Y coordinate (0.0 to 1.0)
 * @returns [r, g, b] RGB values (0.0 to 1.0)
 */
export function getColorAtPosition(
  imageData: { data: Uint8ClampedArray; width: number; height: number },
  x: number,
  y: number,
): [number, number, number] {
  // Convert coordinates from 0.0-1.0 range to image pixel coordinates
  const pixelX = Math.min(Math.floor(x * imageData.width), imageData.width - 1);
  const pixelY = Math.min(Math.floor(y * imageData.height), imageData.height - 1);

  // Calculate pixel index (4 bytes per pixel in RGBA format)
  const index = (pixelY * imageData.width + pixelX) * 4;

  // Return RGB values normalized to 0.0-1.0 range
  return [
    imageData.data[index] / 255,
    imageData.data[index + 1] / 255,
    imageData.data[index + 2] / 255,
  ];
}