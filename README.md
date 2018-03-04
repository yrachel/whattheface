# What The Face

A hackthon projected created at disrupt the district. Back end(s) primarily designed in python2, and frontend primarily designed in javascript (using React Native). Designed to help the user understand the emotional context of social situations.

## Dependencies (and APIs)

 - python2.7.x (2.7.9 or greater)
 - google cloud (vision, speech)
 - TextBlob
 - pyaudio
 - portaudio19
 - React Native 0.53

### Inspiration

Not everyone experiences emotions in the same way. In fact, many people have a hard time perceiving, empathizing with, or reciprocating emotions because of differences in cognition. Perceiving emotional information from conversation does not come naturally to many individuals with Autism Spectrum Disorder (ASD). This is coupled with health disparity within ASD; many individuals from lower socioeconomic status (e.g., ethnic minorities, low-income families, etc.) never receive adequate, or comparable (to those from less-disadvantaged backgrounds), primary care and/or mental health care.

However, with the relatively high access to smartphones in the U.S., including in those from disadvantaged backgrounds, the mobile health (mHealth) technology movement shows promise to lessen health disparity. What The Face is an attempt to utilize artificial intelligence to potentially help those with ASD determine the emotional context of social situations. Our project picks up facial emotion recognition and analyzes polarity of speech (using speech-to-text coupled with sentiment analysis) to help those on the autism spectrum, or any who struggle with understanding emotional context, understand and learn emotions used in context.

### Challenges

Once we figured out what we wanted to do, we split up and started working on our front and back end. Overall, we had a lot of problems with proving authentication and getting the correct permissions from the right places. For front-end, we had a lot of challenges with figuring out how to open a camera for our UI and take a picture. We also had problems with saving the image after it was taken. Very few of us actually had ever worked with react native before, and it took a while to understand the technology. For back-end, we had a lot of challenges getting the correct authentication for our Google APIs. We had to download multiple versions of python and pip on multiple different computers to figure out which versions worked with which APIs. After hours of trying to use Google Cloud’s Sentiment Analysis API, we decided to go with TextBlob. Unfortunately, since we coded our front end with react native and our back end with python, we had much difficulty trying to get the two to connect. The picture gets sent to the server and the server successfully receives it, but our back-end could not find the exact location of where the data is stored.

## Future Work

Although we got a lot of individual parts working, we still need to connect our front end to our back-end code. We would like to successfully implement Google Cloud’s Sentiment Analysis API, as we believe it can be more accurate and provides more metadata than TextBlob’s API. We would also like to be able to stream videos straight into our back-end instead of a single picture, as it could provide a better social context for the situation. We would also like to implement a response assistant, prompting users who are uncertain on how to respond to a situation.

## Authors

* [**Rachel Yuan**](https://www.linkedin.com/in/rachelyuan/)
* [**Jacob Yang**](https://www.linkedin.com/in/jacob-yang-89605013b/)
* [**Faysal Shaikh**](https://www.linkedin.com/in/faysalshaikh/)
* [**Dayoung Cheong**](https://www.linkedin.com/in/dayoungcheong/)

See also the list of [contributors](https://github.com/yrachel/whattheface/graphs/contributors) who participated in this project.
