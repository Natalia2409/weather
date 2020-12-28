import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import Temperature from './temperature';

const buttonRef = React.createRef();

export default class CSVReader1 extends Component {

  state = {
    arr: [],
    id: ''
  }
    
  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };
  
  handleOnFileLoad = (text) => {
    let newArr = [];
      for (let obj of text) {
         newArr.push(obj.data[0].split(' ').filter(entry => /\S/.test(entry)));
      }
    delete newArr[2];
    delete newArr[3];
    delete newArr[4];
    delete newArr[6];
    newArr = newArr.map(el => el.join(' '));
    this.setState({
      arr: newArr
    })
  };

  render() {
    const { arr } = this.state;
    const newNumber = arr.map(num => <Temperature temperature={num}/>)
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
        >
          <div>
              <div className='reader'>
                <button type="button" onClick={this.handleOpenDialog}>Browse file</button>
              </div>
          </div>
        </CSVReader><div className='inside'>{newNumber}</div>
      </>
    );
  }
}