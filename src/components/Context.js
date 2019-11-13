import React, { Component } from "react";
import axios from "axios";

const DataContext = React.createContext();

class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cart: [{ id: "3", qty: 1, total: 350 }, { id: "4", qty: 1, total: 240 }],
      quickView: 0,
      isLoading: true,
      total: 0,
      error: null
    };
  }

  componentDidMount() {
    setTimeout(this.fetchProducts, 1000);
  }

  fetchProducts = () => {
    axios
      .get("/data.json")
      .then(res => {
        this.setState({ products: res.data.data.products });
      })
      .then(() => {
        this.setState({ isLoading: false, total: this.getTotal() });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      this.setState({ total: this.getTotal() });
    }
  }

  getTotal = () => {
    let total = 0;
    this.state.cart.forEach(item => (total += item.total));
    return total;
  };

  getItem = id => {
    // using filter instead of find because it not supported by ie
    return this.state.products.filter(product => product.id === id)[0];
  };

  getFromCart = id => {
    // using filter instead of find because it not supported by ie
    return this.state.cart.filter(item => item.id === id)[0];
  };

  addToDetails = id => {
    this.setState({ productDetails: id });
  };

  addToQuickView = id => {
    this.setState({ quickView: id });
  };

  addToCart = (id, qty = 1) => {
    let item = this.getItem(id);
    let price = item.price;
    let discount = item.discount;

    if (!this.getFromCart(id)) {
      this.setState({
        cart: [
          ...this.state.cart,
          { id: id, qty: qty, total: qty * (price - price * discount) }
        ]
      });
    }
  };

  removeFromCart = id => {
    if (this.getFromCart(id)) {
      let cart = this.state.cart.filter(item => item.id !== id);
      this.setState({ cart });
    }
  };

  handleInputQty = (id, e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }

    let tempCart = [];
    this.state.cart.forEach(item => (tempCart = [...tempCart, item]));
    let index = tempCart.indexOf(this.getFromCart(id));
    tempCart[index].qty = parseInt(value);

    if (tempCart[index].qty > this.getItem(id).max) {
      tempCart[index].qty = this.getItem(id).max;
    } else if (tempCart[index].qty < this.getItem(id).min) {
      tempCart[index].qty = this.getItem(id).min;
    }
    tempCart[index].total =
      tempCart[index].qty *
      (this.getItem(id).price -
        this.getItem(id).price * this.getItem(id).discount);

    this.setState({ cart: tempCart });
    e.target.setSelectionRange(0, e.target.value.length);
  };

  increaseQty = id => {
    let tempCart = [];
    this.state.cart.forEach(item => (tempCart = [...tempCart, item]));
    let index = tempCart.indexOf(this.getFromCart(id));
    tempCart[index].qty += 1;

    if (tempCart[index].qty > this.getItem(id).max) {
      tempCart[index].qty = this.getItem(id).max;
    }
    tempCart[index].total =
      tempCart[index].qty *
      (this.getItem(id).price -
        this.getItem(id).price * this.getItem(id).discount);

    this.setState({ cart: tempCart });
  };

  decreaseQty = id => {
    let tempCart = [];
    this.state.cart.forEach(item => (tempCart = [...tempCart, item]));
    let index = tempCart.indexOf(this.getFromCart(id));
    tempCart[index].qty -= 1;

    if (tempCart[index].qty < this.getItem(id).min) {
      tempCart[index].qty = this.getItem(id).min;
    }
    tempCart[index].total =
      tempCart[index].qty *
      (this.getItem(id).price -
        this.getItem(id).price * this.getItem(id).discount);

    this.setState({ cart: tempCart });
  };

  render() {
    const { children } = this.props;

    return (
      <DataContext.Provider
        value={{
          ...this.state,
          getItem: this.getItem,
          addToDetails: this.addToDetails,
          addToCart: this.addToCart,
          addToQuickView: this.addToQuickView,
          getFromCart: this.getFromCart,
          removeFromCart: this.removeFromCart,
          decreaseQty: this.decreaseQty,
          increaseQty: this.increaseQty,
          handleInputQty: this.handleInputQty
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer };
