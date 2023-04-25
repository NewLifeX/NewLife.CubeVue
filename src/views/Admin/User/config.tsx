// export const tableSearchConfig = [
//   {
//     name: 'dtStart$dtEnd',
//     displayName: '时间范围',
//     showInSearch: true,
//     itemType: 'datePicker',
//     options: { type: 'daterange', setDefaultValue: false },
//   },
//   {
//     name: 'roleIds',
//     displayName: '角色',
//     showInSearch: true,
//     itemType: 'select',
//     url: '/Admin/Role?enable=true',
//     //  [
//     //   { label: '管理员', value: 1 },
//     //   { label: '高级用户', value: 2 },
//     //   { label: '普通用户', value: 3 },
//     //   { label: '游客', value: 4 },
//     //   { label: '新生命', value: 5 },
//     // ],
//     options: { method: 'get', labelField: 'name', valueField: 'id' },
//   },
//   {
//     name: 'Q',
//     displayName: '',
//     showInSearch: true,
//     options: {
//       placeholder: '请输入关键字',
//     },
//   },
// ];

export const tableHandlerConfig = [
  {
    name: '新增',
    handler: 'add',
    type: 'primary',
  },
];

const permissionFlags = {
  none: 0,
  detail: 1,
  insert: 2,
  update: 4,
  delete: 8,
};

export const tableActionConfig = [
  {
    name: 'handler',
    displayName: '操作',
    width: '155px',
    showInList: true,
    handlerList: [
      {
        innerText: '查看',
        handler: 'detail',
        if: (app: any) =>
          !app.hasPermission(permissionFlags.update) &&
          app.hasPermission(permissionFlags.detail),
      },
      {
        innerText: '编辑',
        handler: 'editData',
        type: 'primary',
        if: (app: any) => app.hasPermission(permissionFlags.update),
      },
      {
        innerText: '删除',
        type: 'danger',
        handler: 'deleteData',
        if: (app: any) => app.hasPermission(permissionFlags.delete),
      },
    ],
  },
];

// export const tableColumnConfig = [
//   {
//     tableName: 'User',
//     id: 28,
//     tableId: 3,
//     name: 'id',
//     displayName: '编号',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: true,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '编号',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 1,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 29,
//     tableId: 3,
//     name: 'name',
//     displayName: '名称',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: true,
//     length: 50,
//     nullable: false,
//     isDataObjectField: true,
//     description: '名称。登录用户名',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 2,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 31,
//     tableId: 3,
//     name: 'displayName',
//     displayName: '昵称',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '昵称',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 4,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 32,
//     tableId: 3,
//     name: 'sex',
//     displayName: '性别',
//     enable: true,
//     dataType: 'SexKinds',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '性别。未知、男、女',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 5,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 33,
//     tableId: 3,
//     name: 'mail',
//     displayName: '邮件',
//     enable: true,
//     dataType: 'String',
//     itemType: 'mail',
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '邮件',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 6,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 34,
//     tableId: 3,
//     name: 'mobile',
//     displayName: '手机',
//     enable: true,
//     dataType: 'String',
//     itemType: 'mobile',
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '手机',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 7,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 35,
//     tableId: 3,
//     name: 'code',
//     displayName: '代码',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '代码。身份证、员工编号等',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 8,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 36,
//     tableId: 3,
//     name: 'areaId',
//     displayName: '地区',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '地区。省市区',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 9,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 37,
//     tableId: 3,
//     name: 'avatar',
//     displayName: '头像',
//     enable: true,
//     dataType: 'String',
//     itemType: 'image',
//     primaryKey: false,
//     master: false,
//     length: 200,
//     nullable: true,
//     isDataObjectField: true,
//     description: '头像',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 10,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 38,
//     tableId: 3,
//     name: 'roleID',
//     displayName: '角色',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '角色。主要角色',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 11,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 39,
//     tableId: 3,
//     name: 'roleIds',
//     displayName: '角色组',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 200,
//     nullable: true,
//     isDataObjectField: true,
//     description: '角色组。次要角色集合',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 12,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 40,
//     tableId: 3,
//     name: 'departmentID',
//     displayName: '部门',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '部门。组织机构',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 13,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 41,
//     tableId: 3,
//     name: 'online',
//     displayName: '在线',
//     enable: true,
//     dataType: 'Boolean',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '在线',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 14,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 42,
//     tableId: 3,
//     name: 'enable',
//     displayName: '启用',
//     enable: true,
//     dataType: 'Boolean',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '启用',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 15,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 43,
//     tableId: 3,
//     name: 'age',
//     displayName: '年龄',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '年龄。周岁',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 16,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 44,
//     tableId: 3,
//     name: 'birthday',
//     displayName: '生日',
//     enable: true,
//     dataType: 'DateTime',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: true,
//     isDataObjectField: true,
//     description: '生日。公历年月日',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 17,
//     width: '155',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 45,
//     tableId: 3,
//     name: 'logins',
//     displayName: '登录次数',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '登录次数',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 18,
//     width: '120',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 46,
//     tableId: 3,
//     name: 'lastLogin',
//     displayName: '最后登录',
//     enable: true,
//     dataType: 'DateTime',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: true,
//     isDataObjectField: true,
//     description: '最后登录',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 19,
//     width: '155',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 47,
//     tableId: 3,
//     name: 'lastLoginIP',
//     displayName: '最后登录IP',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '最后登录IP',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 20,
//     width: '130',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 48,
//     tableId: 3,
//     name: 'registerTime',
//     displayName: '注册时间',
//     enable: true,
//     dataType: 'DateTime',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: true,
//     isDataObjectField: true,
//     description: '注册时间',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 21,
//     width: '155',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 49,
//     tableId: 3,
//     name: 'registerIP',
//     displayName: '注册IP',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '注册IP',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 22,
//     width: '120',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 3,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 3,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 50,
//     tableId: 3,
//     name: 'onlineTime',
//     displayName: '在线时间',
//     enable: true,
//     dataType: 'Int32',
//     itemType: 'TimeSpan',
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '在线时间。累计在线总时间，秒',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 23,
//     width: '120',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 45,
//     updateTime: '2022-12-27 14:43:22',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 51,
//     tableId: 3,
//     name: 'ex1',
//     displayName: '扩展1',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '扩展1',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 24,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 52,
//     tableId: 3,
//     name: 'ex2',
//     displayName: '扩展2',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '扩展2',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 25,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 53,
//     tableId: 3,
//     name: 'ex3',
//     displayName: '扩展3',
//     enable: true,
//     dataType: 'Double',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '扩展3',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 26,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 54,
//     tableId: 3,
//     name: 'ex4',
//     displayName: '扩展4',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '扩展4',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 27,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 55,
//     tableId: 3,
//     name: 'ex5',
//     displayName: '扩展5',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '扩展5',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 28,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 56,
//     tableId: 3,
//     name: 'ex6',
//     displayName: '扩展6',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '扩展6',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 29,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 57,
//     tableId: 3,
//     name: 'updateUser',
//     displayName: '更新者',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '更新者',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 30,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 58,
//     tableId: 3,
//     name: 'updateUserID',
//     displayName: '更新用户',
//     enable: true,
//     dataType: 'Int32',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '更新用户',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 31,
//     width: '120',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 59,
//     tableId: 3,
//     name: 'updateIP',
//     displayName: '更新地址',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 50,
//     nullable: true,
//     isDataObjectField: true,
//     description: '更新地址',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 32,
//     width: '120',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 60,
//     tableId: 3,
//     name: 'updateTime',
//     displayName: '更新时间',
//     enable: true,
//     dataType: 'DateTime',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: true,
//     description: '更新时间',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 33,
//     width: '155',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 61,
//     tableId: 3,
//     name: 'remark',
//     displayName: '备注',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 500,
//     nullable: true,
//     isDataObjectField: true,
//     description: '备注',
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 34,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 62,
//     tableId: 3,
//     name: 'lastLoginAddress',
//     displayName: '物理地址',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: false,
//     description: null,
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 35,
//     width: '120',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 63,
//     tableId: 3,
//     name: 'departmentName',
//     displayName: '部门',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: false,
//     description: null,
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 36,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 64,
//     tableId: 3,
//     name: 'areaName',
//     displayName: '地区',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: false,
//     description: null,
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 37,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 65,
//     tableId: 3,
//     name: 'roleName',
//     displayName: '角色',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: false,
//     description: null,
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 38,
//     width: '95',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
//   {
//     tableName: 'User',
//     id: 66,
//     tableId: 3,
//     name: 'roleNames',
//     displayName: '角色组',
//     enable: true,
//     dataType: 'String',
//     itemType: null,
//     primaryKey: false,
//     master: false,
//     length: 0,
//     nullable: false,
//     isDataObjectField: false,
//     description: null,
//     showInList: true,
//     showInAddForm: true,
//     showInEditForm: true,
//     showInDetailForm: true,
//     showInSearch: false,
//     sort: 39,
//     width: '105',
//     cellText: null,
//     cellTitle: null,
//     cellUrl: null,
//     headerText: null,
//     headerTitle: null,
//     headerUrl: null,
//     dataAction: null,
//     dataSource: null,
//     createUserId: 0,
//     createTime: '2022-12-02 23:46:29',
//     createIP: null,
//     updateUserId: 0,
//     updateTime: '2022-12-02 23:46:29',
//     updateIP: null,
//   },
// ];
