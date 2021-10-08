import React, { useEffect, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { getImage } from '../GetComponents/StorageIndexedDB';

const routeImages = "/images/";
 

const ImageCarousel = ({ listImages, className, setVisibleImage, marginCategory, firstImage }) => {

    const [changePage, setChange] = useState(false);
    const [actualImage, setActualImage] = useState(0);
    const [startPosX, setStartPosX] = useState(-1);

    const [listSRC, setListSRC] = useState([firstImage]);

    const [indexToLoad, setIndexToLoad] = useState(1);

    const maxImages = listSRC?.length;
    
    useEffect(() => {

        if (indexToLoad < listImages.length) {
            getImage(routeImages+listImages[indexToLoad])
            .then(response=>setListSRC(listSRC => [...listSRC, response]))
            .catch(error=>console.log(error));
            setIndexToLoad(indexToLoad + 1)
        }
    }, [listImages, indexToLoad])

    const changeNextImage = function () {

        let nextImage = actualImage;

        if (listSRC && actualImage < listSRC.length - 1)
            nextImage = nextImage + 1;
        else if (listSRC && actualImage === listSRC.length - 1)
            nextImage = 0;


        setActualImage(nextImage);
    }

    const changePrevImage = function () {

        let prevImage = actualImage;

        if (listSRC && actualImage > 0)
            prevImage = prevImage - 1;
        else if (listSRC && actualImage === 0)
            prevImage = listSRC.length - 1;

        setActualImage(prevImage);
    }
    // eslint-disable-next-line
    const dragStart = function (clientX) {

        setChange(true);
        setStartPosX(clientX)

        // if (clientX >= 0 && clientX <= 1 && direction === NoDirection)
        //     setDirection(LeftDirection); // 1 para indicar que se selecciono la parte derecha de la pantalla
        // if (clientX >= 0 && clientX <=1 && direction === NoDirection)
        //     setDirection(RightDirection); // 0 para indicar que se selecciono la parte izquierda de la pantalla
        // else
        //     setDirection(NoDirection); //-1 para indicar que no se ha escogido un lugar clave para realizar cambio de pagina
    }
    // eslint-disable-next-line
    const dragging = function (clientX) {

        if (startPosX - clientX > 0.05 && changePage) { //Next Image
            changeNextImage();
            setChange(false);
            //setDirection(NoDirection);
        }
        else if (clientX - startPosX > 0.05 && changePage) { //Prev Image
            changePrevImage();
            setChange(false);
            //setDirection(NoDirection);
        }

    }

    return (
        <div
            //onPointerEnter={e => { dragStart(e.clientX / window.innerWidth) }}
            //onPointerMove={e => { dragging(e.clientX / window.innerWidth) }}
            style={{
                display: "flex",
                flexDirection: "row",
                transform: "translateX(-" + (marginCategory + 1) * 10 + "px)",
                overflow: "hidden",
                width: '100vw',
                height: '100%',
            }}
        >
            {maxImages > 1 &&
                <div
                    onClick={changeNextImage}
                    style={{
                        position:'absolute',
                        right:0,
                        zIndex:1,
                        cursor:'pointer',
                        height: "100%"
                    }}>
                    <GrFormNext
                        className="btn-change-page-svg"
                        style={{
                            position:'relative',
                            top:'50%'
                        }}
                    />
                </div>
            }
            {maxImages > 1 &&
                <div
                    onClick={changePrevImage}
                    style={{
                        position:'absolute',
                        height: "100%",
                        left:0,
                        zIndex:1,
                        cursor:'pointer'
                    }}
                >
                    <GrFormPrevious
                        className="btn-change-page-svg"
                        style={{
                            position:'relative',
                            top:'50%'
                        }}
                    />
                </div>
            }
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "translateX(-" + (marginCategory + 1) * 0 + "px)",
            }}>
                {listSRC.map(function (srcImage, indexImage) {

                    return <img
                        onClick={() => setVisibleImage(false)}
                        style={{
                            transition: "opacity 1s",
                            opacity: indexImage === actualImage ? 1 : 0,
                            transform: indexImage === actualImage ? "translateX(-" + (indexImage) * (100) + "vw)" : "translateX(0vw)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        key={srcImage}
                        src={srcImage}
                        alt=""
                        className={className}
                    />

                })}
            </div>
        </div>
    );
};

export default ImageCarousel;