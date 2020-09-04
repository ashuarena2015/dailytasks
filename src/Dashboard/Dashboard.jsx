import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { ModalBox } from '../Common/Modal';
import { Notification } from '../Common/Notification';

function convertDate(str) {
  const date = new Date(str);
  const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return ([date.getFullYear(), mnth, day].join("-"));
}

function timeHours() {
  let count;
  let hours = [];
  for(count = 1; count < 25; count++) {
    hours.push(<option>{("0" + count).slice(-2)}</option>);
  }
  return hours;
}

function timeMinutes() {
  let count;
  let minutes = [];
  for(count = 1; count < 61; count++) {
    minutes.push(<option>{("0" + count).slice(-2)}</option>);
  }
  return minutes;
}

class Dashboard extends Component {

  state = {
    addDailyTaskFrom: false,
    date: new Date(),
    modalShow: false,
    mandaoryFieldsTaskUpdate: false,
    timeHours: '',
    timeMinutes: '',
    daily_task_update_status: '',
    unit: ''
  }

  componentDidMount() {
    const { getDailyTask } = this.props;
    getDailyTask();
  }

  onHandleChane(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: name === 'multi_item_check' && e.target.checked ? 1 : value
    });
  }

  OpenModal(taskId, taskName) {
    const { resetDashboardData } = this.props;
    this.setState({
      taskNameModal: taskName,
      taskIdModal: taskId,
      modalShow: true,
    });
    resetDashboardData();
  }

  closeModal = () => {
    const { resetDashboardData } = this.props;
    this.setState({
      taskNameModal: '',
      modalShow: false,
      mandaoryFieldsaskUpdate: false
    });
    resetDashboardData();
  }

  updateModalData = (taskId) => {
    const { updateDailyTaskStatus, dailyTasksInfo } = this.props;
    const { date, daily_task_update_status, timeHours, timeMinutes,
      taskUpdateUnit, taskUpdateQty, multi_item_title, multi_item_purchase_amount  } = this.state;

    const multiItemTasks = dailyTasksInfo.find(x=> x.id === taskId).multi_item;
    const payload = {
      taskId,
      date: convertDate(date),
      timeHours,
      timeMinutes,
      taskUpdateUnit,
      taskUpdateQty,
      taskUpdateStatus: daily_task_update_status,
      multi_item_title,
      multi_item_purchase_amount
    };
    ( multiItemTasks ? multi_item_title !== '' && multi_item_purchase_amount !== '' : (date !== '' && timeHours !== '' && timeMinutes !== '' && daily_task_update_status !== ''))
      ? this.setState({
        mandaoryFieldsTaskUpdate: false,
        timeHours: '',
        timeMinutes: '',
        taskUpdateUnit,
        taskUpdateQty,
        daily_task_update_status: ''
      }, () => { updateDailyTaskStatus(payload), this.closeModal() })
      : this.setState({
        mandaoryFieldsTaskUpdate: true
      })
  }

  onChange = (date) => { this.setState({ date }); }

  render() {
    const { addDailyTask, isDashboardRequest, dailyTasksInfo, dailyTasksUpdateInfo } = this.props;
    const { addDailyTaskFrom, daily_task_name, date, taskNameModal,
      modalShow, taskIdModal, mandaoryFieldsTaskUpdate, unit, multi_item_check } = this.state;

    const multiItemTasks = dailyTasksInfo && taskIdModal !== undefined && dailyTasksInfo.find(x=> x.id === taskIdModal).multi_item;

    return (
      <div style={{ padding: '4rem 1rem 2rem' }}>
        <div className="header_buttons">
          <h3>Dashobard</h3>
          <button
            type="button"
            onClick={()=> this.setState({ addDailyTaskFrom: true })}
            className="button yellow"
          >
            Add task
          </button>
          <Link to="/report" className="button dark" style={{ marginLeft: '0.5rem' }}>Reports</Link>
        </div>

        {/* Notifications */}
        {dailyTasksUpdateInfo !== ''
          &&
          <div style={{ margin: '1rem 0' }}>
            <Notification
              message={`${dailyTasksUpdateInfo === 0 ? 'Already updated!' : 'Successfully updated'}`}
              timeToHide="0"
              messageType={`${dailyTasksUpdateInfo === 0 ? 'error' : 'success'}`}
            />
          </div>
        }

        <div className="daily_tasks">
          {dailyTasksInfo && dailyTasksInfo.map((task) => {
            return (
              <div className="task_box" onClick={() => this.OpenModal(task.id, task.category)}>
                <img src={`/images/${task.category.split(' ').join('')}.png`} height="64" />
                <h3>{task.category}</h3>
              </div>
            )
          })}
        </div>
        {/* DAILY TASK FORM */}
        {addDailyTaskFrom && (
          <div className="panel" style={{ marginTop: '0.5rem' }}>
            <div className="panel-body">
              <h3>Daily task form</h3>
              <div className="form-group m-b-rg">
                <label>Task name</label>
                <input name="daily_task_name" onChange={e => this.onHandleChane(e)} type="text" />
              </div>
              <div className="form-group m-b-rg">
                <label><input type="checkbox" name="multi_item_check" onChange={e => this.onHandleChane(e)} /> Miscellaneous items</label>
              </div>
              {multi_item_check !== 1 && (<div className="form-group m-b-rg">
                <label>Weight unit</label>
                <select name="unit" onChange={e => this.onHandleChane(e)}>
                  <option value="">N/A</option>
                  <option value="kg">KG</option>
                  <option value="pieces">Pieces</option>
                </select>
              </div>)}
              <button
                type="button"
                onClick={() => addDailyTask(daily_task_name.toLowerCase(), unit, multi_item_check)}
                className="button dark"
              >
                {isDashboardRequest && <span className="fa fa-spin fa-spinner" />} Add task
              </button>
              <button
                type="button"
                onClick={() => this.setState({ addDailyTaskFrom: false, showRegisterForm: false })}
                className="button red"
                style={{ marginLeft: '0.5rem' }}
              >
                Cancel
              </button>
            </div>
          </div>)}
          {/* Modal For Daily Task updates */}
          {modalShow && (
            <ModalBox
              heading={`${taskNameModal.toUpperCase()} - Daily task update`}
              closeModal={this.closeModal}
              taskIdModal={taskIdModal} 
              updateModalData={this.updateModalData}
            >
              <div>
                <p style={{ margin: 0 }}>Please select date and time.</p>
                {mandaoryFieldsTaskUpdate && (
                  <div style={{ margin: '1rem 0' }}>
                  <Notification
                    message="All fields are required."
                    timeToHide="0"
                    messageType="error"
                  />
                </div>
                )}
                <DateTimePicker
                  onChange={this.onChange}
                  value={date}
                  format="y-MM-dd"
                  maxDate={new Date()}
                />
                {!multiItemTasks ? (
                  <React.Fragment>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.5rem' }}>
                      <select className="select" name="timeHours" onChange={e => this.onHandleChane(e)} style={{ width: '100px' }}>
                        <option>Hours</option>
                        {timeHours()}
                      </select>
                      <select className="select" name="timeMinutes" onChange={e => this.onHandleChane(e)} style={{ width: '100px', marginLeft: '0.5rem' }}>
                        <option>Minutes</option>
                        {timeMinutes()}
                      </select>
                    </div>
                    <div style={{ display: 'flex', marginTop: '1rem', marginBottom: '0rem', marginLeft: '-1rem', marginRight: '-1rem' }}>
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
                ) : (
                  <React.Fragment>
                    <div className="form-group">
                      <label>Title</label>
                      <input name="multi_item_title" type="text" onChange={e => this.onHandleChane(e)} />
                    </div>
                    <div className="form-group">
                      <label>Purchase amount</label>
                      <input name="multi_item_purchase_amount" type="text" onChange={e => this.onHandleChane(e)} />
                    </div>
                  </React.Fragment>
                )}
              </div>
            </ModalBox>)}
      </div>
    );
  }
}

export default Dashboard;
