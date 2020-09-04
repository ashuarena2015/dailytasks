import axios from './axios';
import ActionTypes from '../constants/ActionTypes';

const {
  IS_DASHBOARD_REQUEST,
	ADD_DAILY_TASK_CATEGORY,
  ADD_DAILY_TASK_CATEGORY_FAILED,
  GET_DAILY_TASK_CATEGORY,
  GET_DAILY_TASK_CATEGORY_FAILED,
  UPDATE_DAILY_TASK_STATUS,
  UPDATE_DAILY_TASK_STATUS_FAILED,
  UPDATE_DAILY_TASK_REQUEST,
  RESET_DASHBOARD_DATA,
  FETCH_TASK_REPORT,
  GETTING_TASK_REPORT_SUCCESS,
  GETTING_TASK_REPORT_FAILED,
  DELETE_TASK_ROW,
  DELETE_TASK_ROW_SUCCESS,
  DELETE_TASK_ROW_FAILED
} = ActionTypes;


export function isDashboardRequest(bool) {
  return {
    type: IS_DASHBOARD_REQUEST,
    bool
  };
};

export function addDailyTaskSuccess(response) {
  return {
    type: ADD_DAILY_TASK_CATEGORY,
    response
  };
};

export function addDailyTaskFailed(response) {
  return {
    type: ADD_DAILY_TASK_CATEGORY_FAILED,
    response
  };
};

export function addDailyTask(taskName, unit, multi_item) {
  const multi_item_val = multi_item === 1 ? 1 : 0;
  return (dispatch) => {
    dispatch(isDashboardRequest(true));
    axios.post('/add/daily-task/category', { taskName, unit, multi_item_val})
    .then((res) => {
      dispatch(addDailyTaskSuccess(res.data.data));
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch(addDailyTaskFailed(error.response.data));
    })
  }
};

export function getDailyTaskSuccess(response) {
  return {
    type: GET_DAILY_TASK_CATEGORY,
    response
  };
};

export function getDailyTaskFailed(response) {
  return {
    type: GET_DAILY_TASK_CATEGORY_FAILED,
    response
  };
};

export function getDailyTask() {
  return (dispatch) => {
    axios.get('/daily-task/category')
    .then((res) => {
      dispatch(getDailyTaskSuccess(res.data.data));
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch(getDailyTaskFailed(error.response.data));
    })
  }
};

export function updateDailyTaskRequest(bool) {
  return {
    type: UPDATE_DAILY_TASK_REQUEST,
    bool
  };
};

export function updateDailyTaskStatusSuccess(response) {
  return {
    type: UPDATE_DAILY_TASK_STATUS,
    response
  };
};

export function updateDailyTaskStatusFailed(response) {
  return {
    type: UPDATE_DAILY_TASK_STATUS_FAILED,
    response
  };
};

export function updateDailyTaskStatus(payload) {
  console.log(payload);
  return (dispatch) => {
    dispatch(updateDailyTaskRequest(true));
    axios.post('/update/daily-task/category', { payload })
    .then((res) => {
      dispatch(updateDailyTaskStatusSuccess(res.data.data));
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch(updateDailyTaskStatusFailed(error.response.data));
    })
  }
}

export function resetDashboard() {
  return {
    type: RESET_DASHBOARD_DATA
  }
}

export function resetDashboardData() {
  return (dispatch) => {
    dispatch(resetDashboard());
  }
}

export function fetchingTaskReport(bool) {
  return {
    type: FETCH_TASK_REPORT,
    bool
  };
};

export function gettingTaskReportSuccess(response) {
  return {
    type: GETTING_TASK_REPORT_SUCCESS,
    response
  };
};

export function gettingTaskReportFailed(error) {
  return {
    type: GETTING_TASK_REPORT_FAILED,
    error
  };
};

export function gettingTaskReport(taskId) {
  return (dispatch) => {
    dispatch(fetchingTaskReport(true));
    axios.post('/daily-task/report', { taskId })
    .then((res) => {
      dispatch(gettingTaskReportSuccess(res.data.data));
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch(gettingTaskReportFailed(error.response.data));
    })
  }
}


export function deletingTaskRequest(bool) {
  return {
    type: DELETE_TASK_ROW,
    bool
  };
};

export function deletingTaskSuccess(response) {
  return {
    type: DELETE_TASK_ROW_SUCCESS,
    response
  };
};

export function deletingTaskFailed(error) {
  return {
    type: DELETE_TASK_ROW_FAILED,
    error
  };
};

export function deletingTaskRow(rowId) {
  return (dispatch) => {
    dispatch(deletingTaskRequest(true));
    axios.post('/daily-task/delete', { rowId })
    .then((res) => {
      dispatch(deletingTaskSuccess(res.data.data));
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch(deletingTaskFailed(error.response.data));
    })
  }
}