export const unreadNotificationsFunction = (notifications) => {
    return notifications.filter(n => n.isRead === false);
}

// utils/formatRelativeDate.js
export const formatRelativeDate = (date) => {
    const now = new Date();
    const targetDate = new Date(date);

    const isToday = now.toDateString() === targetDate.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === targetDate.toDateString();
    const isTomorrow = new Date(now.setDate(now.getDate() + 2)).toDateString() === targetDate.toDateString();

    if (isToday) {
        return `Today at ${targetDate.toLocaleTimeString()}`;
    } else if (isYesterday) {
        return `Yesterday at ${targetDate.toLocaleTimeString()}`;
    } else if (isTomorrow) {
        return `Tomorrow at ${targetDate.toLocaleTimeString()}`;
    } else {
        return targetDate.toLocaleString();
    }
};
