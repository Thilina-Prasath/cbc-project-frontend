import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
      <Header/>
      <ProductCard name ="businesslaptop" description="fjkdndkdjkff" price ="2300" picture="https://picsum.photos/id/2/200/300"/>
      <ProductCard name ="gaming laptop" description="fjkdndkdjkff" price ="2300" picture="https://picsum.photos/id/2/200/300"/>

    </>
  )
}

export default App
