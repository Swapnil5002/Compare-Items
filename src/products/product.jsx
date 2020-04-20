import React, { Component } from 'react';
import './products.scss';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [],
      features: [],
      result: [],
      productName: [],
      productPrice: []
    }
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5e86ec5531000011d8814754')
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        features: data.products.featuresList,
        productName: data.products.compareSummary,
        productPrice: data.products.compareSummary.productPricingSummary,
        productTitles: data.products.compareSummary.titles
      }, () => console.log(this.state.productName))
    })
    .catch(console.log("Error"))
  }

  render() {
    return (
      <div className="container">
        <div className="top-cont">
          <div className="top">
            <h2 className="compare">Compare</h2>
            <p className="item">2 item selected</p>
            <div className="radio-btn">
              <input type="radio" id="select" name="select" value=""/>
              <label for="male">Show Only Differences</label>
            </div>
          </div>
         <div className="tv-cont">
            <img className="tv-img" src={this.state.productName.images && this.state.productName.images[Object.keys(this.state.productName.images)[0]]} alt="tv-image"/>
            <span class="close-btn">&#10006;</span>
            <p className="tv-name">{this.state.productName.titles && this.state.productName.titles[Object.keys(this.state.productName.titles)[0]].title}</p>
            <div className="cost-cont">
              <p className="discount-price"><span>&#8377;</span>{Object.keys(this.state.productPrice).length > 0 && this.state.productPrice[Object.keys(this.state.productPrice)[0]].finalPrice}</p>
              <p className="original-price"><strike><span>&#8377;</span>{Object.keys(this.state.productPrice).length > 0 && this.state.productPrice[Object.keys(this.state.productPrice)[0]].price}</strike></p>
              <p className="discount">{Object.keys(this.state.productPrice).length > 0 && this.state.productPrice[Object.keys(this.state.productPrice)[0]].totalDiscount}% off</p>
            </div>
          </div>
          <div className="item-cont">

            <div className="cont">
            {this.state.productTitles && Object.keys(this.state.productTitles).length > 0 && Object.keys(this.state.productTitles).map((key, index) => {
              console.log(this.state.productTitles, "titles")
                return <option key={index}>{this.state.productTitles[key].title}</option>
              })}
            </div>
            <label for="items">Add a product:</label>
            <span class="">&#10006;</span>
            <select id="items">
              {this.state.productTitles && Object.keys(this.state.productTitles).length > 0 && Object.keys(this.state.productTitles).map((key, index) => {
                return <option key={index}>{this.state.productTitles[key].title}</option>
              })}
            </select>
          </div>
        </div>

        {this.state.features.map((value, index) => {
          return (
            <>
            <p className="title">{value.title}</p>
            <div>
              {value.features.map((feature, index) => {
                return (
                <div className="feature-container">
                <div className="features-list">
                  <p className="feature">{feature.featureName}</p>
                </div>
                  <div className="value">
                  <p className="feature-value">{feature.values[Object.keys(feature.values)[0]]}</p>
                </div>
                </div>
                )
              })}
            </div>
            </>
          )
        })}
      </div>
    );
  }
}
