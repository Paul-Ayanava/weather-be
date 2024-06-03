# Introduction

It is a small micro service application to show the weather forecast of a city for the day and upcoming 3 days.
It calls the openweather API in the background and fetches the data.
There is in-memory caching service integrated with the application with a cache expiration of 1 day. 
So if the open weather api fails and the data exists in the cache, it can retrieve the information from the cache.

## Design patterns used

**Strategy design pattern** : Strategy design pattern is used to get the advices for the weather based upon the conditions. This patterns makes sure that in future if further advices for different conditions are added, the existing code will require least amount of modification and can easily be extended. Thus it adheres to the open-close principle.

**Singleton design pattern** : It is used to create the cache service, so that there is only one instance of the cache service across the application. Even it gets initialized twice by mistake in future, it will consist of a single instance only which will make the application consistent.

**Adapter design patern**: The adapter design pattern is used to convert the open weather api data as per our requirement. The openweather API data provides forecast for every 3 hours while our application requires daily forecast values. The adapter pattern ensures the data is transformed properly accordingly to our application.