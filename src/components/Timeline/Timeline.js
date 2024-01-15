import React, { memo, useLayoutEffect, useMemo } from 'react'
import "./Timeline.css"
import config from '../../constant';
// Helper function to generate timeline ticks
const generateTimelineTicks = (start, end, scale) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    const timelineTicks = [];
    const monthTicks = [];
    
    if (scale === "days") {
        let dayDiff = (endDate - startDate) / 1000 / 60 / 60 / 24
        let startMonth = startDate.getMonth()
        let currentIndex = 0
        for (let i = 0; i < dayDiff; i++) {
            const month = startDate.getMonth()
            if(i === 0){
                monthTicks.push({month:startDate.toLocaleString(),days:[]})
            }else if(month !== startMonth){
                startMonth = month
                monthTicks.push(startDate)
                currentIndex++
            }
            monthTicks[currentIndex].days.push(startDate)
        }
        startDate = new Date(startDate.getTime() + config.scale);
    }

    return timelineTicks
};
const Timeline = (props) => {
    const { start, end } = props

    const timelineTicks = useMemo(() => {
        return generateTimelineTicks(start, end, props.timelineScale);
    }, [start, end, props.timelineScale])

    console.log('timelineTicks', timelineTicks)
    return (
        <div className="timeline-content" style={{ width: `${props.chartAreaWidth}px` }}>
            {timelineTicks.map((tick) => (
                <div key={tick.month} className="timeline-tick" style={{ width: `${tick.days.length * config.scaleWidth}px` }}>
                    <div className="timeline-tick-month">
                        {tick.month}
                    </div>
                    {
                        tick.days.map((day,index)=>(
                            <div key={index} className="timeline-tick-day" style={{ width: `${config.scaleWidth}px` }}>
                                {day.getDate()}
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    );
}

export default memo(Timeline)

Timeline.defaultProps = {
    start: new Date(),
    end: new Date(new Date().getDate + 30),
    timelineScale: "days"
}