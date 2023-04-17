export function getObjectEntries<TObject extends Record<string, unknown>>(object: TObject) {
  return Object.keys(object) as (keyof typeof object)[];
}

export function playSound(name: string) {
  var snd = new Audio(name); // buffers automatically when created
  snd.play();
}
