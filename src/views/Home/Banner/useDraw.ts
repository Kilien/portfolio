import { isoBands } from 'marchingsquares';
import Random from 'canvas-sketch-util/random';
import { mapRange, linspace } from 'canvas-sketch-util/math';

export function drawIsolines([xMin, xMax], [yMin, yMax]) {
  Random.setSeed('Qifan');
  const sizeX = xMax - xMin;
  const sizeY = yMax - yMin;
  const offset = [xMin, yMin];
  const intervals = linspace(12);
  const gridSize = 100;
  const lines = [];
  let data = [];

  // On a 100x100 grid get noise data
  for (let y = 0; y < gridSize; y++) {
    data[y] = [];
    for (let x = 0; x < gridSize; x++) {
      const scale = gridSize;
      const n = Random.noise2D(x / scale, y / scale);
      // noise data has a range of -1 to 1, we remap it to 0 to 1
      data[y].push(mapRange(n, -1, 1, 0, 1));
    }
  }

  // At Equally spaced intervals, generate isoBands
  intervals.forEach((_, idx) => {
    if (idx > 0) {
      const lowerBand = intervals[idx - 1];
      const upperBand = intervals[idx];

      isoBands(data, lowerBand, upperBand - lowerBand, {
        successCallback(bands) {
          bands.forEach((band) => {
            // The isoBand is generate in x: 0-100 and y: 0-100
            // Map that to the actual width and height of the image
            const scaledBand = band.map(([x, y]) => [
              offset[0] + mapRange(x, 0, 99, 0, sizeX),
              offset[1] + mapRange(y, 0, 99, 0, sizeY),
            ]);

            lines.push(scaledBand);
          });
        },
      });
    }
  });

  return lines;
}