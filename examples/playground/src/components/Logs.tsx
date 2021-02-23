import * as React from 'react'
import { Events } from 'admob-plus-cordova'

const eventTypes = [
  'deviceready',
  ...Object.keys(Events).map((k) => (Events as { [x: string]: string })[k]),
]

export interface LogsProps {}

const Logs: React.FC<LogsProps> = () => {
  const [events, setEvents] = React.useState<
    Array<{ time: Date; type: string; detail?: any }>
  >([])

  React.useEffect(() => {
    const listener = (event: Event) => {
      setEvents((prev) => [
        ...prev,
        {
          time: new Date(),
          type: event.type,
          detail: (event as CustomEvent).detail,
        },
      ])
    }

    for (const eventType of eventTypes) {
      document.addEventListener(eventType, listener, false)
    }

    return () => {
      for (const eventType of eventTypes) {
        document.removeEventListener(eventType, listener)
      }
    }
  }, [])

  return (
    <div>
      {events.map((event, i) => (
        <div key={i}>
          {typeof event.detail === 'undefined'
            ? event.type
            : `${event.type}: ${JSON.stringify(event.detail)}`}
        </div>
      ))}
    </div>
  )
}

export default Logs
