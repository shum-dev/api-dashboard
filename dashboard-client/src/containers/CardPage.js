import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addError, removeError} from '../store/actions/errors';
import axios from 'axios';
import { Table } from 'reactstrap';
import { Spinner } from 'reactstrap';

import seedCards from '../seedCards';
import '../styles/CardPage.css'

class CardPage extends Component {
  constructor(props) {
    super(props);
    this.cardId = this.props.match.params.cardId;
    this.foundCard = seedCards.filter(item => item.id === this.cardId)[0];
    this.state = {
      inLoad: true
    }
  }
  componentDidMount() {
    if(this.foundCard){
      axios.get(this.foundCard.Endpoint)
      .then(res => {
        if(this.foundCard.Path) {
          this.apiData = res.data[this.foundCard.Path]
        } else {
          this.apiData = res.data;
        }
        this.setState({inLoad: false});
      })
      .catch(err => {
        console.log(err.message);
      })
    }
  }
  componentDidUpdate(prevProps){
    const { activeUser } = this.props;
    if(prevProps.activeUser !== activeUser ){
      this.props.history.push('/');
    }
  }
  getKeys = () => {
    if(Array.isArray(this.apiData)){
      return Object.keys(this.apiData[0]);
    } else {
      return Object.keys(this.apiData);
    }
  }
  getHeader = () => {
    let keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>
    });
  }
  getRowsData = () => {
    let items = this.apiData;
    let keys = this.getKeys();
    if(!Array.isArray(this.apiData)) {
      items = [this.apiData];
    }
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    });

  }
  render() {
    const { inLoad } = this.state;
    if(!this.foundCard){
      return <Redirect to='/'/>
    }
    if(inLoad) {
      return (
        <div className='CardPage-loader'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      )
    }

    return (
      <div className='CardPage'>
         <Table responsive striped>
            <thead>
              <tr>
                {this.getHeader()}
              </tr>
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
          </Table>
      </div>
    )
  }
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
    currentUser: reduxState.currentUser,
    errors: reduxState.errors,
    activeUser: reduxState.users.activeUser
  };
};

export default connect( mapStateToProps, { addError, removeError })(CardPage);