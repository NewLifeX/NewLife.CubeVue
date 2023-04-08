import ApiBase from './api-base';

export class ApiConfig extends ApiBase {
  public getFields(path: string) {
    const request = this.request;

    return request({
      url: path + '/GetFields',
      method: 'get',
    });
  }

  public getObject(path: string) {
    const request = this.request;

    return request({
      url: path,
      method: 'get',
    });
  }

  public updateObject(path: string, obj: object) {
    const request = this.request;

    return request({
      url: path + '/Update',
      method: 'post',
      data: obj,
    });
  }

  public getLoginConfig() {
    const request = this.request;

    return request({
      url: '/Admin/Cube/GetLoginConfig',
      method: 'get',
    });
  }
}
