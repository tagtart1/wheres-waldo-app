interface Coordinate {
  x: number;
  y: number;
}

const distance = (coordinatesA: Coordinate, coordinatesB: Coordinate) => {
  const numA =
    (coordinatesB.x - coordinatesA.x) * (coordinatesB.x - coordinatesA.x);
  const numB =
    (coordinatesB.y - coordinatesA.y) * (coordinatesB.y - coordinatesA.y);

  const sum = numA + numB;

  return Math.sqrt(sum);
};

export default distance;
