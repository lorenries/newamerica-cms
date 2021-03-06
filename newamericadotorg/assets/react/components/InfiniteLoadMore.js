import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingDots } from './Icons';

const LoadMoreButton = ({ onclick }) => (
  <div className="centered">
    <a className="button" onClick={onclick}>Load More</a>
  </div>
);

const NoResults = () => (
  <div className="centered margin-top-25">
    <h4>No results found</h4>
  </div>
);

class InfiniteLoadMore extends Component {
  el = null;
  isInfinite = false;
  /**
    dispatched isFetching prop doesn't update quickly enough for onscroll events.
    as in the next scroll tick happens before isFetching is updated.
    add isLoadingMore flag that's updated in the right order in the call stack.
    if content isLoadingMore, do not trigger nextPage
  **/
  isLoadingMore = false;

  static propTypes = {
    response: PropTypes.object,
    infiniteOnMount: PropTypes.bool,
    promptToLoadMore: PropTypes.bool,
    onNextPage: PropTypes.func,
    bottomOffset: PropTypes.number,
    showLoadingDots: PropTypes.bool
  }

  static defaultProps = {
    infiniteOnMount: false,
    onNextPage: ()=>{},
    bottomOffset: 0,
    promptToLoadMore: false,
    showLoadingDots: true
  }

  componentWillMount() {
    this.isInfinite = this.props.infiniteOnMount===true ? true : false;
  }

  componentDidMount(){
    if(this.isInfinite && !this.isLoadingMore && !this.props.promptToLoadMore)
      this.nextPageOnEnd();
  }

  shouldComponentUpdate(nextProps) {
    let { response, promptToLoadMore } = this.props;
    /**
      since we're subscribing to scrollPosition,
      this component gets reevaluated with each tick (/rerendered on each tick)
      this causes sluggish scrolling when the results array gets large.
      here we check the results and only rerender if we have new data.
    **/
    if(this.isInfinite && !this.isLoadingMore && !promptToLoadMore)
      this.nextPageOnEnd();

    if(!response.results) return false;

    if(response.results[0] && nextProps.response.results[0]){
      if(JSON.stringify(response.results) !== JSON.stringify(nextProps.response.results)){
        if(!this.props.infiniteOnMount) this.isInfinite = false;
        return true;
      }
    }

    if(response.isFetching !== nextProps.response.isFetching) return true;

    return response.results.length !== nextProps.response.results.length;
  }

  nextPage = () => {
    let { onNextPage } = this.props;
    if(!this.isLoading){
      let fetchFn = onNextPage();
      if(!fetchFn) return;
      this.isLoadingMore = true;
      if(typeof fetchFn !== 'function')
        console.error('onNextPage prop must return async function with a callback parameter.');
      fetchFn(()=>{
        // give dispatch some time.
        setTimeout(()=>{ this.isLoadingMore = false;});
      });
    }
  }

  loadMore = () => {
    if(!this.props.promptToLoadMore) this.isInfinite = true;
    this.nextPage();
  }

  nextPageOnEnd = () => {
    if(!this.el) return;

    let { bottomOffset } = this.props;

    let distanceFromBottomOfView = -(this.el.getBoundingClientRect().top - document.documentElement.clientHeight + this.el.offsetHeight);

    let limit = distanceFromBottomOfView - bottomOffset;

     if(limit > 0)
       this.nextPage();

  }

  render(){
    let { children, className, response, showLoadingDots } = this.props;
    let classes = `${this.isInfinite ? ' is-infinite' : ''}${this.isLoadingMore ? ' is-loading-more' : '' } ${response.isFetching ? ' is-fetching' : ''}`;

    return (
      <div
        ref={(el) => { this.el = el; }}
        className={'na-react__infinite-load-more' + classes + ' ' + (className||'')}>
        {(response.results.length===0 && !response.isFetching && response.hasResults) &&
          <NoResults />
        }
        {children}
        {(response.hasNext && !this.isInfinite && !response.isFetching) &&
          <LoadMoreButton onclick={this.loadMore}/>
        }
        {(response.isFetching && showLoadingDots) && <div className="margin-top-35"><LoadingDots /></div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  siteScrollPosition: state.site.scroll.position // forces reevaluation on scroll
});

InfiniteLoadMore = connect(mapStateToProps)(InfiniteLoadMore);

export default InfiniteLoadMore;
