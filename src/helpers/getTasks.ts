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