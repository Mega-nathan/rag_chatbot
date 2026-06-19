export const getFormattedTime = (): string => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minStr} ${ampm}`;
};

export const formatApiResponse = (text: string): string => {
  let formatted = text.replace(/\n/g, '<br/>');
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/<br\/>\s*\*\s*(.*?)(?=<br\/>|$)/g, '<br/>• $1');
  formatted = formatted.replace(/<br\/>\s*-\s*(.*?)(?=<br\/>|$)/g, '<br/>• $1');
  return formatted;
};
