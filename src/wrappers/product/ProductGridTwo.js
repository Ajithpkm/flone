import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";

const ProductGridTwo = (props) => {
  return (
    <Fragment>
      {props.products.map((product) => {
        return (
          <ProductGridSingleTwo
            sliderClassName={props.sliderClassName}
            spaceBottomClass={props.spaceBottomClass}
            colorClass={props.colorClass}
            product={product}
            currency={props.currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              props.cartItems.filter((cartItem) => cartItem.id === product.id)[0]
            }
            wishlistItem={
              props.wishlistItems.filter(
                (wishlistItem) => wishlistItem.id === product.id
              )[0]
            }
            compareItem={
              props.compareItems.filter(
                (compareItem) => compareItem.id === product.id
              )[0]
            }
            key={product.id}
            titlePriceClass={props.titlePriceClass}
          />
        );
      })}
    </Fragment>
  );
};

ProductGridTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = (state, props) => {
  return {
    products: getProducts(
      state.productData.products,
      props.category,
      props.type,
      props.limit
    ),
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridTwo);
