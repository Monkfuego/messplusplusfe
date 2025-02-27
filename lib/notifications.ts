export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications")
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === "granted"
}

export async function sendNotification(title: string, options?: NotificationOptions) {
  if (!("Notification" in window)) {
    return
  }

  if (Notification.permission === "granted") {
    new Notification(title, options)
  } else if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      new Notification(title, options)
    }
  }
}

export function scheduleNotification(hour: number, minute: number, title: string, options?: NotificationOptions) {
  const now = new Date()
  const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute)

  if (scheduledTime.getTime() < now.getTime()) {
    scheduledTime.setDate(scheduledTime.getDate() + 1)
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime()

  setTimeout(() => {
    sendNotification(title, options)
  }, timeUntilNotification)
}

