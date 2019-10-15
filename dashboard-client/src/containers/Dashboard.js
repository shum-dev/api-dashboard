import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/Dashboard.css';

const Dashboard = ({cards, history}) => {
  const handleClick = e => {
    history.push(`/cards/${e.target.id}`)
  }
  return (
      <div className='Dashboard'>
        <div className='Dashboard-container'>
          { cards.map(item => (
              <Card
                key={item.id}
                className='Dashboard-card'
                onClick={handleClick}
                id={item.id}
              >
                <div className='Dashboard-img-container'>
                  <CardImg top width="100%" src={item.Img} alt="Card image cap" />
                </div>
                <CardBody>
                  <CardTitle className='h4'>{item.API}</CardTitle>
                  <CardText>{item.Description}</CardText>
                </CardBody>
              </Card>
            ))
          }
        </div>
      </div>
    )
}

function mapStateToProps(reduxState) {
  return {
    cards: reduxState.cards,
  };
};

export default withRouter(connect(mapStateToProps, null)(Dashboard));