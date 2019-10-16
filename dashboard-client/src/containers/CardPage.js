import React, { useState, useEffect} from 'react';
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
        console.log('API data: ', apiData);

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
      return Object.keys(apiData[0]);
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
      {
        Array.isArray(apiData) ? (
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
        ) :
        (
         <RecursiveProperty property={apiData} root={true} propertyName="Click me... " excludeBottomBorder={false}/>
        )
      }
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

const RecursiveProperty = (props) => {
  const LeafPropertyName = (props) => {
    const style = {
      color: 'black',
      fontSize: '14px',
      fontWeight: 'bold',
    }
    return (
      <span className='PropertyName' style={style}>
        {props.children}
      </span>
    )
  }
  return (
    <RecursivePropertyContainer excludeBottomBorder={props.excludeBottomBorder}>
      {props.property ? (
        typeof props.property === 'number' ||
        typeof props.property === 'string' ||
        typeof props.property === 'boolean' ? (
          <>
            <LeafPropertyName>{props.propertyName}: </LeafPropertyName>
            {props.property.toString()}
          </>
        ) : (
          <ExpandableProperty title={props.propertyName} expanded={props.rootProperty}>
            {Object.values(props.property).map((property, index, arr) => (
              <RecursiveProperty
                key={index}
                property={property}
                propertyName={Object.getOwnPropertyNames(props.property)[index]}
                excludaBottomBorder={index === arr.length - 1}
              />
            ))}
          </ExpandableProperty>
        )
      ) : (
        'Property is empty'
      )}
    </RecursivePropertyContainer>
  )
}

const RecursivePropertyContainer = (props) => {
  const style = {
    paddingTop: '10px',
    paddingLeft: '3px',
    marginLeft: '10px',
    color: '#666',
    fontSize: '16px'
  }
  return (
    <div className='RecursivePropertyContainer' style={style}>
      {props.children}
    </div>
  )
}

const ExpandableProperty = (props) => {
  const [isOpen, setIsOpen ] = useState(!!props.expanded);
  const PropertyName = (props) => {
    const style = {
      color: '#008080',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }
    return (
      <div className='PropertyName' onClick={props.onClick} style={style}>
        {props.children}
      </div>
    )
  }
  return (
    <>
      <PropertyName onClick={() => setIsOpen(!isOpen)}>
        {props.title}
        {isOpen ? <span className='plusMinus'>-</span> : <span className='plusMinus'>+</span>}
      </PropertyName>
      {isOpen ? props.children : null}
      {React.Children.count(props.children) === 0 && isOpen ? 'The list is empty!' : null}
    </>

  );
}

export default connect( mapStateToProps, null)(CardPage);