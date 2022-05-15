export default (() => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return {
      baseURL: 'http://localhost',
      basePort: 5000
    };
  } else {
    return {
      baseURL: process.env.REACT_APP_BASE_URL,
      basePort: process.env.REACT_APP_BASE_PORT
    };
  }
})();
