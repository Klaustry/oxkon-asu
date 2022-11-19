import { Injectable } from '@nestjs/common';
import { curly } from 'node-libcurl';

@Injectable()
export class CurlScrapperService {
  async getDataViaCurl(location = '') {
    const URL = `http://portal.gzhi.mosreg.ru/dom/common.php?id_dom=169075`;
    const { statusCode, data, headers } = await curly.get(URL);

    console.log('getDataViaPuppeteer results :', data);

    const myString = 'Дата заключения договора</td><td>24.05.2011</td></tr>';

    const string2 = `Дата заключения договора<\/td><td>(.*?)<\/td><\/tr>`;
    const string3 = `<li role="presentation" ><a href="(.*?)"><b>Фото<\/b><\/a><\/li>`;

    const res = this.parseValueUseRegex({
      str: data,
      regexp: string2,
      //getIndex: 1,
    });

    const res2 = this.parseValueUseRegex({
      str: data,
      regexp: string3,
      //getIndex: 0,
    });

    console.log('FFFFFFFFFFFFFFFF', res, res2);

    return res;
  }

  parseValueUseRegex({ regexp, str }) {
    //const strRegexp = regexp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexpCompiled = new RegExp(regexp, 'gm');
    return regexpCompiled.exec(str);
  }
}
