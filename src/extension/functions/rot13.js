export function rot13(number) {
  return [...number.toString()]
    .map(character => {
      character = character.charCodeAt(0)
      if (character >= 97 && character <= 122) {
        character = ((character - 97 + 13) % 26) + 97
      } else if (character >= 65 && character <= 90) {
        character = ((character - 65 + 13) % 26) + 65
      }
      return String.fromCharCode(character)
    })
    .join('')
}
