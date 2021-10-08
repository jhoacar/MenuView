import React, { useEffect } from 'react';
import { useState } from 'react';
import { getImage } from '../GetComponents/StorageIndexedDB';
import { getDefaultImage } from '../GetComponents/Getters';
import { AiOutlineLoading } from 'react-icons/ai';

import ImageCarousel from './ImageCarousel';

const routeImages = "/images/";


const DescriptionView = ({ srcImage, description, marginCategory }) => {

    const existsImage = srcImage && Array.isArray(srcImage);

    const firstImage = existsImage ? srcImage[0] : undefined;

    const [visibleImage, setVisibleImage] = useState(false);

    const [srcImageLoaded, setSrcImageLoaded] = useState(0);

    const [imageLoaded, setImageLoaded] = useState(false);

    const [imageFound, setImageFound] = useState(false);

    useEffect(() => {

        getDefaultImage()
            .then(response => setSrcImageLoaded(response))
            .catch(error => console.log(error));

        getImage(routeImages + firstImage)
            .then(response => {
                setImageFound(true);
                setImageLoaded(true);
                setSrcImageLoaded(response);
            }
            ).catch(error => {
                setImageLoaded(true);
                console.log(error);
            })
    }, [firstImage, setSrcImageLoaded])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: visibleImage ? "column" : "row",
            }}
            className="description-container"
        >
            {!imageLoaded &&
                <div className="image-product" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AiOutlineLoading className="rotating" />
                </div>
            }
            {imageLoaded && existsImage && !visibleImage &&
                <img
                    className={"image-product btn-not-pressed"}
                    alt=""
                    src={srcImageLoaded}
                    onClick={() => {
                        if (imageFound)
                            setVisibleImage(!visibleImage)
                    }}
                />}
            {imageLoaded && existsImage && visibleImage &&
                <ImageCarousel
                    setVisibleImage={setVisibleImage}
                    className={"image-product-view"}
                    listImages={srcImage}
                    firstImage={srcImageLoaded}
                    marginCategory={marginCategory}
                />
            }
            {description &&
                <span
                    className={!visibleImage ? "description-product" : "description-product-view"}>
                    {description}
                </span>}
        </div>
    );
};

export default DescriptionView;