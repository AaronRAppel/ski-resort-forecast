// The API I initially planned to use had better ski resort data, but I
// ran into some issues with it, so I moved to a more basic API.
// Obviously, hard-coding resort data like this wouldn't make sense in
// a production application, but I decided to do it here so that you
// can view multiple resorts in the UI.

export type ResortCoordinates = {
  id: number
  name: string
  x: number
  y: number
}

export const resortCoordinates: ResortCoordinates[] = [
  { id: 1, name: 'Alpine Meadows', x: 28, y: 93 },
  { id: 2, name: 'Arapahoe Basin', x: 32, y: 59 },
  { id: 3, name: 'Big Bear', x: 78, y: 78 },
  { id: 4, name: 'Copper Mountain', x: 21, y: 53 },
  { id: 6, name: 'Winter Park', x: 27, y: 71 },
]
