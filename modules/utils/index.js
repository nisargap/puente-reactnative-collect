const generateRandomID = () => Math.random().toString(20).substr(2, 12);
const isEmpty = (str) =>
  !str || str === undefined || str.length === 0 || !/\S/.test(str);
const fulfillWithTimeLimit = async (timeLimit, task, failureValue) => {
  let timeout;
  const timeoutPromise = new Promise((resolve) => {
    timeout = setTimeout(() => {
      resolve(failureValue);
    }, timeLimit);
  });
  const response = await Promise.race([task, timeoutPromise]);
  if (timeout) {
    clearTimeout(timeout);
  }
  return response;
};

export { fulfillWithTimeLimit, generateRandomID, isEmpty };
