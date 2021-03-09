import * as React from 'react'
import { Events } from 'admob-plus-cordova'

const eventTypes = [
  'deviceready',
  ...Object.keys(Events).map((k) => (Events as { [x: string]: string })[k]),
]

export interface LogsProps {}

const Logs: React.FC<LogsProps> = () => {
  const [logs, setLogs] = React.useState<Array<{ time: Date; event: Event }>>(
    [],
  )

  React.useEffect(() => {
    const listener = (event: Event) => {
      setLogs((prev) => [
        ...prev,
        {
          time: new Date(),
          event,
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
      {logs.map((log, i) => (
        <div key={i}>
          {log.event.type}: {JSON.stringify(log.event)}
        </div>
      ))}
    </div>
  )
}

export default Logs
