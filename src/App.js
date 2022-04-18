import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home, ProductDetails, Purchases } from './pages';
import { useSelector } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';
import NavBar from './components/NavBar';
import './App.css';


function App() {
    const isLoading = useSelector(state => state.isLoading);

    return (
        <div className="App">
            <HashRouter>

                {isLoading && <LoadingScreen /> }
                <NavBar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/product/:id' element={<ProductDetails />} />
                    <Route path='/purchases' element={<Purchases />}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;