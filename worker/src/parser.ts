export function parse(
  text: string,
  values: any,
  startDelimiter = '{',
  endDelimiter = '}'
): string {
  let st = 0;
  let en = 0;
  let res = '';
  while (en < text.length) {
    if (text[st] === startDelimiter) {
      const start = st + 1;
      let end = st + 1;
      while (text[end] !== endDelimiter) {
        end++;
      }
      let variable = text.substring(start, end);
      let keys = variable.split('.');
      let val = { ...values };

      for (let k of keys) {
        if (typeof val === 'string') {
          val = JSON.parse(val);
        }
        val = val[k];
      }
      res += val;
      st = end + 1;
      en = end + 1;
    } else {
      res += text[en];
      st++;
      en++;
    }
  }
  return res;
}
