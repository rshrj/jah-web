function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, sxmore) {
  return {
    sx: {
      bgcolor: stringToColor(
        name.split(' ').length > 1 ? name : `${name} ${name}`
      ),
      ...sxmore
    },
    children: `${name.split(' ')[0][0]}${
      name.split(' ').length > 1 ? name.split(' ')[1][0] : name.split(' ')[0][1]
    }`
  };
}

export { stringAvatar, stringToColor };
