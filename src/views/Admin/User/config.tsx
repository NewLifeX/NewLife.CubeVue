export const tableSearchConfig = [
  {
    name: 'dtStart$dtEnd',
    displayName: '时间范围',
    showInSearch: true,
    itemType: 'datePicker',
    options: { type: 'daterange', setDefaultValue: false },
  },
  {
    name: 'roleIds',
    displayName: '角色',
    showInSearch: true,
    itemType: 'select',
    url: '/Admin/Role?enable=true',
    //  [
    //   { label: '管理员', value: 1 },
    //   { label: '高级用户', value: 2 },
    //   { label: '普通用户', value: 3 },
    //   { label: '游客', value: 4 },
    //   { label: '新生命', value: 5 },
    // ],
    options: { labelField: 'name', valueField: 'id' },
  },
  {
    name: 'Q',
    displayName: '',
    showInSearch: true,
    options: {
      placeholder: '请输入关键字',
    },
  },
];

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
