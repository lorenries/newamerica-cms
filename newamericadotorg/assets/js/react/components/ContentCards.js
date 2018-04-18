import { format as formatDate } from 'date-fns';
import Image from './Image'

export const Person = ({ person }) => (
  <div className="card person">
    <a href={person.url}>
      <div className={`card__image ${!person.profile_image ? 'no-image' : ''}`}>
        {person.profile_image &&
          <Image image={person.profile_image} />}
      </div>
      <div className="card__text">
        {/* <h3 className="card__text__title">{person.first_name} {person.last_name}</h3> */}
        <label className="card__text__title bold block link">
          <span><u>{person.first_name} {person.last_name}</u></span>
        </label>
        <label className="caption block">{person.position}</label>
      </div>
    </a>
  </div>
);


export const EventItem = ({ event }) => (
  <div className="card event-card">
    <a href={event.url}>
      <div className={`card__image ${!event.story_image ? 'no-image' : ''}`}>
        <Image image={event.story_image} />
      </div>
    </a>
    <div className="card__text">
      <a href={event.url}>
        <label className="margin-top-0 block">{formatDate(event.date, 'MMM. Do, YYYY')}</label>
        {/* <h3 className="card__text__title bold block">{event.title}</h3> */}
        <label className="card__text__title bold block link">
          <span><u>{event.title}</u></span>
        </label>
        <label className="block">{event.story_excerpt}</label>
        <label className="caption block">{event.city}, {event.state}</label>
      </a>
      <label className="event__rsvp button--text block link margin-0">
        <a className="with-caret" href={event.rsvp_link} target="_blank"><u>RSVP</u></a>
      </label>
    </div>
  </div>
);

const punctuation = (i, len) => {
  if(i == len-2 && len > 2)
    return (<span className="punc" key={`punc-${i}`}>&nbsp;, and&nbsp;</span>);
  if(i == len-2 && len>1)
    return (<span className="punc" key={`punc-${i}`}>&nbsp;&nbsp;and&nbsp;</span>);
  if(i != len-1)
    return (<span className="punc" key={`punc-${i}`}>&nbsp;,&nbsp;</span>)

  return false;

}

const generateAuthors = (authors) => {
  let authorElements = [];
  let len = authors.length;
  authors.forEach((a,i)=>{
    authorElements.push(
      <span className="subtitle inline" key={`author-${i}`}>
        <a href={a.url}>{a.first_name} {a.last_name}</a>
      </span>
    );
    let punc = punctuation(i,len);
    if(punc) authorElements.push(punc);
  });

  return authorElements;
}

export const PublicationListItem = ({ post }) => (
  <div className={`card list ${post.content_type ? post.content_type.api_name : ''}`}>
    <a href={post.url}>
      <div className={`card__image ${!post.story_image ? 'no-image' : ''}`}>
        <Image image={post.story_image} />
      </div>
      </a>
    <div className="card__text">
      <a href={post.url}>
        {post.date && <label className="card__text__date margin-top-0 margin-bottom-15 block">{formatDate(post.date, 'MMM. Do, YYYY')}</label>}
        {/* <h3 className="card__text__title bold block">{post.title}</h3> */}
        <label className="card__text__title bold block link margin-0">
          <span><u>{post.title}</u></span>
        </label>
        {post.story_excerpt &&
          <label className="block margin-top-5 margin-bottom-0 card__text__excerpt">
            {post.story_excerpt}
          </label>
        }
      </a>

      {post.authors && <span>
        {post.authors.length > 0 &&
          <label className="card__text__authors link margin-top-5 margin-bottom-0">
            <span className="punc by">By:&nbsp;</span>{generateAuthors(post.authors)}
          </label>
        }
      </span>}
      {post.programs && <label className="card__text__program caption margin-top-15 margin-bottom-0 block">
          {post.programs[0] ? post.programs[0].name : ''} {post.content_type ? post.content_type.name : ''}
        </label>}
    </div>
  </div>
);