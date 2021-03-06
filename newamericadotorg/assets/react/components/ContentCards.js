import React from 'react';

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
        <h4 className="card__text__title margin-10">
          <span><u>{person.first_name} {person.last_name}</u></span>
        </h4>
        <h6 className="caption margin-10">{person.position}</h6>
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
        <h6 className="margin-0">{formatDate(event.date, 'MMM. Do, YYYY')}</h6>
        {/* <h3 className="card__text__title bold block">{event.title}</h3> */}
        <h4 className="card__text__title margin-10">
          <span><u>{event.seo_title || event.title}</u></span>
        </h4>
        <h6 className="margin-10">{event.story_excerpt}</h6>
        <h6 className="caption margin-0">{event.city}, {event.state}</h6>
      </a>
      <h6 className="event__rsvp button--text link margin-0">
        <a className="with-caret" href={event.rsvp_link} target="_blank"><u>RSVP</u></a>
      </h6>
    </div>
  </div>
);

const punctuation = (i, len) => {
  if(i == len-2 && len > 2)
    return (<h6 className="inline margin-0" key={`punc-${i}`}>, and&nbsp;</h6>);
  if(i == len-2 && len>1)
    return (<h6 className="inline margin-0" key={`punc-${i}`}>&nbsp;and&nbsp;</h6>);
  if(i != len-1)
    return (<h6 className="inline margin-0" key={`punc-${i}`}>,&nbsp;</h6>)

  return false;

}

const generateAuthors = (authors) => {
  let authorElements = [];
  let len = authors.length;
  let _authors = [...authors];
  if(len > 3) _authors = authors.splice(0,3);
  _authors.forEach((a,i)=>{
    authorElements.push(
      <h6 className="inline link margin-0" key={`author-${i}`}>
        <a href={a.url}><u>{a.first_name} {a.last_name}</u></a>
      </h6>
    );
    let punc = punctuation(i,len);
    if(punc) authorElements.push(punc);
  });

  if(len === 4) authorElements.push(<h6 className="inline bold"> {len-3} more</h6>);
  else if(len > 4) authorElements.push(<h6 className="inline bold">and {len-3} more</h6>);

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
        {post.date && <h6 className="card__text__date margin-top-0 margin-bottom-5 margin-bottom-md-15">{formatDate(post.date, 'MMM. Do, YYYY')}</h6>}
        <h4 className="card__text__title margin-0">
          <span><u>{post.seo_title || post.title}</u></span>
        </h4>
        {post.story_excerpt &&
          <h6 className="margin-top-5 margin-bottom-0 card__text__excerpt">
            {post.story_excerpt}
          </h6>
        }
      </a>

      {post.authors && <div className="card__text__authors margin-top-5 margin-bottom-0">
        {post.authors.length > 0 &&
          <span>
            <h6 className="inline margin-0">By:&nbsp;</h6>
            {generateAuthors(post.authors)}
          </span>
        }
      </div>}
      {post.programs && <h6 className="card__text__program caption margin-top-5 margin-top-md-15 margin-bottom-0">
          {post.programs[0] ? post.programs[0].name : ''} {post.content_type ? post.content_type.name : ''}
        </h6>}
    </div>
  </div>
);
