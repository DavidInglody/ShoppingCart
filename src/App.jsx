// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { useGlobalContext } from './context';


function App() {
  const {loading} = useGlobalContext()

  if(loading){
    return <main>
      <div style={{marginTop:"15rem"}} className="loading"></div>
    </main>
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
