import React from 'react';
import './Cart.css';

export class Cart extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    };
    handleClick(event){
        //Deleting based on each uniqueId stored in id attribute
        var uniqueId=parseInt(event.target.id);
        console.log(uniqueId);
        this.props.deleteItem(uniqueId);
    };
    render(){
        var listItems=this.props.addedItems.map((item)=>{
            return <li className="p-3 mb-3" id={item.uniqueId} onClick={this.handleClick}>{item.name} &nbsp;&nbsp;Rs: {item.price}</li>;
        });
        return(
            <ul>
                {listItems}
            </ul>
        );
    }
};