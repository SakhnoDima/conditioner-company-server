import { STATUS, TASK_STATUS } from "../constants/index.js";
import TaskSchedulerService from "../services/TaskSchedulerService.js";

const taskScheduler = new TaskSchedulerService();

export const startCron = (req, res) => {
  const { taskStatus } = req.body;
  console.log(req.body);

  if (TASK_STATUS[taskStatus] !== TASK_STATUS.start) {
    return res.status(400).json({
      status: STATUS.error,
      message: `Scraping status incorrect!`,
    });
  }

  if (!taskScheduler.mainTask) {
    taskScheduler.startCron();
    return res.status(200).json({
      status: STATUS.success,
      message: `Scraping started!`,
    });
  } else {
    return res.status(400).json({
      status: STATUS.error,
      message: `Scraping was already started!`,
    });
  }
};

export const stopCron = (req, res) => {
  const { taskStatus } = req.body;

  if (TASK_STATUS[taskStatus] !== TASK_STATUS.stop) {
    return res.status(400).json({
      status: STATUS.error,
      message: `Scraping status incorrect!`,
    });
  }

  if (taskScheduler.mainTask) {
    taskScheduler.stopCron();
    return res.status(200).json({
      status: STATUS.success,
      message: `Scraping was stopped!`,
    });
  } else {
    return res.status(400).json({
      status: STATUS.error,
      message: `Scraping was already stopped!`,
    });
  }
};
