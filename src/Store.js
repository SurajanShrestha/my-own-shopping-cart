import React from 'react';
import {Cart} from './Cart';

export class Store extends React.Component{
    constructor(props){
        super(props);
        this.state={
            items: [{name: 'Jacket',price: 3000,id: 1},{name: 'Shirt',price: 1500,id: 2},{name: 'Jeans',price: 2000,id: 3}],
            addedItems: []
        };
        this.addItem=this.addItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
    };
    addItem(event){
        var itemId=parseInt(event.target.id);
        var selectedItem=this.state.items.find((item)=>{
            return item.id===itemId;
        });
        //This also works
        //this.setState({addedItems: this.state.addedItems.concat(selectedItem)});

        //This also works...Remember the extra parenthesis after arrow "=>("
        //For more info see: https://reactjs.org/docs/state-and-lifecycle.html
        /*this.setState((prevState)=>({
            addedItems: prevState.addedItems.concat(selectedItem)
        }));*/

        //For Deletion, we need a unique Id for every selected Item that cannot be repeated
        selectedItem.uniqueId=Date.now();
        this.setState((prevState)=>{
            return {addedItems: prevState.addedItems.concat(selectedItem)};
        });
        console.log(selectedItem.uniqueId);
        console.log(selectedItem);
    };
    deleteItem(uniqueId){
        /*var filteredItems=this.state.addedItems.filter((item)=>{
            return item.uniqueId!==uniqueId;
        });*/
        var count=0;
        var filteredItems=this.state.addedItems.filter((item)=>{
            /*We don't want to delete both "for eg:Shirts" if there are two selected shirts AS I could not solve
            the issue of same uniqueId on both "for eg:Shirts". So this code only deletes one of the same selected
            items*/
            if(count===0&&item.uniqueId===uniqueId){
                count++;
                return false;
            }else{
                return true;
            }
        });
        this.setState({addedItems: filteredItems});
    };
    componentDidUpdate(){
        console.log(this.state.addedItems);
    };
    render(){
        var itemList=this.state.items.map((item)=>{
            return(
                <div key={item.id} className="col-lg-3 d-flex flex-column align-items-center py-3" style={{background: "gainsboro"}}>
                    <h4>{item.name}</h4>
                    <h6>{item.price}</h6>
                    <button id={item.id} type="button" className="btn btn-primary" onClick={this.addItem}>Add to Cart</button>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row p-5">
                    <div className="col-lg-8 border border-primary">
                        <div className="row p-3 d-flex justify-content-around">
                            {itemList}
                        </div>
                    </div>
                    <div className="col-lg-4 border border-primary">
                        <h4 className="text-center">Cart</h4>
                        <Cart addedItems={this.state.addedItems} deleteItem={this.deleteItem} />
                    </div>
                </div>
            </div>
        );
    };
};