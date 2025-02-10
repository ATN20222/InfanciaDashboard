import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { getToken } from './AxiosApi';
window.Pusher = Pusher; 

export const echo = new Echo({
    broadcaster: 'pusher',
    key: '81c558fbfd3ec3d7f363',
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'https://dashboard.infancia.app/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    },
});