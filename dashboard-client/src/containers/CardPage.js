import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCardData } from '../services/api';
import { Redirect } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Spinner } from 'reactstrap';

import '../styles/CardPage.css'

const CardPage = (props) => {
  const [apiData, setApiData ] = useState(null);
  const [inLoad, setInLoad ] = useState(true);

  useEffect(() => {
    let didCancel = false;
    const { cardId } = props.match.params;
    fetchCardData(cardId)
    .then(apiData => {
      if(!didCancel){
        setApiData(apiData);
        setInLoad(false);
      }
    })
    .catch(err => {
      if(!didCancel){
        setInLoad(false);
      }
    });
    return () => {
      didCancel = true;
    }
  }, [props.match.params]);

  useEffect(() => {
    return () => {
      props.history.push('/');
    }
  }, [props.activeUser, props.history]);

  const getKeys = () => {
    if(Array.isArray(apiData)){
      return Object.keys(apiData[0]);
    } else {
      return Object.keys(apiData);
    }
  }
  const getHeader = () => {
    let keys = getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>
    });
  }
  const getRowsData = () => {
    let items = apiData;
    let keys = getKeys();
    if(!Array.isArray(apiData)) {
      items = [apiData];
    }
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    });

  }
  if(inLoad) {
    return (
      <div className='CardPage-loader'>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    )
  }
  if(!apiData) {
    return <Redirect to='/' />
  }
  return (
    <div className='CardPage'>
        <Table responsive striped>
          <thead>
            <tr>
              {getHeader()}
            </tr>
          </thead>
          <tbody>
            {getRowsData()}
          </tbody>
        </Table>
    </div>
  )
}

const RenderRow = ({keys, data}) => {
  return keys.map((key, index) => {
    if(typeof data[key] === 'object' && !Array.isArray(data[key])){
      return <td key={index}>{JSON.stringify(data[key])}</td>
    }
    return <td key={index}>{data[key]}</td>
  });
};

function mapStateToProps(reduxState) {
  return {
    currentAdmin: reduxState.currentAdmin,
    activeUser: reduxState.users.activeUser
  };
};

export default connect( mapStateToProps, null)(CardPage);