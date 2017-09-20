import { h, Component } from 'preact'
import preact from 'preact'

class AppState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      activePost: ''
    }

    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(updater, callback) {
    // newState can be object or function!
    this.setState(updater, () => {
      if (this.props.debug) {
        console.log('setAppState', JSON.stringify(this.state));
      }
      if (callback) {
        callback();
      }
    });
  }

  render({}, {...state}) {
    return (
      <div class='AppState'>
        { this.props.children.map( child => {
            return preact.cloneElement(child, {
                appState: state,
                setAppState: this.setAppState
            });
        }) }
      </div>
    )
  }
}

export default AppState;
