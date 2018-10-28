// App.js 

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// 現在の時間を表示するコンポーネント
class Timer extends Component{
  constructor(props){
    super(props);

    // State(状態)　
    this.state = {
      date : new Date()
    }
    
    this.interval_id = null; // setIntervalが、返すIDを格納する        
  }
  
  // コンポーネント render 関数が、初めて実行された時に実行される 
  // 描画された後に実行される
  componentDidMont(){    
  }
  
  // 親のコンポーネントが setState されると実行される　
  componentWillReceiveProps( nextProps ){
    if( nextProps.flag ){
      this.CountStart(); //タイマーのカウントをスタートさせる
    }else{
    	this.CountStop(); //タイマーのカウントをストップする 
    }
  }

  // コンポーネントが消える時に実行される ( 描画されなくなる時 )
  componentWillUmMount(){    
  }
  
  // カウントをスタートさせる関数
  CountStart(){
    // 1秒に一回第一引数の関数を実行する
    // 1000 で、　1秒
    // 10000 で、10秒
    this.interval_id = setInterval(()=>{
      //this.state.date の値を更新する
      this.setState({ date: new Date() }, ()=>{
					console.log(this.state.date.toString() + "描画されました。" );
      });      
    },1000);    
  }

  // カウントをストップする関数
  CountStop(){
    // setInterval の処理を止める
    clearInterval( this.interval_id );
  }
  
  // setState を実行するたびに実行される
  render(){    
    return(
      <div>
      		<h1>React タイマーサンプル</h1> 
        { this.state.date.toString() }
      </div>
    );
  }
}

// ボタンを表示するコンポーネント
class Button1 extends Component{
  render(){
    return (
      <button onClick={ this.props.onClickEvent }> {/* this.props. onClickEvent は関数。ボタンがクリックされたら実行される */}
        { this.props.label /* <Button1 label="hoge" /> ←の場合 "hoge" が this.props.label に入る */}     
      </button>
    );
  }
}

class App extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      timer_flag : false, // timerの更新フラグ
    }
  }

  // タイマーのカウントをスタートさせる関数
  timerStart(){
    alert("タイマースタート!");
    this.setState({ timer_flag : true });
  }
  
  // タイマーのカウントをストップする関数
  timerStop(){
    alert("タイマーストップ!");
    this.setState({ timer_flag : false });
  }
  
  render() {
    return (
      <div className="App">
        {"タイマーフラグの値 : " + this.state.timer_flag }
        <Timer flag={this.state.timer_flag} />
        <Button1 label="スタート" onClickEvent={this.timerStart.bind(this)} />
        <Button1 label="ストップ" onClickEvent={this.timerStop.bind(this)} />
      </div>
    );
  }
}

export default App;
