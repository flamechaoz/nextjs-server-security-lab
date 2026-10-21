export function canEditTask(userId: string, ownerId: string): boolean { return userId.length > 0 && userId === ownerId; }
