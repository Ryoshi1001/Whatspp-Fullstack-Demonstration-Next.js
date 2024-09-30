import { data } from 'autoprefixer';
import React from 'react';

const CalculateTime = (dateString) => {
  const inputDate = new Date(dateString);

  const currentDate = new Date();

  //time and date formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  const timeFormat = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateFormat = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  //check if today, tomorrow or more than one day ago.
  if (
    inputDate.getUTCDate() === currentDate.getUTCDate() &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    const amPmTime = inputDate.toLocaleTimeString('en-US', timeFormat);
    return amPmTime;
  } else if (
    inputDate.getUTCDate() === currentDate.getUTCDate() - 1 &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    //if tomorrow: show yesterday
    return 'Yesterday';
  } else if (
    //over a day ago
    Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) > 1 &&
    Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) <= 7
  ) {
    const timeDifference = Math.floor(
      (currentDate - inputDate) / (1000 * 60 * 60 * 24)
    );

    const targetDate = new Date();
    targetDate.setDate(currentDate.getDate() - timeDifference);

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const targetDay = daysOfWeek[targetDate.getDay()]

    return targetDay;
  } else {
    //over 7 days ago: Show date in DD/MM/YEAR format
    const formattedDate = inputDate.toLocaleDateString('en-GB', dateFormat);
    return formattedDate;
  }
};

export default CalculateTime;

// Function to format elapsed time
