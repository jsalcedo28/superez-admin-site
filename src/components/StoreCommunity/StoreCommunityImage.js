import React from 'react';
import ToolTip from '../../assets/lib/ToolTip';
import { StoreCommunityDetailModalBodyListener }
  from '../../listeners/StoreCommunity/StoreCommunityDetailModalBodyListener';

const imageProps = {
  margin: '10px',
  border: '1px solid #e0e0e0',
  cursor: 'pointer'
};

const imageZoomProps = {
  margin: '5px',
  border: '1px solid #e0e0e0'
};

class StoreCommunityImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isTooltipActive: false };

    this.handleShowTooltipMouseEnter
      = this.handleShowTooltipMouseEnter.bind(this);

    this.handleHideTooltipMouseLeave
      = this.handleHideTooltipMouseLeave.bind(this);

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick(event) {
    const store = StoreCommunityDetailModalBodyListener.getStoreCommunityState();

    let storeCopy = JSON.parse(JSON.stringify(store));

    storeCopy[this.props.image_property] = event.target.src;

    StoreCommunityDetailModalBodyListener.setStoreCommunityState(storeCopy);
  }

  handleShowTooltipMouseEnter() {
    this.setState({ isTooltipActive: true });
  }

  handleHideTooltipMouseLeave() {
    this.setState({ isTooltipActive: false });
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.isDetail ? (
            <img
              id={this.props.id}
              onMouseEnter={this.handleShowTooltipMouseEnter}
              onMouseLeave={this.handleHideTooltipMouseLeave}
              src={this.props.image_url}
              alt="store"
              height="144"
              width="144"
              style={imageProps}
            />
          ) : (
              <img
                id={this.props.id}
                onMouseEnter={this.handleShowTooltipMouseEnter}
                onMouseLeave={this.handleHideTooltipMouseLeave}
                src={this.props.image_url}
                alt="store"
                height="144"
                width="144"
                style={imageProps}
                onClick={this.handleImageClick}
              />
            )
        }
        <ToolTip
          active={this.state.isTooltipActive}
          parent={`#${this.props.id}`}
          position={this.props.position}
          arrow={this.props.arrow}
          align={this.props.align}
          group={this.props.group}
          content={this.props.content}
        >
          <img
            src={this.props.image_url}
            alt="store"
            style={imageZoomProps}
            width="288"
          />
        </ToolTip>
      </React.Fragment>
    );
  }
}

export default StoreCommunityImage;
