import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return <div className='bg-dark'>{code ? <Dashboard code={code} /> : <Login />}</div>;
}

export default App;
