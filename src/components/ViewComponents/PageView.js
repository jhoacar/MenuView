import React from 'react';
import CategoryView from './CategoryView';

import '../../styles/page.scss';

const PageView = function ({ page, indexPage, show, maxPages  }) {

    const position_page = maxPages - indexPage;
    const existsAnyCategory = page && page?.categories && Array.isArray(page.categories) && page.categories.length > 0;

    const pageStyle = {
        position: 'absolute',
        opacity: show ? 1 : 0,
        transform: show ? "rotateY(0deg)" : "rotateY(90deg)",
        transformOrigin: "left",
        zIndex: 10 * parseInt(position_page, 10),
    };

    return (
        <div id={'page' + indexPage} style={pageStyle} className="page">
            <h1 className="page-tittle">{page?.tittle}</h1>
            {existsAnyCategory &&
                page?.categories.map((category, indexCategory) => 
                        <CategoryView
                            category={category}
                            key={"category" + indexCategory}
                            isSubCategory={0}
                        />
                )}
        </div>
    )

}

export default PageView;