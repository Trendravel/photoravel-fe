const color = {
  pi: '#FF808A',
  gr: '#87DEBE',
  pg: '#A3AEDC',
  po: '#FCAE69',
  b: '#000000',
  b2: 'rgba(0, 0, 0, 0.87)',
  b4: 'rgba(0, 0, 0, 0.73)',
  b6: 'rgba(0, 0, 0, 0.60)',
  b9: 'rgba(0, 0, 0, 0.40)',
  ba: 'rgba(0, 0, 0, 0.33)',
  bg: '#F5F6F8',
  l1: 'rgba(0, 0, 0, 0.15)',
  l2: 'rgba(0, 0, 0, 0.10)',
  l3: 'rgba(0, 0, 0, 0.05)',
  w1: '#FFFFFF',
  w2: 'rgba(255, 255, 255, 0.90)',
} as const;

const font = {
  pretendard12r: {
    fontSize: 12,
    fontWeight: 400,
  },
  pretendard12m: {
    fontSize: 12,
    fontWeight: 500,
  },
  pretendard12sb: {
    fontSize: 12,
    fontWeight: 600,
  },
  pretendard12b: {
    fontSize: 12,
    fontWeight: 700,
  },
  pretendard13r: {
    fontSize: 13,
    fontWeight: 400,
  },
  pretendard13m: {
    fontSize: 13,
    fontWeight: 500,
  },
  pretendard13sb: {
    fontSize: 13,
    fontWeight: 600,
  },
  pretendard13b: {
    fontSize: 13,
    fontWeight: 700,
  },
  pretendard14r: {
    fontSize: 14,
    fontWeight: 400,
  },
  pretendard14m: {
    fontSize: 14,
    fontWeight: 500,
  },
  pretendard14sb: {
    fontSize: 14,
    fontWeight: 600,
  },
  pretendard14b: {
    fontSize: 14,
    fontWeight: 700,
  },
  pretendard15r: {
    fontSize: 15,
    fontWeight: 400,
  },
  pretendard15m: {
    fontSize: 15,
    fontWeight: 500,
  },
  pretendard15sb: {
    fontSize: 15,
    fontWeight: 600,
  },
  pretendard15b: {
    fontSize: 15,
    fontWeight: 700,
  },
  pretendard16r: {
    fontSize: 16,
    fontWeight: 400,
  },
  pretendard16m: {
    fontSize: 16,
    fontWeight: 500,
  },
  pretendard16sb: {
    fontSize: 16,
    fontWeight: 600,
  },
  pretendard16b: {
    fontSize: 16,
    fontWeight: 700,
  },
  pretendard17r: {
    fontSize: 17,
    fontWeight: 400,
  },
  pretendard17m: {
    fontSize: 17,
    fontWeight: 500,
  },
  pretendard17sb: {
    fontSize: 17,
    fontWeight: 600,
  },
  pretendard17b: {
    fontSize: 17,
    fontWeight: 700,
  },
  pretendard18r: {
    fontSize: 18,
    fontWeight: 400,
  },
  pretendard18m: {
    fontSize: 18,
    fontWeight: 500,
  },
  pretendard18sb: {
    fontSize: 18,
    fontWeight: 600,
  },
  pretendard18b: {
    fontSize: 18,
    fontWeight: 700,
  },
  pretendard19r: {
    fontSize: 19,
    fontWeight: 400,
  },
  pretendard19m: {
    fontSize: 19,
    fontWeight: 500,
  },
  pretendard19sb: {
    fontSize: 19,
    fontWeight: 600,
  },
  pretendard19b: {
    fontSize: 19,
    fontWeight: 700,
  },
  pretendard20r: {
    fontSize: 20,
    fontWeight: 400,
  },
  pretendard20m: {
    fontSize: 20,
    fontWeight: 500,
  },
  pretendard20sb: {
    fontSize: 20,
    fontWeight: 600,
  },
  pretendard20b: {
    fontSize: 20,
    fontWeight: 700,
  },
  pretendard21r: {
    fontSize: 21,
    fontWeight: 400,
  },
  pretendard21m: {
    fontSize: 21,
    fontWeight: 500,
  },
  pretendard21sb: {
    fontSize: 21,
    fontWeight: 600,
  },
  pretendard21b: {
    fontSize: 21,
    fontWeight: 700,
  },
  pretendard22r: {
    fontSize: 22,
    fontWeight: 400,
  },
  pretendard22m: {
    fontSize: 22,
    fontWeight: 500,
  },
  pretendard22sb: {
    fontSize: 22,
    fontWeight: 600,
  },
  pretendard22b: {
    fontSize: 22,
    fontWeight: 700,
  },
  pretendard23r: {
    fontSize: 23,
    fontWeight: 400,
  },
  pretendard23m: {
    fontSize: 23,
    fontWeight: 500,
  },
  pretendard23sb: {
    fontSize: 23,
    fontWeight: 600,
  },
  pretendard23b: {
    fontSize: 23,
    fontWeight: 700,
  },
  pretendard24r: {
    fontSize: 24,
    fontWeight: 400,
  },
  pretendard24m: {
    fontSize: 24,
    fontWeight: 500,
  },
  pretendard24sb: {
    fontSize: 24,
    fontWeight: 600,
  },
  pretendard24b: {
    fontSize: 24,
    fontWeight: 700,
  },
} as const;

export type ColorType = typeof color;
export type FontType = typeof font;
export type ColorKeyType = keyof typeof color;
export type FontKeyType = keyof typeof font;

const theme = { color, font } as const;

export default theme;
