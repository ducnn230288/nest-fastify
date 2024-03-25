export const routerLinks = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    Login: '/auth/login',
    ForgetPassword: '/forgot-password',
    VerifyForotPassword: '/verify-forgot-password',
    SetPassword: '/set-password',
    MyProfile: '/my-profile',
    Dashboard: '/dashboard',
    User: '/user',
    Setting: '/setting',
    Data: '/setting/data',
    DataType: '/setting/data/type',
    Post: '/setting/post',
    PostType: '/setting/post/type',
    Code: '/setting/code',
    Parameter: '/setting/parameter',
    'Code/Add': '/setting/code/add',
    Team: '/setting/team',
    Question: '/setting/question',
    'Team/Add': '/setting/team/add',
    DayOff: '/dayoff/list',
    'DayOff/List': '/dayoff/list',
    'DayOff/Add': '/dayoff/add',
    'DayOff/Detail': '/dayoff/detail',
    Booking: '/booking',
    Task: '/task',
    'Task/Add': '/setting/task/add',
    TimeSheet: '/timesheet',
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    Auth: '/auth',
    CodeType: '/code/type',
    Code: '/code',
    UserRole: '/user/role',
    User: '/user',
    Data: '/data',
    DataType: '/data/type',
    Post: '/post',
    Parameter: '/parameter',
    PostType: '/post/type',
    UserTeam: '/user-team',
    DayOff: '/dayoff',
    UserManager: '/user',
    Booking: '/booking',
    Task: '/task',
    TimeSheet: '/task-timesheet',
    Question: '/question',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
