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

const initialState = {
	isDashboardRequest: false,
  addDailyTaskSuccess: '',
  dailyTasksInfo: [],
  dailyTasksUpdateInfo: '',
  taskReportInfo: [],
  fetchingTaskReport: false
};

const Dashboard = (state = initialState, action) => {
	switch (action.type) {
	case IS_DASHBOARD_REQUEST:
		return {
			...state,
			isDashboardRequest: true
		};
	case ADD_DAILY_TASK_CATEGORY:
		return {
			...state,
			addDailyTaskSuccess: action.response,
			isDashboardRequest: false,
			addDailyTaskFailed: ''
		};
	case ADD_DAILY_TASK_CATEGORY_FAILED:
		return {
			...state,
			addDailyTaskSuccess: '',
			isDashboardRequest: false,
			addDailyTaskFailed: action.response
    };
  case GET_DAILY_TASK_CATEGORY:
    return {
      ...state,
      dailyTasksInfo: action.response,
      dailyTaskInfoFailed: ''
    };
  case GET_DAILY_TASK_CATEGORY_FAILED:
    return {
      ...state,
      dailyTasksInfo: [],
      dailyTaskInfoFailed: action.response
    };
  case UPDATE_DAILY_TASK_REQUEST:
    return {
      ...state,
      dailyTasksUpdateInfoRequest: true
    }
  case UPDATE_DAILY_TASK_STATUS:
    return {
      ...state,
      dailyTasksUpdateInfo: action.response,
      dailyTaskUpdateInfoFailed: '',
      dailyTasksUpdateInfoRequest: false
    };
  case UPDATE_DAILY_TASK_STATUS_FAILED:
    return {
      ...state,
      dailyTasksUpdateInfo: '',
      dailyTaskUpdateInfoFailed: action.response,
      dailyTasksUpdateInfoRequest: false
    };
  case RESET_DASHBOARD_DATA:
    return {
      ...state,
      dailyTasksUpdateInfo: ''
    }
  case FETCH_TASK_REPORT:
    return {
      ...state,
      fetchingTaskReport: action.bool
    };
  case GETTING_TASK_REPORT_SUCCESS:
    return {
      ...state,
      taskReportInfo: action.response
    };
  case GETTING_TASK_REPORT_FAILED:
    return {
      ...state,
      taskReportInfoFailed: action.error
    };
  case DELETE_TASK_ROW:
    return {
      ...state,
      deletingTaskRequest: action.bool
    };
  case DELETE_TASK_ROW_SUCCESS:
    return {
      ...state,
      deletingTaskRequest: false,
      deletingTaskSuccess: action.response
    };
  case DELETE_TASK_ROW_FAILED:
    return {
      ...state,
      deletingTaskRequest: false,
      deletingTaskFailed: action.error
    };
	default:
		return state;
	}
};

export default Dashboard;
