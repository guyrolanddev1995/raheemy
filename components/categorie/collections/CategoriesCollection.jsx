import React from 'react';
import CategorieCollectionItem from "./CategorieCollectionItem";

const CategoriesCollection = ({collections}) => {
    return (
      <>
        {collections.map(collection =>
            <CategorieCollectionItem key={collection.id} collection={collection}/>
        )}
      </>
    );
}

export default React.memo(CategoriesCollection);
