import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { ClickUpApiTaskResponse} from '../interfaces/clikupapi-response.interface';
import { Space } from '../interfaces/clickupapi-response-spaces.interface';

const instance = axios.create({
  baseURL: 'https://cors.redoc.ly/https://api.clickup.com/api/v2',
});

const rateLimitedInstance = rateLimit(instance, { maxRPS: 20 });

export const extractClickUpData = async (
    spaceId: string,
    authApi: string,
    month: number,
    day: number,
    year: number,
  ): Promise<any[][]> => {
    try {
      const response = await rateLimitedInstance.get<Space>(`/team/${spaceId}/space`, {
        headers: {
          Authorization: authApi,
        },
      });
      const { data } = response;
      const spaceSaveId = data.spaces.map((ids: { id: any; }) => ids.id);
  
      const folderPromises = spaceSaveId.map((id: any) =>
      rateLimitedInstance.get(`/space/${id}/folder`, {
        headers: {
          Authorization: authApi,
        },
      }),
      );
  
      const folderData = await Promise.all(folderPromises);
      const folders = folderData.flatMap(folderResponse => folderResponse.data);
      const lists = folders.flatMap(folder => folder.folders);
      const listIds = lists.flatMap(list => list.lists).map(list => list.id);
  
      const promises = listIds.map(listId => 
        rateLimitedInstance.get<ClickUpApiTaskResponse>(`/list/${listId}/task?order_by=updated&date_updated_gt=${Date.UTC(
            year,
            month - 1,
            day,
            0,
            1,
            0,
          )}`, {
            headers: {
              Authorization: authApi,
            },
          })
          .then(response => response.data.tasks),
      )
  
      const taskData = await Promise.all(promises);
      return taskData.filter(taskArray => taskArray.length > 0);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export default extractClickUpData;


  /*
  import { extractClickUpData } from './bases/testing_getTask'

const spaceId = '3117051';
const authApi = 'pk_49716550_Q3QEO4C0I3BDU44F24XDCDXJ13ALD771';
testingAPi = pk_43609730_V0Y6XKSCJPHNR8J3IDQS8RB3M1GD353R 
const month = 2;
const day = 11;
const year = 2023;

let testing : any[][];

await extractClickUpData(spaceId, authApi, month, day, year)
    .then((result: any[][]) => {
        testing = result;
    })
    .catch((error: Error) => {
        console.error(error);
    });
if(typeof testing != 'undefined') {
  console.log(testing);
}
  */