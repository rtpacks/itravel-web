export default function useECharts() {
  const normalStyle = {
    borderColor: 'rgba(147, 235, 248, 1)',
    borderWidth: 1,
    areaColor: {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.8,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
        },
      ],
      globalCoord: false, // 缺省为 false
    },
    shadowColor: 'rgba(128, 217, 248, 1)',
    shadowOffsetX: -2,
    shadowOffsetY: 2,
    shadowBlur: 10,
  };

  return {
    normalStyle,
  };
}
