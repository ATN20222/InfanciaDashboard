import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { getToken } from '../../Service/AxiosApi';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '81c558fbfd3ec3d7f363',
  cluster: 'eu',
  forceTLS: true,
  authEndpoint: 'https://orchid-aardvark-632100.hostingersite.com/broadcasting/auth',
  auth: {
    headers: {
    Authorization:`Bearer ${getToken()}` 
    },
  },
});

function App() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatId = 2; // Replace with dynamic ID as needed
    const channel = echo.private(chat.${chatId});

    channel.listen('MessageSent', (data) => {
      alert(data);
    });

    return () => {
      echo.leave(chat.${chatId}); // Proper cleanup for private channels
    };
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      {chats.map((item, index) => (
        <div key={index}>
          <strong>{item.member_id}</strong>: {item.message} {/* Adjust user ID or display name */}
        </div>
      ))}
    </div>
  );
}

export default App;