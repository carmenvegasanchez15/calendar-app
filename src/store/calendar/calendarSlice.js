import { createSlice } from '@reduxjs/toolkit'

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'Cumpleaños jefe',
//   notes: 'Comprar pastel',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     id: '123',
//     name: 'Carmen',
//   },
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvent: true,
    events: [
      //tempEvent
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload
        }
        return event
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        )
        state.activeEvent = null
      }
    },
    onLoadEvent: (state, { payload = [] }) => {
      state.isLoadingEvent = false
      // state.events = payload
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id)
        if (!exists) {
          state.events.push(event)
        }
      })
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvent = true
      state.events = []
      state.activeEvent = null
    },
  },
})

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvent,
  onLogoutCalendar,
} = calendarSlice.actions
