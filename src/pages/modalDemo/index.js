import { formatMessage } from 'umi-plugin-locale';
import React, { Fragment, Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';

const bodyRoot = document.querySelector('body')
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    bodyRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    bodyRoot.removeChild(this.el);
  }
  
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

function Child({onVisible}) {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className={styles.modal} onClick={onVisible}>
      <button>Click</button>
    </div>
  );
}

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false
    };
  }

  handlevisible = ()=>{

  }

  render() {
    const {visible} = this.state
    return (
      <div>
        <div onClick={()=>{
          this.setState({
            visible : !this.state.visible
          })
        }}>打开</div>
        {
          visible
          ?
          <Modal>
            <Child onVisible = {()=>{
              this.setState({
                visible : !this.state.visible
              })              
            }}/>
          </Modal>
          : null
        }

      </div>
    );
  }
}

