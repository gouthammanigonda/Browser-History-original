import {Component} from 'react'
import './index.css'

class BrowserHistory extends Component {
  state = {
    list: [],
    searchIp: '',
  }

  componentDidMount() {
    this.updateList()
  }

  updateList = () => {
    const {initialHistoryList} = this.props
    this.setState({
      list: initialHistoryList,
    })
  }

  onDelete = id => {
    const {list} = this.state
    const filteredList = list.filter(each => each.id !== id)
    this.setState({
      list: filteredList,
    })
  }

  onChangeSearchIp = event => {
    this.setState({
      searchIp: event.target.value,
    })
  }

  renderResults = () => {
    const {searchIp, list} = this.state
    const filteredList = list.filter(each =>
      each.title.toLowerCase().includes(searchIp.toLowerCase()),
    )

    return (
      <ul className="unordered-list">
        {filteredList.map(each => {
          const {id, timeAccessed, logoUrl, title, domainUrl} = each
          const onClickDelete = () => {
            this.onDelete(id)
          }
          return (
            <li key={id} className="list-item">
              <div className="history-details">
                <p className="time">{timeAccessed}</p>
                <img src={logoUrl} alt="domain logo" className="each-img" />
                <p className="title">{title}</p>
                <p className="domain">{domainUrl}</p>
              </div>
              <div className="delete-container">
                <button
                  type="button"
                  className="button"
                  onClick={onClickDelete}
                  testid="delete"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
                    alt="delete"
                    className="delete"
                  />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  renderNoResults = () => (
    <div className="no-results-container">
      <p className="no-results-heading">There is no history to show</p>
    </div>
  )

  render() {
    const {initialHistoryList} = this.props
    const {searchIp, list} = this.state
    const filteredList = list.filter(each =>
      each.title.toLowerCase().includes(searchIp.toLowerCase()),
    )
    let showNoResults = false
    if (list.length === 0 || filteredList.length === 0) {
      showNoResults = true
    }

    return (
      <div className="main-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
            alt="app logo"
            className="logo"
          />
          <div className="input-container">
            <div className="search-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/search-img.png"
                alt="search"
                className="search"
              />

              <input
                type="search"
                placeholder="search history"
                className="input"
                onChange={this.onChangeSearchIp}
              />
            </div>
          </div>
        </div>
        <div className="container2">
          <div className="browse-list">
            {showNoResults ? this.renderNoResults() : this.renderResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default BrowserHistory
