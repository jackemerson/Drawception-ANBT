import { anbt } from '../../anbt'

export function setColor(number, color) {
  anbt.colors[Number(number)] = color;
}

export function getColor(number) {
  const index = Number(number);
  const color = anbt.colors[index] ?? null;
  console.error(`No color stored at: ${number}`);
  return color;
}