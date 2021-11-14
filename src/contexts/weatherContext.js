import React, { createContext, useContext, useEffect } from 'react'
import { fetchWeather } from '../api/weather'

const defaultValues = {}

export const WeatherContext = createContext(defaultValues)
export const useWeather = () => useContext(WeatherContext)
export const WeatherProvider = ({ children }) => {
  useEffect(() => {
    console.log('i am in weather context')
    fetchWeather()
  }, [])
  return (
    <WeatherContext.Provider
    value = {{}}
    >
      {children}
    </WeatherContext.Provider>
  )
}