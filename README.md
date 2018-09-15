# Bindings for using Jeux with React JS

## connect

Connect connects your React components to the Jeux store so that your components can have access to your Jeux
store passed down as props.

## mapStateToProps

This is a function that essentially lets connect know which slice of the state your component cares about. What is returned becomes
props passed to your connected component


## mapDispatchToProps

This is a function that essentially lets you use Jeux's dispatch function. What is returned becomes
props passed to your connected component

### Both of the functions below accept ownProps which are just the props you pass down to your connected component

```javascript
function mapStateToProps(state, ownProps){
    return {
        name : state.name + ownProps.id
    }
}


```

```javascript
function mapDispatchToProps(dispatch, ownProps){
    return {
        logoutUser : user => dispatch({type : "LOGOUT", user}),
        alertUser : user => dispatch({type: "ALERT_USER", reason : "reason....", user})
    }
}

```

```javascript
// name and looutUser and alertUser can now be accessed in your React component as a prop
class MyComponent extends React.Component{
    constuctor(props){
        super(props);
    }
    
    handleAlert(){
        this.alertUser(this.props.name);
    }
    
    render(){
        return <div onClick ={this.handleAlert.bind(this)}> {this.props.name}</div>
    }
}

// To connect to store do this

const store = Jeux.createStore({
    name : () => "static_name"
})

const ConnectedMyComponent = ReactJeux.connect(store, MyComponent)

class App extends React.Component{
    constuctor(props){
        super(props);
    }
    
    render(){
        return (
        <div
          <ConnectedMyComponent id = {1234}/>
          <ConnectedMyComponent id = {12774}/>
          <ConnectedMyComponent id = { 1 }/>
        </div>
        );
    }
}
```

## Play around with the example of a simple counter below

https://codepen.io/anon/pen/RYBBjb?editors=1010
