export const formatDate = (date: string | Date): string => {
    const inputDate = new Date(date);
    const now = new Date();

    const isToday =
        inputDate.toDateString() === now.toDateString();

    if (isToday) {
        return inputDate.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (inputDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    const diffInDays = Math.floor(
        (now.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 7) {
        return inputDate.toLocaleDateString("en-US", {
            weekday: "long",
        });
    }

    if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
        });
    }

    return inputDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};