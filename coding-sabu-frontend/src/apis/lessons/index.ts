import httpRequest from 'apis/instance';

export const fetchLessons = () => httpRequest.get('/lessons');
