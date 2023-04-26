import { changeToCamelCase } from '@/config/config';
import type { AxiosInstance } from 'axios';

/**
 * 请求基类
 */
class ApiBase {
  /** axios实例 */
  public request: AxiosInstance;

  constructor(request: AxiosInstance) {
    this.request = request;
    return this;
  }

  /**
   * 获取表对应的列
   * @param {*} path 基础请求路径
   * @type List-列表、Detail-详情、Add-添加、Edit-编辑
   * @returns
   */
  public getColumns(path: string, type: string = 'List') {
    const request = this.request;
    // 1-列表List、2-详情Detail、3-添加Add、4-编辑Edit
    let kind = 1;
    switch (type) {
      case 'List':
        kind = 1;
        break;
      case 'Detail':
        kind = 2;

        break;
      case 'Add':
        kind = 3;
        break;
      case 'Edit':
        kind = 4;
        break;
      case 'Search':
        kind = 5;
        break;
      default:
        break;
    }
    return request({
      url: path + '/GetFields',
      method: 'get',
      params: {
        kind: kind,
      },
    }).then((res) => {
      let list = res.data;
      for (const item of list) {
        item.name = changeToCamelCase(item.name);
      }
      return res;
    });
  }

  public getDataList(path: string, page: any) {
    const request = this.request;
    return request({
      url: path,
      method: 'get',
      params: page,
      // data: page,
    });
  }

  public getData(path: string, id: any) {
    const request = this.request;
    const params = {
      id,
    };
    return request({
      url: path,
      method: 'get',
      params,
    });
  }

  public getDetailData(path: string, id: any) {
    const request = this.request;
    const params = {
      id,
    };
    return request({
      url: path + '/Detail',
      method: 'get',
      params,
    });
  }

  public deleteById(path: string, id: any) {
    const request = this.request;
    const params = {
      id,
    };
    return request({
      url: path,
      method: 'delete',
      params,
    });
  }

  public add(path: string, entity: any) {
    const request = this.request;
    return request({
      url: path,
      method: 'post',
      data: entity,
    });
  }

  public edit(path: string, entity: any) {
    const request = this.request;
    return request({
      url: path,
      method: 'put',
      data: entity,
    });
  }
}

export default ApiBase;
