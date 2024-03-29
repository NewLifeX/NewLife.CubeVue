export const tableSearchConfig = [
  {
    itemType: 'datePicker',
    name: 'dtStart$dtEnd',
    displayName: '时间范围',
    showInSearch: true,
    options: { type: 'daterange', setDefaultValue: false },
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

export const tableColumnConfig = [
  {
    name: 'id',
    displayName: '编号',
    dataType: 'Int32',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '编号',
    showInList: true,
    width: '95',
  },
  {
    name: 'name',
    displayName: '名称',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: false,
    isDataObjectField: true,
    description: '名称',
    showInList: true,
    width: '95',
  },
  {
    name: 'enable',
    displayName: '启用',
    dataType: 'Boolean',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '启用',
    showInList: true,
    width: '95',
  },
  {
    name: 'isSystem',
    displayName: '系统',
    dataType: 'Boolean',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description:
      '系统。用于业务系统开发使用，不受数据权限约束，禁止修改名称或删除',
    showInList: true,
    width: '95',
  },
  {
    name: 'permission',
    displayName: '权限',
    dataType: 'String',
    itemType: null,
    length: -1,
    nullable: true,
    isDataObjectField: true,
    description: '权限。对不同资源的权限，逗号分隔，每个资源的权限子项竖线分隔',
    showInList: false,
    width: '95',
  },
  {
    name: 'sort',
    displayName: '排序',
    dataType: 'Int32',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '排序',
    showInList: true,
    width: '95',
  },
  {
    name: 'ex1',
    displayName: '扩展1',
    dataType: 'Int32',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '扩展1',
    showInList: true,
    width: '105',
  },
  {
    name: 'ex2',
    displayName: '扩展2',
    dataType: 'Int32',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '扩展2',
    showInList: true,
    width: '105',
  },
  {
    name: 'ex3',
    displayName: '扩展3',
    dataType: 'Double',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '扩展3',
    showInList: true,
    width: '105',
  },
  {
    name: 'ex4',
    displayName: '扩展4',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: true,
    isDataObjectField: true,
    description: '扩展4',
    showInList: true,
    width: '105',
  },
  {
    name: 'ex5',
    displayName: '扩展5',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: true,
    isDataObjectField: true,
    description: '扩展5',
    showInList: true,
    width: '105',
  },
  {
    name: 'ex6',
    displayName: '扩展6',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: true,
    isDataObjectField: true,
    description: '扩展6',
    showInList: true,
    width: '105',
  },
  {
    name: 'createUser',
    displayName: '创建者',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: true,
    isDataObjectField: true,
    description: '创建者',
    showInList: true,
    width: '105',
  },
  {
    name: 'createUserID',
    displayName: '创建用户',
    dataType: 'Int32',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '创建用户',
    showInList: true,
    width: '120',
  },
  {
    name: 'createIP',
    displayName: '创建地址',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: true,
    isDataObjectField: true,
    description: '创建地址',
    showInList: true,
    width: '120',
  },
  {
    name: 'createTime',
    displayName: '创建时间',
    dataType: 'DateTime',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '创建时间',
    showInList: true,
    width: '155',
  },
  {
    name: 'updateUser',
    displayName: '更新者',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: true,
    isDataObjectField: true,
    description: '更新者',
    showInList: true,
    width: '105',
  },
  {
    name: 'updateUserID',
    displayName: '更新用户',
    dataType: 'Int32',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '更新用户',
    showInList: true,
    width: '120',
  },
  {
    name: 'updateIP',
    displayName: '更新地址',
    dataType: 'String',
    itemType: null,
    length: 50,
    nullable: true,
    isDataObjectField: true,
    description: '更新地址',
    showInList: true,
    width: '120',
  },
  {
    name: 'updateTime',
    displayName: '更新时间',
    dataType: 'DateTime',
    itemType: null,
    length: 0,
    nullable: false,
    isDataObjectField: true,
    description: '更新时间',
    showInList: true,
    width: '155',
  },
  {
    name: 'remark',
    displayName: '备注',
    dataType: 'String',
    itemType: null,
    length: 500,
    nullable: true,
    isDataObjectField: true,
    description: '备注',
    showInList: true,
    width: '95',
  },
];
