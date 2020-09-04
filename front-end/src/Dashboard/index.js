import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import { addDailyTask, getDailyTask, updateDailyTaskStatus,
  resetDashboardData, deletingTaskRow } from '../actions/dashboard';

function mapStateToProps(state) {
	const {
		login: {
      loggedUserInfo
    },
    dashboard: {
      isDashboardRequest,
      dailyTasksInfo,
      dailyTasksUpdateInfo
    }
	} = state;
	return {
    loggedUserInfo,
    isDashboardRequest,
    dailyTasksInfo,
    dailyTasksUpdateInfo
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addDailyTask,
  getDailyTask,
  updateDailyTaskStatus,
  resetDashboardData,
  deletingTaskRow
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
