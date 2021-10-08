import React, { useRef } from 'react'

import ProductView from './ProductView'

import ButtonViewMore from '../Buttons/ButtonViewMore';

import '../../styles/category.scss';

const CategoryView = function ({ category, isSubCategory }) {

    const refShowProducts = useRef(null);

    const hasImageCategory = category && category?.image && category.image.length > 0;
    const hasDescriptionCategory = category && category?.description;
    const showButton = false;

    const showAllProducts = function () {

        const hasProducts = category && category?.products && Array.isArray(category.products) && category.products.length > 0;
        const hasSubCategories = category && category?.categories && Array.isArray(category.categories) && category.categories.length > 0;
        return (
            <ul className="list-products">
                {hasProducts &&
                    category.products.map((product, indexProduct) =>
                        <ProductView 
                        marginCategory={isSubCategory} 
                        product={product} 
                        key={"product" + indexProduct} 
                        />

                    )}

                {hasSubCategories &&
                    category.categories.map((subcategory, indexSubCategory) => (
                        <li className="subcategory" key={"subcategory" + indexSubCategory}>
                            <CategoryView 
                            category={subcategory}
                            isSubCategory={isSubCategory+1}
                            />
                        </li>
                    ))}

            </ul>
        );
    }

    return (
        <section className="category">
            <div className="info-category">
                {showButton &&
                    <ButtonViewMore
                        className="btn-view-more"
                        show={false}
                        refElement={refShowProducts}
                    />}
                <h2 className="tittle-category" >{category?.name}</h2>

                {hasDescriptionCategory && <span className="description-category">({category?.description})</span>}
                
                {hasImageCategory &&
                    <img 
                    className="image-category" 
                    alt={""} 
                    src={"/images/"+category?.image} 
                    onError={event=>{event.target.style.display="none";console.log(event.target)}}
                    />
                }
            </div>

            
            <div style={{ opacity: 1 }} ref={refShowProducts} >{showAllProducts()}</div>
        </section>
    )
}

export default CategoryView;