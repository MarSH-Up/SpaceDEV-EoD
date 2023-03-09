import axios from "axios";
import rateLimit from "axios-rate-limit";
import axiosRetry from "axios-retry";
import {
  ClickUpApiTaskResponse,
  Comment,
} from "../interfaces/clikupapi-response.interface";
import { Space } from "../interfaces/clickupapi-response-spaces.interface";

const instance = axios.create({
  baseURL: "https://cors.redoc.ly/https://api.clickup.com/api/v2",
});

const rateLimitedInstance = rateLimit(instance, { maxRPS: 1 });

axiosRetry(rateLimitedInstance, {
  retries: 1,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    (error.response && error.response.status === 429) || false,
});

export const extractClickUpData = async (
  spaceId: string,
  authApi: string,
  month: number,
  day: number,
  year: number
): Promise<any[][]> => {
  try {
    const {
      data: {
        user: { username },
      },
    } = await rateLimitedInstance.get<Space>(`/user`, {
      headers: {
        Authorization: authApi,
      },
    });
    const folderData = await rateLimitedInstance.get<Space>(
      `/space/${spaceId}/folder`,
      {
        headers: {
          Authorization: authApi,
        },
      }
    );
    const { data } = folderData;
    const folders = data.folders;
    const listIds = folders.flatMap((folder: any) =>
      folder.lists.flatMap((list: any) => list.id)
    );
    const startOfday = Date.UTC(year,month-1,day,8,0,0,0);
    const promises = listIds.map((listId: any) =>
    rateLimitedInstance
      .get<ClickUpApiTaskResponse>(
        `/list/${listId}/task?archived=false&subtasks=true&include_closed=true&order_by=updated&date_updated_gt=${startOfday}`,
        {
          headers: {
            Authorization: authApi,
          },
        }
      )
      .then(async (response) => {
        const tasks = response.data.tasks;
        const taskPromises = tasks.map((task: any) =>
          rateLimitedInstance
            .get(
              `/task/${task.id}/comment?date_comment_gt=${startOfday}`,
              {
                headers: {
                  Authorization: authApi,
                },
              }
            )
            .then((commentResponse) => {
              const comments = commentResponse.data.comments;
              // Filter out any comments that do not match the desired condition
              const filteredComments = comments.filter((comment: { comment_text: string | string[]; }) =>
                comment.comment_text != ''
              );
              // Check if there are any filtered comments in the task
              if (filteredComments.length > 0) {
                const taskWithComments = { ...task, comments: filteredComments };
                return taskWithComments;
              } else {
                return null;
              }
            })
        );
        // Wait for all taskPromises to resolve
        const tasksWithComments = await Promise.all(taskPromises);
        // Filter out any null values (i.e. tasks with no comments)
        const nonEmptyTasks = tasksWithComments.filter(
          (task) => task !== null
        );
        return nonEmptyTasks;
      })
  );
  
    const taskData = await Promise.all(promises);
    return [username, taskData.filter((taskArray) => taskArray.length > 0)];
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export default extractClickUpData;
/*
import { extractClickUpData } from './bases/testing_getTask'

//55696377
//49721690 Blackbound
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
}
  */
//https://www.chartjs.org/docs/latest/samples/line/interpolation.html 