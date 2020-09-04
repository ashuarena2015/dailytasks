import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ModalBoxSimple } from '../Common/ModalSimple';
import EditTaskModal from './EditTaskModal';

Array.prototype.sum = function (prop) {
  var total = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += parseFloat(this[i][prop])
  }
  return total
}

function getSpecificData(myObj, findId) {
  let myData;
  myData = myObj.find(x => x.id === parseFloat(findId));
  return myData;
}

class Report extends Component {

  state = {
    taskForReport: '',
    reportActionTrigger: '',
    taskRow_checkbox: '',
    updateTask: false
  }

  componentDidMount() {
    const { getDailyTask } = this.props;
    getDailyTask();
  }

  fetchingReport() {
    const { gettingTaskReport } = this.props;
    const { taskForReport } = this.state;
    gettingTaskReport(taskForReport);
  }

  onHandleChane(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => {
      this.setState({ reportActionTrigger: true });
      if (name === 'taskForReport' && value) {
        this.fetchingReport();
      }
    });
  }

  openModalForEdit(e) {
    const { name, value, } = e.target;
    this.setState({
      [name]: value,
      modalShow: true
    });
  }

  closeModal = () => {
    this.setState({
      modalShow: false,
      taskRow_checkbox: '',
      updateTask: false
    });
  }

  updateTaskData = () => {
    this.setState({
      updateTask: true,
      modalShow: false
    })
  }

  render() {
    const { dailyTasksInfo, taskReportInfo = [] } = this.props;
    const { reportActionTrigger, taskRow_checkbox, modalShow, updateTask } = this.state;
    return (
      <div style={{ padding: '4rem 1rem 2rem' }}>
        <div className="header_buttons">
          <h3>Report</h3>
          <Link
            to="/dashboard"
            className="button yellow"
          >
            Back to add task
          </Link>
        </div>

          <div className="panel" style={{ marginTop: '0.5rem' }}>
            <div className="panel-body" style={{ paddingBottom: 0 }}>
              <div className="form-group m-b-rg">
                <label>Tasks</label>
                <select name="taskForReport" onChange={e => this.onHandleChane(e)}>
                  <option value="">Select task</option>
                  {dailyTasksInfo && dailyTasksInfo.map((task) => {
                    return (
                    <option value={task.id}>{task.category}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="panel-body" style={{ maxHeight: '187px', overflow: 'auto' }}>
              {taskReportInfo.length ? (
                <table className="table" style={{ width: '100%', maxHeight: '187px' }}>
                <tr>
                  <td>#</td>
                  <td>Date</td>
                  {taskReportInfo.length && !taskReportInfo[0].multi_item ? (
                    <React.Fragment>
                      <td>Time</td>
                      <td>Status</td>
                      <td align="right">Qty</td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td>Items</td>
                      <td align="right">Amount</td>
                    </React.Fragment>
                  )}
                </tr>
                {taskReportInfo.map((task, key) => {
                  return (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          name="taskRow_checkbox"
                          onClick={e => this.openModalForEdit(e)}
                          value={task.id}
                          checked={parseFloat(taskRow_checkbox) === task.id}
                        />
                        {key+1}
                      </td>
                      <td>{moment(task.date).format('LL')}</td>
                      {taskReportInfo.length && !taskReportInfo[0].multi_item ? (
                        <React.Fragment>
                          <td>{task.time}</td>
                          <td>{task.status === 1 ? 'Y' : 'N'}</td>
                          <td align="right">
                            {task.qty}/{task.unit}
                          </td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td>{task.multi_item_title}</td>
                          <td align="right">
                            {task.multi_item_purchase_amount}
                          </td>
                        </React.Fragment>
                      )}
                    </tr>
                  )
                })}
                <tr>
                  <td colSpan="5" style={{ textAlign: 'right' }}>
                    {taskReportInfo.length && taskReportInfo[0].multi_item ? <span>&#x20B9;</span> : ''}
                    {taskReportInfo.length && !taskReportInfo[0].multi_item ? 
                      `${taskReportInfo.sum('qty')}/${taskReportInfo[0].unit}` : taskReportInfo.sum('multi_item_purchase_amount')
                    }
                  </td>
                </tr>
              </table>
              ) : (
                reportActionTrigger && 'No records found.'
              )}
            </div>
            {taskRow_checkbox && modalShow && (
              <ModalBoxSimple
                heading="Action"
                message="You can choose here what you want to do with data."
              >
                <div className="button_group">
                  <button
                    type="button"
                    className="button yellow"
                    onClick={() => this.updateTaskData()}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="button red"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="button dark"
                    onClick={() => this.closeModal()}
                  >
                    Close
                  </button>
                </div>
              </ModalBoxSimple>
            )}
            {!modalShow && updateTask && (<EditTaskModal
              dataId={taskRow_checkbox}
              editData={getSpecificData(taskReportInfo, taskRow_checkbox)}
            />)}
            {taskReportInfo.length > 6 && <p>More data, scroll the table</p>}
          </div>
      </div>
    );
  }
}

export default Report;
