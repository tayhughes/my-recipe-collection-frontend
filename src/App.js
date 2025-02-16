import React from 'react'
import { useState } from 'react';
import './App.css';
import { PRODUCTS} from "./Products";

// single responsibility principle
//    A component should ideally only do ONE thing
// consider what you make a css class selector
// Design - how would you order the designs layers

function ProductCategoryRow({ category }){
  return(
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({product}){

    const name = product.stocked ? product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

    return(
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
}

function ProductTable({product_table_param, filterText,inStockOnly,outStockOnly}){
  const rows = [];
  let lastCategory = null;

  product_table_param.forEach((product) => {
    if(
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1 
      && product.category.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ){
      return;
    }
    if(inStockOnly && !product.stocked){
      return;
    }
    if(outStockOnly && product.stocked){
      return;
    }
    if(product.category !== lastCategory){
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
        />
    );
    lastCategory = product.category;
  });

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({filterText, inStockOnly, outStockOnly, onFilterTextChange, onInStockOnlyChange, onOutStockOnlyChange}){
  return(
    <form>
      <input 
        text="text" 
        value={filterText} 
        placeholder="Search..."
        onChange={(event) => {
          onFilterTextChange(event.target.value);}}
      />
      <label for="check-box-instock">In-Stock Only</label>
      <input
          type="checkbox"
          name="instock-or-out"
          id="check-box-instock"
          checked={inStockOnly}
          onChange={(event) => {
            onInStockOnlyChange(event.target.checked);
          }}/>
      <label for="check-box-outstock">Out-Stock Only</label>
      <input
          type="checkbox"
          name="instock-or-out"
          id="check-box-outstock"
          checked={outStockOnly}
          onChange={(event) => {
            onOutStockOnlyChange(event.target.checked);
          }}/>
    </form>
  );
}

function FilterableProductTable({ products_param }){
  // We will use this to hold STATE because the searchbar and productTable use STATE
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outStockOnly, setOutStockOnly] = useState(false);
  return(
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        outStockOnly={outStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
        onOutStockOnlyChange={setOutStockOnly}/>
      <ProductTable 
        product_table_param={products_param}
        filterText={filterText}
        inStockOnly={inStockOnly}
        outStockOnly={outStockOnly}/>
    </div>
  );
};

// JSON style list of information for products
// const PRODUCTS = [
//   {category: "fruits", price: "$1.00", stocked: true, name: "Apple"},
//   {category: "fruits", price: "$2.00", stocked: true, name: "Pear"},
//   {category: "fruits", price: "$2.00", stocked: false, name: "Banana"},
//   {category: "vegetables", price: "$2.50", stocked: true, name: "Celery"},
//   {category: "vegetables", price: "$3.00", stocked: false, name: "Broccoli"},
//   {category: "vegetables", price: "$3.00", stocked: true, name: "Carrot"},
// ];

function App() {
  return (
    <div>
      <FilterableProductTable products_param={PRODUCTS}/>
    </div>
  );
}

export default App;

// Props -vs- State
// "Don't Repeat Yourself"
// Figure out the absolute minimal representation of the state your
// application needs and computer everything else on demand
// Shopping List Example:
//    Think of all pieces of data
//    1. The original list of products
//    2. The search text the user has entered
//    3. The value of the checkbox
//    4. The filtered list of products
// Which of these are state? Identify the ones that are not
//    Does it 'remain unchanged' over time? -- NOT state
//    Is it 'passed in from a parent' via props? -- NOT state
//    'Can you compute it' based on existing state or props -- NOT state
// What is left
//    The search text is state because it changes over time and cannot be 
//    computed from anything
//
//    The value of checkbox is tate since it changes over time and cannot
//    be commuted from anything
//
//  note: filtered list of products is NOT state bc it can be computed by
//        taking the original list of products and filtering it accordingly
//        to the search text and value of the checkbox
//
// Only the Search Text and value of Checkbox are State
// What component is responsible for changing the state?
// Find closest common parent in component
//  Put the state into the common Parent, above common Parent
// You can create a new component
