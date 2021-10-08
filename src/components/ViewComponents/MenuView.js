import React, { useState } from 'react'
import { connect } from 'react-redux'
import PageView from './PageView'
// eslint-disable-next-line
//import ButtonDraggPage from '../Buttons/ButtonDraggPage'
//import ButtonChangePage from '../Buttons/ButtonChangePage';

import { ACTIONS_MENU } from '../ReducersComponents/MenuReducer';
import { MENU } from '../GetComponents/Constants';

import '../../styles/menu.scss'
import '../../styles/button.scss'
import PageCategories from './PageCategories';

const MenuView = function ({ pages, actualPage, resetPage }) {

    const existsAnyPage = pages && Array.isArray(pages) && pages.length > 0
    const existsPages = existsAnyPage && pages.length > 1;
    const [clicks, setClicks] = useState(0);

    return (
        <div style={{ position: 'relative' }} className="menu">

            {existsPages && clicks === 1 &&
                <span className="finger-pointing">👆🏽</span>
            }

            {(!Array.isArray(pages) || pages.length < 1) &&
                <span className="waiting-text">{"No hay Paginas para mostrar \n"}
                    <strong>(Comuniquelo Por favor)</strong>
                </span>}

            {existsAnyPage &&
                <PageCategories
                    pages={pages}
                    clicks={clicks}
                    setClicks={setClicks}
                    show={actualPage === 0}
                />
            }

            {existsAnyPage &&
                <div className="pages-container">
                    {pages && pages.map((page, indexPage) => (
                        <PageView
                            page={page}
                            indexPage={indexPage + 1}
                            show={indexPage + 1 === actualPage}
                            maxPages={pages.length}
                            key={"page" + indexPage}
                        >
                        </PageView>
                    ))}
                </div>
            }
            {actualPage !== 0 &&
                <span
                    onClick={() => { resetPage(); if (clicks < 2) setClicks(clicks + 1); }}
                    style={{ zIndex: (pages.length + 2) * 10 }}
                    className="btn-start btn-not-pressed">Inicio</span>
            }
        </div>
    )
}
const mapStateToProps = state => ({
    pages: state?.pages,
    actualPage: state?.actualPage
})

const mapDispatchToProps = dispatch => ({
    resetPage() {
        dispatch({
            type: ACTIONS_MENU.RESET_PAGE,
            payload: { element: { name: MENU } }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);