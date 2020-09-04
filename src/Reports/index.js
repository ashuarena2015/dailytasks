import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Report from './Report';
import { getDailyTask, gettingTaskReport } from '../actions/dashboard';

function mapStateToProps(state) {
	const {
		login: {
      loggedUserInfo
    },
    dashboard: {
      isDashboardRequest,
      dailyTasksInfo,
      dailyTasksUpdateInfo,
      taskReportInfo
    }
	} = state;
	return {
    loggedUserInfo,
    isDashboardRequest,
    dailyTasksInfo,
    dailyTasksUpdateInfo,
    taskReportInfo
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getDailyTask,
  gettingTaskReport
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Report);
