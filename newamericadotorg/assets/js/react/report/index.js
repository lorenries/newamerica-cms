import { Component } from 'react';
import { NAME, ID } from './constants';
import { Fetch } from '../components/API';
import { Route, Switch, Redirect } from 'react-router-dom';
import GARouter from '../ga-router';
import DocumentMeta from 'react-document-meta';
import Heading from './components/Heading';
import Body from './components/Body';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';

class Report extends Component {
  state = { menuOpen: false }

  openMenu = (e) => {
    this.setState({ menuOpen: true });
  }

  closeMenu = (e) => {
    this.setState({ menuOpen: false });
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  getSection = () => {
    let { report, match: { params } } = this.props;

    if(!params.sectionSlug) return {};
    return report.sections.find((s)=>( s.slug==params.sectionSlug ));
  }

  anchorTag = () => {
    const anchor = this.props.location.hash.replace('#', '');

    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        const { top } = el.getBoundingClientRect();
        let positionY = top-140;
        window.scrollTo(0, positionY);
      }
      return true;
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'RELOAD_SCROLL_EVENTS',
      component: 'site'
    });
    this.anchorTag();
    // react-router shim for oti colors
    if(this.props.report.programs[0].slug == 'oti') document.body.classList.add('oti');
  }

  componentDidUpdate(prevProps) {

    if (this.props.location !== prevProps.location) {
      this.props.dispatch({
        type: 'RELOAD_SCROLL_EVENTS',
        component: 'site'
      });

      window.scrollTo(0, 70);
      this.anchorTag();
    }
  }

  render(){
    let { location, match, report, redirect } = this.props;
    let section = this.getSection();
    if(!section) return (<Redirect to={`${report.url}${report.sections[0].slug}`} />)
    return (
      <DocumentMeta title={`${report.title}: ${section.title}`} description={report.search_description}>
        <div className='report'>
          <TopNav section={section} report={report}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu}
            toggleMenu={this.toggleMenu}
            menuOpen={this.state.menuOpen} />
            {section.number===1 &&
              <Heading report={report}/>
            }
            <Body section={section}
              report={report}
              dispatch={this.props.dispatch}
              location={location}
              closeMenu={this.closeMenu}/>
          <BottomNav section={section} report={report} />
        </div>
      </DocumentMeta>
    );
  }
}

class Routes extends Component {
  reportRender = (props) => {
    let { response: { results }} = this.props;
    return (<Report {...props} dispatch={this.props.dispatch} report={results} />);
  }

  redirect = (props) => {
    let { response: { results }} = this.props;
    return <Redirect to={`${props.match.url}${results.sections[0].slug}`} />
  }

  render(){
    return (
      <GARouter>
        <Switch>
          <Route path='/:program/reports/:reportTitle/:sectionSlug' render={this.reportRender} />
          <Route path='/:program/reports/:reportTitle' render={this.redirect} />
          <Route path='/:program/:subprogram/reports/:reportTitle/:sectionSlug' render={this.reportRender} />
          <Route path='/:program/:subprogram/reports/:reportTitle' render={this.redirect} />
        </Switch>
      </GARouter>
    );
  }
}

class APP extends Component {
  render(){
    let { reportId } = this.props;
    return (
      <Fetch name={NAME}
        endpoint={`report/${reportId}`}
        fetchOnMount={true}
        component={Routes} />
    );
  }
}


export default { APP, NAME, ID };