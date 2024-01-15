const staffs = []
const tasks = []
const taskType = require('./tasktype')
function createstaff() {
    for (let i = 0; i < 50; i++) {
        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(startDate.getDate() + 1)
        const staff = {
            id: i,
            name: `Staff ${i}`,
            role: `Role ${i}`,
        }

        for (let j = 1; j < 30; j++) {
            //  start date and end date in sequence of 12 hours of each other
            startDate.setDate(startDate.getDate() + 1)
            startDate.setHours(endDate.getHours() + 1)
            endDate.setDate(endDate.getDate() + 1)

            let start = new Date(startDate)
            let end = new Date(endDate)
            const randomTaskType = Math.floor(Math.random() * 4);
            const task = {
                id: i + "" + j + Math.floor(Math.random() * 100),
                name: `Task ${i + "" + j}`,
                start: start,
                end: end,
                completion: Math.random() * 100,
                type: `type-${Math.floor(Math.random() * 5) + 1}`,
                staffId: i+1,
                rowIndex: i,
                ...taskType[randomTaskType]
            }
            tasks.push(task)
        }
        staffs.push(staff)
    }
}
createstaff()
const fs = require('fs')
const path = require('path')

fs.writeFileSync(path.join(__dirname, 'staffs.json'), JSON.stringify(staffs))
fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks))