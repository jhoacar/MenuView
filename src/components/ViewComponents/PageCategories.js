import React from 'react';
import { MENU } from '../GetComponents/Constants';
import { ACTIONS_MENU } from '../ReducersComponents/MenuReducer';
import { connect } from 'react-redux';

const PageCategories = ({ pages, goToPage, clicks, setClicks, show }) => {

    const getCategories = function (pages) {

        let listCategories = [];

        pages.map((page, indexPage) => {
            const categories = page.categories;
            return categories.map(category => listCategories.push({ name: category.name, page: indexPage+1 }));
        });

        return listCategories;
    }

    const listCategories = getCategories(pages);

    return (
        <div style={{
            position:'absolute',
            zIndex:show?(pages.length+2)*10:-1,
            width:'100%',
            height:'100%',
            opacity:show?1:0,
            transform: show? "rotateY(0deg)" : "rotateY(90deg)",
            transformOrigin: "left"
        }}
        >
            <h1 className="page-tittle" >{pages[0].tittle}</h1>
            {
                listCategories.map((category, indexCategory) =>
                    <div key={"category" + indexCategory}>
                        <span
                            onClick={event => { goToPage(category.page); if (clicks < 2) setClicks(clicks + 1); }}
                            style={{ borderRadius: "10px", cursor: "pointer" }} className="tittle-category btn-not-pressed">
                            {category.name}
                        </span>
                        <br />
                    </div>
                )
            }

            <br />
        </div>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    goToPage(numPage) {
        dispatch({
            type: ACTIONS_MENU.CHANGE_PAGE,
            payload: {
                element: { name: MENU },
                changePage: numPage
            }

        });
        setTimeout(()=>window.scrollTo({ top: 0, behavior: 'smooth' }),0);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PageCategories);