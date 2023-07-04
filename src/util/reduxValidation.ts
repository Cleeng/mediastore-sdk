const isErrorMsg = (err: unknown): err is { message: unknown } => {
  return typeof err === 'object' && err !== null && 'message' in err;
};

export default isErrorMsg;
