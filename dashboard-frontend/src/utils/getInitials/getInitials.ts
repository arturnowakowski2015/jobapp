export const getInitials = (name: string) => {
  const sentenceSplit = name.split(' ');
  const firstLetters = sentenceSplit.map(namePart => namePart.charAt(0));
  return firstLetters.join('');
};
