import React, { memo, useLayoutEffect, useMemo } from 'react'
import "./Timeline.css"
import config from '../../constant';
// Helper function to generate timeline ticks
const generateTimelineTicks = (start, end, scale) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    const monthTicks = [];

    if (scale === "days") {
        let dayDiff = (endDate - startDate) / 1000 / 60 / 60 / 24
        let startMonth = startDate.getMonth()
        let currentIndex = 0
        for (let i = 0; i < dayDiff; i++) {
            const month = startDate.getMonth()
            const date = new Date(startDate)
            if (i === 0) {
                monthTicks.push({ month: date.toLocaleDateString(), days: [] })
            } else if (month !== startMonth) {
                startMonth = month
                monthTicks.push({ month: date.toLocaleDateString(), days: [] })
                currentIndex++
            }
            monthTicks[currentIndex].days.push(date)
            startDate = new Date(startDate.getTime() + config.scale);
        }
    }

    return monthTicks
};
const Timeline = (props) => {
    const { start, end } = props

    const timelineTicks = useMemo(() => {
        return generateTimelineTicks(start, end, props.timelineScale);
    }, [start, end, props])

    return (
        <div className="timeline-content" style={{ width: `${props.chartAreaWidth}px` }}>
            {timelineTicks.map((tick) => (
                <div key={tick.month} className="timeline-tick" style={{ width: `${tick.days.length * config.scaleWidth}px` }}>
                    <div className="timeline-tick-month">
                        {tick.month}
                    </div>
                    <div className='timeline-tick-line'>
                        {
                            tick.days.map((day,) => {
                                let tickScale = 0
                                if (config.scaleWidth > 100) {
                                    tickScale = 2
                                } else if (config.scaleWidth <= 100 && config.scaleWidth > 80) {
                                    tickScale = 3
                                } else if (config.scaleWidth <= 80 && config.scaleWidth >= 60) {
                                    tickScale = 4
                                }
                                return <div key={day} className="timeline-tick-day" style={{ width: `${config.scaleWidth}px` }}>
                                    <div className='timeline-date'>{day.toLocaleDateString()}</div>
                                    <div className="timeline-tick-hour-container">
                                        {Array.from(Array(24 / tickScale)).map((_, index) => (
                                            <div key={index} className={`timeline-tick-hour ${(24 / tickScale / 2) === index + 1 ? "middle-tick" : ""}`} style={{ width: `${config.scaleWidth / 24 * tickScale}px` }}></div>
                                        ))}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(Timeline)

Timeline.defaultProps = {
    start: new Date(),
    end: new Date(new Date().getDate + 30),
    timelineScale: "days",
    chartAreaWidth: 600
}