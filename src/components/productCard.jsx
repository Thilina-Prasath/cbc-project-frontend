export default function ProductCard(props) {
    console.log(props)
    return (
        <div>
            <img className="productImage "src={props.picture}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>    {/*html athule java liyn lot mehm sgl wrhn dl linne*/}
            <h2>{props.price}</h2>
            <button className="addToCart">Add to cart</button>
            <button className="buy now">Buy Now</button>
        </div>
    )}