const useMath = () => {
  const cos = (angleDeg: number) => {
    const angleInRad = (angleDeg * Math.PI) / 180
    return Math.cos(angleInRad)
  }

  const sin = (angleDeg: number) => {
    const angleInRad = (angleDeg * Math.PI) / 180
    return Math.sin(angleInRad)
  }

  const getCenter = (styles: {
    x: number
    y: number
    width: number
    height: number
  }) => {
    return {
      x: styles.x + (styles.width as number) / 2,
      y: styles.y + (styles.height as number) / 2
    }
  }

  const getRotatedPoint = (
    angle: number,
    origin: { x: number; y: number },
    initPos: { x: number; y: number },
    aspectRatio = 1
  ) => {
    const tempX = initPos.x - origin.x
    const tempY = initPos.y - origin.y
    return {
      x: origin.x + tempX * cos(angle) - tempY * aspectRatio * sin(angle),
      y: origin.y + (1 / aspectRatio) * tempX * sin(angle) + tempY * cos(angle)
    }
  }

  return {
    sin,
    cos,
    getCenter,
    getRotatedPoint
  }
}

export default useMath
