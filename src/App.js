import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*//class App extends Component {
//  render() {
//    return (
//      <div className="App">
//        <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//          <h1 className="App-title">Welcome to React</h1>
//        </header>
//        <p className="App-intro">
//          To get started, edit <code>src/App.js</code> and save to reload.
//        </p>
//      </div>
//    );
//  }
//}*/


class CK extends Component{
      handleKey(e){
    if(e.keyCode==13){
      if(!e.target.value){
        return;
      }else{
          var ckcon={text:e.target.value, isDown:false}
          this.props.addCkcon(ckcon);
          e.target.value='';
      }
    }
  }
  render(){
    return(
        <div>
          <input type="text"
              placeholder="您需要计划什么"
              onKeyUp={this.handleKey.bind(this)}/>
          </div>
    )
  }
}
class Lists extends Component{
  handleClick(){
    this.props.deleteCkcon(this.props.index);
  }
  handleChange(e){
    this.props.changeStatus(this.props.index,e.target.checked);
  }
  render(){
    return(
        <li>
          <labal>
            <input type="checkbox"
                checked={this.props.todo.isDown}
                onChange={this.handleChange.bind(this)}/>
            {this.props.todo.text}
            </labal>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.handleClick.bind(this)}>删除</button>
          </li>
    )
  }
}
class UL extends Component{
render(){
var _this=this;
return(
    <ul>
      {this.props.todos.map(function(item,index){
      return<Lists todo={item}
      key={index}
      index={index}
      deleteCkcon={_this.props.deleteCkcon}
      changeStatus={_this.props.changeStatus}/>})
      }
      </ul>)
}
      }
class Status extends Component {
    handleClick() {

        this.props.deleteDown();
    }

    handleChange(e) {
        this.props.changeAllStatus(e.target.checked);
    }

    render() {
        return (
            <div>
                <input type="checkbox"
                       checked={this.props.isAllChecked}
                       onChange={this.handleChange.bind(this)}/>
                {this.props.countDown}已完成/{this.props.total}总数
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.handleClick.bind(this)}>清除已完成</button>
            </div>
        )
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {text: "6点起床", isDown: true},
                {text: "7点出门", isDown: true},
                {text: "7点半吃早餐", isDown: true},
                {text: "9点上班", isDown: true},
            ],
            isAllChecked: false
        }
    }

    addCkcon(todo) {
        this.state.todos.push(todo);
        this.setState({
            todos: this.state.todos
        });
    }

    deleteCkcon(index) {
        this.state.todos.splice(index, 1);
        this.setState({
            todos: this.state.todos
        })
    }

    changeStatus(index, isDown) {
        this.state.todos[index].isDown = isDown;
        this.setState({
            todos: this.state.todos
        });
        this.checkeAll;
    }

    checkAll() {
        if (this.state.todos.every(function (todo) {
                return todo.isDown
            })) {
            this.setState({
                isAllChecked: true
            })
        }
        else {
            this.setState({
                isAllChecked: false
            })
        }
    }

    total() {
        return this.state.todos.length || 0
    }

    countDown() {
        var arr = this.state.todos.filter(function (todo) {
            return todo.isDown;
        });
        return arr.length || 0;
    }

    deleteDown() {
        var arr = this.state.todos.filter(function (todo) {
            return !todo.isDown;
        });
        this.setState({
            todos: arr
        })
        this.checkAll();
    }

    changeAllStatus(isDown) {
        this.state.todos.forEach(function (todo) {
            todo.isDown = isDown;
        });
        this.setState({
            todos: this.state.todos,
            isAllChecked: isDown
        });
    }

    render() {
        return (
            <div>
                <CK addCkcon={this.addCkcon.bind(this)}/>
                <UL todos={this.state.todos}
                    deleteCkcon={this.deleteCkcon.bind(this)}
                    changeStatus={this.changeStatus.bind(this)}/>
                <Status total={this.total()}
                        countDown={this.countDown()}
                        deleteDown={this.deleteDown.bind(this)}
                        isAllChecked={this.state.isAllChecked}
                        changeAllStatus={this.changeAllStatus.bind(this)}/>
            </div>
        )
    }
}




export default App;
