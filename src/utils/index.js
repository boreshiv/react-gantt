export  const getUtilization = (tasks,staffs) => {
    // Calculate staff utilization
    let utilization = []
    staffs.forEach((staff) => {
        let staffUtilization = {
            staffId: staff.id,
            staffName: staff.name,
            staffRole: staff.role,
            utilization: 0
        }
        tasks.forEach((task) => {
            if (task.staffId === staff.id) {
                staffUtilization.utilization += task.completion
            }
        })
        utilization.push(staffUtilization)
    })
    return utilization
}

export const getScaleInPixel = (scaleWidth,scale="hour") =>{
    switch (scale) {
        case "hour":
            return scaleWidth / 24 // 24 hours
        case "minute":
            return scaleWidth / 1440 // 24 hours * 60 minutes
        case "second": 
            return scaleWidth / 86400 // 24 hours * 60 minutes * 60 seconds
        default:
            return scaleWidth
    }
}
export const getScaleInTime = (scaleWidth,scale="hour") =>{
    switch (scale) {
        case "hour":
        return 24 / scaleWidth // 24 hours
        case "minute":
        return 1440 / scaleWidth // 24 hours * 60 minutes
        case "second":
        return 86400 / scaleWidth // 24 hours * 60 minutes * 60 seconds
        default:
        return scaleWidth
    }
}