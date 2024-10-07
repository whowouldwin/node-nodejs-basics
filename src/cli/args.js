const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsObj = args.reduce((acc, arg,index, array) => {
    if (arg.startsWith('--')) {
      const propName = arg.replace('--', '');
      acc[propName] = array[index + 1];
    }
    return acc;
  }, {})
  Object.entries(argsObj).forEach(([key, value]) => {
    console.log(`${key} is ${value}`);
  })
};

parseArgs();