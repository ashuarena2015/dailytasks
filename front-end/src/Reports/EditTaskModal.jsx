import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Notification } from '../Common/Notification';

function timeHoursFunc() {
  let count;
  let hours = [];
  for(count = 1; count < 25; count++) {
    hours.push(<option>{("0" + count).slice(-2)}</option>);
  }
  return hours;
}

function timeMinutesFunc() {
  let count;
  let minutes = [];
  for(count = 1; count < 61; count++) {
    minutes.push(<option>{("0" + count).slice(-2)}</option>);
  }
  return minutes;
}

class EditTaskModal extends Component {

  constructor(props) {
    console.log('props', props);
    super(props);
    this.state =  {
      date: '',
      mandaoryFieldsTaskUpdate: false,
      timeHours: '',
      timeMinutes: '',
      unit: props.editData.unit,
      multi_item_title: props.editData.multi_item_title,
      multi_item_purchase_amount: props.editData.multi_item_purchase_amount
    }
  }
  onChange = (date) => { this.setState({ date }); }

  onHandleChane(e) {
    const { name, value } = e.target;
    console.log('name, value', name, value);
    this.setState({
      [name]: value
    });
  }

  render() {

    const { date, unit, status, multi_item_title, multi_item_purchase_amount } = this.state;
    const { editData = {} } = this.props;
    return (
      <div>
        <p style={{ margin: 0 }}>Please select date and time.</p>
          <div style={{ margin: '1rem 0' }}>
            <Notification
              message="All fields are required."
              timeToHide="0"
              messageType="error"
            />
          </div>
          <DateTimePicker
            onChange={this.onChange}
            value={date || editData.date && new Date(editData.date)}
            format="y-MM-dd"
            maxDate={new Date()}
          />
          {!editData.multi_item ? 
            <React.Fragment>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.5rem' }}>
                <select className="select" name="timeHours" onChange={e => this.onHandleChane(e)} style={{ width: '100px' }}>
                  <option>Hours</option>
                  {timeHoursFunc()}
                </select>
                <select className="select" name="timeMinutes" onChange={e => this.onHandleChane(e)} style={{ width: '100px', marginLeft: '0.5rem' }}>
                  <option>Minutes</option>
                  {timeMinutesFunc()}
                </select>
              </div>
              <div style={{ display: 'flex', marginTop: '1rem', marginBottom: '0rem', marginLeft: '-2rem', marginRight: '-1rem' }}>
                <div className="form-group">
                  <label>Weight unit</label>
                  <select name="taskUpdateUnit" onChange={e => this.onHandleChane(e)}>
                    <option value="">N/A</option>
                    <option value="kg">KG</option>
                    <option value="pieces">Pieces</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input name="taskUpdateQty" type="text" onChange={e => this.onHandleChane(e)} />
                </div>
              </div>
              <div className="form-group">
                <select className="select" name="daily_task_update_status" onChange={e => this.onHandleChane(e)}>
                  <option value="">Status</option>
                  <option value="1">Recieved</option>
                  <option value="0">Not recieved</option>
                </select>
              </div>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="form-group">
                <label>Title</label>
                <input
                  name="multi_item_title"
                  type="text"
                  onChange={e => this.onHandleChane(e)}
                  value={multi_item_title}
                />
              </div>
              <div className="form-group">
                <label>Purchase amount</label>
                <input
                  name="multi_item_purchase_amount"
                  type="text"
                  onChange={e => this.onHandleChane(e)}
                  value={multi_item_purchase_amount}
                />
              </div>
            </React.Fragment>
          }
      </div>
    )
  }
}

export default EditTaskModal;
