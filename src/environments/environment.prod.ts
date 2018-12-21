const apiBase = 'http://localhost';

export const environment = {
  production: true,
  urls: {
    baseUrl: apiBase,
    signIn: `https://www.strava.com/oauth/authorize?client_id=30053&redirect_uri=${apiBase}/api/gateway&response_type=code&scope=activity:read_all`
  }
};
