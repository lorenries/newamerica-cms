import { Component } from 'react';
import { connect } from 'react-redux';

class Programs extends Component {
  getEven = (even, p, i) => {
    let isEven = i % 2 === 0;
    if(isEven !== even && even != 'all') return null;
    return (
      <div className="card program-card" key={`program-${i}`}>
        <div className="program-card__description">
          <h1><a href={p.url}>{p.title}</a></h1>
          <p>{p.description}</p>
        </div>
        {p.subprograms &&
          <div className="program-card__subprograms">
            <label className="block button--text">Projects</label>
            <ul className="inline program-card__subprograms__list">
              {p.subprograms.map((s,i)=>(
                <li key={`program-${i}`}>
                  <label className="link">
                    <a href={s.url}>{s.title}</a>
                  </label>
                </li>
              ))}
            </ul>
          </div>}
      </div>
    );
  }


  desktopCols = () => {
    /** split list on mobile columns **/
    let { response: { results } } = this.props;
    return (
      <div className="row gutter-10">
        <div className="col-md-6">
          {results.map((p,i)=>{
            return this.getEven(true,p,i);
          })}
        </div>
        <div className="col-md-6">
          {results.map((p,i)=>{
            return this.getEven(false,p,i);
          })}
        </div>
      </div>
    );
  }

  mobileCols = () => {
    let { response: { results } } = this.props;
    return (
      <div className="row gutter-10">
        <div className="col-md-6">
          {results.map((p,i)=>{
            return this.getEven('all',p,i);
          })}
        </div>
      </div>
    );
  }

  render(){
    let { windowWidth } = this.props;
    return (
      <div className="home__panel__promo home__panel__programs">
        <div className="container--1080">
          {windowWidth >= 768 && this.desktopCols()}
          {windowWidth < 768 && this.mobileCols()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windowWidth: state.site.windowWidth
});

export default Programs = connect(mapStateToProps)(Programs);
