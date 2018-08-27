
// import { getRule, postRule } from './rule';
// import { getActivities, getNotice, getFakeList } from './api';
// import { getFakeChartData } from './chart';
// import { getProfileBasicData } from './profile';
// import { getProfileAdvancedData } from './profile';
// import { getNotices } from './notices';

const { getRule, postRule } = require('./rule');
const { getNotice, getActivities, getFakeList } = require('./api');
const { getProfileBasicData, getProfileAdvancedData} = require('./profile');

const proxy = {
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  'GET /api/rule': getRule,
  'GET /api/fake': getFakeList,
  'GET /api/notice': getNotice,
  'GET /api/activities': getActivities,

  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
}
module.exports = proxy;