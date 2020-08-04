import React from 'react';
import promiseDelay from 'promise-delay';
import notFound from '../../assets/img/notfound.png';
import { BrandListBodyListener } from '../../listeners/Brands/BrandListBodyListener';
import { BrandDetailModalBodyListener }
  from '../../listeners/Brands/BrandDetailModalBodyListener';
import { BrandDetailModalFooterListener }
  from '../../listeners/Brands/BrandDetailModalFooterListener';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class BrandListBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brands: [],
      copied: false,
      copiedBrandId: false,
      copiedEffect: false
    };

    BrandListBodyListener.setBrandsState =
      BrandListBodyListener.setBrandsState.bind(this);
  }

  componentDidMount() {
    fetch('https://api.getsuperez.com/brands')
      .then((response) => response.json())
      .then((data) => this.setState({ brands: data }));
  }

  handleGetBrandClick(brandId) {
    const brand = this.state.brands.filter(p => p._id === brandId)[0];

    BrandDetailModalBodyListener.setBrandState(brand);
    BrandDetailModalBodyListener.setImagesState([]);

    BrandDetailModalFooterListener.setApprovedState(false);
  }

  handleCopyLinkClick(brandId) {
    const brand = this.state.brands.filter(p => p._id === brandId)[0];

    BrandDetailModalBodyListener.setBrandState(brand);
    BrandDetailModalBodyListener.setImagesState([]);

    BrandDetailModalFooterListener.setApprovedState(false);
  }

  handleCopyLinkCopy(brandId) {
    this.setState({ copied: true });
    this.setState({ copiedBrandId: brandId });
    this.setState({ copiedEffect: true });

    const interval = 2000;

    const promise = promiseDelay(interval, false);

    promise.then(() => {
      this.setState({ copiedEffect: false });
    });
  }

  render() {
    const { brands, copiedEffect, copiedBrandId } = this.state;

    return (
      <tbody>
        {
          brands.length > 0
            ? (
              brands.map((p, i) =>
                <tr key={p._id}>
                  <td className="text-center">
                    {i + 1}
                  </td>
                  <td className="text-center">
                    <div className="avatar">
                      <img
                        src={p.logo_url
                          ? p.logo_url
                          : notFound}
                        className="img-avatar"
                        alt="getsuperez@gmail.com"
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    {p.name}
                  </td>
                  <td className="text-center">
                    {p.description}
                  </td>
                  <td
                    className="text-center"
                    style={{
                      width: '25%'
                    }}
                  >
                    <button
                      data-toggle="modal"
                      data-target="#primaryModal"
                      type="button"
                      className="btn btn-square btn-outline-primary"
                      value={p._id}
                      onClick={() => this.handleGetBrandClick(p._id)}
                    >
                      <i className="fa fa-eye"></i> View
                    </button>

                    <CopyToClipboard
                      text={`https://admin.getsuperez.com/brands/${p._id}`}
                      onCopy={() => this.handleCopyLinkCopy(p._id)}>
                      {
                        copiedEffect && p._id === copiedBrandId ? (
                          <button
                            type="button"
                            className="btn btn-square btn-primary "
                          >
                            <i className="fa fa-link"></i> Copied!
                          </button>
                        ) : (
                            <button
                              type="button"
                              className="btn btn-square btn-outline-primary "
                            >
                              <i className="fa fa-link"></i> Copy Link
                          </button>
                          )
                      }
                    </CopyToClipboard>
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td className="text-center" colSpan="5">
                  No results found
                </td>
              </tr>
            )
        }
      </tbody>
    );
  }
}

export default BrandListBody;
