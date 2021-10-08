import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom';

import '../../styles/product.scss'

import DescriptionView from './DescriptionView';



const ProductView = function ({ product, marginCategory }) {

    const refShowMore = useRef(null);
    const refProduct = useRef(null);

    const hasDescriptionProduct = product && product?.description;
    const hasDetailsProduct = product && product?.details;
    const hasImageProduct = product && product?.images;

    const hasPrice = product && product?.prices;
    const hasOnePrice = hasPrice && Array.isArray(product.prices) && product.prices.length === 1;
    const hasMuchPrices = hasPrice && Array.isArray(product.prices) && product.prices.length > 1;


    const activeButton = hasImageProduct || hasDescriptionProduct;

    const [firstClick, setFirstClick] = useState(false);

    const [click, setClick] = useState(false);



    const switchClick = function () {

        if (!firstClick && refShowMore.current && click) {
            ReactDOM.render(showInfo(), refShowMore.current);
            setFirstClick(true);
        }
        else if (firstClick && refShowMore.current && click)
            refShowMore.current.style.display = "block";
        else if (firstClick && refShowMore.current && !click)
            refShowMore.current.style.display = "none";

        return true;

    }

    const showInfo = function () {

        return (hasImageProduct || hasDescriptionProduct) &&
            <DescriptionView
                srcImage={product?.images}
                description={product?.description}
                marginCategory={marginCategory}
                classImage="image-product"
                classDescription="description-product"
            />
    };

    const clickHandler = () => {

        if (refProduct.current) {
            if (!click) {
                refProduct.current.classList.remove("btn-not-pressed");
                refProduct.current.classList.add("btn-pressed");
            }
            else{
                refProduct.current.classList.remove("btn-pressed");
                refProduct.current.classList.add("btn-not-pressed");
            }
        }
        setClick(!click);
    };

    return (
        <li>
            <div ref={refProduct} onClick={clickHandler} className="info-product btn-not-pressed">
                <div className="tittle-product">

                    {activeButton &&
                        switchClick() &&
                        <button
                            style={{background:'#873117'}}
                            className="btn-view-more"
                            onClick={clickHandler}
                        >
                            {click ? "-" : "+"}
                        </button>}

                    <div className="features-product">

                        <h3 className="name-product">{product?.name}</h3>

                        {hasDetailsProduct && <span className="details-product">{product?.details}</span>}

                    </div>
                </div>

                {!hasPrice && <span>No hay precio</span>}
                {hasOnePrice &&
                    <span className="single-price">{product.prices[0].price}</span>
                }
                {hasMuchPrices &&
                    <ul className="prices-products">
                        {product.prices.map((price, indexPrice) =>
                            (price?.description || price?.price) &&
                            <li className="price-product" key={"price" + indexPrice}>
                                {price?.description &&
                                    <h4 className="description-price">{price.description}</h4>}
                                {price?.price &&
                                    <span className="multiple-price">{price.price}</span>}
                            </li>
                        )}
                    </ul>
                }
            </div>
            <div style={{ display: "none" }} ref={refShowMore} ></div>
        </li>
    );
}

export default ProductView;
