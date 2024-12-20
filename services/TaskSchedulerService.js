import cron from "node-cron";
import dotenv from "dotenv";
import { getLocations } from "../controllers/getLocations.js";

dotenv.config();

class TaskSchedulerService {
  constructor(
    schedule = process.env.CRON_SCHEDULE,
    timezone = process.env.TIMEZONE
  ) {
    this.schedule = schedule;
    this.timezone = timezone;
    this.mainTask = null;
  }

  async runTasksSequentially() {
    console.log("Тут виконується функція");
    await getLocations();
  }

  startCron() {
    if (!this.mainTask) {
      this.mainTask = cron.schedule(
        this.schedule,
        async () => {
          await this.runTasksSequentially();
        },
        {
          timezone: this.timezone,
        }
      );
      this.mainTask.start();
      console.log("Cron started!");
    } else {
      console.log("Cron is already running!");
    }
  }

  stopCron() {
    if (this.mainTask) {
      this.mainTask.stop();
      this.mainTask = null;
      console.log("Cron stopped!");
    } else {
      console.log("Cron is not running!");
    }
  }
}

export default TaskSchedulerService;
