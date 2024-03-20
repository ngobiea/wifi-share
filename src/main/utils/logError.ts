import { app } from'electron';
import fs from 'fs';
import {join} from 'path';
// Function to log error
export const logError = (error: Error) => {
  const errorLogsDir = join(app.getPath('userData'), 'errorLogs');
  const errorLogFile = join(errorLogsDir, 'errors.json');

  // Check if the errorLogs directory exists, if not, create it
  if (!fs.existsSync(errorLogsDir)) {
    fs.mkdirSync(errorLogsDir);
  }

  // Create error log object with date
  const errorLog = {
    date: new Date().toLocaleString(),
    error: error.toString(), // Convert error to string
  };

  // Read existing errors or create an empty array if file does not exist
  let existingErrors = [];
  if (fs.existsSync(errorLogFile)) {
    existingErrors = JSON.parse(fs.readFileSync(errorLogFile).toString());
  }

  // Append new error to existing errors array
  existingErrors.push(errorLog);

  // Write errors back to file
  fs.writeFileSync(errorLogFile, JSON.stringify(existingErrors, null, 2));

};


