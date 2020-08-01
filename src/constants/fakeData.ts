export interface Balls {
  x: number
  y: number
  r: number
  text: string
}
// r: 80,
// review: 5,
// txt: '写真がきれい！',
// title: '写真がきれい！'
export const fakeData = [
  {
    x: 800 * Math.random(),
    y: 600 * Math.random(),
    r: 30,
    text: 'Aリゾート'
  },
  {
    x: 800 * Math.random(),
    y: 600 * Math.random(),
    r: 30,
    text: 'AAリゾート'
  },
  {
    x: 800 * Math.random(),
    y: 600 * Math.random(),
    r: 30,
    text: 'AAAAリゾート'
  },
  {
    x: 800 * Math.random(),
    y: 600 * Math.random(),
    r: 30,
    text: 'AAAAAAAリゾート'
  }
]
