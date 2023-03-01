export const searchFieldColumns = [
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
    url: [
      { label: '管理员', value: 1 },
      { label: '高级用户', value: 2 },
      { label: '普通用户', value: 3 },
      { label: '游客', value: 4 },
      { label: '新生命', value: 5 },
    ],
    // options: { multiple: true },
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
