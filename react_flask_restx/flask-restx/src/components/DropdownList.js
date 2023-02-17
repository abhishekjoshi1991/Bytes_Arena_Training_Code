import React from 'react'

export const CustomDropdown = (props) => (
    <div className="form-group">
      <strong>{props.username}</strong>
      <select
        className="form-control"
        name="{props.username}"
        onChange={props.onChange}
      >
        <option defaultValue>Select {props.name}</option>
        {props.options.map((item, index) => (
          <option key={index} value={item.id}>
            {item.username}
          </option>
        ))}
      </select>
    </div>
  )
  export default class CustomListDropDown extends React.Component {
    constructor() {
      super()
      this.state = {
        collection: [],
        value: '',
      }
    }
    componentDidMount() {
      fetch('http://127.0.0.1:5000/api/hello/customers')
        .then((response) => response.json())
        .then((res) => this.setState({ collection: res }))
    }
    onChange = (event) => {
      this.setState({ value: event.target.value })
    }
    render() {
      return (
        <div className="container mt-4">
          <h2>Fetch Sales for Customers   </h2>
          <CustomDropdown
            name={this.state.username}
            options={this.state.collection}
            onChange={this.onChange}
          />
          <button class="btn btn-primary mt-3">Fetch</button>
        </div>
      )
    }
  }
